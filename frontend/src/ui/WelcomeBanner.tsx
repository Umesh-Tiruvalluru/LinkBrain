import { Brain } from "lucide-react";

const WelcomeBanner = () => {
  return (
    <div className="h-screen flex flex-col justify-center bg-gradient-to-br from-blue-900 to-purple-600 text-white p-12 overflow-hidden relative">
      <Brain className="" size={90} />

      <h2 className="text-3xl font-bold mt-8">Organize Your World</h2>
      <p className="text-lg mt-4 leading-relaxed">
        A powerful tool designed to help you store, organize, and revisit the
        resources that matter to you. Stay productive and focused.
      </p>
    </div>
  );
};

export default WelcomeBanner;
