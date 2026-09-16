
import './App.css'
import FloatingShape from './components/FloatingShape'

import { Routes, Route, Navigate } from "react-router-dom"
import SignupPage from './pages/auth/SignupPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import EmailVerification from './pages/auth/EmailVerification.jsx'
import { useAuthStore } from './store/authStore.js'
import { useEffect } from 'react'

import { Toaster } from "react-hot-toast"
import UserPage from './pages/home/UserPage'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import CompanyHomePage from './pages/home/CompanyHomePage.jsx'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/auth/ResetPasswordPage.jsx'
import { useState } from 'react'

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    if (user.role === "user") return <Navigate to='/' replace />;
    if (user.role === "company") return <Navigate to='/company' replace />;

  }

  return children;
};


function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  const [userComponent, setUserComponent] = useState("project")
  const [projectIdToRequest, setProjectIdToRequest] = useState('');

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  if (isCheckingAuth) {
    return <LoadingSpinner />
  }

  return (
    <div className='min-h-screen bg-linear-to-r from-[#351A30] via-[#0D0D17] to-[#0E0E18]'>
      <div className=''>
        <Routes>
          <Route
            path='/'
            element={<ProtectedRoute>
              <UserPage
                projectIdToRequest={projectIdToRequest}
                setProjectIdToRequest={setProjectIdToRequest}
                userComponent={userComponent}
                setUserComponent={setUserComponent} />
            </ProtectedRoute>}>
          </Route>
          <Route path='/company' element={<ProtectedRoute>
            <CompanyHomePage /></ProtectedRoute>}>
          </Route>
        </Routes>
      </div>
      <div className=' flex items-center justify-center relative overflow-hidden'>
        <FloatingShape color="bg-[#171723]" size="w-64 h-64" left="10%" top="-5%" delay={3} />
        <FloatingShape color="bg-purple-300" size="w-48 h-48" left="80%" top="70%" delay={5} />
        <FloatingShape color="bg-[#F1F1F8]" size="w-32 h-32" left="-10%" top="40%" delay={2} />

        <Routes>
          <Route path='/signUp' element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }></Route>
          <Route path='/login' element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>

          }></Route>
          <Route path='/verify-email' element={<EmailVerification />}></Route>
          <Route path='/forgot-password' element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }></Route>
          <Route path='/reset-password' element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }></Route>
        </Routes>

        <Toaster />
      </div>
    </div>

  )
}

export default App
