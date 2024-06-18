
import Form from "../components/Form"
import {Quote2} from "../components/Quote2";
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  console.log(isAuthenticated)
  if (isAuthenticated) {
    return <Navigate to="/codegen" replace />;
  }
  return (
    <div>
      <div className="grid grid-cols-1: lg:grid-cols-2  ">
      <div className="flex justify-center items-center ali my-20 ">
        <Form type="signup"/>
        </div>
        <div className="hiddden lg:block">
        <Quote2/>
        </div>
       
      </div>
    </div>
  )
}

export default Signup
