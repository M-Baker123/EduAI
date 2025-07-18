"use client";
import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Upload as UploadIcon, Brain, Zap, Download } from 'lucide-react';

const Upload = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [processMethod, setProcessMethod] = useState<'ai' | 'rule'>('ai');
  const [selectedFunction, setSelectedFunction] = useState<'extracted' | 'summary' | 'quiz' | 'translation'>('extracted');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    setResult(null);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    onDrop(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onDrop(files);
    }
  };

  const handleDeleteFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setResult(null);
  };

  const processFiles = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("pdf", uploadedFiles[0]);
    formData.append("process_method", processMethod); // Add processing method

    try {
      const actionMap = {
        extracted: "extract",
        summary: "summarize",
        quiz: "quiz",
        translation: "translate",
      };

      const response = await fetch(
        `http://localhost:5000/${actionMap[selectedFunction]}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Processing failed: ${errText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error("Error:", err);
      alert("Error: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduAI
            </h1>
          </div>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Drop files here</p>
                  <p className="text-gray-500 mb-4">or click to browse</p>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                  />
                  <Button onClick={() => fileInputRef.current?.click()}>Choose File</Button>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(index)}>
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['extracted', 'summary', 'quiz', 'translation'].map(fn => (
                      <Button
                        key={fn}
                        variant={selectedFunction === fn ? "default" : "outline"}
                        onClick={() => setSelectedFunction(fn as any)}
                      >
                        {fn.charAt(0).toUpperCase() + fn.slice(1)}
                      </Button>
                    ))}
                  </div>

                  <div className="flex justify-center gap-2 mt-2">
                    <Button
                      variant={processMethod === 'ai' ? "default" : "outline"}
                      onClick={() => setProcessMethod("ai")}
                      disabled={isProcessing}
                    >
                      AI
                    </Button>
                    <Button
                      variant={processMethod === 'rule' ? "default" : "outline"}
                      onClick={() => setProcessMethod("rule")}
                      disabled={isProcessing}
                    >
                      Rule-Based
                    </Button>
                  </div>

                  <Button
                    className="w-full mt-3"
                    onClick={processFiles}
                    disabled={isProcessing || uploadedFiles.length === 0}
                  >
                    {isProcessing ? (
                      <><Zap className="animate-spin mr-2" />Processing...</>
                    ) : (
                      <><Brain className="mr-2" />Process</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Output</CardTitle>
              </CardHeader>
              <CardContent>
                {isProcessing ? (
                  <div className="text-center py-12 text-gray-500">
                    <Zap className="h-12 w-12 mx-auto mb-4 animate-spin" />
                    <p>Processing {uploadedFiles[0]?.name}...</p>
                  </div>
                ) : result ? (
                  <div>
                    <div className="mb-6 p-4 border rounded-lg bg-white">
                      <h3 className="font-bold mb-2">
                        Page 1 of {result.total_pages}
                      </h3>

                      {selectedFunction === 'extracted' && typeof result.page1 === 'string' && (
                        <pre className="whitespace-pre-wrap text-sm">{result.page1}</pre>
                      )}

                      {selectedFunction === 'summary' && typeof result.page1 === 'string' && (
                        <p className="text-sm whitespace-pre-wrap">{result.page1}</p>
                      )}

                      {selectedFunction === 'translation' && typeof result.page1 === 'string' && (
                        <p className="text-sm whitespace-pre-wrap">{result.page1}</p>
                      )}

                      {selectedFunction === 'quiz' && Array.isArray(result.page1) ? (
                        <div className="space-y-2">
                          {result.page1.map(([q, a]: [string, string], i: number) => (
                            <div key={i} className="p-2 bg-gray-50 rounded">
                              <p className="font-medium">{q}</p>
                              <p className="text-sm text-gray-600">Answer: {a}</p>
                            </div>
                          ))}
                        </div>
                      ) : selectedFunction === 'quiz' && (
                        <p className="text-gray-500">No quiz questions generated</p>
                      )}
                    </div>

                    {(result.download_txt || result.download_docx) && (
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-3">Full Document Download</h3>
                        <div className="flex flex-wrap gap-4">
                          {result.download_txt && (
                            <a
                              href={`http://localhost:5000${result.download_txt}`}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download as Text (.txt)</span>
                            </a>
                          )}
                          {result.download_docx && (
                            <a
                              href={`http://localhost:5000${result.download_docx}`}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download as Word (.docx)</span>
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Includes all {result.total_pages} pages
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>Upload a PDF and process it to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
