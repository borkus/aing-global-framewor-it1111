import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { App } from '@/App';
import DynamicContentPage from '@/pages/[...slug]';
import CapabilityModulesHubPage from '@/pages/CapabilityModulesHubPage';
import CertificationHubPage from '@/pages/CertificationHubPage';
import AcademyPortalPage from '@/pages/AcademyPortalPage';
import MembershipPage from '@/pages/MembershipPage';
import CommunityHubPage from '@/pages/CommunityHubPage';
import ResourcesPage from '@/pages/ResourcesPage';
import NewsPage from '@/pages/NewsPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import ExamRegistrationPage from '@/pages/ExamRegistrationPage';
import ExamPortalPage from '@/pages/ExamPortalPage';
import VerifyCertificationPage from '@/pages/VerifyCertificationPage';
import ProfileSettingsPage from '@/pages/ProfileSettingsPage';
import ForumsPage from '@/pages/community/ForumsPage';
import ForumThreadPage from '@/pages/community/ForumThreadPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/certifications/verify", element: <VerifyCertificationPage /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/member/exam-registration",
        element: (
          <ProtectedRoute>
            <ExamRegistrationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/member/exam-portal/:examId",
        element: (
          <ProtectedRoute>
            <ExamPortalPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/member/settings",
        element: (
          <ProtectedRoute>
            <ProfileSettingsPage />
          </ProtectedRoute>
        ),
      },
      { path: "/capability-modules", element: <CapabilityModulesHubPage /> },
      { path: "/certifications", element: <CertificationHubPage /> },
      { path: "/academy", element: <AcademyPortalPage /> },
      { path: "/membership", element: <MembershipPage /> },
      { path: "/community", element: <CommunityHubPage /> },
      { path: "/community/forums", element: <ForumsPage /> },
      { path: "/community/forums/:threadId", element: <ForumThreadPage /> },
      { path: "/resources", element: <ResourcesPage /> },
      { path: "/news", element: <NewsPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "*", element: <DynamicContentPage /> }
    ]
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)