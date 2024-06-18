import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from "@/components/Form";
import { Quote } from "@/components/Quote";

const Signin = () => {
  const handleSignIn = () => {
    try {
      const isAuthenticated = localStorage.getItem('user') !== null;
      if (isAuthenticated) {
        toast.success('Authentication successful');
        return <Navigate to="/codegen" replace />;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="grid grid-cols-1: lg:grid-cols-2">
        <div className="flex justify-center items-center my-20">
          <Form type="signin" onSubmit={handleSignIn} />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Signin;
