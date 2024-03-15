import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import LurnyList from "./pages/LurnyList";
import LurnyQuiz from "./pages/LurnyQuiz";
import LurnyCategory from "./pages/LurnyCategory";
// import LurnySearch from "./pages/LurnySearch";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/lurny-list" exact element={<LurnyList />} />
          <Route path="/lurny-quiz" exact element={<LurnyQuiz />} />
          <Route path="/lurny-category" exact element={<LurnyCategory />} />
          {/* <Route path="/lurny-search" exact element={<LurnySearch />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
