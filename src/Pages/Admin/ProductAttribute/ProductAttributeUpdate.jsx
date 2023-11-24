import React, { useState, useEffect } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { updateCategory, getCategory } from "../../../api/category";
import { updateProductAttribute, getProductAttribute } from "../../../api/productAttribute";



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

const ProductAttributeUpdate = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();

  const { token } = useSelector((state) => state.userDetail);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [show, setShow] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Update Product Attribute";
  }, []);

  const productAttribute = useQuery(
    "getProductAttribute",
    () => getProductAttribute(slug),
    {
      onSuccess: (data) => {
        console.log(data);
        setName(data.data.name);
      },
    }
  );

  const productAttributeUpdate = useMutation(
    () => updateProductAttribute(slug, { name }, token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getAllProductAttributes");
        setShow(false);
        navigate("/admin/product-attribute");
      },
      onError: (err) => {
        if (err.response.data.code === "auth/id-token-expired") {
          toast.error("please login again");
        }
        console.log("err: ", err.response.data.code);
      },
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    productAttributeUpdate.mutate();
  }

  return (
    <Wrapper>
      <KitModal
        show={show}
        setShow={setShow}
        title={"Update Product Attribute"}
        path="/admin/product-attribute"
      >
        <KitForm onSubmit={handleSubmit}>
          <KitForm.Group className="mb-3" controlId="formBasicEmail">
            <KitForm.Control
              type="text"
              placeholder="update"
              name="updateProductAttribute"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </KitForm.Group>
          <KitButton
            type="submit"
            variant="primary"
            disabled={productAttributeUpdate.isLoading || name === slug}
          >
            {productAttributeUpdate.isLoading ? (
              <KitSpinner size="sm" />
            ) : (
              "Update"
            )}
          </KitButton>
        </KitForm>
      </KitModal>
      <Section></Section>
    </Wrapper>
  );
};

export default ProductAttributeUpdate;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Section = styled.section``;
