import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import LurnyList from "./pages/LurnyList";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/lurny-list" exact element={<LurnyList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
