import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import LurnyQuiz from "./pages/LurnyQuiz";
import LurnyPublish from "./pages/LurnyPublish";
import LurnyUser from "./pages/LurnyUser";
import LurnySearch from "./pages/LurnySearch";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  useEffect(() => {
    function handleMessage(event) {
      const trustedOrigin =
        "http://ec2-3-84-247-235.compute-1.amazonaws.com:3000";
      if (
        event.origin === trustedOrigin &&
        event.data.type === "FROM_EXTENSION"
      ) {
        localStorage.setItem("tempData", JSON.stringify(event.data.data));
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/lurny/list" element={<LurnyPublish />} />
            <Route path="/lurny-category" element={<LurnyUser />} />
            <Route path="/lurny/quiz/:url" element={<LurnyQuiz />} />
            <Route path="/lurny/search" element={<LurnySearch />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
