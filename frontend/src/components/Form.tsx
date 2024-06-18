import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { API_URL } from "@/lib/utils";
import { FaEye as Eye, FaEyeSlash as EyeSlash } from 'react-icons/fa';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from "@/components/Spinner";

const Form = ({ type, onSubmit }: { type: "signup" | "signin"; onSubmit: () => void }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState({
    email: "",
    password: "",
  });
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const sendRequest = async () => {
    setIsConverting(true);
    try {
      // Check if email or password is empty
      if (!postInputs.email.trim() || !postInputs.password.trim()) {
        toast.warn("Please enter email and password!");
        return;
      }

      const response = await axios.post(`${API_URL}/${type === "signup" ? "signup" : "signin"}`, postInputs);
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsConverting(false);
      navigate("/codegen");
      onSubmit(); // Call the onSubmit prop
    } catch (error) {
      setIsConverting(false);
      console.error('Error:', error);
      toast.error("Error occurred, please try again.");
    }
  };

  return (
    <div className="bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
      <div className="flex flex-col p-6 space-y-2">
        <h3 className="whitespace-nowrap font-bold text-3xl">{type === "signup" ? "Sign Up" : "Sign In"}</h3>
        <p className="text-2xl text-slate-500 text-muted-foreground">{type === "signup" ? "Get started with an account." : "Welcome back!"}</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2 mb-5">
          <LabelledInput label="Email" placeholder="Enter your email" onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} />
        </div>
        <div className="space-y-2">
          <LabelledInput label="Password" placeholder={type === "signup" ? "Create a password" : "Enter your password"} onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} type="password" />
        </div>
        <button onClick={sendRequest} className="inline-flex items-center mb-5 bg-gray-900 text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full" type="submit">
          {isConverting ? <Spinner /> : (type === "signup" ? "Get started" : "Sign in")}
        </button>
      </div>
      <div className="mt-4 mb-4 text-center text-sm">
        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
          {type === "signin" ? "Sign up" : "Sign in"}
        </Link>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  return (
    <div style={{ position: 'relative' }}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
      <input onChange={onChange} type={inputType} id="first_name" className="flex h-10 w-full mb-5 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder={placeholder} required />
      {type === 'password' && (
        <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '20px', top: '70%', transform: 'translateY(-50%)' }}>
          {showPassword ? <EyeSlash /> : <Eye />}
        </button>
      )}
    </div>
  );
}

export default Form;
