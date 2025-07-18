"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Upload, Brain, Video, FileText, Zap, Users, BookOpen, Languages, BrainCircuit } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Index = () => {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);

  const features = [
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: "Rule-Based and AI Based",
      description: "Combine traditional rule-based systems with advanced AI for optimal learning",
      color: "bg-blue-500"
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Smart OCR",
      description: "Upload documents and images for AI-powered text extraction",
      color: "bg-purple-500"
    },
    {
      icon: <Languages className="h-8 w-8" />,
      title: "Translation",
      description: "Translate text and speech in real-time with AI assistance",
      color: "bg-green-500"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Quiz Generation",
      description: "Automatically generate quizzes from your uploaded materials",
      color: "bg-orange-500"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Summaries",
      description: "Get concise summaries and notes from any content",
      color: "bg-teal-500"
    }
  ];

  function scrollToFeatures(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    const featuresSection = document.querySelector('section.py-16');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduAI
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6 justify-end">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1"
              onClick={scrollToFeatures}
            >
              Features
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1"
              onClick={() => router.push('/upload')}
            >
              Upload
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-4 w-4 mr-1" />
            AI-Powered Learning
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Learn Smarter with AI
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your education experience with AI-powered voice sessions, intelligent document analysis, 
            and personalized learning tools that adapt to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => router.push('/upload')}
            >
              <Upload className="h-5 w-5 mr-2" />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Everything you need to learn effectively
          </h3>

          {/* Top 3 features in 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.slice(0, 3).map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom 2 features centered with same width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center max-w-4xl mx-auto">
            {features.slice(3).map((feature, index) => (
              <Card key={index + 3} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-white/40">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-1 gap-8">
            <Card className="border-0 bg-gradient-to-br from-green-500 to-teal-600 text-white">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <BookOpen className="h-6 w-6 mr-2" />
                  Upload & Analyze
                </CardTitle>
                <CardDescription className="text-green-100">
                  Upload your documents and let AI generate quizzes, summaries, and notes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => router.push('/upload')}
                >
                  Upload Files
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-white/60">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; 2024 EduAI. Empowering education through artificial intelligence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
