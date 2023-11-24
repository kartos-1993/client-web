import axios from "axios";

export const createProduct = async (product,authtoken) => {
    return axios.post(`${import.meta.env.VITE_API}/product`, product, 
    {
        headers:{authtoken}
    })
}