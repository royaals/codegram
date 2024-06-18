import Form from "../components/Form";
import { Quote2 } from "../components/Quote2";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';


const Signup = () => {
  const handleSignup = () => {
    try {
      const isAuthenticated = localStorage.getItem('user') !== null;
      if (isAuthenticated) {
        toast.success('Signup successful');
        return <Navigate to="/codegen" replace />;
            } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center items-center my-20">
          <Form type="signup" onSubmit={handleSignup} />
        </div>
        <div className="hidden lg:block">
          <Quote2 />
        </div>
      </div>
    </div>
  );
};

export default Signup;
