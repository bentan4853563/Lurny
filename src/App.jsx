import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import LurnyQuiz from "./pages/LurnyQuiz";
import LurnyPublish from "./pages/LurnyPublish";
import LurnyUser from "./pages/LurnyUser";
import { useEffect } from "react";
// import LurnySearch from "./pages/LurnySearch";

const ProtectedRoute = () => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

function App() {
  useEffect(() => {
    const handleMessage = (event) => {
      const trustedOrigin = "http://localhost:3000";

      // Validate the event origin and the message type.
      if (
        event.origin === trustedOrigin &&
        event.data.type &&
        event.data.type === "FROM_EXTENSION"
      ) {
        console.log("Receive data", event.data.data);

        // Store the received data until the user is signed in
        localStorage.setItem("tempData", JSON.stringify(event.data.data));
      }
    };

    // Attach the event listener
    window.addEventListener("message", handleMessage);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/lurny-list" element={<LurnyPublish />} />
            <Route path="/lurny-category" element={<LurnyUser />} />
            <Route path="/lurny-quiz" element={<LurnyQuiz />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
