import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { updateCategory, getCategory } from "../../../api/category";

import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  KitSpinner,
  KitForm,
  KitModal,
  KitInputGroup,
  KitButton,
} from "../../../kit";
import { useQuery, useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

const CategoryUpdate = () => {
  const { slug } = useParams();
  const {pathname} = useLocation()
  console.log(pathname);
  
  const { token } = useSelector((state) => state.userDetail);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [show, setShow] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Update Category";
  }, []);

  const category = useQuery("getCategory", () => getCategory(slug), {
    onSuccess: (data) => {
      // console.log(data);
      setName(data.data.name);
    },
  });

  const categoryUpdate = useMutation(
    () => updateCategory(slug, { name }, token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("loadCategories");
        setShow(false);
        navigate("/admin/category")
      },
      onError: (err) => {
        if (err.response.data.code === "auth/id-token-expired"){
          toast.error("please login again")
        }
          console.log("err: ", err.response.data.code);
      },
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    categoryUpdate.mutate();
  }

  return (
    <Wrapper>
      <KitModal show={show} setShow={setShow} title={"Update Category"} path = "/admin/category">
        <KitForm onSubmit={handleSubmit}>
          <KitForm.Group className="mb-3" controlId="formBasicEmail">
            <KitForm.Control
              type="text"
              placeholder="update"
              name="updateCategory"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </KitForm.Group>
          <KitButton
            type="submit"
            variant="primary"
            disabled={categoryUpdate.isLoading || name === slug}
          >
            {categoryUpdate.isLoading ? <KitSpinner size="sm" /> : "Update"}
          </KitButton>
        </KitForm>
      </KitModal>
      <Section></Section>
    </Wrapper>
  );
};

export default CategoryUpdate;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Section = styled.section``;
