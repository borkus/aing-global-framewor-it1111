import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Timer, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { mockExams } from '@/lib/mockData';
export default function ExamPortalPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const examData = examId ? mockExams[examId.toLowerCase()] : undefined;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const answersRef = useRef(answers);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  const finishExam = useCallback((finalAnswers: Record<number, string>) => {
    if (!examData) return;
    let score = 0;
    examData.questions.forEach(q => {
      if (finalAnswers[q.id] === q.answer) {
        score++;
      }
    });
    const percentage = (score / examData.questions.length) * 100;
    toast.info('Exam Finished!', {
      description: `You scored ${score}/${examData.questions.length} (${percentage.toFixed(0)}%).`,
    });
    navigate('/dashboard');
  }, [navigate, examData]);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam(answersRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finishExam]);
  if (!examData) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-red-600">
              <AlertTriangle /> Exam Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>The exam you are trying to access does not exist.</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [examData.questions[currentQuestionIndex].id]: value }));
  };
  const currentQuestion = examData.questions[currentQuestionIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>{examData.name} Exam</CardTitle>
            <CardDescription>Question {currentQuestionIndex + 1} of {examData.questions.length}</CardDescription>
          </div>
          <div className="flex items-center gap-2 font-mono text-lg p-2 border rounded-md">
            <Timer className="h-5 w-5" />
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={((currentQuestionIndex + 1) / examData.questions.length) * 100} className="mb-6" />
          <div className="mb-6">
            <p className="font-semibold text-lg mb-4">{currentQuestion.question}</p>
            <RadioGroup value={answers[currentQuestion.id] || ''} onValueChange={handleAnswerChange}>
              {currentQuestion.options.map((option: string) => (
                <div key={option} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                  <RadioGroupItem value={option} id={`option-${option}`} />
                  <Label htmlFor={`option-${option}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setCurrentQuestionIndex(i => i - 1)} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentQuestionIndex < examData.questions.length - 1 ? (
              <Button onClick={() => setCurrentQuestionIndex(i => i + 1)}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => setIsFinishDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                Finish Exam
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to finish?</AlertDialogTitle>
            <AlertDialogDescription>
              You cannot change your answers once you submit the exam.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="ghost" onClick={() => setIsFinishDialogOpen(false)}>Cancel</Button>
            <AlertDialogAction onClick={() => finishExam(answers)}>Submit Exam</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}