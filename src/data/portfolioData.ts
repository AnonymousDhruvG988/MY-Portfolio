export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  overview: string;
  problem: string;
  approach: string;
  whatLearned: string;
  technologies: string[];
  role: string;
  status: 'ACTIVE LAB' | 'DEPLOYED' | 'PROTOTYPE' | 'RESEARCH';
  githubUrl?: string;
  liveUrl?: string;
  terminalCommand?: string;
  metrics?: { label: string; value: string }[];
}

export interface SecurityTool {
  id: string;
  name: string;
  category: 'WIRELESS AUDITING' | 'CRYPTANALYSIS' | 'ENVIRONMENT' | 'RECONNAISSANCE';
  roleDescription: string;
  syntaxExample: string;
  explanation: string;
  masteryStatus: 'WORKING WITH' | 'LEARNING' | 'ACTIVE LAB RESEARCH';
  tags: string[];
}

export interface SkillNode {
  name: string;
  category: 'KNOWN' | 'LEARNING' | 'EXPLORING';
  type: 'LANGUAGE' | 'SECURITY' | 'WEB' | 'DATA' | 'TOOL';
  focus: string;
  whyLearning: string;
}

export interface DeveloperProfile {
  name: string;
  initials: string;
  codeName: string;
  title: string;
  education: {
    degree: string;
    field: string;
    institutionPlaceholder: string;
    location: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  status: {
    availability: string;
    systemMode: string;
    learningFocus: string;
  };
  hero: {
    systemTag: string;
    mainTitleLine1: string;
    mainTitleLine2: string;
    mainTitleLine3: string;
    subheadline: string;
    philosophies: string[];
  };
  about: {
    leadStatement: string;
    storyParagraphs: string[];
    technicalFoundations: string[];
  };
  strengths: {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    signal: string;
  }[];
  securitySection: {
    headline: string;
    subtext: string;
    disclaimer: string;
    tools: SecurityTool[];
  };
  projects: ProjectItem[];
  skills: SkillNode[];
}

export const PORTFOLIO_DATA: DeveloperProfile = {
  name: "Dhruv Goswami",
  initials: "DG",
  codeName: "ANONYMOUS_DHRUV_988",
  title: "B.Tech Student • Developer & Offensive Security Explorer",
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering",
    institutionPlaceholder: "Engineering Institute",
    location: "India [28.6139° N, 77.2090° E]",
  },
  contact: {
    email: "dhruvgoswami988@gmail.com",
    github: "https://github.com/AnonymousDhruvG988",
    linkedin: "https://www.linkedin.com/in/dhruv-goswami-96415a435/",
  },
  status: {
    availability: "AVAILABLE TO LEARN & BUILD",
    systemMode: "OFFENSIVE LAB // FULL STACK EXPLORATION",
    learningFocus: "Modern Web Systems, Packet Inspection, Network Protocols",
  },
  hero: {
    systemTag: "DEVELOPER // B.TECH // INDIA",
    mainTitleLine1: "BUILDING",
    mainTitleLine2: "WHAT I CAN",
    mainTitleLine3: "IMAGINE.",
    subheadline: "B.Tech Student • Python · HTML · SQL · Kali Linux Toolchains",
    philosophies: [
      "CURIOUS BY DEFAULT",
      "I LIKE FIGURING THINGS OUT",
      "UNDERSTAND FROM THE PROTOCOL LEVEL UP",
    ],
  },
  about: {
    leadStatement: "I'M INTERESTED IN HOW THINGS WORK BENEATH THE SURFACE.",
    storyParagraphs: [
      "I am an ambitious B.Tech student who enjoys building software, deconstructing unfamiliar technologies, and solving engineering bottlenecks from first principles.",
      "Rather than treating code as abstract magic, I want to understand how network packets traverse interfaces, how relational databases execute query plans, how operating system kernels manage hardware, and how modern web systems deliver fluid digital interactions.",
      "My journey is driven by relentless curiosity: learning Python for automation and scripting, mastering SQL for data architecture, constructing modern web interfaces with HTML, and auditing wireless protocols and cryptographic primitives using Kali Linux.",
    ],
    technicalFoundations: [
      "Python Scripting & Automation",
      "Relational Database Architecture (SQL)",
      "Semantic HTML & Web Interfaces",
      "Offensive Security & Penetration Testing Toolchains (Kali Linux)",
      "Wireless Protocol Auditing (802.11 / WPA Handshakes)",
      "Cryptographic Hash Verification (Hashcat / John the Ripper)",
    ],
  },
  strengths: [
    {
      number: "01",
      title: "RAPID LEARNING VELOCITY",
      subtitle: "High adaptability curve",
      description: "Absorbs unfamiliar programming languages, command line utilities, and technical documentation with speed. Prefers diving into technical manuals and active experimentation over surface tutorials.",
      signal: "VELOCITY // 98.4%",
    },
    {
      number: "02",
      title: "SYSTEMATIC PROBLEM DECOMPOSITION",
      subtitle: "First principles deconstruction",
      description: "Treats complex bugs and architectural challenges like diagnostic systems: isolate variables, trace packet or data flow, test edge conditions, and iterate until resolution.",
      signal: "DIAGNOSTIC // SYSTEMIC",
    },
    {
      number: "03",
      title: "PROTOCOL-LEVEL CURIOSITY",
      subtitle: "Beyond the API layer",
      description: "Doesn't stop at high-level abstractions. Investigates socket streams, 4-way wireless handshakes, hash collision physics, and raw SQL execution plans.",
      signal: "DEPTH // KERNEL_TO_UI",
    },
    {
      number: "04",
      title: "BUILDER'S PERSISTENCE",
      subtitle: "Continuous trial and refinement",
      description: "Embraces errors, stack traces, and handshake capture failures as essential feedback loops. Retries with modified parameters, custom scripts, and alternative vectors.",
      signal: "RESILIENCE // PERSISTENT",
    },
    {
      number: "05",
      title: "ETHICAL & DEFENSIVE MINDSET",
      subtitle: "Understanding attack to engineer defense",
      description: "Believes that the best way to write secure, fault-tolerant software is by thoroughly understanding how attackers discover vulnerabilities and crack cryptographic secrets.",
      signal: "INTEGRITY // ETHICAL LAB",
    },
  ],
  securitySection: {
    headline: "OFFENSIVE SECURITY & WIRELESS LAB",
    subtext: "Exploring Kali Linux environments, wireless frame analysis, and cryptographic auditing tools in authorized local sandbox research.",
    disclaimer: "RESEARCH CONDUCTED EXCLUSIVELY ON PRIVATELY OWNED LAB EQUIPMENT FOR ETHICAL DEFENSE & ACADEMIC AUDITING PURPOSES.",
    tools: [
      {
        id: "kali",
        name: "Kali Linux",
        category: "ENVIRONMENT",
        roleDescription: "Primary penetration testing distribution for security auditing, terminal automation, network interface orchestration, and custom Python toolchain development.",
        syntaxExample: "uname -a && ip link show",
        explanation: "Configured with custom shell environments, monitoring interfaces, and network socket listeners to conduct penetration audits.",
        masteryStatus: "WORKING WITH",
        tags: ["Linux Kernel", "Bash", "Networking", "System Auditing"],
      },
      {
        id: "airmon",
        name: "Airmon-ng",
        category: "WIRELESS AUDITING",
        roleDescription: "Wireless network card monitor mode utility used to disable interfering system processes and switch 802.11 Wi-Fi chipsets into promiscuous RF monitoring state.",
        syntaxExample: "airmon-ng check kill && airmon-ng start wlan0",
        explanation: "Orchestrates RF packet sniffing without association, enabling raw IEEE 802.11 management and beacon frame capture.",
        masteryStatus: "WORKING WITH",
        tags: ["802.11 Wi-Fi", "Monitor Mode", "RF Sniffing", "Packet Telemetry"],
      },
      {
        id: "aircrack",
        name: "Aircrack-ng",
        category: "WIRELESS AUDITING",
        roleDescription: "Complete suite of 802.11 WPA/WPA2-PSK 4-way handshake analysis, statistical packet evaluation, and cryptographic integrity verification.",
        syntaxExample: "aircrack-ng -w wordlist.txt -b 00:14:6C:7E:40:80 capture.cap",
        explanation: "Captures and analyzes EAPOL key frames exchanged during client authentication to test wireless PSK entropy against dictionary and statistical attacks.",
        masteryStatus: "WORKING WITH",
        tags: ["WPA2-PSK", "4-Way Handshake", "EAPOL Analysis", "Cryptanalysis"],
      },
      {
        id: "hashcat",
        name: "Hashcat",
        category: "CRYPTANALYSIS",
        roleDescription: "Advanced GPU/CPU-accelerated hash recovery utility supporting hundreds of cryptographic algorithms (WPA-PBKDF2-HMAC-SHA1, SHA256, NTLM).",
        syntaxExample: "hashcat -m 22000 -a 0 handshake.hc22000 rockyou.txt -r rules/best64.rule",
        explanation: "Utilized in research to study password entropy, salt derivation algorithms, and dictionary mutation rules to understand weak credential vectors.",
        masteryStatus: "WORKING WITH",
        tags: ["GPU Acceleration", "PBKDF2", "Salt Hashing", "Rule Mutations"],
      },
      {
        id: "john",
        name: "John the Ripper (JtR)",
        category: "CRYPTANALYSIS",
        roleDescription: "Flexible password auditing tool designed for Unix shadow hashes, custom cryptographic digests, and incremental brute-force analysis.",
        syntaxExample: "john --format=sha512crypt --wordlist=passwords.txt hashes.txt",
        explanation: "Employed for testing password policies, auditing hashed database credentials, and understanding salt stretching mechanics.",
        masteryStatus: "WORKING WITH",
        tags: ["Password Auditing", "Unix Shadow", "Incremental Attack", "Entropy"],
      },
    ],
  },
  projects: [
    {
      id: "packetsense",
      number: "01",
      title: "PacketSense // 802.11 Telemetry & Handshake Inspector",
      category: "OFFENSIVE SECURITY & WIRELESS AUDITING",
      tagline: "Automated wireless frame capture, beacon parser, and EAPOL 4-way handshake validator.",
      description: "A Python-based wireless security auditing toolkit engineered to interface with Kali Linux Airmon-ng. Automates monitor mode orchestration, channel frequency sweeps, and validates captured WPA2 EAPOL authentication handshakes.",
      overview: "During research into wireless protocol vulnerabilities, manually switching interfaces and parsing raw .pcap captures was repetitive. PacketSense wraps Airmon-ng and Scapy into a real-time terminal telemetry monitor.",
      problem: "Identifying corrupted or partial 4-way handshakes before allocating compute resources to cryptanalysis tools like Hashcat or Aircrack-ng.",
      approach: "Built a Python packet parser that listens on raw socket streams, extracts EAPOL frame metadata, verifies Message 1 through 4 presence, and exports valid frames directly into .hc22000 format.",
      whatLearned: "Deepened understanding of 802.11 beacon structure, BSSID/ESSID broadcast mechanics, cryptographic nonce exchange, and Python socket programming.",
      technologies: ["Python", "Kali Linux", "Airmon-ng", "Aircrack-ng", "802.11 Protocols", "Linux Sockets"],
      role: "Lead Developer & Security Researcher",
      status: "ACTIVE LAB",
      githubUrl: "https://github.com/AnonymousDhruvG988",
      terminalCommand: "python3 packetsense.py --interface wlan0mon --audit-handshakes",
      metrics: [
        { label: "PROTOCOL", value: "IEEE 802.11" },
        { label: "FRAME TYPE", value: "EAPOL / BEACON" },
        { label: "ACCURACY", value: "100% VALIDATION" },
      ],
    },
    {
      id: "queryforge",
      number: "02",
      title: "QueryForge // Relational Database Query Engine & Schema Explorer",
      category: "DATA SYSTEMS & SQL OPTIMIZATION",
      tagline: "Interactive SQL query workbench and relational schema analyzer with query plan visualization.",
      description: "A developer-focused relational database inspection utility written with SQL and Python backend scripts. Helps visualize entity-relationship mappings, analyze indexing strategies, and optimize complex multi-table joins.",
      overview: "Designed to explore relational databases beyond simple CRUD queries, focusing on index traversal cost, foreign key constraints, and transactional ACID compliance.",
      problem: "Visualizing how nested SELECT statements, Common Table Expressions (CTEs), and unindexed WHERE clauses impact database query execution times.",
      approach: "Engineered a schema parser and SQL query runner that provides execution plan telemetry, EXPLAIN cost breakdowns, and structured table data representation.",
      whatLearned: "Mastered SQL relational algebra, B-Tree index structures, CTE optimization, normalization forms (1NF to 3NF), and database integrity rules.",
      technologies: ["SQL", "Python", "SQLite", "PostgreSQL Primitives", "Data Architecture"],
      role: "Database Architect & Developer",
      status: "DEPLOYED",
      githubUrl: "https://github.com/AnonymousDhruvG988",
      terminalCommand: "python3 queryforge.py --db dev_vault.db --explain-plan",
      metrics: [
        { label: "CORE ENGINE", value: "SQL RELATIONAL" },
        { label: "ANALYZER", value: "EXPLAIN QUERY PLAN" },
        { label: "LATENCY", value: "<2ms LOOKUP" },
      ],
    },
    {
      id: "pyaudit",
      number: "03",
      title: "PyRecon // Automated Network Reconnaissance & Port Probe",
      category: "NETWORKING & AUTOMATION",
      tagline: "Concurrent socket scanner, service banner grabber, and protocol vulnerability mapper.",
      description: "A high-performance Python command-line utility built to conduct fast, multi-threaded network discovery, TCP socket probing, and service identification across local subnets.",
      overview: "Built to replace heavy monolithic scanners for rapid local lab diagnostics. Enables granular socket control and raw TCP handshake timing analysis.",
      problem: "Generic scanning tools often hide socket timeout parameters and fail to log raw service response banners gracefully.",
      approach: "Implemented a thread-pool worker architecture in Python that executes non-blocking socket connections, measures SYN/ACK latency, grabs service banners, and writes JSON security reports.",
      whatLearned: "Socket level programming, TCP 3-way handshake mechanics, thread synchronization in Python, CIDR subnet math, and error handling for dropped packets.",
      technologies: ["Python", "Socket API", "Threading", "TCP/IP Protocols", "Network CLI"],
      role: "Creator & Systems Programmer",
      status: "ACTIVE LAB",
      githubUrl: "https://github.com/AnonymousDhruvG988",
      terminalCommand: "python3 pyrecon.py --target 192.168.1.0/24 --threads 50",
      metrics: [
        { label: "CONCURRENCY", value: "50 WORKERS" },
        { label: "SOCKET TIMEOUT", value: "250ms LERP" },
        { label: "OUTPUT FORMAT", value: "JSON / ANSI" },
      ],
    },
    {
      id: "nexus-terminal",
      number: "04",
      title: "Nexus // Zero-Framework Cybernetic Canvas Workspace",
      category: "CREATIVE WEB ENGINEERING",
      tagline: "High-frequency 60 FPS HTML5/Canvas rendering engine with interactive mathematical matrix nodes.",
      description: "An experimental, zero-framework web interface exploring cybernetic aesthetics, requestAnimationFrame particle fields, vector coordinate tracking, and accessible keyboard navigation.",
      overview: "An exploration in pure web fundamentals (HTML5, Vanilla CSS, JavaScript) to deliver rich, lag-free UI interactions without heavy external dependencies.",
      problem: "Many modern portfolios suffer from excessive DOM bloat, high memory footprint, and sluggish scroll performance.",
      approach: "Leveraged hardware-accelerated HTML5 Canvas, lightweight custom math routines for spring physics, and CSS variables for real-time theme coordinate tracing.",
      whatLearned: "Advanced canvas drawing pipelines, lerp interpolation algorithms, event debouncing, and web accessibility standards.",
      technologies: ["HTML5", "Vanilla CSS", "JavaScript", "HTML5 Canvas API", "Motion Physics"],
      role: "Frontend Designer & Engineer",
      status: "DEPLOYED",
      githubUrl: "https://github.com/AnonymousDhruvG988",
      terminalCommand: "npx serve ./public --port 8080",
      metrics: [
        { label: "FPS TARGET", value: "60 FPS LOCKED" },
        { label: "DEPENDENCY", value: "0 EXTERNAL" },
        { label: "RENDER ENGINE", value: "HTML5 CANVAS" },
      ],
    },
  ],
  skills: [
    {
      name: "Python",
      category: "KNOWN",
      type: "LANGUAGE",
      focus: "Automation, Network Sockets, Security Scripting, Data Parsing",
      whyLearning: "Primary language for developing tools, protocol probes, and automated lab testing systems.",
    },
    {
      name: "HTML5",
      category: "KNOWN",
      type: "WEB",
      focus: "Semantic Architecture, Accessible DOM, Canvas API, Engineering Layouts",
      whyLearning: "Foundational structure for crafting performant, custom-engineered web experiences.",
    },
    {
      name: "SQL",
      category: "KNOWN",
      type: "DATA",
      focus: "Relational Modeling, Query Optimization, Joins, Indexing, Data Integrity",
      whyLearning: "Essential for architecting durable backend storage, query analysis, and understanding data flow.",
    },
    {
      name: "Kali Linux",
      category: "KNOWN",
      type: "SECURITY",
      focus: "OS Environment, Terminal Scripting, Network Interfaces, Toolchain Orchestration",
      whyLearning: "The ultimate operating environment for offensive security research and protocol inspection.",
    },
    {
      name: "Airmon-ng & Aircrack-ng",
      category: "KNOWN",
      type: "SECURITY",
      focus: "802.11 Monitor Mode, Packet Capture, EAPOL 4-Way Handshake Auditing",
      whyLearning: "Hands-on understanding of wireless frame structure, radio frequency telemetry, and PSK security.",
    },
    {
      name: "Hashcat",
      category: "KNOWN",
      type: "SECURITY",
      focus: "GPU-Accelerated Cryptanalysis, PBKDF2/SHA256, Dictionary & Rule Mutations",
      whyLearning: "Analyzing credential entropy and understanding modern cryptographic hashing standards.",
    },
    {
      name: "John the Ripper",
      category: "KNOWN",
      type: "SECURITY",
      focus: "Password Auditing, Unix Shadow Files, Incremental Attack Logic",
      whyLearning: "Studying salt stretching, Unix authentication frameworks, and hash cracking algorithms.",
    },
    {
      name: "JavaScript / TypeScript",
      category: "LEARNING",
      type: "LANGUAGE",
      focus: "Asynchronous Logic, DOM Manipulation, Canvas Animations, React Component Systems",
      whyLearning: "Expanding frontend engineering capabilities into reactive, modern dynamic web applications.",
    },
    {
      name: "React & Modern Web",
      category: "LEARNING",
      type: "WEB",
      focus: "Component Lifecycle, State Management, Custom Hooks, Reactive UI",
      whyLearning: "Building scalable, interactive user interfaces with structured component architectures.",
    },
    {
      name: "Git & GitHub",
      category: "LEARNING",
      type: "TOOL",
      focus: "Branching, Version Control, Commit Hygeine, Open Source Collaboration",
      whyLearning: "Managing codebase history, tracking iterative changes, and publishing projects to GitHub.",
    },
    {
      name: "REST APIs & Sockets",
      category: "LEARNING",
      type: "WEB",
      focus: "HTTP/HTTPS Methods, JSON Payloads, WebSocket Connections, Raw Sockets",
      whyLearning: "Connecting backend data pipelines to interactive client interfaces.",
    },
    {
      name: "System Hardening & Cryptography",
      category: "EXPLORING",
      type: "SECURITY",
      focus: "Public Key Cryptography, Symmetric Ciphers, Defensive Firewall Policies, iptables",
      whyLearning: "Transitioning offensive security insights into rock-solid defensive infrastructure.",
    },
  ],
};
