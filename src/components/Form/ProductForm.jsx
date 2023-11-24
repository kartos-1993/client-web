import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import {
  KitButton,
  KitSpinner,
  KitCol,
  KitRow,
  KitCard,
  KitForm,
  KitInputGroup,
} from "../../kit";
import { useDispatch, useSelector } from "react-redux";
import MultiSelectInput from "./MultiSelectInput";
import {
  SHOW_SUBCATEGORIES,
  CHANGE_INPUT,
  RESET,
  SET_CATEGORY_OPTIONS,
} from "../../store/reducers/productReducer";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createProduct } from "../../api/product";
import { getCategories, getCategorySubs } from "../../api/category";

import toast from "react-hot-toast";
import CascaderDropdown from "./CascaderDropdown";
import { getSubCategories } from "../../api/subCategory";

const ProductForm = () => {

  const queryClient = useQueryClient();
  const category = useSelector((state) => state.productDetail.category);
  const [items, setItems] = useState([]);
  const [dropdownValue, setDropdownValue] = useState();
  const [colors, setColors] = useState([
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Multi",
    "Khaki",
    "Pink",
    "White",
    "Orange",
    "Grey",
    "Purple",
    "Brown",
    "Black",
  ]);
  const {
    title,
    description,
    price,
    quantity,
    sold,
    showSubCategories,
    subCategoryOptions,
    subcategories,
    selectedSubCategories,
    categoryOptions,
    shipping,
  } = useSelector((state) => state.productDetail);

  const { token } = useSelector((state) => state.userDetail);
  const productDetail = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  /************************
   * Create product
   */
  const productCreateMutation = useMutation(
    () => createProduct(productDetail, token),
    {
      onSuccess: (data) => {
        toast.success("created: ", data.data.title);
        dispatch(RESET());
      },
      onError: (err) => {
        console.log("onError", err);
        toast.err("err");
      },
    }
  );

  /**************
   * Fetch Categories
   */

  const {
    data: categories,
    isFetched,
    refetch,
  } = useQuery("getCategories", getCategories, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      data.data.map((i) => {
        console.log("subCategoriesList ", subCategoriesList);
        setItems((prev) => [
          ...prev,
          {
            value: i._id,
            label: i.name,
            children: subCategoriesList?.data
              .filter((s) => i._id === s.parent)
              .map((s) => ({
                value: s._id,
                label: s.name,
              })),
          },
        ]);
      });
    },
  });

  /**************
   * Fetch All sub categories
   */

  const { data: subCategoriesList } = useQuery(
    "subCategoriesList",
    () => getSubCategories(),
    {
      refetchOnWindowFocus: false,
      // enabled: !!categories,
      onSuccess: (data) => {
        queryClient.invalidateQueries("getCategories");
        setItems([])
      },
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    productCreateMutation.mutate();
    console.log("hello");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(CHANGE_INPUT({ name, value }));
  }

  return (
    <KitForm onSubmit={handleSubmit}>
      <KitForm.Group as={KitRow} className="mb-3">
        <KitForm.Label as={KitCol}>
          Name<Asterik/>
        </KitForm.Label>
        <KitCol sm={10}>
          <KitForm.Control
            size="sm"
            type="text"
            placeholder="product name"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </KitCol>
      </KitForm.Group>

      {/***********
       * Categories
       */}
      <KitForm.Group as={KitRow} controlId="formGridCategory">
        <KitForm.Label as={KitCol}>
          Categories<Asterik>*</Asterik>
        </KitForm.Label>
        <KitCol sm={10}>
          <CascaderDropdown options={items} /> 
         
        </KitCol>
      </KitForm.Group>
      {showSubCategories && (
        <KitForm.Group as={KitCol} controlId="formGridSubCategory">
          <KitForm.Label className="col-form-label-sm">
            Sub Categories
          </KitForm.Label>
          {/* React Select start */}
          <MultiSelectInput subCategoryOptions={subCategoryOptions} />
          {/* React Select end */}
        </KitForm.Group>
      )}
      <KitForm.Group controlId="formGridAddress1" lg={4}>
        <KitForm.Label className="col-form-label-sm">Price</KitForm.Label>
        <KitInputGroup size="sm">
          <KitInputGroup.Text id="basic-addon2">Rs.</KitInputGroup.Text>
          <KitForm.Control
            type="number"
            placeholder="price"
            name="price"
            value={price}
            onChange={handleChange}
            required
          />
        </KitInputGroup>
      </KitForm.Group>
      <KitForm.Group as={KitCol} controlId="formGridQuantity">
        <KitForm.Label className="col-form-label-sm">Quantity</KitForm.Label>
        <KitForm.Control
          size="sm"
          type="number"
          placeholder="quantity"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          required
        />
      </KitForm.Group>
      <KitForm.Group as={KitCol} controlId="formGridPassword" lg={3}>
        <KitForm.Label className="col-form-label-sm">Description</KitForm.Label>
        <KitForm.Control
          size="sm"
          as="textarea"
          placeholder="description"
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
      </KitForm.Group>
      <KitRow>
        <KitForm.Group
          as={KitCol}
          className="mb-3"
          controlId="formGridSubCategory"
          lg={4}
        >
          <KitForm.Label className="col-form-label-sm">Colors</KitForm.Label>
          <KitForm.Select
            defaultValue="Choose..."
            onChange={handleChange}
            name="color"
          >
            <option>Choose colors...</option>
            {colors &&
              colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </KitForm.Select>
        </KitForm.Group>
        <KitForm.Group
          as={KitCol}
          className="mb-3"
          controlId="formGridShipping"
          lg={4}
        >
          <KitForm.Label className="col-form-label-sm">Shipping</KitForm.Label>
          <KitForm.Select
            defaultValue="Choose..."
            onChange={handleChange}
            name="shipping"
          >
            <option>Select....</option>
            {["Yes", "No"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </KitForm.Select>
        </KitForm.Group>
        <KitForm.Group as={KitCol} controlId="formGridAddress1">
          <KitForm.Label className="col-form-label-sm">Sold</KitForm.Label>
          <KitForm.Control
            size="sm"
            type="number"
            placeholder="0"
            name="sold"
            value={sold}
            onChange={handleChange}
          />
        </KitForm.Group>
      </KitRow>
      <KitButton
        variant="primary"
        type="submit"
        disabled={productCreateMutation.isLoading}
      >
        {productCreateMutation.isLoading ? <KitSpinner /> : "Submit"}
      </KitButton>
    </KitForm>
  );
};

export default ProductForm;

const Asterik = styled.span`
  color: #e62e04;
`;

const items = [
  {
    value: "1",
    label: "Menu 1",
    children: [
      {
        value: "11",
        label: "Another Item",
      },
      {
        value: "12",
        label: "More Items",
        children: [
          {
            value: "121",
            label: "Sub Item A",
          },
          {
            value: "122",
            label: "Sub Item B",
            disabled: true,
          },
          {
            value: "123",
            label: "Sub Item C",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "Menu 2",
  },
  {
    value: "3",
    label: "Menu 3",
    children: [
      {
        value: "31",
        label: "Hello",
      },
      {
        value: "21",
        label: "World",
      },
    ],
  },
];
