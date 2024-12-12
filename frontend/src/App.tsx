import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Share from "./pages/Share";

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Login />} /> {/* Index route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/brain/:shareId" element={<Share />} />
      </>
    )
  );

  return (
    <div className="font-figtree">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
