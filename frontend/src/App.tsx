import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LiveMatches from "./pages/LiveMatches";
import NewsFeed from "./pages/NewsFeed";
import Schedules from "./pages/Schedules";
import Directory from "./pages/Directory";
import Platforms from "./pages/Platforms";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<LiveMatches />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/platforms" element={<Platforms />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
