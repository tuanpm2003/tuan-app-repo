import { Question, Document } from "@/types/quiz-battle";

export const availableDocuments: Document[] = [
  {
    id: "doc-aws-vpc",
    title: "AWS VPC and Networking",
    topic: "AWS Networking",
    questionCount: 10,
  },
  {
    id: "doc-aws-ai",
    title: "AWS AI Services (Bedrock, Textract)",
    topic: "AWS AI/ML",
    questionCount: 8,
  },
  {
    id: "doc-cloud-basics",
    title: "Cloud Computing Fundamentals",
    topic: "Cloud Basics",
    questionCount: 6,
  },
];

export const mockQuestions: Question[] = [
  {
    id: "q1",
    difficulty: "easy",
    documentId: "doc-aws-vpc",
    topic: "AWS Networking",
    question: "What is the main purpose of Amazon S3?",
    options: [
      "To store objects such as files and media",
      "To run virtual machines",
      "To manage relational databases",
      "To distribute DNS traffic",
    ],
    correctAnswer: "To store objects such as files and media",
    explanation:
      "Amazon S3 is an object storage service used to store and retrieve files, images, backups, and static website assets.",
    citation: {
      slide: 5,
      text: "Amazon S3 provides scalable object storage for files, media, and static assets.",
    },
  },
  {
    id: "q2",
    difficulty: "medium",
    documentId: "doc-aws-vpc",
    topic: "AWS Networking",
    question: "What does a NAT Gateway enable in AWS VPC?",
    options: [
      "Direct inbound internet access to private subnets",
      "Outbound internet access for private subnet instances",
      "Connection between two VPCs",
      "DNS resolution for EC2 instances",
    ],
    correctAnswer: "Outbound internet access for private subnet instances",
    explanation:
      "A NAT Gateway allows instances in private subnets to connect to the internet or other AWS services while preventing the internet from initiating connections with those instances.",
    citation: {
      slide: 8,
      text: "NAT Gateway enables private subnet outbound traffic while blocking inbound connections.",
    },
  },
  {
    id: "q3",
    difficulty: "hard",
    documentId: "doc-aws-vpc",
    topic: "AWS Networking",
    question: "What is the maximum number of rules per security group in AWS?",
    options: ["50 rules", "60 rules", "100 rules", "120 rules"],
    correctAnswer: "60 rules",
    explanation:
      "AWS allows up to 60 inbound and 60 outbound rules per security group by default. This is a soft limit that can be increased via support request.",
    citation: {
      slide: 22,
      text: "Security Groups support up to 60 inbound and 60 outbound rules per group.",
    },
  },
  {
    id: "q4",
    difficulty: "easy",
    documentId: "doc-aws-ai",
    topic: "AWS AI/ML",
    question: "What is Amazon Bedrock?",
    options: [
      "A managed service for foundation models",
      "A database service",
      "A container orchestration service",
      "A CDN service",
    ],
    correctAnswer: "A managed service for foundation models",
    explanation:
      "Amazon Bedrock is a fully managed service that provides access to foundation models from leading AI companies through a single API.",
    citation: {
      slide: 12,
      text: "Amazon Bedrock provides access to Claude, Titan, and other foundation models.",
    },
  },
  {
    id: "q5",
    difficulty: "medium",
    documentId: "doc-aws-ai",
    topic: "AWS AI/ML",
    question: "Which AWS service is best for extracting text from scanned documents?",
    options: [
      "Amazon Rekognition",
      "Amazon Textract",
      "Amazon Comprehend",
      "Amazon Translate",
    ],
    correctAnswer: "Amazon Textract",
    explanation:
      "Amazon Textract is a machine learning service that automatically extracts text, handwriting, and data from scanned documents.",
    citation: {
      slide: 18,
      text: "Amazon Textract uses ML to extract text and structured data from documents.",
    },
  },
  {
    id: "q6",
    difficulty: "hard",
    documentId: "doc-aws-vpc",
    topic: "AWS Networking",
    question: "What is the difference between Security Groups and Network ACLs?",
    options: [
      "Security Groups are stateful, NACLs are stateless",
      "Security Groups are stateless, NACLs are stateful",
      "Both are stateful",
      "Both are stateless",
    ],
    correctAnswer: "Security Groups are stateful, NACLs are stateless",
    explanation:
      "Security Groups are stateful (return traffic is automatically allowed), while Network ACLs are stateless (return traffic must be explicitly allowed).",
    citation: {
      slide: 24,
      text: "Security Groups: stateful, instance-level. NACLs: stateless, subnet-level.",
    },
  },
  {
    id: "q7",
    difficulty: "easy",
    documentId: "doc-cloud-basics",
    topic: "Cloud Basics",
    question: "What is the purpose of an Internet Gateway in VPC?",
    options: [
      "To allow communication between VPC and the internet",
      "To connect two VPCs together",
      "To provide DNS resolution",
      "To enable VPN connections",
    ],
    correctAnswer: "To allow communication between VPC and the internet",
    explanation:
      "An Internet Gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet.",
    citation: {
      slide: 6,
      text: "Internet Gateway enables bidirectional internet connectivity for VPC resources.",
    },
  },
  {
    id: "q8",
    difficulty: "medium",
    documentId: "doc-aws-ai",
    topic: "AWS AI/ML",
    question: "What is Amazon Titan Embeddings used for?",
    options: [
      "Converting text to vector representations",
      "Generating images from text",
      "Translating languages",
      "Analyzing sentiment",
    ],
    correctAnswer: "Converting text to vector representations",
    explanation:
      "Amazon Titan Embeddings converts text into numerical vector representations that can be used for semantic search, recommendations, and RAG applications.",
    citation: {
      slide: 15,
      text: "Titan Embeddings generates high-quality vector representations for semantic search.",
    },
  },
  {
    id: "q9",
    difficulty: "hard",
    documentId: "doc-aws-ai",
    topic: "AWS AI/ML",
    question: "In a RAG system, what does 'chunking' refer to?",
    options: [
      "Breaking documents into smaller segments for embedding",
      "Compressing data for storage",
      "Encrypting sensitive information",
      "Validating document formats",
    ],
    correctAnswer: "Breaking documents into smaller segments for embedding",
    explanation:
      "Chunking is the process of dividing large documents into smaller, semantically meaningful segments that can be embedded and retrieved efficiently in RAG systems.",
    citation: {
      slide: 28,
      text: "Chunking strategy impacts retrieval quality: semantic chunking by slide or paragraph.",
    },
  },
  {
    id: "q10",
    difficulty: "medium",
    documentId: "doc-cloud-basics",
    topic: "Cloud Basics",
    question: "What is the primary benefit of VPC Peering?",
    options: [
      "Direct network connection between two VPCs",
      "Load balancing across regions",
      "Automatic failover",
      "Cost reduction for data transfer",
    ],
    correctAnswer: "Direct network connection between two VPCs",
    explanation:
      "VPC Peering creates a direct network route between two VPCs, allowing resources to communicate using private IP addresses as if they were in the same network.",
    citation: {
      slide: 16,
      text: "VPC Peering enables private connectivity between VPCs without internet gateway.",
    },
  },
  {
    id: "q11",
    difficulty: "easy",
    documentId: "doc-cloud-basics",
    topic: "Cloud Basics",
    question: "What does IaaS stand for?",
    options: [
      "Infrastructure as a Service",
      "Internet as a Service",
      "Integration as a Service",
      "Intelligence as a Service",
    ],
    correctAnswer: "Infrastructure as a Service",
    explanation:
      "IaaS (Infrastructure as a Service) provides virtualized computing resources over the internet, including servers, storage, and networking.",
    citation: {
      slide: 3,
      text: "IaaS provides fundamental computing infrastructure on-demand.",
    },
  },
  {
    id: "q12",
    difficulty: "medium",
    documentId: "doc-cloud-basics",
    topic: "Cloud Basics",
    question: "Which cloud deployment model is used when resources are shared among multiple organizations?",
    options: [
      "Public Cloud",
      "Private Cloud",
      "Hybrid Cloud",
      "Community Cloud",
    ],
    correctAnswer: "Community Cloud",
    explanation:
      "Community Cloud is shared by several organizations with common concerns (security, compliance, jurisdiction), managed internally or by a third party.",
    citation: {
      slide: 8,
      text: "Community Cloud serves multiple organizations with shared requirements.",
    },
  },
];
