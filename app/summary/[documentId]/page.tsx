import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { documents } from "@/lib/mock-data";
import { FileText, Lightbulb, Download } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return documents.map((document) => ({
    documentId: document.id,
  }));
}

export default function SummaryPage({ params }: { params: { documentId: string } }) {
  const document = documents.find((d) => d.id === params.documentId);

  if (!document) {
    return <div>Document not found</div>;
  }

  const summary = `This comprehensive guide covers AWS VPC (Virtual Private Cloud) and networking fundamentals. 

The document begins with an introduction to VPC concepts, explaining how VPCs provide isolated network environments within AWS. It covers the basic building blocks including subnets, route tables, and internet gateways.

Key sections include:
- VPC architecture and design patterns
- Public and private subnet configurations
- NAT Gateway setup for private subnet internet access
- Security Groups and Network ACLs for traffic control
- VPC Peering and Transit Gateway for multi-VPC connectivity
- Best practices for high availability and fault tolerance

The material emphasizes practical implementation with real-world examples and common use cases. Special attention is given to security considerations and cost optimization strategies.`;

  const testableConcepts = [
    "NAT Gateway enables outbound internet access for private subnets while blocking inbound connections",
    "Security Groups are stateful and operate at the instance level, while NACLs are stateless and operate at the subnet level",
    "VPC Peering creates a direct network connection between two VPCs, but is not transitive",
    "Route tables determine where network traffic is directed, with more specific routes taking precedence",
    "Internet Gateway must be attached to VPC and route table must have a route to it for public internet access",
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">{document.title}</h1>
        <p className="text-muted-foreground">Document summary and key concepts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            One-Page Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            {summary.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Top 5 Testable Concepts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testableConcepts.map((concept, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {idx + 1}
                </div>
                <p className="text-sm flex-1">{concept}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline">
          <Lightbulb className="mr-2 h-4 w-4" />
          Explain Simpler
        </Button>
        <Button variant="outline" asChild>
          <Link href="/flashcards">
            <FileText className="mr-2 h-4 w-4" />
            Generate Flashcards
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/quiz/${document.id}`}>
            Generate Quiz
          </Link>
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Markdown
        </Button>
      </div>
    </div>
  );
}
