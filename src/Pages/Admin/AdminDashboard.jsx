import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { adminRoutes } from "../../components/Routes/adminRoute";

import {
  Accordion,
  Button,
  Offcanvas,
  ListGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";


import {
  Navigate,
  Link,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { KitRow, KitCol, KitContainer } from "../../kit";

const AdminDashboard = ({ children }) => {
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.userDetail);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "CELEBS | Admin";
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  return user.role === "admin" ? (
    <KitContainer fluid>
      <KitRow>
        <Col sm={2}>
          <Accordion>
            {adminRoutes.map(({ header, detail }, index) => (
              <Accordion.Item eventKey={`${index}`} key={index}>
                <Accordion.Header>{header}</Accordion.Header>
                <Accordion.Body>
                  <ListGroup as="ul" variant="flush">
                    {detail.map((d) => (
                      <ListGroup.Item as="li" key={d.link}>
                        <SLink to={d.link}>{d.title}</SLink>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          
        </Col>
        <Col sm={8}>
          <Outlet />
        </Col>
        <SKitCol sm={2}>
          <KitContainer>.....</KitContainer>
        </SKitCol>
      </KitRow>
    </KitContainer>
  ) : (
    <Navigate to="/user" />
  );
};

export default AdminDashboard;
const SKitCol = styled(KitCol)`
  border: 1px solid #e3eaf0;
  /* max-width: 80%; */
  /* background: aqua; */
`;

const SLink = styled(Link)`
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
`;

