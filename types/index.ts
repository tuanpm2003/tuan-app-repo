export type DocumentStatus = 
  | "Uploading" 
  | "Extracting" 
  | "Chunking" 
  | "Ready" 
  | "Failed";

export interface Document {
  id: string;
  title: string;
  slides: number;
  status: DocumentStatus;
  lastStudied?: string;
  uploadedBy?: string;
  createdAt: string;
  pages?: number;
}

export interface StudyActivity {
  date: string;
  minutes: number;
  quizzes: number;
}

export interface WeakTopic {
  topic: string;
  score: number;
  attempts: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  citationSlide: number;
  citationText: string;
}

export interface Flashcard {
  id: string;
  documentId: string;
  documentTitle: string;
  topic: string;
  question: string;
  answer: string;
}

export interface RetrievalEvaluation {
  id: string;
  probeQuestion: string;
  expectedSlide: number;
  retrievedSlide: number;
  score: number;
  result: "Pass" | "Fail";
}

export interface ProcessingLog {
  id: string;
  timestamp: string;
  step: string;
  status: "Success" | "Failed" | "Processing";
  details: string;
}

export interface TopicMastery {
  topic: string;
  mastery: number;
  studyTime: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{
    slide: number;
    text: string;
  }>;
}
