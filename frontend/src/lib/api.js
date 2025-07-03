import axios from "axios";

const API_VERSION = "v1";

const axiosInstance = axios.create({
  baseURL: `/api/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error, message) => {
  console.error(message, error);
  throw error;
};

export const createBook = async (data) => {
  try {
    const response = await axiosInstance.post("/books", data);
    return response.data.data;
  } catch (error) {
    handleError(error, "Error creating book");
  }
};

export const getBooks = async () => {
  try {
    const response = await axiosInstance.get("/books");
    return response.data.data;
  } catch (error) {
    handleError(error, "Error getting books");
  }
};

export const updateBook = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/books/${id}`, data);
    return response.data.data;
  } catch (error) {
    handleError(error, "Error updating book");
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axiosInstance.delete(`/books/${id}`);
    return response.data.data;
  } catch (error) {
    handleError(error, "Error deleting book");
  }
};
