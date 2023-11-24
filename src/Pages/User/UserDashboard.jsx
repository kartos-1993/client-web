import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../store/reducers/userReducer";
import { getAuth, signOut } from "firebase/auth";
import {
  Navigate,
  Link,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { routes } from "../../components/Routes/userRoutes";

const UserDashboard = ({ children }) => {
  const { email, token, role } = useSelector((state) => state.userDetail);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Account | Celebs";
    if (!email && !token) {
      navigate("/auth");
    }

    if (role === "admin") {
      navigate("/admin");
    }
  }, []);

  const handleClick = () => {
    signOut(auth);
    dispatch(LOGOUT(""));
    navigate("/auth");
  };

  return (
    <>
      <Wrapper>
        <UserSideNav>
          {routes.map((item) => (
            <div key={item.title}>
              <Link to={item.link}>{item.title}</Link>
            </div>
          ))}

          <div>
            <button onClick={handleClick}>LogOut</button>
          </div>
        </UserSideNav>

        <Section>
          {children} <Outlet />
        </Section>
      </Wrapper>
    </>
  );
};

export default UserDashboard;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  max-width: 80%;
  /* background: aqua; */
`;

const UserSideNav = styled.aside`
  display: flex;
  flex-direction: column;
  border-right: 1px solid black;
  /* background-color: orangered; */
  padding-right: 1rem;
`;

const Section = styled.section`
  display: flex;
`;
