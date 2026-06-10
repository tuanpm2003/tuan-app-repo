"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { documents } from "@/lib/mock-data";
import { ChatMessage } from "@/types";

export default function StudyPageClient({ documentId }: { documentId: string }) {
  const document = documents.find((d) => d.id === documentId);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI study assistant. Ask me anything about this document, and I'll provide answers with citations to specific slides.",
    },
  ]);

  const handleAsk = () => {
    if (!question.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: question };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: "assistant",
        content:
          "A NAT Gateway enables instances in private subnets to connect to the internet or other AWS services while preventing the internet from initiating connections with those instances. It provides network address translation and is highly available within an Availability Zone.",
        citations: [
          { slide: 8, text: "Private subnet outbound traffic" },
          { slide: 11, text: "NAT Gateway architecture" },
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setQuestion("");
  };

  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{document.title}</h1>
        <p className="text-muted-foreground">Interactive study session</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Slide {currentSlide} of {document.slides}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-primary mb-4">{currentSlide}</div>
                  <div className="text-lg font-semibold mb-2">
                    {currentSlide === 8 && "NAT Gateway Configuration"}
                    {currentSlide === 11 && "NAT Gateway Architecture"}
                    {currentSlide !== 8 && currentSlide !== 11 && "Slide Content"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentSlide === 8 && "Private subnet outbound traffic through NAT Gateway"}
                    {currentSlide === 11 && "High availability NAT Gateway setup"}
                    {currentSlide !== 8 && currentSlide !== 11 && "Mock slide content for demo"}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                  disabled={currentSlide === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentSlide(Math.min(document.slides, currentSlide + 1))}
                  disabled={currentSlide === document.slides}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Slide Thumbnails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: Math.min(12, document.slides) }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentSlide(num)}
                    className={`aspect-video rounded border-2 flex items-center justify-center text-xs font-semibold transition-colors ${
                      currentSlide === num
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="flex flex-col h-[600px]">
          <CardHeader>
            <Tabs defaultValue="ask">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="ask">Ask AI</TabsTrigger>
                <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="text-sm">{msg.content}</div>
                    {msg.citations && (
                      <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
                        <div className="text-xs font-semibold">Citations:</div>
                        {msg.citations.map((citation, cidx) => (
                          <button
                            key={cidx}
                            onClick={() => setCurrentSlide(citation.slide)}
                            className="block text-xs text-left hover:underline"
                          >
                            Slide {citation.slide}: {citation.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ask a question about this document..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAsk()}
              />
              <Button onClick={handleAsk}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
