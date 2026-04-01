import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

type LocationState = { from?: { pathname: string } };

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname || "/";

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoadingState(true);
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to authenticate.";
      setError(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)\.?/, "").trim());
    } finally {
      setLoadingState(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoadingState(true);
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign in with Google.";
      setError(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)\.?/, "").trim());
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-surface-container-lowest border border-outline-variant/10 rounded-2xl w-full max-w-md p-8 shadow-2xl">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <span className="font-headline font-black text-2xl uppercase tracking-tighter text-red-600">
            Stream Arena
          </span>
          <h1 className="font-headline font-black text-3xl uppercase tracking-tighter mt-1">
            {isLogin ? "Welcome Back" : "Join for Free"}
          </h1>
          <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mt-2">
            {isLogin ? "Sign in to access live matches, news & schedules" : "Create your StreamArena account"}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold p-3 rounded-lg mb-6 text-center">
            ⚠ {error}
          </div>
        )}

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loadingState}
          className="w-full bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/20 font-headline font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-3 mb-6 disabled:opacity-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-outline-variant/20 flex-1"></div>
          <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
            or with email
          </span>
          <div className="h-px bg-outline-variant/20 flex-1"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/20 focus:border-red-600 focus:ring-1 focus:ring-red-600/20 rounded-lg px-4 py-3 text-sm transition-all outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/20 focus:border-red-600 focus:ring-1 focus:ring-red-600/20 rounded-lg px-4 py-3 text-sm transition-all outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loadingState}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-headline font-bold uppercase py-3 rounded-xl mt-2 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loadingState ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
            ) : (
              <>{isLogin ? "Sign In" : "Create Account"}</>
            )}
          </button>
        </form>

        {/* Toggle login/signup */}
        <p className="text-center mt-6 text-xs text-on-surface-variant">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="ml-2 font-bold text-red-600 hover:underline uppercase font-label text-xs tracking-widest"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
