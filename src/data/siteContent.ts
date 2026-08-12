import type { ImageMetadata } from "astro";

import videoSurveillanceImg from "../assets/services/video-surveillance.jpeg";
import electricalServicesImg from "../assets/services/electrical-services.jpeg";
import structuredCablingImg from "../assets/services/structured-cabling.jpeg";
import industrialSecurityImg from "../assets/services/industrial-security.jpeg";
import commercialSecurityImg from "../assets/services/commercial-security.jpeg";
import accessControlImg from "../assets/services/access-control.jpeg";

import project1Img from "../assets/projects/project-1.jpeg";
import project2Img from "../assets/projects/project-2.jpeg";
import project3Img from "../assets/projects/project-3.jpeg";
import project4Img from "../assets/projects/project-4.jpeg";
import project5Img from "../assets/projects/project-5.jpeg";
import project6Img from "../assets/projects/project-6.jpeg";
import project7Img from "../assets/projects/project-7.jpeg";
import project8Img from "../assets/projects/project-8.jpeg";
import project9Img from "../assets/projects/project-9.jpeg";
import project10Img from "../assets/projects/project-10.jpeg";
import project11Img from "../assets/projects/project-11.jpeg";
import project12Img from "../assets/projects/project-12.jpeg";
import project13Img from "../assets/projects/project-13.jpeg";
import project14Img from "../assets/projects/project-14.jpeg";
import heroBgImage from "../assets/hero-bg.jpeg";

export interface Service {
  id: string;
  code: string;
  title: string;
  description: string;
  image: ImageMetadata;
  iconName: string;
  tag: string;
}

export interface TargetCustomer {
  id: string;
  name: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  keyDeliverables: string[];
}

