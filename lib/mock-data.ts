import {
  Document,
  StudyActivity,
  WeakTopic,
  QuizQuestion,
  Flashcard,
  RetrievalEvaluation,
  ProcessingLog,
  TopicMastery,
} from "@/types";

export const documents: Document[] = [
  {
    id: "doc-1",
    title: "AWS VPC and Networking Fundamentals",
    slides: 45,
    status: "Ready",
    lastStudied: "2 hours ago",
    uploadedBy: "john@example.com",
    createdAt: "2026-05-20",
    pages: 45,
  },
  {
    id: "doc-2",
    title: "Machine Learning with Amazon SageMaker",
    slides: 62,
    status: "Ready",
    lastStudied: "1 day ago",
    uploadedBy: "john@example.com",
    createdAt: "2026-05-18",
    pages: 62,
  },
  {
    id: "doc-3",
    title: "Serverless Architecture Patterns",
    slides: 38,
    status: "Chunking",
    uploadedBy: "john@example.com",
    createdAt: "2026-05-27",
    pages: 38,
  },
  {
    id: "doc-4",
    title: "Database Design and Optimization",
    slides: 55,
    status: "Ready",
    lastStudied: "3 days ago",
    uploadedBy: "john@example.com",
    createdAt: "2026-05-15",
    pages: 55,
  },
];

export const studyActivity: StudyActivity[] = [
  { date: "Mon", minutes: 45, quizzes: 2 },
  { date: "Tue", minutes: 60, quizzes: 3 },
  { date: "Wed", minutes: 30, quizzes: 1 },
  { date: "Thu", minutes: 75, quizzes: 4 },
  { date: "Fri", minutes: 50, quizzes: 2 },
  { date: "Sat", minutes: 90, quizzes: 5 },
  { date: "Sun", minutes: 40, quizzes: 1 },
];

export const weakTopics: WeakTopic[] = [
  { topic: "NAT Gateway Configuration", score: 45, attempts: 8 },
  { topic: "VPC Peering vs Transit Gateway", score: 52, attempts: 6 },
  { topic: "Security Group Rules", score: 58, attempts: 10 },
  { topic: "Route Table Priority", score: 61, attempts: 7 },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the primary purpose of a NAT Gateway in AWS VPC?",
    options: [
      "To allow inbound traffic from the internet",
      "To enable outbound internet access for private subnets",
      "To connect two VPCs together",
      "To provide DNS resolution",
    ],
    correctAnswer: 1,
    explanation:
      "A NAT Gateway allows instances in private subnets to connect to the internet or other AWS services, but prevents the internet from initiating connections with those instances.",
    citationSlide: 8,
    citationText: "Private subnet outbound traffic",
  },
  {
    id: "q2",
    question: "Which component is required for VPC peering?",
    options: [
      "Internet Gateway",
      "NAT Gateway",
      "Peering Connection",
      "Virtual Private Gateway",
    ],
    correctAnswer: 2,
    explanation:
      "VPC peering requires a Peering Connection to be established between two VPCs.",
    citationSlide: 15,
    citationText: "VPC Peering architecture",
  },
  {
    id: "q3",
    question: "What is the maximum number of rules per security group?",
    options: ["50", "60", "100", "120"],
    correctAnswer: 1,
    explanation:
      "AWS allows up to 60 inbound and 60 outbound rules per security group by default.",
    citationSlide: 22,
    citationText: "Security Group limits",
  },
];

export const flashcards: Flashcard[] = [
  {
    id: "fc1",
    documentId: "doc-1",
    documentTitle: "AWS VPC and Networking Fundamentals",
    topic: "VPC Basics",
    question: "What is a VPC?",
    answer:
      "A Virtual Private Cloud (VPC) is a logically isolated section of the AWS cloud where you can launch AWS resources in a virtual network that you define.",
  },
  {
    id: "fc2",
    documentId: "doc-1",
    documentTitle: "AWS VPC and Networking Fundamentals",
    topic: "Subnets",
    question: "What is the difference between public and private subnets?",
    answer:
      "Public subnets have a route to an Internet Gateway, allowing direct internet access. Private subnets do not have direct internet access and typically use NAT Gateway for outbound connections.",
  },
  {
    id: "fc3",
    documentId: "doc-1",
    documentTitle: "AWS VPC and Networking Fundamentals",
    topic: "Security",
    question: "What is a Security Group?",
    answer:
      "A Security Group acts as a virtual firewall for your instances to control inbound and outbound traffic. It operates at the instance level and supports allow rules only.",
  },
  {
    id: "fc4",
    documentId: "doc-2",
    documentTitle: "Machine Learning with Amazon SageMaker",
    topic: "SageMaker",
    question: "What is Amazon SageMaker?",
    answer:
      "Amazon SageMaker is a fully managed service that provides tools to build, train, and deploy machine learning models at scale.",
  },
];

export const retrievalEvaluations: RetrievalEvaluation[] = [
  {
    id: "eval1",
    probeQuestion: "How does NAT Gateway enable internet access?",
    expectedSlide: 8,
    retrievedSlide: 8,
    score: 100,
    result: "Pass",
  },
  {
    id: "eval2",
    probeQuestion: "What are the VPC peering limitations?",
    expectedSlide: 16,
    retrievedSlide: 16,
    score: 100,
    result: "Pass",
  },
  {
    id: "eval3",
    probeQuestion: "How to configure security group rules?",
    expectedSlide: 22,
    retrievedSlide: 21,
    score: 85,
    result: "Pass",
  },
  {
    id: "eval4",
    probeQuestion: "What is the cost of data transfer?",
    expectedSlide: 35,
    retrievedSlide: 12,
    score: 30,
    result: "Fail",
  },
];

export const processingLogs: ProcessingLog[] = [
  {
    id: "log1",
    timestamp: "2026-05-27 10:23:15",
    step: "PDF Upload",
    status: "Success",
    details: "File uploaded to S3: s3://study-buddy/uploads/doc-3.pdf",
  },
  {
    id: "log2",
    timestamp: "2026-05-27 10:23:18",
    step: "Text Extraction",
    status: "Success",
    details: "Extracted 38 slides using pypdf",
  },
  {
    id: "log3",
    timestamp: "2026-05-27 10:23:22",
    step: "Table Detection",
    status: "Processing",
    details: "Low text density detected on slide 12, triggering Textract fallback",
  },
  {
    id: "log4",
    timestamp: "2026-05-27 10:23:28",
    step: "Embedding Generation",
    status: "Processing",
    details: "Generating embeddings using Amazon Titan Embeddings",
  },
  {
    id: "log5",
    timestamp: "2026-05-27 10:23:35",
    step: "Vector Indexing",
    status: "Processing",
    details: "Indexing to OpenSearch vector store",
  },
];

export const topicMastery: TopicMastery[] = [
  { topic: "VPC Fundamentals", mastery: 85, studyTime: 120 },
  { topic: "Subnets and Routing", mastery: 78, studyTime: 95 },
  { topic: "Security Groups", mastery: 72, studyTime: 80 },
  { topic: "NAT Gateway", mastery: 55, studyTime: 60 },
  { topic: "VPC Peering", mastery: 62, studyTime: 70 },
  { topic: "Internet Gateway", mastery: 90, studyTime: 45 },
];
