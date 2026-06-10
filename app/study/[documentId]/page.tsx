import { documents } from "@/lib/mock-data";
import StudyPageClient from "./study-page-client";

export function generateStaticParams() {
  return documents.map((document) => ({
    documentId: document.id,
  }));
}

export default function StudyPage({ params }: { params: { documentId: string } }) {
  return <StudyPageClient documentId={params.documentId} />;
}
