import { SignUp } from "@clerk/clerk-react";
import AuthLayout from "./AuthLayout";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Join Clean Bounty</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create an account to start making a difference
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-green-500 hover:bg-green-600 text-sm normal-case",
              card: "bg-white shadow-xl rounded-xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
              formFieldInput: "rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500",
              footerActionLink: "text-green-600 hover:text-green-500",
            },
          }}
        />
      </motion.div>
    </AuthLayout>
  );
} 