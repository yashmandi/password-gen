import "./App.css";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Manager from "./pages/Manager";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import NProgress from "nprogress"; // Import NProgress
import { useEffect } from "react";
import './nprogress-custom.css'; // Import your custom styles

function App() {
  const location = useLocation();

  useEffect(() => {
    // Start NProgress on route change
    NProgress.start();
    
    // Stop NProgress when the route changes
    const handleRouteChange = () => {
      NProgress.done();
    };

    // Call handleRouteChange when the component mounts and when the route changes
    handleRouteChange();
    
    return () => {
      NProgress.done(); // Ensure it stops when the component unmounts
    };
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/password-manager" element={<Manager />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </div>
  );
}

const AppWithRouter = () => (
  <Router>
    <Toaster /> {/* Add this line */}
    <App />
  </Router>
);

export default AppWithRouter;
