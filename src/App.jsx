import "./App.css";
import PostsTraditional from "./components/PostsTraditional";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostsTsQ from "./components/PostsTsQ";
import Home from "./components/Home";
import PostDetailsTsQ from "./components/PostDetailsTsQ";
import PaginatedQueries from "./components/PaginatedQueries";
import InfiniteQueries from "./components/InfiniteQueries";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/tsq-posts">TSq Posts</Link>
            </li>
            <li>
              <Link to={"/paginated-fruits"}>Paginated Fruits</Link>
            </li>
            <li>
              <Link to={"/infinite-fruits"}>Infinite Fruits</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<PostsTraditional />} />
          <Route exact path="/tsq-posts" element={<PostsTsQ />} />
          <Route exact path="/tsq-posts/:postId" element={<PostDetailsTsQ />} />
          <Route
            exact
            path="/paginated-fruits"
            element={<PaginatedQueries />}
          />
          <Route exact path="/infinite-fruits" element={<InfiniteQueries />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
