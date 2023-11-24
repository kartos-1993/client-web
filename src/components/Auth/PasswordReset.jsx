import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styled from "styled-components";
import { TiTick } from "react-icons/ti";
import {
  KitFormControlPassword,
  KitFormControlText,
  KitSpinner,
  KitButton,
  KitContainer,
  KitForm,
  KitRow,
  KitCol,
} from "../../kit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        setLoading(false);
        toast.success(
          `A Link To Reset Your Password Has Been Sent To ${email}`,
          3000
        );
        navigate("/auth");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.message === "Firebase: Error (auth/user-not-found).") {
          setErrorMessage(err.message);
        }
      });
  }

  return (
    <KitContainer>
      <SKitCol lg={9}>
        <KitForm onSubmit={handleSubmit}>
          <p>
            If you've forgotten your password, please enter your registered
            email address. We'll send you a link to reset your password.
          </p>
          <KitForm.Group>
            <KitFormControlText
              as={KitRow}
              placeholder="email"
              type="email"
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              required
            />

            <Message>{errorMessage}</Message>

            <KitButton
              className="mt-3"
              type="submit"
              disabled={loading || email === ""}
            >
              {loading ? <KitSpinner /> : "CONTINUE"}
            </KitButton>
          </KitForm.Group>
        </KitForm>
      </SKitCol>
    </KitContainer>
  );
};

export default PasswordReset;
const SKitCol = styled(KitCol)`
  margin: auto;
`;

const Message = styled.div`
  color: red;
`;
