import React from 'react';

interface Book {
  id: number;
  name: string;
  pages?: number;
  authorId: number;
}

interface BookTableProps {
  books: Book[];
  onDelete: (id: number) => void;
  onView: (book: Book) => void;  // Esperando a função onView
}

const BookTable: React.FC<{ books: Book[]; onDelete: (id: number) => void; onView: (book: Book) => void }> = ({ books, onDelete, onView }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Páginas</th>
          <th>Author ID</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.pages || 'N/A'}</td>
            <td>{book.authorId || 'N/A'}</td>
            <td className='actions'>
              <button onClick={() => onView(book)}>Ver</button>
              <button onClick={() => onDelete(book.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default BookTable;
