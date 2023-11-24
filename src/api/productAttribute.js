import axios from "axios"


/**fetch all productAttribute */
export const getAllProductAttributes = async () => {
  return await axios.get(`${import.meta.env.VITE_API}/product-attribute`);

}

/**fetch single  productAttribute */
export const getProductAttribute = async (slug) => {
  return await axios.get(`${import.meta.env.VITE_API}/product-attribute/${slug}`);

}



/**create product attribute */
export const createProductAttribute = async (category, authtoken) => {
  return await axios.post(`${import.meta.env.VITE_API}/product-attribute`, category, {
    headers: { authtoken },
  });
};

/**update product attribute */
export const updateProductAttribute = async (slug, productAttribute, authtoken) => {
  return await axios.put(
    `${import.meta.env.VITE_API}/product-attribute/${slug}`,
    productAttribute,
    {
      headers: { authtoken },
    }
  );
};

/**delete product attribute */
export const removeProductAttribute = async (slug, authtoken) => {
  return await axios.delete(`${import.meta.env.VITE_API}/product-attribute/${slug}`, {
    headers: { authtoken },
  });
};