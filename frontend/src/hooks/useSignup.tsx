import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

type SignUpInputs = {
  fullname: string;
  username: string;
  password: string;
  confirmpassword: string;
  gender: string;
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs: SignUpInputs) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      // Check if the response is OK before parsing
      if (!res.ok) {
        const errorText = await res.text(); // Get the error response as text
        throw new Error(errorText); // Throw error with response text
      }

      const data = await res.json(); // Parse JSON response
      setAuthUser(data); // Set the authenticated user
    } catch (error: any) {
      console.error("Signup error:", error.message); // Log error message
      toast.error(error.message); // Display error toast
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { loading, signup };
};

export default useSignup;
