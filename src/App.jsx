import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import BirthdayGate from './components/BirthdayGate.jsx';

function ProtectedBirthday() {
  const [authenticated] = useState(() => sessionStorage.getItem('birthday-authenticated') === 'yes');
  return authenticated ? <BirthdayGate /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/birthday" element={<ProtectedBirthday />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
