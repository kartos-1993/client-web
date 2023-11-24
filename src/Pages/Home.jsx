import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../store/reducers/userReducer";

const Home = () => {  
   useEffect(() => {
     document.title = "Mens Authenticated Wear";
   }, []); 
  return (
    <div>
    <h1>Welcome to Celebs</h1>      
    </div>
  );
};

export default Home;
 