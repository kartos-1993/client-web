import React, { useState, useEffect } from "react";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../api/category";
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
import {SearchInput,CategoryForm} from "../../../components/Form"


import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";

const CategoryCreate = () => {
  const { token } = useSelector((state) => state.userDetail);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [toDeleteCategory, setToDeleteCategory] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Add Category";
  }, []);

  const {
    data: categories,
    isSuccess,
    isLoading,
    isFetching,
  } = useQuery("loadCategories", getCategories, {
    refetchOnWindowFocus: false,
  });
  /*
MUTATIONS
*/
  const deleteCategory = useMutation((id) => removeCategory(id, token), {
    onSuccess: () => {
      setShow(false);
      navigate("/admin/category");
      queryClient.invalidateQueries("loadCategories");
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
  });

  const createCategoryMutation = useMutation(
    (title) => createCategory({ name: title }, token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("loadCategories");
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
    createCategoryMutation.mutate(name);
  }

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value)
  };

  return (
    <SRow>
      <KitCol lg={3}>
        <KitCard className="p-3">
          <KitCard.Title>Add Category</KitCard.Title>
          <CategoryForm
            handleSubmit={handleSubmit}
            setName={setName}
            name={name}
            loading={createCategoryMutation.isLoading}
            placeholder="category"
          />
        </KitCard>
      </KitCol>
      <KitCol lg={9}>
        <SearchInput
          keyword={searchText}
          searchInputChange={handleSearchInputChange}
        />

        {/* {isFetching && <KitSpinner as="span" size="sm" />} */}

        {isLoading ? (
          <KitSpinner as="span" size="sm" />
        ) : (
          <KitTable striped hover size="sm">
            <thead>
              <tr>
                <th></th>
                <th>Category</th>
                <th>Sub Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.data.map((d, i) => (
                  <tr key={d._id}>
                    <td>{i + 1}</td>
                    <td>{d.name}</td>
                    <td>Otto</td>
                    <td>
                      <Sspan>
                        <FiEdit
                          onClick={() => {
                            navigate(`/admin/category/${d.slug}`);
                          }}
                        />
                      </Sspan>{" "}
                      <Sspan>
                        <VscChromeClose
                          onClick={() => {
                            setShow(true);
                            setToDeleteCategory(d.slug);
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
        title="Delete Category"
        path={pathname}
      >
        Are you sure you want to delete?{" "}
        <KitButton onClick={() => deleteCategory.mutate(toDeleteCategory)}>
          {deleteCategory.isLoading ? <KitSpinner /> : "Delete"}
        </KitButton>
      </KitModal>
    </SRow>
  );
};

export default CategoryCreate;

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
