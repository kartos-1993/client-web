import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import styled from "styled-components";
import SearchForm from "../../../components/Form/SearchInput";
import {
  KitRow,
  KitCol,
  KitTable,
  KitCard,
  KitSpinner,
  KitModal,
  KitButton,
  KitContainer,
} from "../../../kit";
import {
  getSubCategories,
  createSubCategory,
  removeSubCategory,
} from "../../../api/subCategory";

import SubCategoryForm from "../../../components/Form/SubCategoryForm";
import { useSelector } from "react-redux";
import { getCategories } from "../../../api/category";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";

const SubCategoryCreate = () => {
  const { token } = useSelector((state) => state.userDetail);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Choose");
  const [toDeleteSubCategory, setToDeleteSubCategory] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    data: categories,
    isSuccess,
    isLoading,
  } = useQuery("loadCategories", getCategories, {
    refetchOnWindowFocus: false,
  });

  const {
    data: subCategories,
    isSuccess: subCategorySuccess,
    isLoading: subCategoryLoading,
    isFetching,
  } = useQuery("loadSubCategories", getSubCategories, {
    refetchOnWindowFocus: false,
  });

  const subCategoryCreate = useMutation(
    () => createSubCategory({ name, parent: selectedCategory }, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("loadSubCategories");
        setName("");
        setSelectedCategory("");
      },
      onError: (err) => {
        console.log(err.response.data.code);
        const {
          code,
          keyValue: { slug },
        } = err.response.data;
        if (code === 11000) {
          toast.error(`${slug} already exists`);
        } else if (err.response.data.code === "auth/id-token-expired") {
          toast.error("please login again");
        } else {
          toast.error(`something went wrong`);
        }
      },
      onSettled: () => {
        subCategoryLoading === false;
      },
    }
  );

  const deleteSubCategory = useMutation((id) => removeSubCategory(id, token), {
    onSuccess: () => {
      queryClient.invalidateQueries("loadSubCategories");
      setShow(false);
      navigate("/admin/sub");
    },
    onError: (err) => {
      const {
        code,
        keyValue: { slug },
      } = err.response.data;
      if (code === 11000) {
        toast.error(`${slug} already exists`);
      } else if (err.response.data.code === "auth/id-token-expired") {
        toast.error("please login again");
      } else {
        toast.error(`something went wrong`);
      }
    },
    onSettled: () => {
      subCategoryLoading === false;
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedCategory === "") {
      toast.error("must select a category");
      return;
    }
    subCategoryCreate.mutate();
  }

  const searchInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <SRow>
      <KitCol lg={3}>
        <KitCard className="p-3">
          <KitCard.Title>Add Sub Category</KitCard.Title>
          <SubCategoryForm
            handleSubmit={handleSubmit}
            setName={setName}
            name={name}
            loading={subCategoryCreate.isLoading}
            placeholder="sub category"
            categories={categories && categories.data}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </KitCard>
      </KitCol>
      <KitCol lg={9}>
        <SearchForm keyword={keyword} searchInputChange={searchInputChange} />

        {/* {isFetching && <KitSpinner as="span" size="sm" />} */}

        {isLoading ? (
          <KitSpinner as="span" size="sm" bordered />
        ) : (
          <KitTable striped hover size="sm">
            <thead>
              <tr>
                <th></th>
                <th>Sub Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subCategorySuccess &&
                subCategories.data.map((d, i) => (
                  <tr key={d._id}>
                    <td>{i + 1}</td>
                    <td>{d.name}</td>

                    <td>
                      <Sspan>
                        <FiEdit
                          onClick={() => {
                            navigate(`/admin/sub/${d.slug}`);
                          }}
                        />
                      </Sspan>
                      <Sspan>
                        <VscChromeClose
                          onClick={() => {
                            setShow(true);
                            setToDeleteSubCategory(d.slug);
                            // deleteCategory.mutate(d.slug);
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
        title="Delete Sub Category"
        path={pathname}
      >
        <KitContainer className="mb-3">
          <p>Are you sure you want to delete?</p>
          <KitButton
            onClick={() => deleteSubCategory.mutate(toDeleteSubCategory)}
          >
            {deleteSubCategory.isLoading ? <KitSpinner /> : "Delete"}
          </KitButton>{" "}
        </KitContainer>
      </KitModal>
    </SRow>
  );
};

export default SubCategoryCreate;

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
