import axios from "axios";

const client = axios.create({
  baseURL: "https://front-end-todo-test.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});

export const request = ({ ...options }) => {
  client.interceptors.request.use((config) => {
    config.params = {
      key: "ois-006",
      ...config.params,
    };
    return config;
  });

  const onSuccess = (response) => response;
  const onError = (error) => {
    // optionaly catch errors and add additional logging here
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
