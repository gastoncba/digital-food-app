import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  LandingScreen,
  AuthScreen,
  HomeScreen,
  NotFoundScreen,
  SectionScreen,
} from '../screens';
import { ProtectedRoute } from './ProtectedRoute.routes';
import { Navbar } from '../components';
import { AppStore } from '../redux/store';

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
  const menuState = useSelector((store: AppStore) => store.menu);
  const location = useLocation();

  const currentPage = () => {
    return location.pathname;
  };

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/auth" element={<AuthScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
      <Route
        path="/app/*"
        element={
          <>
            <Navbar
              pages={[
                { name: 'home', url: '/app/home' },
                { name: 'secciones', url: '/app/sections' },
                { name: 'configuraciones', url: '/app/config' },
              ]}
              currentPage={currentPage}
            />
            <Routes>
              <Route
                element={
                  <ProtectedRoute
                    conditions={[
                      { redirectIf: () => menuState.id === 0, redirectTo: '/' },
                    ]}
                  />
                }
              >
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/sections" element={<SectionScreen />} />
                <Route path="/config" element={<div>config</div>} />
                <Route path="*" element={<NotFoundScreen />} />
              </Route>
            </Routes>
          </>
        }
      />
    </Routes>
  );
};
