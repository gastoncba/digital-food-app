import { Routes, Route } from 'react-router-dom';
import { LandingScreen, AuthScreen } from '../screens';

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/auth" element={<AuthScreen />} />
      <Route path="/home" element={<div>home</div>} />
    </Routes>
  );
};
