import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Document } from "@/types";
import { FileText, Eye, BookOpen, ClipboardCheck, Trash2 } from "lucide-react";
import Link from "next/link";

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{document.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {document.slides} slides
              </p>
            </div>
          </div>
          <StatusBadge status={document.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          {document.lastStudied ? `Last studied: ${document.lastStudied}` : "Not studied yet"}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/summary/${document.id}`}>
            <Eye className="mr-1 h-4 w-4" />
            Summary
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild disabled={document.status !== "Ready"}>
          <Link href={`/study/${document.id}`}>
            <BookOpen className="mr-1 h-4 w-4" />
            Study
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild disabled={document.status !== "Ready"}>
          <Link href={`/quiz/${document.id}`}>
            <ClipboardCheck className="mr-1 h-4 w-4" />
            Quiz
          </Link>
        </Button>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  );
}
