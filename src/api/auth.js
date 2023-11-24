import axios from "axios";

export const createOrUpdateUser = async (authtoken, photoURL) => {
  return await axios.post(
    `${import.meta.env.VITE_API}/create-or-update-user`,
    {photoURL},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const currentUser = async (authtoken) => {
  return await axios.post(
    `${import.meta.env.VITE_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${import.meta.env.VITE_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

