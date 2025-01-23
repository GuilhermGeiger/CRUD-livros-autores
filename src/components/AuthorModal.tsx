import React, { useState, useEffect } from 'react';
import { Author, Book } from '../App';

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (author: Author) => void;
  author?: Author | null;
  mode: 'view' | 'edit';
  books?: Book[];
}

const AuthorModal: React.FC<AuthorModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  author,
  mode,
  books,
}) => {
  const [name, setName] = useState(author?.name || '');
  const [email, setEmail] = useState(author?.email || '');

  useEffect(() => {
    if (author) {
      setName(author.name);
      setEmail(author.email || '');
    }
  }, [author]);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (onSubmit) {
      // Não gere o ID aqui, apenas passe os dados para o `onSubmit`
      onSubmit({ id: author?.id || 0, name, email });
    }
    onClose();
    window.location.reload();
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{mode === 'edit' ? 'Adicionar Autor' : 'Detalhes do Autor'}</h2>
        {mode === 'view' ? (
          <>
            <p>
              <strong>ID:</strong> {author?.id}
            </p>
            <p>
              <strong>Nome:</strong> {author?.name}
            </p>
            <p>
              <strong>Email:</strong> {author?.email || 'Não informado'}
            </p>
            <h4>Livros:</h4>
            {books && books.length > 0 ? (
              <ul>
                {books.map((book) => (
                  <li key={book.id}>{book.name}</li>
                ))}
              </ul>
            ) : (
              <p>Este autor não possui livros cadastrados.</p>
            )}
          </>
        ) : (
          <>
          <div className='add_buttons'>
            <label>
              Nome:
              <input
                type="text"
                placeholder='Digite o nome do autor'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                placeholder='Digite o email do autor'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            </div>
            <button onClick={handleSubmit}>Salvar</button>
          </>
        )}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default AuthorModal;
