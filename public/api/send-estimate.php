<?php
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

if ($fullName === '' || $phone === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing or invalid required fields']);
    exit;
}

$to = 'sales@vision-volt.com';
$subject = "New estimate request from $fullName";

$body = "New estimate request from the VisionVolt website:\n\n"
    . "Full Name: $fullName\n"
    . "Business Name: $businessName\n"
    . "Phone: $phone\n"
    . "Email: $email\n"
    . "Project Type: $projectType\n"
    . "Number of Cameras: $cameraCount\n"
    . "Message:\n$message\n";

$headers = [
    'From: VisionVolt Website <no-reply@vision-volt.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send']);
}
