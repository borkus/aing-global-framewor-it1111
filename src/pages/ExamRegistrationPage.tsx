import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import useUserStore from '@/stores/userStore';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
const exams = [
  { id: 'afc', name: 'AING™ Foundation (AFC)' },
  { id: 'apc', name: 'AING™ Practitioner (APC)' },
  { id: 'aac', name: 'AING™ Architect (AAC)' },
];
export default function ExamRegistrationPage() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const [step, setStep] = useState(1);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const handleNext = () => {
    if (step === 1 && !selectedExam) {
      toast.error('Please select an exam to continue.');
      return;
    }
    if (step === 2 && !selectedDate) {
      toast.error('Please select a date to continue.');
      return;
    }
    setStep((s) => s + 1);
  };
  const handleBack = () => setStep((s) => s - 1);
  const handleConfirm = () => {
    toast.success('Registration Confirmed!', {
      description: `You are registered for the ${exams.find(e => e.id === selectedExam)?.name} exam.`,
    });
    // In a real app, this would navigate to an exam portal link
    navigate('/dashboard');
  };
  const progressValue = (step / 3) * 100;
  return (
    <PageShell title="Register for an Exam">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Exam Registration</CardTitle>
            <CardDescription>Follow the steps below to book your certification exam.</CardDescription>
            <Progress value={progressValue} className="mt-4" />
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-semibold">Step 1: Select Your Exam</h3>
                <Select onValueChange={setSelectedExam} value={selectedExam || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an exam..." />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-semibold">Step 2: Choose a Date</h3>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-semibold">Step 3: Confirm Your Details</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Exam:</strong> {exams.find(e => e.id === selectedExam)?.name}</p>
                  <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please review your information. Upon confirmation, you will be redirected to your dashboard.
                </p>
              </div>
            )}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              ) : <div />}
              {step < 3 ? (
                <Button onClick={handleNext}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2 h-4 w-4" /> Confirm Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}