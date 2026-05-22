import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import LiveMatches from "./pages/LiveMatches";
import NewsFeed from "./pages/NewsFeed";
import Schedules from "./pages/Schedules";
import Directory from "./pages/Directory";
import Platforms from "./pages/Platforms";
import ChannelDetail from "./pages/ChannelDetail";
import WatchPage from "./pages/WatchPage";
import About from "./pages/About";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin — completely standalone, no shared Layout */}
          <Route path="/admin/*" element={<AdminRoute><Admin /></AdminRoute>} />

          {/* All other routes wrapped in the public Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/live" element={<ProtectedRoute><LiveMatches /></ProtectedRoute>} />
                <Route path="/news" element={<ProtectedRoute><NewsFeed /></ProtectedRoute>} />
                <Route path="/schedules" element={<ProtectedRoute><Schedules /></ProtectedRoute>} />
                <Route path="/directory" element={<ProtectedRoute><Directory /></ProtectedRoute>} />
                <Route path="/platforms" element={<ProtectedRoute><Platforms /></ProtectedRoute>} />
                <Route path="/channel/:id" element={<ProtectedRoute><ChannelDetail /></ProtectedRoute>} />
                <Route path="/watch/:id" element={<ProtectedRoute><WatchPage /></ProtectedRoute>} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

