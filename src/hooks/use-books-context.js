// just used it to have a little idea about cutom hooks only used for edit component
import { useContext } from "react";
import BooksContext from "../context/books";

function useBooksContext() {
  return useContext(BooksContext);
}

export default useBooksContext;
