import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Add your admin emails here
const ADMIN_EMAILS = ["admin@streamarena.com", "amankushwaha.9151@gmail.com", "shyammaurya1808@gmail.com"];

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser || !ADMIN_EMAILS.includes(currentUser.email ?? "")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
