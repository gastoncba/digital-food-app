import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  LandingScreen,
  AuthScreen,
  HomeScreen,
  NotFoundScreen,
  SectionScreen,
  FoodScreen,
  FoodDetail,
  MenuScreen,
  ConfigScreen,
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
        path="/admin/*"
        element={
          <>
            <Navbar
              pages={[
                { name: 'home', url: '/admin/home' },
                {
                  name: 'secciones',
                  url: '/admin/sections',
                  options: { state: { isAdmin: true, menuId: menuState.id } },
                },
                { name: 'configuraciones', url: '/admin/config' },
              ]}
              currentPage={currentPage}
            />
            <Routes>
              <Route
                element={
                  <ProtectedRoute
                    conditions={[
                      { redirectIf: () => !menuState.isAdmin, redirectTo: '/' },
                    ]}
                  />
                }
              >
                <Route path="/home" element={<HomeScreen />} />
                <Route
                  element={
                    <ProtectedRoute
                      conditions={[
                        {
                          redirectIf: () => !location.state,
                          redirectTo: '/admin/home',
                        },
                      ]}
                    />
                  }
                >
                  <Route path="/sections" element={<SectionScreen />} />
                  <Route path="/foods" element={<FoodScreen />} />
                  <Route path="/foodDetail" element={<FoodDetail />} />
                </Route>
                <Route path="/config" element={<ConfigScreen />} />
                <Route path="*" element={<NotFoundScreen />} />
              </Route>
            </Routes>
          </>
        }
      />
      <Route
        path="/app/*"
        element={
          <>
            <Navbar
              pages={[
                {
                  name: 'principal',
                  url: `/app/${menuState.name}/${menuState.id}`,
                },
                {
                  name: 'secciones',
                  url: '/app/sections',
                  options: { state: { isAdmin: false, menuId: menuState.id } },
                },
              ]}
              currentPage={currentPage}
            />
            <Routes>
              <Route path="/:name/:menuId" element={<MenuScreen />} />
              <Route
                element={
                  <ProtectedRoute
                    conditions={[
                      {
                        redirectIf: () => !location.state,
                        redirectTo: `/app/${menuState.name}/${menuState.id}`,
                      },
                    ]}
                  />
                }
              >
                <Route path="/sections" element={<SectionScreen />} />
                <Route path="/foods" element={<FoodScreen />} />
                <Route path="/foodDetail" element={<FoodDetail />} />
              </Route>
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </>
        }
      />
    </Routes>
  );
};
