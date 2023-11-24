import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate} from "react-router-dom";

const AuthProtectedUser = ({ children }) => {
  const user = useSelector((state) => state.userDetail);
  const navigate = useNavigate();
  const { email, token, role } = user;

useEffect(() => {
if(!user){
  navigate("/auth")
}  

}, [])

  return (
    <>
      {children}
      
    </>
  );
};

export default AuthProtectedUser;
