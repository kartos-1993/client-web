import React, { useState, useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getSubCategory, updateSubCategory } from "../../../api/subCategory";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getCategories, getCategory } from "../../../api/category";
import { KitContainer, KitForm, KitModal, KitButton, KitSpinner } from "../../../kit";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "react-query";

const SubCategoryUpdate = () => {
  const location = useLocation();
  const { slug } = useParams();
  const { token } = useSelector((state) => state.userDetail);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);

  const [show, setShow] = useState(true);

  useEffect(() => {
    document.title = "Update Sub Category";
  }, []);

  const {
    data: categories,
    isLoading: categoriesLoading,
    isSuccess,
  } = useQuery("loadCategories", getCategories, {
    refetchOnWindowFocus: false,
  });

  const { data: subCategory } = useQuery(
    "loadSubCategory",
    () => getSubCategory(slug),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setName(data.data.name);
        setParent(data.data.parent);
      },
    }
  );
  //  const { data: category, isLoading } = useQuery(
  //    "loadCategory",
  //    () => getCategory(parent),
  //    {
  //     enabled: !!parent
  //    }

  //  );

  // console.log("category: ", category)

  const subCategoryUpdate = useMutation(
    () => updateSubCategory(slug, { name, parent }, token),
    {
      onSuccess: () => {
        setShow(false);
      },
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    subCategoryUpdate.mutate();
    updateSubCategory(slug, { name, parent }, token)
      .then((res) => {
        console.log(res);
        navigate("/admin/sub");
        setName("");
        setButtonLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <KitModal
      show={show}
      setShow={setShow}
      title={"Update Sub Category"}
      path={"/admin/sub"}
    >
      <KitForm onSubmit={handleSubmit}>
        <KitForm.Group className="mb-3" controlId="formBasicEmail">
          <p>select a category</p>
          {isSuccess && (
            <KitForm.Select
              onChange={(e) => setParent(e.target.value)}
              value={parent}
              key={"select"}
              className="mb-3"
            >
              <option key={"select"}>Select</option>
              {categories.data.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </KitForm.Select>
          )}
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
          disabled={subCategoryUpdate.isLoading || name === slug}
        >
          {subCategoryUpdate.isLoading ? <KitSpinner size="sm" /> : "Update"}
        </KitButton>
      </KitForm>
    </KitModal>
  );
};

export default SubCategoryUpdate;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Section = styled.section``;
