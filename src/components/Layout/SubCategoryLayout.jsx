import React from "react";
import {
  KitRow,
  KitCol,
  KitListGroup,
  KitCard,
  KitTable,
} from "../../kit/index";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../Form/CategoryForm";
import SearchForm from "../../components/Form/SearchForm";
import styled from "styled-components";
const CategoryLayout = ({
  cardHeader,
  data,
  handleSubmit,
  value,
  isButtonLoading,
  setName,
  keyword,
  searchInputChange,
  removeCategory,
  loadCategories,
  token,
}) => {
  const navigate = useNavigate();
  return (
    <SRow>
      <KitCol lg={3}>
        <KitCard className="p-3">
          <KitCard.Title>{cardHeader}</KitCard.Title>
          <CategoryForm
            handleSubmit={handleSubmit}
            value={value}
            isButtonLoading={isButtonLoading}
            setName={setName}
          />
        </KitCard>
      </KitCol>
      <KitCol lg={9}>
        <SearchForm keyword={keyword} searchInputChange={searchInputChange} />

        {data && (
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
              {data.map((d, i) => (
                <tr key={d._id}>
                  <td>{i + 1}</td>
                  <td>{d.name}</td>
                  <td>Otto</td>
                  <td>
                    <span
                      onClick={() => {
                        navigate(`/admin/category/${d.slug}`);
                      }}
                    >
                      edit
                    </span>{" "}
                    <span
                      onClick={() => {
                        alert("Are you sure to delete?");
                        removeCategory(d.slug, token)
                          .then((res) => {
                            loadCategories();
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </KitTable>
        )}
      </KitCol>
    </SRow>
  );
};

export default CategoryLayout;

const SRow = styled(KitRow)`
  padding: 1rem;
`;
