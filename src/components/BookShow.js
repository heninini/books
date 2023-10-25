import { useContext, useState } from "react";
import BookEdit from "./BookEdit";
import BooksContext from "../context/books";
function BookShow({ book }) {
  const { editBookById, deleteBookbyId } = useContext(BooksContext);
  const [showEdit, setEdit] = useState(false);

  const handleDeleteClick = () => {
    deleteBookbyId(book.id);
  };
  const handleEditClick = () => {
    setEdit(!showEdit);
  };
  const handleSubmit = () => {
    setEdit(false);
  };

  let content = <h3>t{book.title}</h3>;

  if (showEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit} />;
  }

  return (
    <div className="book-show">
      <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
      {content}
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>

        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
