import { useQuery } from "@tanstack/react-query";
import { getBooks } from "./api";

export const useBooks = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const useBook = (bookId) =>
  useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBooks(bookId),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });