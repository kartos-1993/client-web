import React, { useEffect } from "react";
import styled from "styled-components";
// import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
// import "react-tabs/style/react-tabs.css";

import Login from "./Login";
import SignUp from "./Register";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KitRow, KitCol, KitContainer } from "../../kit/index";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Auth = () => {
  const navigate = useNavigate();
  const { email, token, role } = useSelector((state) => state.userDetail);

  useEffect(() => {
    document.title = "Login | Join";
    if (email && token) {
      role === "admin" ? navigate("/admin/") : navigate("/user");
    }
  }, [role]);

  return (
    <SKitContainer>
      <Tabs defaultActiveKey="login" className="mb-3" fill variant="pills">
        <STab eventKey="login" title="Login">
          <Login />
        </STab>
        <STab eventKey="signup" title="SignUp">
          <SignUp />
        </STab>
      </Tabs>
    </SKitContainer>
  );
};

export default Auth;

const SKitContainer = styled(KitContainer)`
  max-width: 30rem;
`;

const SKitRow = styled(KitRow)``;
const STab = styled(Tab)``;

// const STabList = styled(TabList)`
//   width: 100%;
//   font-weight: 600;
//   text-transform: uppercase;
//   list-style-type: none;
//   padding: 4px;
//   display: flex;
//   justify-content: space-around;
//   margin: 0;
//   & * {
//     cursor: pointer;
//   }
// `;
// STabList.tabsRole = "TabList";

// margin-right: 4px;
//   /* border: 1px solid black; */
//   padding: 4px;
//   user-select: none;
//   cursor: arrow;

//   &.is-selected {
//     // color: white;
//     // background: black;
//     border-bottom: 0.1rem solid black;
//   }

//   /* &:focus {
//     outline: none;
//     box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.5);
//   } */
// `
// STab.tabsRole = "Tab";

// const STabPanel = styled(TabPanel)`;
//   display: none;
//   min-height: 40vh;
//   /* border: 1px solid black; */
//   padding: 4px;
//   margin-top: -5px;

//   &.is-selected {
//     display: block;
//   }
// `;
// STabPanel.tabsRole = "TabPanel";
