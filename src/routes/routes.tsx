import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { adminPaths } from './admin.routes';
import { routeGenerator } from '../utils/routesGenerator';
import {  nutritionPaths } from './nutritionist.routes';
import {  userPaths } from './users.routes';
import ForgetPassword from '../pages/ForgetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: '/Nutritionist',
    element: <App />,
    children: routeGenerator(nutritionPaths),
  },
  {
    path: '/User',
    element: <App />,
    children: routeGenerator(userPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forget-password',
    element: <ForgetPassword />,
  },
]);

export default router;
