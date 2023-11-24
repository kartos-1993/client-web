import axios from "axios";

//get all categories
export const getCategories = async () => {
  return await axios.get(`${import.meta.env.VITE_API}/categories`);
};

//get a single category
export const getCategory = async (slug) => {
  return await axios.get(`${import.meta.env.VITE_API}/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${import.meta.env.VITE_API}/category/${slug}`, {
    headers: { authtoken },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(`${import.meta.env.VITE_API}/category/${slug}`, category, {
    headers: { authtoken },
  });
};

export const createCategory = async (category, authtoken) => {
  return await axios.post(`${import.meta.env.VITE_API}/category`, category, {
    headers: { authtoken },
  });
};

export const getCategorySubs = async (_id) => {
 return await axios.get(`${import.meta.env.VITE_API}/category/subs/${_id}`)
}