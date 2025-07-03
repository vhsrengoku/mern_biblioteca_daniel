import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook, deleteBook, updateBook } from "./api";

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createBook"],
    mutationFn: (data) => createBook(data),
    onMutate: () => {
      return queryClient.getQueryData(["books"]);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["books"], (oldData) => [...oldData, data]);
    },
    onError: (error, _variables, context) => {
      console.error("Error creating book: ", error);
      queryClient.setQueryData(["books"], context);
    },
  });
};

export const useUpdateBook = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateBook", id],
    mutationFn: (data) => updateBook(id, data),
    onMutate: () => {
      return queryClient.getQueryData(["books"]);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["books"], (oldData) => {
        return oldData.map((book) => (book._id === id ? data : book));
      });
    },
    onError: (error, _variables, context) => {
      console.error("Error creating book: ", error);
      queryClient.setQueryData(["books"], context);
    },
  });
};

export const useDeleteBook = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteBook", id],
    mutationFn: (bookId) => deleteBook(bookId),
    onMutate: () => {
      return queryClient.getQueryData(["books"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["books"], (oldData) => {
        return oldData.filter((book) => book._id !== id);
      });
    },
    onError: (error, _variables, context) => {
      console.error("Error creating book: ", error);
      queryClient.setQueryData(["books"], context);
    },
  });
};