export interface NavLink {
  href: string;
  label: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface Phone {
  name: string;
  number: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface WhyChooseUsReason {
  title: string;
  icon: string;
}

export interface Testimonial {
  stars: number;
  quote: string;
  author: string;
  role: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  images: ImageMetadata[];
  /** Tailwind object-position class per image index, for images whose subject isn't centered. */
  imagePositions?: Record<number, string>;
}

export interface DetailedService {
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  longDescription: string;
  features: string[];
}

export const siteContent = {
  company: {
    name: "VisionVolt",
    tagline: "Advance security and electrical solution",
    emails: ["sales@vision-volt.com"],
    phones: [
      { name: "Sergio Galindo", number: "(224) 410-8315" },
      { name: "Nicolás Botero", number: "(773) 398-0085" },
    ] as Phone[],
    socials: {
      tiktok: {
        handle: "@visionvolt7",
        url: "https://www.tiktok.com/@visionvolt7?_r=1&_t=ZT-98biORtYlos",
      },
      instagram: {
        handle: "@visionvolt3",
        url: "https://www.instagram.com/visionvolt3?igsh=MXZhZW9vd2htZHltNw%3D%3D&utm_source=qr",
      },
    },
    valueProposition:
      "Trusted provider of advanced security, electrical, and technology infrastructure solutions, serving commercial, industrial, government, and residential sectors with excellence, integrity, and precision.",
    about: {
      paragraphs: [
        "At VisionVolt, we provide professional security and electrical solutions for residential and commercial properties. We specialize in the installation of high-definition security cameras, surveillance systems, and reliable electrical services designed to protect what matters most.",
        "With over 3 years of industry experience, we are fully licensed and insured to perform a wide range of electrical and low-voltage projects. Our commitment to quality workmanship, advanced technology, and customer satisfaction allows us to deliver dependable solutions tailored to each client's needs.",
        "We stand behind every project we complete by offering workmanship warranties and ongoing support, giving our customers confidence and peace of mind. Whether you need a complete security system installation, electrical upgrades, or customized solutions for your business or home, VisionVolt is dedicated to providing professional service, reliable results, and exceptional value.",
      ],
    },
    ctaText: "GET A FREE ESTIMATE",
    ctaSubtext:
      "Receive a customized installation proposal based on your property, security goals, and project requirements.",
    locations: [
      "9954 S 84th Terrace, Palos Hills, IL 60465, United States",
      "6308 N Francisco Ave, Chicago, IL 60659",
    ],
  },

  navigation: [
    { name: "Home", href: "/" },
    { name: "Installation", href: "/#installation" },
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects" },
    { name: "About Us", href: "/#about" },
  ] as NavItem[],

  hero: {
    backgroundImage: heroBgImage,
    videoSrc: "/assets/hero-bg.mp4",
    badge: "[PARTNER_ACTIVE]",
    eyebrow: "v2.4 Installation Integration",
  },

  valueTicker: [
    "EXPERT INSTALLATION",
    "SYSTEM DESIGN",
    "MAINTENANCE SERVICES",
    "ELECTRICAL INTEGRATION",
    "ACCESS CONTROL DEPLOYMENT",
    "TURNKEY SOLUTIONS",
  ],

  trustedBrands: ["Uniview", "Hikvision", "Ubiquiti", "Verkada", "Honeywell", "Axis"],

  stats: [
    { label: "Cameras Installed", value: "100+" },
    { label: "Commercial Projects", value: "25+" },
    { label: "Installation Warranty", value: "2-Year" },
    { label: "License & Insurance", value: "100% Covered" },
    { label: "Primary Service Area", value: "Illinois and others" },
  ] as Stat[],

  installationProcess: [
    {
      step: "01",
      title: "Consultation",
      shortDesc: "Understand your specific security requirements and operational needs.",
      detailedDesc:
        "Initial technical intake and risk profile assessment to align security goals, budgets, and project timelines.",
      keyDeliverables: ["Requirements Analysis", "Budget Alignment", "Compliance Review"],
    },
    {
      step: "02",
      title: "Site Assessment",
      shortDesc: "Comprehensive property inspection to identify vulnerabilities and coverage areas.",
      detailedDesc:
        "On-site architectural survey to map blind spots, analyze lighting/power sources, and plan low-voltage pathways.",
      keyDeliverables: ["Blind-spot Mapping", "Power/Lighting Survey", "Low-Voltage Planning"],
    },
    {
      step: "03",
      title: "Solution Design",
      shortDesc: "Customized system architecture engineering for optimal performance.",
      detailedDesc:
        "Engineering custom system architecture, selecting camera/access control hardware specs, and calculating storage (NVR/VMS).",
      keyDeliverables: ["CAD Layout Plans", "Hardware Specifications", "Storage & Bandwidth Sizing"],
    },
    {
      step: "04",
      title: "Professional Installation",
      shortDesc: "Expert configuration and hardware integration by our certified team.",
      detailedDesc:
        "Clean conduit and structured cabling runs, certified hardware mounting, telecom rack setup, and weatherproof sealing.",
      keyDeliverables: ["Structured Cabling Runs", "Clean Rack Integration", "Weatherproof Hardware Mount"],
    },
    {
      step: "05",
      title: "Testing & Commissioning",
      shortDesc: "Rigorous performance verification to ensure system integrity.",
      detailedDesc:
        "Fine-tuning camera angles, configuring AI video analytics, mobile app setup, and client admin portal training.",
      keyDeliverables: ["AI Analytics Calibration", "Remote Mobile Setup", "Admin Team Training"],
    },
    {
      step: "06",
      title: "Ongoing Support",
      shortDesc: "Proactive maintenance and scalable upgrades for long-term reliability.",
      detailedDesc:
        "Workmanship warranty activation, proactive system health monitoring, firmware updates, and local technician support.",
      keyDeliverables: ["Warranty Activation", "Health Monitoring", "Priority Local Support"],
    },
  ] as ProcessStep[],

  services: [
    {
      id: "video-surveillance",
      code: "SER-001",
      title: "Video Surveillance Design",
      description:
        "End-to-end engineering, professional installation, and maintenance of advanced CCTV architectures tailored for high-security environments.",
      image: videoSurveillanceImg,
      iconName: "Video",
      tag: "",
    },
    {
      id: "electrical-services",
      code: "SER-002",
      title: "Electrical Installation",
      description: "Certified installation and integration of power systems and industrial electrical infrastructure.",
      image: electricalServicesImg,
      iconName: "Zap",
      tag: "EXPERT_FIT",
    },
    {
      id: "structured-cabling",
      code: "SER-003",
      title: "Structured Cabling",
      description: "Professional data infrastructure design and maintenance using high-grade fiber and copper.",
      image: structuredCablingImg,
      iconName: "Network",
      tag: "NET_ENGINEERING",
    },
    {
      id: "industrial-security",
      code: "SER-004",
      title: "Industrial Security",
      description: "Comprehensive protection strategies and physical security engineering for manufacturing plants.",
      image: industrialSecurityImg,
      iconName: "Factory",
      tag: "SITE_SECURITY",
    },
    {
      id: "commercial-security",
      code: "SER-005",
      title: "Commercial Integration",
      description: "Security audits and installation services for corporate offices and retail complexes.",
      image: commercialSecurityImg,
      iconName: "Building2",
      tag: "ASSET_PROTECTION",
    },
    {
      id: "access-control",
      code: "SER-006",
      title: "Access Control",
      description: "Professional deployment of biometric and keycard systems with full backend integration.",
      image: accessControlImg,
      iconName: "Fingerprint",
      tag: "BIOMETRIC_INSTALL",
    },
  ] as Service[],

  detailedServices: [
    {
      slug: "cctv-installation",
      title: "CCTV Installation",
      shortDesc: "High-definition surveillance systems, 180° cameras, and remote mobile monitoring.",
      icon: "Camera",
      longDescription:
        "We design and install high-definition CCTV systems built around how your property actually operates — full-perimeter coverage, wide-angle 180° cameras for high-traffic areas, and clean, low-voltage cabling runs. Every install ships with remote mobile access, so you can check in on your business or home from anywhere.",
      features: [
        "HD & 180° wide-angle cameras",
        "Remote viewing on mobile and desktop",
        "Night vision & motion-triggered recording",
        "Scalable to multi-building sites",
      ],
    },
    {
      slug: "access-control",
      title: "Access Control",
      shortDesc: "Biometric access, keycard entries, and cloud-managed door security.",
      icon: "KeyRound",
      longDescription:
        "From single-door keycard readers to multi-site biometric access, we deploy access control systems that give you a full audit trail of who enters and when — all managed from a single cloud dashboard.",
      features: [
        "Biometric & keycard entry systems",
        "Cloud-based access management",
        "Detailed entry/exit audit logs",
        "Integrates with existing CCTV systems",
      ],
    },
    {
      slug: "structured-cabling",
      title: "Structured Cabling",
      shortDesc: "Telecom rooms, high-density Ethernet runs, and clean rack installation.",
      icon: "Network",
      longDescription:
        "We build the data backbone your security and network systems run on: organized telecom rooms, high-density Ethernet runs, and professionally dressed patch panels and racks that make future maintenance simple.",
      features: [
        "Telecom room build-outs",
        "High-density fiber & copper runs",
        "Labeled, rack-mounted patch panels",
        "Built to support future expansion",
      ],
    },
    {
      slug: "electrical-services",
      title: "Electrical Services",
      shortDesc: "Outdoor lighting, low-voltage power distribution, and commercial upgrades.",
      icon: "Zap",
      longDescription:
        "Our licensed electricians handle everything from outdoor and parking-lot lighting to low-voltage power distribution for your security equipment, plus general commercial electrical upgrades.",
      features: [
        "Outdoor & parking lot lighting",
        "Low-voltage power for security equipment",
        "Commercial electrical upgrades",
        "Licensed & insured workmanship",
      ],
    },
    {
      slug: "network-infrastructure",
      title: "Network Infrastructure",
      shortDesc: "Point-to-point antennas, enterprise routers, and secure VPN connections.",
      icon: "Server",
      longDescription:
        "For multi-building or multi-site properties, we design point-to-point wireless links and enterprise-grade networking so every camera and access point stays connected on a secure, private network.",
      features: [
        "Point-to-point wireless antennas",
        "Enterprise routers & switches",
        "Secure VPN connectivity",
        "Multi-building network design",
      ],
    },
  ] as DetailedService[],

  trustQuote:
    "We source high-quality equipment from trusted industry-leading manufacturers to ensure every installation meets professional performance and reliability standards.",

  whyChooseUsReasons: [
    { title: "Certified Installers", icon: "CheckCircle2" },
    { title: "Commercial & Residential Projects", icon: "Building" },
    { title: "Warranty Included", icon: "ShieldCheck" },
    { title: "Fast Turnaround", icon: "Zap" },
    { title: "Remote Monitoring Solutions", icon: "Smartphone" },
    { title: "Ongoing Support", icon: "Headphones" },
  ] as WhyChooseUsReason[],

  testimonials: [
    {
      stars: 5,
      quote: "VisionVolt installed our entire warehouse surveillance system. Professional team and excellent support.",
      author: "John M.",
      role: "Warehouse Manager",
    },
    {
      stars: 5,
      quote: "Fast installation and clean work. Highly recommended.",
      author: "Sarah K.",
      role: "Property Manager",
    },
  ] as Testimonial[],

  targetCustomers: [
    { id: "gov", name: "Government-owned companies", iconName: "Landmark" },
    { id: "warehouses", name: "Warehouses", iconName: "Warehouse" },
    { id: "manufacturing", name: "Manufacturing Facilities", iconName: "Factory" },
    { id: "retail", name: "Retail Stores", iconName: "ShoppingBag" },
    { id: "offices", name: "Office Buildings", iconName: "Building" },
    { id: "restaurants", name: "Restaurants", iconName: "Utensils" },
    { id: "multi-family", name: "Multi-Family Properties", iconName: "Home" },
    { id: "construction", name: "Construction Sites", iconName: "HardHat" },
    { id: "gyms", name: "Gyms", iconName: "Dumbbell" },
    { id: "homes", name: "Homes", iconName: "ShieldHome" },
  ] as TargetCustomer[],

  areasWeServe: [
    "Chicago",
    "Palos Hills",
    "Orland Park",
    "Tinley Park",
    "Oak Lawn",
    "Naperville",
    "Schaumburg",
    "Joliet",
    "Waukegan",
  ],

  featuredProjects: [
    {
      id: "dwelling-units",
      title: "Projects: Dwelling Units",
      category: "Multi-Building Security & Electrical Infrastructure",
      description:
        "We are proud to share the success of one of our most ambitious projects. For this initiative, we linked three buildings into a single, integrated security system, deploying over 32 high-definition cameras. By using specialized antennas, we established a robust, reliable connection between the structures, ensuring complete coverage and real-time access. Additionally, we handled the entire outdoor electrical installation—including the parking areas—to guarantee proper lighting and secure connections.",
      highlights: ["3 Linked Buildings", "32+ HD Cameras", "Wireless Antennas", "Outdoor & Parking Electrical"],
      images: [project1Img, project14Img, project6Img],
    },
    {
      id: "gym-installation",
      title: "Project: Gym",
      category: "Commercial High-Density Surveillance",
      description:
        "We undertook a project for a gym that required the installation of approximately 18 security cameras. Given the size of the facility, we carried out an extensive and complex cabling installation to ensure full coverage of every area. We installed high-definition cameras—including 180-degree models—all monitored by the owner, who can view the footage in real-time via their mobile phone.",
      highlights: ["18 HD & 180° Cameras", "Complex Cabling Infrastructure", "Mobile Real-Time Access"],
      images: [project2Img, project9Img, project13Img],
      imagePositions: { 0: "object-[center_28%]" },
    },
  ] as FeaturedProject[],

  projects: [
    {
      id: 1,
      image: project1Img,
      alt: "VisionVolt Project 1",
      label: "NVR Installation & Configuration",
      description:
        "Installing and configuring the NVR that will bring the client's entire security system to life, storing all system recordings and information 24/7.",
    },
    {
      id: 2,
      image: project2Img,
      alt: "VisionVolt Project 2",
      label: "180° Camera Coverage Upgrade",
      description:
        "Installing 180° cameras to provide broader coverage with fewer blind spots. Enhanced visibility, smart monitoring, and continuous protection to keep every space under control.",
    },
    {
      id: 3,
      image: project3Img,
      alt: "VisionVolt Project 3",
      label: "NVR Wiring & Connectivity",
      description:
        "Every connection counts. Organizing and connecting the NVR wiring to guarantee stable communication between the cameras and the recording system, ensuring continuous monitoring and reliable performance.",
    },
    {
      id: 4,
      image: project4Img,
      alt: "VisionVolt Project 4",
      label: "Structured Wiring & NVR Rack Setup",
      description:
        "A professional system shows in the details. Organized wiring, secure connections, and a perfectly structured NVR to guarantee stability, easy maintenance, and maximum performance from the video surveillance system.",
    },
    {
      id: 5,
      image: project5Img,
      alt: "VisionVolt Project 5",
      label: "Clean & Secure Wiring Installation",
      description:
        "A professional installation begins with clean, organized, and secure wiring. Every connection is key to ensuring maximum performance and reliability across the entire security system.",
    },
    {
      id: 6,
      image: project6Img,
      alt: "VisionVolt Project 6",
      label: "Centralized Camera Monitoring Display",
      description:
        "A complete view of the security system in action. All cameras centralized on a single screen for efficient monitoring, real-time supervision, and immediate response to any event.",
    },
    {
      id: 7,
      image: project7Img,
      alt: "VisionVolt Project 7",
      label: "Professional Camera Installation",
      description: "A properly installed camera is the first line of defense for your business or property.",
    },
    {
      id: 8,
      image: project8Img,
      alt: "VisionVolt Project 8",
      label: "180° Camera with Conduit-Protected Wiring",
      description:
        "180° camera installed with conduit-protected wiring, designed to deliver maximum coverage and a secure, durable infrastructure. An ideal solution for residential complexes looking to reduce blind spots and strengthen safety for their residents.",
    },
    {
      id: 9,
      image: project9Img,
      alt: "VisionVolt Project 9",
      label: "Wireless Antenna Coverage Expansion",
      description:
        "Installing antennas to connect and expand the security system's coverage. A reliable solution that enables stable video and data transmission, keeping every area protected and monitored in real time.",
    },
    {
      id: 10,
      image: project10Img,
      alt: "VisionVolt Project 10",
      label: "Outdoor Conduit-Protected Wiring",
      description:
        "Outdoor wiring protected with conduit to ensure a safe, organized installation resistant to environmental conditions. Every detail is designed for maximum long-term durability, performance, and reliability.",
    },
    {
      id: 11,
      image: project11Img,
      alt: "VisionVolt Project 11",
      label: "Integrated Display & NVR Station",
      description:
        "The heart of the security system all in one place. The display and the NVR work together to provide real-time monitoring, access to recordings, and complete control over every camera from a centralized platform.",
    },
    {
      id: 12,
      image: project12Img,
      alt: "VisionVolt Project 12",
      label: "Indoor & Outdoor Electrical Installation",
      description:
        "Our technical team works with precision and safety on the installation and adaptation of indoor and outdoor electrical systems, using high-quality materials and following industry best practices.",
      imagePosition: "object-[center_20%]",
    },
  ],

  footerLinks: [
    { href: "/#installation", label: "Installation Guidelines" },
    // TODO: no dedicated Service Terms page exists yet — replace with the real URL once available.
    { href: "/", label: "Service Terms" },
    // TODO: no Partner Portal exists yet — replace with the real URL once available.
    { href: "/", label: "Partner Portal" },
    { href: "/#about", label: "Contact Specialist" },
  ] as NavLink[],
};
