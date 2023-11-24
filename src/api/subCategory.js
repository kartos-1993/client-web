import axios from "axios";

export const getSubCategories = async () => {
  return await axios.get(`${import.meta.env.VITE_API}/subs`);
};

export const getSubCategory = async (slug) => {
  return await axios.get(`${import.meta.env.VITE_API}/sub/${slug}`);
};


export const removeSubCategory = async (slug, authtoken) => {
  return await axios.delete(`${import.meta.env.VITE_API}/sub/${slug}`, {
    headers: { authtoken },
  });
};

export const updateSubCategory = async (slug, subcategory, authtoken) => {
  return await axios.put(
    `${import.meta.env.VITE_API}/sub/${slug}`,
    subcategory,
    {
      headers: { authtoken },
      parent: { parent },
    }
  );
};

export const createSubCategory = async (subcategory, authtoken) => {
  return await axios.post(`${import.meta.env.VITE_API}/sub`, subcategory, {
    headers: { authtoken },
    parent: { parent },
  });
};
