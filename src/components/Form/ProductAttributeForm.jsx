import React, { useState } from "react";
import { KitButton, KitSpinner, KitForm } from "../../kit";
import Asterik from "./Asterik";

const ProductAttributeForm = ({
  handleSubmit,
  setName,
  name,
  loading,
  placeholder,
  selectedSubCategory,
  setselectedSubCategory,
  subCategories,
}) => {
  return (
    <KitForm onSubmit={handleSubmit}>
      <KitForm.Group className="mb-3" controlId="formBasicEmail">
        <KitForm.Control
          type="text"
          placeholder={placeholder}
          name="categoryTitle"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className="mb-3"
        />
        {subCategories && (
          <>
            <KitForm.Label>
              Sub Category <Asterik />
            </KitForm.Label>
            <KitForm.Select
              value={selectedSubCategory}
              onChange={(e) => setselectedSubCategory(e.target.value)}
            >
              <option>Choose...</option>
              {subCategories.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name}
                </option>
              ))}
            </KitForm.Select>
          </>
        )}
      </KitForm.Group>

      <KitButton
        variant="primary"
        type="submit"
        disabled={loading || name === "" || selectedSubCategory === "Choose..."}
      >
        {loading ? <KitSpinner as="span" size="sm" /> : "Add"}
      </KitButton>
    </KitForm>
  );
};

export default ProductAttributeForm;
