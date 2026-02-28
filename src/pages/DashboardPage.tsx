import React from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import useUserStore from '@/stores/userStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Award, Activity, BookOpen, Settings, Edit } from 'lucide-react';
export default function DashboardPage() {
  const user = useUserStore((s) => s.user);
  if (!user) {
    return (
      <PageShell title="Dashboard">
        <p>Loading user data...</p>
      </PageShell>
    );
  }
  return (
    <PageShell title={`Welcome back, ${user.firstName}!`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-indigo-600" /> Certification Progress</CardTitle>
              <CardDescription>Your journey through the AING™ certification path.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">AING™ Foundation (AFC)</h4>
                  <span className="text-sm text-muted-foreground">Completed</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">AING™ Practitioner (APC)</h4>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">AING™ Architect (AAC)</h4>
                  <span className="text-sm text-muted-foreground">Not Started</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-indigo-600" /> Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-4"><span className="text-sm text-muted-foreground">July 28</span><p>Completed module: "AING-AM: Agile Matrix"</p></li>
                <li className="flex items-center gap-4"><span className="text-sm text-muted-foreground">July 25</span><p>Joined the "London, UK" regional chapter</p></li>
                <li className="flex items-center gap-4"><span className="text-sm text-muted-foreground">July 20</span><p>Downloaded "AING Framework v1.0 Whitepaper"</p></li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-indigo-600" /> Member Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold text-lg">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge>{user.membershipTier} Member</Badge>
              <Button variant="outline" size="sm" asChild className="mt-2">
                <Link to="/member/settings"><Settings className="mr-2 h-4 w-4" /> Profile Settings</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Edit className="h-5 w-5 text-indigo-600" /> Member Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button asChild>
                <Link to="/member/exam-registration">Register for an Exam</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/member/exam-portal/apc">My Exam Portal (Demo)</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-indigo-600" /> Recommended Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-indigo-600 hover:underline">Case Study: AING in FinTech</a></li>
                <li><a href="#" className="text-indigo-600 hover:underline">AING-GM Governance Toolkit</a></li>
                <li><a href="#" className="text-indigo-600 hover:underline">Webinar: Leading AI Transformation</a></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}