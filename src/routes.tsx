import { RouteObject } from 'react-router';
import { lazy } from 'react';
import HomePage from './pages/index';
import PortafolioPage from './pages/portafolio';
import ProcesoPage from './pages/proceso';
import SobreNosotrosPage from './pages/sobre-nosotros';
import AgendarPage from './pages/agendar';
import CriteriosPage from './pages/criterios';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/portafolio',
    element: <PortafolioPage />,
  },
  {
    path: '/proceso',
    element: <ProcesoPage />,
  },
  {
    path: '/sobre-nosotros',
    element: <SobreNosotrosPage />,
  },
  {
    path: '/agendar',
    element: <AgendarPage />,
  },
  {
    path: '/criterios',
    element: <CriteriosPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/portafolio' | '/proceso' | '/sobre-nosotros' | '/agendar';

export type Params = Record<string, string | undefined>;
