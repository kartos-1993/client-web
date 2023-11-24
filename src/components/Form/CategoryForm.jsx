import React, { useState } from "react";

// import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  updateCategory,
  getCategory,
  createCategory,
} from "../../api/category";
// import { Form, FormGroup, Input, Label } from "./Form";

import styled from "styled-components";
import { useSelector } from "react-redux";

import { KitButton, KitSpinner, KitForm } from "../../kit";

import { useMutation, useQueryClient, QueryClient } from "react-query";


const CategoryForm = ({
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

export default CategoryForm;
