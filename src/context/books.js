import { createContext, useCallback, useState } from "react";
import axios from "axios";
const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBook = useCallback(async () => {
    const result = await axios.get("http://localhost:3001/books");
    setBooks(result.data);
  }, []);

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const deleteBookbyId = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const removeBook = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(removeBook);
  };
  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });

    const updatedBooks = [...books, response.data];

    setBooks(updatedBooks);
  };

  const valueToShare = {
    books,
    editBookById,
    createBook,
    fetchBook,
    deleteBookbyId,
  };
  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}
export { Provider };
export default BooksContext;
