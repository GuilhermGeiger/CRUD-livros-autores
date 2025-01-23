import React from 'react';

interface Author {
  id: number;
  name: string;
  email?: string;
}

interface AuthorTableProps {
  authors: Author[];
  onDelete: (id: number) => void;
  onView: (author: Author) => void;  // Esperando a função onView
}

const AuthorTable: React.FC<AuthorTableProps> = ({ authors, onDelete, onView }) => {
  return (
    <table className="author-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.id}</td>
            <td>{author.name}</td>
            <td>{author.email || 'Não informado'}</td>
            <td className='actions'>
              <button onClick={() => onView(author)}>Ver</button>
              <button onClick={() => onDelete(author.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AuthorTable;
