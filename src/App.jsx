import "./App.css";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Manager from "./pages/Manager";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/password-manager" element={<Manager />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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