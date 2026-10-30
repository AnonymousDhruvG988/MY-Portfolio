/**
 * DEVELOPER PROFILE DATA — CENTRAL CONFIGURATION
 * Clean, truthful, modern, and easily editable.
 */

export const DEVELOPER_DATA = {
  profile: {
    name: "Dhruv",
    initials: "DG",
    role: "Full-Stack Developer & B.Tech Student",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "B.Tech Engineering",
    location: "India",
    heroHeadline: "CRAFTING SYSTEMS.",
    heroHighlight: "BUILDING WHAT I IMAGINE.",
    heroSubtitle: "B.Tech Student with a passion for software architecture, Python, SQL, and hands-on cybersecurity lab exploration.",
    bio: "I love understanding how systems work under the hood — from web protocols and database query plans to socket programming and security testing. I turn technical curiosity into clean, functional software.",
    shortPhilosophy: "Understand the fundamentals. Build with intention. Iterate relentlessly.",
    statusBadge: "Available for Internships & Projects"
  },

  socials: {
    email: "dhruv.dev.build@gmail.com",
    github: "https://github.com/dhruv-builds",
    githubUser: "dhruv-builds",
    linkedin: "https://linkedin.com/in/dhruv-dev",
    linkedinUser: "dhruv-dev"
  },

  skills: {
    categories: [
      {
        id: "core",
        title: "Core Technologies",
        badge: "Known",
        items: [
          {
            name: "Python",
            icon: "python",
            level: "Proficient",
            description: "Scripting, algorithm design, data parsing, network sockets, and automation pipelines."
          },
          {
            name: "HTML5 & Modern CSS",
            icon: "html",
            level: "Proficient",
            description: "Semantic document structure, responsive layouts, CSS variables, and modern web standards."
          },
          {
            name: "SQL & Relational DBs",
            icon: "sql",
            level: "Proficient",
            description: "Schema design, normalization, multi-table JOINs, indexing, and complex analytical queries."
          }
        ]
      },
      {
        id: "learning",
        title: "Active Learning & Expanding",
        badge: "In Progress",
        items: [
          {
            name: "JavaScript (ES6+)",
            icon: "js",
            level: "Learning",
            description: "Asynchronous JavaScript (Promises, async/await), DOM events, and modern API integration."
          },
          {
            name: "React.js",
            icon: "react",
            level: "Learning",
            description: "Modular component architecture, state hooks, and dynamic client-side applications."
          },
          {
            name: "Git & GitHub",
            icon: "git",
            level: "Working With",
            description: "Version control, feature branching, merge workflows, and collaborative repo hygiene."
          },
          {
            name: "Data Structures & Algorithms",
            icon: "dsa",
            level: "Learning",
            description: "Problem solving, arrays, trees, search algorithms, and space/time complexity analysis."
          }
        ]
      }
    ],

    cybersecurity: {
      positioning: "Cybersecurity Exploration & Security Lab",
      disclaimer: "All cybersecurity tools and exercises shown in Chapter 02 operate on isolated sandbox environments with synthetic data.",
      tools: [
        {
          name: "Kali Linux",
          role: "Security Lab Environment",
          usage: "Testing open-source security utilities, system configurations, and Linux terminal scripting.",
          badge: "Lab Environment"
        },
        {
          name: "Wireshark",
          role: "Network Packet & Protocol Analysis",
          usage: "Inspecting TCP/UDP handshakes, DNS payloads, and dissecting protocol packet headers.",
          badge: "Packet Analysis"
        },
        {
          name: "airmon-ng",
          role: "Wireless Lab Monitoring",
          usage: "Studying 802.11 beacon frames, frequency channels, and monitor mode in controlled lab setups.",
          badge: "Wireless Lab"
        }
      ]
    }
  },

  strengths: [
    {
      id: "rapid-learning",
      title: "Rapid Learning",
      quote: "Unfamiliar tools are not roadblocks — they are invitations to investigate.",
      elaboration: "Able to pick up new frameworks, CLI tools, and paradigms by diving straight into documentation and building test harnesses.",
      tag: "AGILITY"
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      quote: "Deconstruct the complex until it consists of small, solvable components.",
      elaboration: "Approaching bugs not as random failures, but as deterministic discrepancies between mental model and execution.",
      tag: "SYSTEMATIC"
    },
    {
      id: "curiosity",
      title: "Curiosity by Default",
      quote: "Knowing that something works isn't enough; I want to know why it works.",
      elaboration: "Whether looking at a network packet, an SQL execution plan, or a compiler message, curiosity drives deep comprehension.",
      tag: "INQUIRY"
    },
    {
      id: "adaptability",
      title: "Adaptability",
      quote: "Comfortable entering unfamiliar technical territory with zero hand-holding.",
      elaboration: "Thrives in shifting environments, willing to pivot tools when the problem demands a different approach.",
      tag: "FLEXIBILITY"
    },
    {
      id: "persistence",
      title: "Persistence",
      quote: "Staying with the problem through difficult edge cases and subtle bugs.",
      elaboration: "Patient debugging through stack traces, network captures, and compiler logs until the root cause is resolved.",
      tag: "RESILIENCE"
    },
    {
      id: "building-mindset",
      title: "Building Mindset",
      quote: "Theory is solidified only when it gets written into running code.",
      elaboration: "A bias toward experimentation and hands-on implementation over passive consumption of tutorials.",
      tag: "EXECUTION"
    }
  ],

  projects: [
    {
      id: "case-01",
      code: "01",
      title: "NetTrace Protocol Inspector",
      subtitle: "Python Network Socket & Packet Header Dissector",
      category: "Network Engineering & Security Lab",
      tech: ["Python", "Socket API", "CLI", "Wireshark Verified"],
      objective: "Understand OSI Layer 3/4 packet headers by parsing raw network packets in an isolated sandbox lab.",
      buildOverview: "Developed a Python utility that binds to raw sockets in a Linux VM to decode IPv4 headers, extract source/destination IPs, calculate checksum verifications, and classify TCP flags (SYN, ACK, FIN, RST). Verified accuracy by comparing dissected fields against Wireshark captures.",
      lessons: "Gained hands-on comprehension of network byte order (endianness), bitwise flag masking, and RFC protocol specifications.",
      status: "Lab Complete",
      accent: "cyan",
      demoType: "terminal-preview"
    },
    {
      id: "case-02",
      code: "02",
      title: "Chronos Relational Query Engine",
      subtitle: "SQL Database Modeling & Query Optimization Sandbox",
      category: "Data Systems & Architecture",
      tech: ["SQL", "Relational Schema", "Python Connector", "Data Modeling"],
      objective: "Design an optimized multi-table relational schema simulating university course registration and grade auditing.",
      buildOverview: "Engineered 3NF relational schemas with strict foreign key integrity, compound indexing, and complex analytical queries involving window functions, multi-table joins, and transaction rollbacks for concurrent updates.",
      lessons: "Learned the impact of B-Tree indexing on query execution plans (EXPLAIN ANALYZE) and preventing deadlocks in concurrent state.",
      status: "Benchmark Active",
      accent: "indigo",
      demoType: "query-preview"
    },
    {
      id: "case-03",
      code: "03",
      title: "SecArch Hash & Integrity Sandbox",
      subtitle: "Cryptographic Digest & Hash Verification Utility",
      category: "Security Exploration & Cryptography",
      tech: ["Python", "Hashlib", "HMAC", "File I/O"],
      objective: "Demonstrate cryptographic file integrity verification, entropy calculation, and tamper detection in a laboratory setting.",
      buildOverview: "Built a Python-driven integrity checker that computes SHA-256 and HMAC-SHA256 digests over streamed binary blocks. Generates visual hash comparison diffs and Shannon entropy scores to identify packed or encrypted file segments without executing them.",
      lessons: "Deepened understanding of preimage resistance, avalanche effect in hash algorithms, and safe cryptographic primitives.",
      status: "Lab Verified",
      accent: "emerald",
      demoType: "hash-preview"
    },
    {
      id: "case-04",
      code: "04",
      title: "PyCore Telemetry & Diagnostics",
      subtitle: "Lightweight System Metrics & Process Log Analyzer",
      category: "Systems & Scripting",
      tech: ["Python", "Linux /proc", "Bash Scripting", "HTML Reporting"],
      objective: "Create a modular telemetry collector that gathers CPU, memory, and process socket health directly from Linux pseudo-filesystems.",
      buildOverview: "Constructed zero-dependency Python scripts that parse /proc/stat, /proc/meminfo, and /proc/net/tcp, rendering structured terminal dashboards and exporting periodic HTML report summaries.",
      lessons: "Understood Linux kernel abstraction layers, process states, and non-blocking metric polling strategies.",
      status: "System Prototype",
      accent: "violet",
      demoType: "sys-preview"
    }
  ],

  howIThink: {
    steps: [
      {
        num: "01",
        label: "Think",
        shortDesc: "Understand the core problem statement before touching code.",
        detail: "Formulate the goal in clear plain English. What are the constraints, inputs, outputs, and edge cases?"
      },
      {
        num: "02",
        label: "Break It Down",
        shortDesc: "Decompose the system into isolated, testable modules.",
        detail: "Divide challenges into small discrete functions: parsing, processing, state management, and output."
      },
      {
        num: "03",
        label: "Build",
        shortDesc: "Implement the simplest working prototype that validates the idea.",
        detail: "Focus on clean logic and functional correctness first. Keep abstractions light and purposeful."
      },
      {
        num: "04",
        label: "Test",
        shortDesc: "Examine execution with boundary cases and stressed limits.",
        detail: "Check what happens when inputs are null, buffers overflow, or connections drop."
      },
      {
        num: "05",
        label: "Fail",
        shortDesc: "Treat errors and stack traces as diagnostic telemetry.",
        detail: "Errors reveal misconceptions in our assumptions. Every traceback narrows down the exact anomaly."
      },
      {
        num: "06",
        label: "Learn",
        shortDesc: "Research the underlying mechanics behind why the failure occurred.",
        detail: "Read RFCs, official language specifications, and source documentation rather than copying random forum snippets."
      },
      {
        num: "07",
        label: "Iterate",
        shortDesc: "Refactor with clarity, performance, and robustness in mind.",
        detail: "Clean up the code, document edge cases, and integrate what was discovered into future architecture."
      }
    ],

    codeSnippet: `# Demonstration: Protocol dissection in pure Python
import struct
import socket

def dissect_ipv4_header(raw_packet: bytes) -> dict:
    """
    Deconstructs raw IPv4 header bytes into human-readable telemetry.
    Pure RFC 791 specification parsing.
    """
    if len(raw_packet) < 20:
        raise ValueError("Packet payload insufficient for IPv4 header")

    # Unpack first 20 bytes according to standard format
    # ! = network endianness, B = 1 byte, H = 2 bytes, 4s = 4-byte IP
    header_fields = struct.unpack('!BBHHHBBH4s4s', raw_packet[:20])
    
    version_ihl = header_fields[0]
    version = version_ihl >> 4
    ihl = (version_ihl & 0x0F) * 4 # Header length in bytes
    
    ttl = header_fields[5]
    protocol_num = header_fields[6]
    src_ip = socket.inet_ntoa(header_fields[8])
    dst_ip = socket.inet_ntoa(header_fields[9])
    
    return {
        "version": version,
        "ihl_bytes": ihl,
        "ttl": ttl,
        "protocol": "TCP" if protocol_num == 6 else "UDP" if protocol_num == 17 else f"OTHER({protocol_num})",
        "source": src_ip,
        "destination": dst_ip
    }`
  },

  chapters: [
    { id: "scene-00", index: "00", name: "Intro", title: "Initialization" },
    { id: "scene-01", index: "01", name: "Builder", title: "The Builder" },
    { id: "scene-02", index: "02", name: "Cyber Lab", title: "The Cyber Side" },
    { id: "scene-03", index: "03", name: "Skills", title: "The Learner" },
    { id: "scene-04", index: "04", name: "Strengths", title: "Mindset & Approach" },
    { id: "scene-05", index: "05", name: "Projects", title: "Selected Work" },
    { id: "scene-06", index: "06", name: "Engineering", title: "How I Think" },
    { id: "scene-07", index: "07", name: "Connect", title: "Digital Channels" },
    { id: "scene-08", index: "08", name: "Contact", title: "Start a Conversation" },
    { id: "scene-09", index: "09", name: "Ending", title: "Still Building" }
  ]
};
