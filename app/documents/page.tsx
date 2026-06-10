"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentCard } from "@/components/document-card";
import { documents as initialDocuments } from "@/lib/mock-data";
import { Upload, Search } from "lucide-react";
import { Document } from "@/types";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpload = () => {
    const newDoc: Document = {
      id: `doc-${documents.length + 1}`,
      title: "New Document.pdf",
      slides: 0,
      status: "Uploading",
      uploadedBy: "john@example.com",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setDocuments([newDoc, ...documents]);

    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === newDoc.id ? { ...doc, status: "Extracting" as const } : doc
        )
      );
    }, 2000);

    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === newDoc.id ? { ...doc, status: "Chunking" as const, slides: 42 } : doc
        )
      );
    }, 4000);

    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === newDoc.id ? { ...doc, status: "Ready" as const } : doc
        )
      );
    }, 6000);
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Manage your study materials</p>
        </div>
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Upload PDF
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  );
}
