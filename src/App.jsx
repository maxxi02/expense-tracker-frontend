import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Expense from "./pages/dashboard/expense";
import Income from "./pages/dashboard/Income.jsx";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { UserProvider } from "./context/user-context.jsx";
import Home from "./pages/dashboard/Home.jsx";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/expense" exact element={<Expense />} />
            <Route path="/income" exact element={<Income />} />
          </Routes>
        </Router>
      </div>
      <Toaster toastOptions={{ className: "", style: { fontSize: "13px" } }} />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  //check if token exist in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        setIsAuthenticated(!!e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Show loading or nothing while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or your loading component
  }

  //if authenticated, redirect to dashboard
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
