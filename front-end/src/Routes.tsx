import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {path: '/' , element: <App />, children: [
    {path: '/login', element: <Login />},
    {path: '/register', element: <Register />},
  ],errorElement: <ErrorPage />
  },
  { element: <PrivateRoutes />, children: [
    {index: true, element: <HomePage />},
  ]}
]);

export default router;