import React, { useState } from "react";



import { KitButton, KitSpinner, KitForm } from "../../kit";

import Asterik from "./Asterik";

const SubCategoryForm = ({
  handleSubmit,
  setName,
  name,
  loading,
  placeholder,
  selectedCategory,
  setSelectedCategory,
  categories,
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
        {categories && (
          <>
          <KitForm.Label>Category <Asterik/></KitForm.Label>
            <KitForm.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>Choose...</option>
              {categories.map((o) => (
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
        disabled={loading || name === "" || selectedCategory === "Choose..."}
      >
        {loading ? <KitSpinner as="span" size="sm" /> : "Add"}
      </KitButton>
    </KitForm>
  );
};

export default SubCategoryForm;
