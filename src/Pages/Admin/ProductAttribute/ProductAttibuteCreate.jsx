import React, { useState, useEffect } from "react";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../api/category";
import {
  createProductAttribute,
  getProductAttribute,
  getAllProductAttributes,
  updateProductAttribute,
  removeProductAttribute,
} from "../../../api/productAttribute";

import { useSelector } from "react-redux";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  KitRow,
  KitCol,
  KitCard,
  KitTable,
  KitSpinner,
  KitForm,
  KitModal,
  KitButton,
} from "../../../kit/index";
import ProductAttributeForm from "../../../components/Form/ProductAttributeForm";

import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import SearchInput from "../../../components/Form/SearchInput";
import { getSubCategories } from "../../../api/subCategory";

const ProductAttibuteCreate = () => {
  const { token } = useSelector((state) => state.userDetail);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedSubCategory, setselectedSubCategory] = useState("Choose...");
  const [toDeleteProductAttribute, setToDeleteProductAttribute] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Add Product Attributes";
  }, []);

  const {
    data: subCategories,
    isSuccess: subCategorySuccess,
    isLoading: subCategoryLoading,
  } = useQuery("loadSubCategories", getSubCategories, {
    refetchOnWindowFocus: false,
  });

  const {
    data: productAttributes,
    isSuccess: productAttributeSuccess,
    isLoading: productAttributeLoading,
    isFetching,
  } = useQuery("getAllProductAttributes", getAllProductAttributes, {
    refetchOnWindowFocus: false,
  });

  /*
DELETE PRODUCT ATTRIBUTE
*/

  const deleteProductAttribute = useMutation(
    (id) => removeProductAttribute(id, token),
    {
      onSuccess: () => {
        setShow(false);
        navigate("/admin/product-attribute");
        queryClient.invalidateQueries("getAllProductAttributes");
      },
      onError: (err) => {
        const {
          code,
          keyValue: { slug },
        } = err.response.data;
        if (code === 11000) {
          toast.error(`${slug} already exists`);
        } else if (code === "auth/id-token-expired") {
          toast.error("please login again");
        } else {
          toast.error(`something went wrong`);
        }
      },
    }
  );

  const createProductAttributeMutation = useMutation(
    () => createProductAttribute({ name, parent: selectedSubCategory }, token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getAllProductAttributes");
        // toast.success("category added");
        setName("");
      },
      onError: (err) => {
        console.log("createcategory error", err.response);
        const {
          code,
          keyValue: { slug },
        } = err.response.data;
        if (code === 11000) {
          toast.error(`${slug} already exists`);
        } else if (code === "auth/id-token-expired") {
          toast.error("please login again");
        } else {
          toast.error(`something went wrong`);
        }
      },
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    createProductAttributeMutation.mutate(name);
  }

  const searchInputChange = (e) => setKeyword(e.target.value);

  return (
    <SRow>
      <KitCol lg={3}>
        <KitCard className="p-3">
          <KitCard.Title>Add Product Attribute</KitCard.Title>
          <ProductAttributeForm
            handleSubmit={handleSubmit}
            setName={setName}
            name={name}
            loading={createProductAttributeMutation.isLoading}
            placeholder="attribute"
            subCategories={subCategories && subCategories.data}
            selectedSubCategory={selectedSubCategory}
            setselectedSubCategory={setselectedSubCategory}
          />
        </KitCard>
      </KitCol>
      <KitCol lg={9}>
        <SearchInput keyword={keyword} searchInputChange={searchInputChange} />

        {/* {isFetching && <KitSpinner as="span" size="sm" />} */}

        {subCategoryLoading ? (
          <KitSpinner as="span" size="sm" />
        ) : (
          <KitTable striped hover size="sm">
            <thead>
              <tr>
                <th></th>
                <th>Attributes</th>
                <th>Sub Category***</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productAttributes &&
                productAttributes.data.map((d, i) => (
                  <tr key={d._id}>
                    <td>{i + 1}</td>
                    <td>{d.name}</td>
                    <td>Otto</td>
                    <td>
                      <Sspan>
                        <FiEdit
                          onClick={() => {
                            navigate(`/admin/product-attribute/${d.slug}`);
                          }}
                        />
                      </Sspan>{" "}
                      <Sspan>
                        <VscChromeClose
                          onClick={() => {
                            setShow(true);
                            setToDeleteProductAttribute(d.slug);
                          }}
                        />
                      </Sspan>
                    </td>
                  </tr>
                ))}
            </tbody>
          </KitTable>
        )}
      </KitCol>

      <KitModal
        show={show}
        setShow={setShow}
        title="Delete Category"
        path={pathname}
      >
        Are you sure you want to delete?{" "}
        <KitButton
          onClick={() =>
            deleteProductAttribute.mutate(toDeleteProductAttribute)
          }
        >
          {deleteProductAttribute.isLoading ? <KitSpinner /> : "Delete"}
        </KitButton>
      </KitModal>
    </SRow>
  );
};

export default ProductAttibuteCreate;

const SRow = styled(KitRow)`
  padding: 1rem;
`;

const Sspan = styled.span`
  cursor: pointer;
  svg {
    color: black;
    width: 24px;
    height: 24px;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
