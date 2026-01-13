import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './components/pages/Dashboard';
import { CaseDetail } from './components/pages/CaseDetail';
import { InvestigationBoard } from './components/pages/InvestigationBoard';
import { CaseHistory } from './components/pages/CaseHistory';
import { Profile } from './components/Profile';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ClueDetail } from './components/clues/ClueDetail';
import { SuspectDetail } from './components/suspects/SuspectDetail';
import { CreateCase } from './components/pages/CreateCase';
import { EditCase } from './components/pages/EditCase';
import { AdminRoute } from './components/AdminRoute';
import ChatRoom from './components/chat/ChatRoom'; // Import ChatRoom

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={<CaseHistory />} />

            {/* Protected routes */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="/case-detail/:id"
              element={
                <ProtectedRoute>
                  <CaseDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/investigation"
              element={
                <ProtectedRoute>
                  <InvestigationBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clue/:id"
              element={
                <ProtectedRoute>
                  <ClueDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suspect/:id"
              element={
                <ProtectedRoute>
                  <SuspectDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-case"
              element={
                <AdminRoute>
                  <CreateCase />
                </AdminRoute>
              }
            />
            <Route
              path="/edit-case/:id"
              element={
                <AdminRoute>
                  <EditCase />
                </AdminRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
