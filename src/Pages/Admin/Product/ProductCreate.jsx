import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductForm from "../../../components/Form/ProductForm";

import { KitCol, KitContainer, KitRow } from "../../../kit/index";
import { getCategories, getCategorySubs } from "../../../api/category";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import ImageUpload from "../../../components/Form/ImageUpload";
import { SET_SUBCATEGORIES_OPTIONS } from "../../../store/reducers/productReducer";
import SearchInput from "../../../components/Form/SearchInput";

const shipping = ["Yes", "No"];

const ProductCreate = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    document.title = "Add Product";
  }, []);



  return (
    <SKitContainer fluid>
      <ImageUpload />
      <ProductForm />
    </SKitContainer>
  );
};

export default ProductCreate;

const SKitContainer = styled.div`
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  border:1px solid #e3eaf0;
  padding: 1rem;
`;
