
import './App.css';
import BlogList from './components/BlogList';
import SinglePost from './components/SinglePost/SinglePost';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <BlogList /> */}
      <Router>
      <Routes>
        <Route exact path="/" element={<BlogList />} />
        <Route path = "/post/:postId" element={<SinglePost />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
