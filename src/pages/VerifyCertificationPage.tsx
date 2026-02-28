import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { certifiedProfessionals } from '@/lib/mockData';
const verifySchema = z.object({
  certificationId: z.string().min(1, 'Certification ID is required'),
});
type VerifyFormValues = z.infer<typeof verifySchema>;
interface VerificationResult {
  status: 'verified' | 'invalid';
  name: string;
  certification: string;
  issuedOn: string;
  expiresOn: string;
}
export default function VerifyCertificationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { certificationId: 'AING-APC-12345' },
  });
  const onSubmit = async (data: VerifyFormValues) => {
    setIsLoading(true);
    setResult(null);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    const foundProfessional = certifiedProfessionals.find(
      p => p.id.toUpperCase() === data.certificationId.toUpperCase()
    );
    if (foundProfessional) {
      setResult({
        status: 'verified',
        name: foundProfessional.name,
        certification: foundProfessional.certification,
        issuedOn: foundProfessional.issuedOn,
        expiresOn: foundProfessional.expiresOn,
      });
    } else {
      setResult({
        status: 'invalid',
        name: 'N/A',
        certification: 'N/A',
        issuedOn: 'N/A',
        expiresOn: 'N/A',
      });
    }
    setIsLoading(false);
  };
  return (
    <PageShell title="Verify a Certification">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Certification Verification</CardTitle>
            <CardDescription>
              Enter a Certification ID to verify its authenticity. Use "AING-APC-12345" for a valid demo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="certificationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., AING-APC-12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card className="mt-8 animate-fade-in">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${result.status === 'verified' ? 'text-green-600' : 'text-red-600'}`}>
                {result.status === 'verified' ? <CheckCircle /> : <XCircle />}
                {result.status === 'verified' ? 'Certification Verified' : 'Invalid Certification ID'}
              </CardTitle>
            </CardHeader>
            {result.status === 'verified' && (
              <CardContent className="space-y-2">
                <p><strong>Name:</strong> {result.name}</p>
                <p><strong>Certification:</strong> {result.certification}</p>
                <p><strong>Issued On:</strong> {result.issuedOn}</p>
                <p><strong>Expires On:</strong> {result.expiresOn}</p>
              </CardContent>
            )}
          </Card>
        )}
      </div>
    </PageShell>
  );
}