import { Brain, X } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import WelcomeBanner from "../ui/WelcomeBanner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { login } from "../api";

export default function Login() {
  const emailRef = useRef<HTMLFormElement>();
  const passwordRef = useRef<HTMLFormElement>();
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  if (window.localStorage.getItem("jwt")) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      setLoading(true);

      const response = await login(email, password);

      if (response) {
        setLoading(false);
        window.localStorage.setItem("jwt", response.data.token);
        navigate("/dashboard");
      }
    } catch (e) {
      setLoading(false);
      setError(true);
      console.error(e);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-[50%] hidden lg:block">
        <WelcomeBanner />
      </div>
      <div className="flex w-full lg:w-[50%] items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex flex-col items-center gap-3 justify-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-900 p-2 rounded-lg">
                <Brain size={32} strokeWidth={2.5} className="text-white" />
              </div>
              <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-900 bg-clip-text text-transparent">
                LinkBrain
              </p>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Log in to continue managing your resources
            </p>
            {error && (
              <div className="flex items-center py-2 px-4 border border-red-600 bg-red-300 mt-4 justify-between text-white font-medium rounded">
                <p>Incorrect email or password</p>
                <button className="" onClick={() => setError(false)}>
                  <X size={18} className="text-red-600" />
                </button>
              </div>
            )}
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                reference={emailRef}
              />
              <Input
                type="password"
                placeholder="Password"
                reference={passwordRef}
              />
            </div>
            <div>
              <Button
                variant="primary"
                text="Login"
                className="flex justify-center w-full"
                loading={loading}
              />
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="font-medium text-purple-600 hover:text-purple-500 underline cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
