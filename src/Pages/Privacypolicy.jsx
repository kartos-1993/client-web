import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Privacy Policy</h1>
          <p>Last updated: October 25, 2024</p>
          <p>
            Welcome to our Privacy Policy. Your privacy is critically important
            to us. This policy explains the information we collect, how we use
            it, and your rights.
          </p>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>1. Information We Collect</Accordion.Header>
              <Accordion.Body>
                We collect the following types of information:
                <ul>
                  <li>
                    Personal identification information (Name, email, phone
                    number, etc.)
                  </li>
                  <li>Device information (IP address, browser type, etc.)</li>
                  <li>Usage data (pages visited, actions taken, etc.)</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                2. How We Use Your Information
              </Accordion.Header>
              <Accordion.Body>
                We use your information to:
                <ul>
                  <li>Provide and maintain our services</li>
                  <li>Improve, personalize, and expand our services</li>
                  <li>Communicate with you</li>
                  <li>Analyze website usage and trends</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                3. How We Share Your Information
              </Accordion.Header>
              <Accordion.Body>
                We may share your personal data with:
                <ul>
                  <li>Service providers to help us operate our services</li>
                  <li>Law enforcement if required by law</li>
                  <li>Business partners for joint projects</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>
                4. Your Data Protection Rights
              </Accordion.Header>
              <Accordion.Body>
                You have the right to:
                <ul>
                  <li>Access, update, or delete your personal information</li>
                  <li>Object to the processing of your data</li>
                  <li>Request data portability</li>
                  <li>Withdraw your consent</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>5. Contact Us</Accordion.Header>
              <Accordion.Body>
                If you have any questions about this privacy policy, please
                contact us:
                <ul>
                  <li>Email: celebs@gmail.com</li>

                  <li>Newroad Khichapokhari</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <p>
            For more details, you can always refer to the full privacy policy
            document.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
