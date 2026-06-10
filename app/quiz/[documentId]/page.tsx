import { documents } from "@/lib/mock-data";
import QuizPageClient from "./quiz-page-client";

export function generateStaticParams() {
  return documents.map((document) => ({
    documentId: document.id,
  }));
}

export default function QuizPage({ params }: { params: { documentId: string } }) {
  return <QuizPageClient documentId={params.documentId} />;
}
