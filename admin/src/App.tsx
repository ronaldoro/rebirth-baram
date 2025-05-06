import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import UpdateNoticePage from './components/UpdateNoticePage';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router basename="/admin-main">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/adminPage"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />

        {/* 공지사항/업데이트 페이지는 Public */}
        <Route path="/notices" element={<UpdateNoticePage />} />
      </Routes>
    </Router>
  );
};

export default App;
