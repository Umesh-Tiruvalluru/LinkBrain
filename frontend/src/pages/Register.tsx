import React from "react";

import { Brain } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import WelcomeBanner from "../ui/WelcomeBanner";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../api";
import toast from "react-hot-toast";

function Register() {
  const emailRef = React.useRef<HTMLFormElement>();
  const passwordRef = React.useRef<HTMLFormElement>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      const response = await register(email, password);

      if (response) {
        setLoading(false);
        navigate("/login");
        toast.success("Registered Successfully");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-[40%] m-4 hidden lg:block">
        <WelcomeBanner />
      </div>
      <div className="flex w-full lg:w-[50%]  items-center justify-center p-8">
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
              Register to create an account
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                text="Register"
                loading={loading}
                className="flex justify-center w-full"
              />
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/login">
              <span className="font-medium text-purple-600 hover:text-purple-500 underline cursor-pointer">
                Log in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
