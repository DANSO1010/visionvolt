<?php
require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

header('Content-Type: application/json');

$allowedOrigins = ['https://www.vision-volt.com', 'https://vision-volt.com'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid payload']);
    exit;
}

// Anti-spam: honeypot field (real users never fill this) and a minimum
// fill-time check (bots typically submit within milliseconds of loading
// the page). Both failures respond as if the request succeeded, so
// automated submitters don't learn they were caught.
$honeypot = is_string($input['website'] ?? null) ? trim($input['website']) : '';
$formLoadedAt = is_numeric($input['formLoadedAt'] ?? null) ? (float) $input['formLoadedAt'] : null;
$elapsedMs = $formLoadedAt !== null ? (microtime(true) * 1000) - $formLoadedAt : null;

if ($honeypot !== '' || ($elapsedMs !== null && $elapsedMs < 3000)) {
    echo json_encode(['ok' => true]);
    exit;
}

function clean_field($value) {
    $value = is_string($value) ? trim($value) : '';
    return preg_replace('/[\r\n]+/', ' ', $value);
}

$fullName = clean_field($input['fullName'] ?? '');
$businessName = clean_field($input['businessName'] ?? '');
$phone = clean_field($input['phone'] ?? '');
$email = clean_field($input['email'] ?? '');
$projectType = clean_field($input['projectType'] ?? '');
$cameraCount = clean_field($input['cameraCount'] ?? '');
$message = is_string($input['message'] ?? null) ? trim($input['message']) : '';

$phoneDigits = preg_replace('/\D+/', '', $phone);
$isValidUsPhone = strlen($phoneDigits) === 10 || (strlen($phoneDigits) === 11 && $phoneDigits[0] === '1');

if (
    $fullName === ''
    || !preg_match("/^[\p{L} '\-]+$/u", $fullName)
    || $phone === ''
    || !$isValidUsPhone
    || $email === ''
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing or invalid required fields']);
    exit;
}

$config = require __DIR__ . '/config.php';

$plainBody = "New estimate request from the VisionVolt website:\n\n"
    . "Full Name: $fullName\n"
    . "Business Name: $businessName\n"
    . "Phone: $phone\n"
    . "Email: $email\n"
    . "Project Type: $projectType\n"
    . "Number of Cameras: $cameraCount\n"
    . "Message:\n$message\n";

function e($value) {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function row($label, $value) {
    return '<tr>'
        . '<td style="padding:10px 0;border-bottom:1px solid #2a2f35;color:#8a9099;font-size:13px;width:160px;vertical-align:top;">' . e($label) . '</td>'
        . '<td style="padding:10px 0;border-bottom:1px solid #2a2f35;color:#ffffff;font-size:14px;font-weight:600;">' . e($value) . '</td>'
        . '</tr>';
}

$logoUrl = 'https://www.vision-volt.com/apple-touch-icon.png';

$htmlBody = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0f12;">'
    . '<tr><td align="center" style="padding:0;">'
    . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">'

    . '<tr><td style="background:#0d0f12;padding:32px 24px;text-align:center;">'
    . '<img src="' . e($logoUrl) . '" width="32" height="32" alt="VisionVolt" style="vertical-align:middle;margin-right:10px;border:0;display:inline-block;" />'
    . '<span style="font-family:Arial,sans-serif;font-size:22px;font-weight:bold;color:#ffffff;vertical-align:middle;">Vision<span style="color:#ffd700;">Volt</span></span>'
    . '</td></tr>'

    . '<tr><td style="background:#1e2023;padding:28px 24px;font-family:Arial,sans-serif;">'
    . '<span style="display:inline-block;background:#0056a0;color:#ffffff;font-size:11px;letter-spacing:1px;font-weight:bold;padding:5px 10px;border-radius:2px;">NEW ESTIMATE REQUEST</span>'
    . '<h2 style="margin:16px 0 20px;color:#ffffff;font-size:20px;">' . e($fullName) . ' wants a quote</h2>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">'
    . row('Full Name', $fullName)
    . row('Business Name', $businessName !== '' ? $businessName : '—')
    . row('Phone', $phone)
    . row('Email', $email)
    . row('Project Type', $projectType)
    . row('Number of Cameras', $cameraCount)
    . '</table>'
    . '<div style="margin-top:20px;padding:16px;background:#0d0f12;border-left:3px solid #ffd700;">'
    . '<p style="margin:0 0 6px;color:#8a9099;font-size:11px;letter-spacing:1px;text-transform:uppercase;">Message</p>'
    . '<p style="margin:0;color:#ffffff;font-size:14px;white-space:pre-wrap;">' . e($message !== '' ? $message : '—') . '</p>'
    . '</div>'
    . '</td></tr>'

    . '<tr><td style="background:#0c0e11;padding:16px 24px;font-family:Arial,sans-serif;font-size:12px;color:#8a9099;">'
    . 'Sent from the "Get a Free Estimate" form at vision-volt.com'
    . '</td></tr>'

    . '</table>'
    . '</td></tr>'
    . '</table>';

$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'];
    $mail->Password = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $config['smtp_port'];

    $mail->setFrom($config['smtp_user'], 'VisionVolt Website');
    $mail->addAddress($config['to']);
    $mail->addReplyTo($email, $fullName);

    $mail->Subject = "New estimate request from $fullName";
    $mail->isHTML(true);
    $mail->Body = $htmlBody;
    $mail->AltBody = $plainBody;

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (PHPMailerException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send']);
}
