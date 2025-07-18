"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock, 
  Users, 
  BookOpen, 
  Zap,
  Play,
  MoreVertical,
  Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  
  const recentSessions = [
    {
      id: 1,
      title: "Machine Learning Basics",
      duration: "45 min",
      date: "Today, 2:30 PM",
      type: "Voice Session",
      status: "completed"
    },
    {
      id: 2,
      title: "Data Structures Quiz",
      duration: "15 min", 
      date: "Yesterday, 4:15 PM",
      type: "Quiz",
      status: "completed"
    },
    {
      id: 3,
      title: "Python Programming",
      duration: "30 min",
      date: "2 days ago",
      type: "Document Analysis",
      status: "completed"
    }
  ];

  const uploadedDocuments = [
    {
      id: 1,
      name: "ML_Fundamentals.pdf",
      type: "PDF",
      size: "2.3 MB",
      processed: true,
      quizzes: 3,
      summaries: 1
    },
    {
      id: 2,
      name: "Data_Science_Notes.docx",
      type: "DOC",
      size: "1.8 MB", 
      processed: true,
      quizzes: 2,
      summaries: 1
    },
    {
      id: 3,
      name: "Algorithm_Concepts.png",
      type: "Image",
      size: "450 KB",
      processed: false,
      quizzes: 0,
      summaries: 0
    }
  ];

  const learningStats = {
    totalSessions: 24,
    studyHours: 18.5,
    quizzesCompleted: 12,
    documentsProcessed: 8,
    weeklyGoal: 75,
    currentWeekProgress: 60
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduAI Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => router.push('/voice-chat')}>
              <Play className="h-4 w-4 mr-2" />
              New Session
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}> 
              Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-gray-600">Here's your learning progress and recent activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Sessions</p>
                  <p className="text-3xl font-bold">{learningStats.totalSessions}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Study Hours</p>
                  <p className="text-3xl font-bold">{learningStats.studyHours}</p>
                </div>
                <Clock className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Quizzes Completed</p>
                  <p className="text-3xl font-bold">{learningStats.quizzesCompleted}</p>
                </div>
                <Zap className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Documents</p>
                  <p className="text-3xl font-bold">{learningStats.documentsProcessed}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Sessions</span>
                  <Button variant="outline" size="sm" onClick={() => router.push('/voice-chat')}>
                    Start New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {session.type === 'Voice Session' && <Brain className="h-5 w-5 text-blue-600" />}
                          {session.type === 'Quiz' && <Zap className="h-5 w-5 text-purple-600" />}
                          {session.type === 'Document Analysis' && <FileText className="h-5 w-5 text-green-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{session.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{session.date}</span>
                            <span>•</span>
                            <span>{session.duration}</span>
                            <Badge variant="secondary" className="ml-2">
                              {session.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Documents</span>
                  <Button variant="outline" size="sm" onClick={() => router.push('/upload')}>
                    Upload New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.quizzes} quizzes</span>
                            <span>•</span>
                            <span>{doc.summaries} summaries</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.processed ? (
                          <Badge variant="default">Processed</Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress & Quick Actions */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Study Goal</span>
                      <span>{learningStats.currentWeekProgress}% of {learningStats.weeklyGoal}h</span>
                    </div>
                    <Progress value={learningStats.currentWeekProgress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-sm text-gray-500">Hours this week</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">8</p>
                      <p className="text-sm text-gray-500">Sessions completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => router.push('/voice-chat')}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Start Voice Session
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => router.push('/upload')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Review Notes
                </Button>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Great Progress!</h3>
                <p className="text-sm text-gray-600">
                  You've completed 12 quizzes this month. Keep up the excellent work!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
