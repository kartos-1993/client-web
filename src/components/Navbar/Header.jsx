import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import HamburgerIcon from "../../assets/hamburger-menu.svg";
import UserIcon from "../../assets/user.svg";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { CgHeart } from "react-icons/cg";
import { CgShoppingBag } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { KitDropdown, KitButton } from "../../kit";
import { LOGOUT } from "../../store/reducers/userReducer";

const HeaderNavBar = () => {
  const { email, token, role, photoURL } = useSelector(
    (state) => state.userDetail
  );
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    signOut(auth);
    dispatch(LOGOUT(""));
    navigate("/auth");
  }

  return (
    <>
      <Header>
        <Nav>
          <LeftNavSection>
            <LeftNavItem>
              <img src={HamburgerIcon} alt="" />
            </LeftNavItem>
          </LeftNavSection>
          <Brand>
            <StyledLink to="/">celebs</StyledLink>
          </Brand>
          <RightNavSection>
            <RightNavItem>
              {/* <StyledLink
                to={
                  !email && !token
                    ? "/auth"
                    : role === "admin"
                    ? "/admin"
                    : "/user"
                }
              >
                {!photoURL && email ? (
                  email.slice(0, 1)
                ) : photoURL ? (
                  <img src={`${photoURL}`} alt="user icon" />
                ) : (
                  <FiUser />
                )}
              </StyledLink> */}

              {email ? (
                <KitDropdown>
                  <KitDropdown.Toggle
                    variant="outline-dark"
                    size="sm"
                    id="dropdown-basic"
                  >
                    <FiUser />
                  </KitDropdown.Toggle>

                  <KitDropdown.Menu style={{ margin: 0 }}>
                    <KitDropdown.Item href="#/action-1">
                      {email}
                    </KitDropdown.Item>
                    <KitDropdown.Divider />
                    <KitDropdown.Item href="#/action-2">
                      Something
                    </KitDropdown.Item>
                    <KitDropdown.Divider />
                    <KitDropdown.Item onClick={handleLogout}>
                      Logout
                    </KitDropdown.Item>
                  </KitDropdown.Menu>
                </KitDropdown>
              ) : (
                <FiUser />
              )}
            </RightNavItem>
            <RightNavItem>
              {/* <img src={WishIcon} alt="wish icon" /> */}
              <CgHeart />
            </RightNavItem>
            <RightNavItem>
              {/* <img src={Bag} alt="user-icon" /> */}
              <CgShoppingBag />
            </RightNavItem>
          </RightNavSection>
        </Nav>
      </Header>
    </>
  );
};

export default HeaderNavBar;

const Header = styled.header`
  width: 100%;
  padding: 0.5rem 0 1rem;
  border-bottom: 1px solid #eee;
`;

const Nav = styled.nav`
  display: flex;

  width: 100%;
  justify-content: space-between;
  /* background-color: #c6c6c6; */
`;

const LeftNavSection = styled.div`
  display: flex;
  flex: 1;

  align-items: center;

  img {
    cursor: pointer;
    width: 24px;
  }
`;

const LeftNavItem = styled.span`
  min-width: 2rem;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  /* margin-left: 50%; */
  font-size: 1.5rem;
  text-transform: uppercase;
  color: #000;
  font-weight: 600;
  text-align: center;
  justify-content: center;
`;

const RightNavSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const RightNavItem = styled.span`
  display: flex;
  /* flex: 1; */
  align-items: center;
  color: black;
  padding: 0 0.4rem;
  svg,
  img {
    width: 24px;
    height: 24px;
  }
  div {
    margin-left: 0.9rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #000;
  &:hover {
    color: black;
  }
`;
