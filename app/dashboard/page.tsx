"use client";

import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { documents, studyActivity, weakTopics } from "@/lib/mock-data";
import { FileText, BookOpen, ClipboardCheck, TrendingUp, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

export default function DashboardPage() {
  const readyDocuments = documents.filter((d) => d.status === "Ready").length;
  const totalQuizzes = 18;
  const averageScore = 76;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your learning progress.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Uploaded Documents"
          value={documents.length}
          icon={FileText}
          description={`${readyDocuments} ready to study`}
        />
        <StatCard
          title="Topics Studied"
          value={12}
          icon={BookOpen}
          description="This week"
          trend="+3 from last week"
        />
        <StatCard
          title="Quizzes Completed"
          value={totalQuizzes}
          icon={ClipboardCheck}
          description="Total attempts"
        />
        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          icon={TrendingUp}
          description="Across all quizzes"
          trend="+5% improvement"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Study Activity This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="hsl(var(--primary))" name="Minutes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weak Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weakTopics.map((topic) => (
                <div key={topic.topic}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{topic.topic}</span>
                    <span className="text-muted-foreground">{topic.score}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${topic.score}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {topic.attempts} attempts
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {doc.slides} slides • {doc.lastStudied || "Not studied"}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/study/${doc.id}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/study/doc-1">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continue studying AWS VPC
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/quiz/doc-1">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Take a quiz on NAT Gateway
                </Link>
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white" asChild>
                <Link href="/quiz-battle">
                  ⚔️ Quiz Battle Mode
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/flashcards">
                  <FileText className="mr-2 h-4 w-4" />
                  Review flashcards
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
