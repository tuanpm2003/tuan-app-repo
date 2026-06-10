import { Badge } from "@/components/ui/badge";
import { DocumentStatus } from "@/types";
import { Loader2 } from "lucide-react";

interface StatusBadgeProps {
  status: DocumentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<DocumentStatus, { variant: "default" | "secondary" | "destructive" | "outline"; className?: string }> = {
    Ready: { variant: "default", className: "bg-green-500 hover:bg-green-600" },
    Uploading: { variant: "secondary" },
    Extracting: { variant: "secondary" },
    Chunking: { variant: "secondary" },
    Failed: { variant: "destructive" },
  };

  const isProcessing = ["Uploading", "Extracting", "Chunking"].includes(status);

  return (
    <Badge variant={variants[status].variant} className={variants[status].className}>
      {isProcessing && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
      {status}
    </Badge>
  );
}
