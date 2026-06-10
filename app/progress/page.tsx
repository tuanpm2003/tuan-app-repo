"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { studyActivity, topicMastery, documents } from "@/lib/mock-data";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProgressPage() {
  const quizScores = [
    { date: "Week 1", score: 65 },
    { date: "Week 2", score: 72 },
    { date: "Week 3", score: 78 },
    { date: "Week 4", score: 76 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground">Track your learning journey</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Study Activity</CardTitle>
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
            <CardTitle>Quiz Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={quizScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Score %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Topic Mastery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topicMastery.map((topic) => (
              <div key={topic.topic}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{topic.topic}</div>
                    <div className="text-sm text-muted-foreground">
                      {topic.studyTime} minutes studied
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{topic.mastery}%</div>
                </div>
                {/* <Progress value={topic.mastery} /> */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{doc.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {doc.status === "Ready" ? "Completed" : doc.status}
                  </div>
                </div>
                <div className="text-sm font-semibold text-primary">
                  {doc.status === "Ready" ? "100%" : "In Progress"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
