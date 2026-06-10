import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { documents, processingLogs, retrievalEvaluations } from "@/lib/mock-data";
import { CheckCircle2, XCircle, Loader2, Server, Database, Cloud } from "lucide-react";

export default function ManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Management</h1>
        <p className="text-muted-foreground">System monitoring and evaluation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Document Name</th>
                  <th className="text-left p-2 font-medium">User</th>
                  <th className="text-left p-2 font-medium">Status</th>
                  <th className="text-left p-2 font-medium">Pages</th>
                  <th className="text-left p-2 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b">
                    <td className="p-2">{doc.title}</td>
                    <td className="p-2 text-sm text-muted-foreground">{doc.uploadedBy}</td>
                    <td className="p-2">
                      <Badge
                        variant={doc.status === "Ready" ? "default" : "secondary"}
                        className={doc.status === "Ready" ? "bg-green-500" : ""}
                      >
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="p-2">{doc.pages || doc.slides}</td>
                    <td className="p-2 text-sm text-muted-foreground">{doc.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processing Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {processingLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {log.status === "Success" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  {log.status === "Failed" && <XCircle className="h-5 w-5 text-red-600" />}
                  {log.status === "Processing" && <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{log.step}</div>
                    <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{log.details}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Chunking Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Strategy:</span>
                <span className="text-sm text-muted-foreground">Semantic by slide</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Chunk Size:</span>
                <span className="text-sm text-muted-foreground">500 tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Overlap:</span>
                <span className="text-sm text-muted-foreground">100 tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Fallback OCR:</span>
                <span className="text-sm text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Text Density Threshold:</span>
                <span className="text-sm text-muted-foreground">100 chars/page</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Failure Mode Handling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Broken Query Example:</div>
                <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  "What is the cost of data transfer?"
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Root Cause:</div>
                <div className="text-sm text-muted-foreground">
                  Cost information scattered across multiple slides without clear semantic grouping
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Mitigation:</div>
                <div className="text-sm text-muted-foreground">
                  Implement hybrid search combining semantic + keyword matching for pricing queries
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Retrieval Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Probe Question</th>
                  <th className="text-left p-2 font-medium">Expected</th>
                  <th className="text-left p-2 font-medium">Retrieved</th>
                  <th className="text-left p-2 font-medium">Score</th>
                  <th className="text-left p-2 font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                {retrievalEvaluations.map((evaluation) => (
                  <tr key={evaluation.id} className="border-b">
                    <td className="p-2 text-sm">{evaluation.probeQuestion}</td>
                    <td className="p-2 text-sm">Slide {evaluation.expectedSlide}</td>
                    <td className="p-2 text-sm">Slide {evaluation.retrievedSlide}</td>
                    <td className="p-2 text-sm">{evaluation.score}%</td>
                    <td className="p-2">
                      <Badge variant={evaluation.result === "Pass" ? "default" : "destructive"}>
                        {evaluation.result}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            AWS Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <Server className="h-4 w-4 text-primary" />
                  Frontend
                </div>
                <div className="text-sm text-muted-foreground pl-6">
                  • S3 + CloudFront<br />
                  • AWS Amplify
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <Server className="h-4 w-4 text-primary" />
                  Backend API
                </div>
                <div className="text-sm text-muted-foreground pl-6">
                  • API Gateway<br />
                  • Lambda Functions
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <Database className="h-4 w-4 text-primary" />
                  Storage
                </div>
                <div className="text-sm text-muted-foreground pl-6">
                  • S3 (Documents)<br />
                  • DynamoDB (Metadata)<br />
                  • OpenSearch (Vectors)
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <Cloud className="h-4 w-4 text-primary" />
                  AI Services
                </div>
                <div className="text-sm text-muted-foreground pl-6">
                  • Amazon Bedrock (Claude)<br />
                  • Titan Embeddings<br />
                  • Textract (OCR)
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="font-medium mb-2">Document Processing Pipeline:</div>
              <div className="text-sm text-muted-foreground">
                Lambda / ECS Fargate → pypdf extraction → Textract fallback → Titan embeddings → OpenSearch indexing
              </div>
            </div>
            <div className="pt-2">
              <div className="font-medium mb-2">Monitoring:</div>
              <div className="text-sm text-muted-foreground">
                CloudWatch Logs, Metrics, and Alarms for system health and performance tracking
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
