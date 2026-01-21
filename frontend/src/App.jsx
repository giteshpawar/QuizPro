import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import TestHome from "./pages/TestHome";
import TestResult from "./pages/TestResult";
import Contact from "./pages/Contact";
import PracticeHome from "./pages/PracticeHome";
import PracticeRun from "./pages/PracticeRun";
import Finalexam from "./pages/FinalExam";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <main style={{ minHeight: 0 }}></main>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestHome />} />
        <Route path="/test/:subject" element={<Test />} />
        <Route path="/login"element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/practice" element={<PracticeHome />} />
        <Route path="/test/result" element={<TestResult />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/practice" element={<PracticeHome />} />
        <Route path="/practice/:subject" element={<PracticeRun />} />
        <Route path="/finalexam" element={<Finalexam />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
