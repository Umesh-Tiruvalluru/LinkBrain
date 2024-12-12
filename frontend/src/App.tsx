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

// UI Changes - for tomorrow
// fixed
// Responsiveness {important}
// Navbar is not looking right
// Dashboard buttons
// add description to the create content.
// add color to tags
// so many requests are going to backend ( this will cause the more re-rendering)

// add chip component.
// update the share page
//not fixed
// add state managemnt

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
