import React, { useState, useEffect } from 'react';
import { Book, Author } from '../App';


interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (book: Book) => void; 
  book?: Book | null;
  mode: 'view' | 'edit' | 'create';
  authors: Author[]; 
  setIsAuthorModalOpen: (isOpen: boolean) => void;
}

const BookModal: React.FC<BookModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  book,
  mode,
  authors,
  setIsAuthorModalOpen, 
}) => {
  const [name, setName] = useState(book?.name || '');
  const [pages, setPages] = useState(book?.pages || 0);
  const [selectedAuthorId, setSelectedAuthorId] = useState<number>(
    book?.authorId || 0
  );

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPages(0);
      setSelectedAuthorId(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (book) {
      setName(book.name);
      setPages(book.pages || 0);
      setSelectedAuthorId(book.authorId || 0);
    }
  }, [book]);

  const handleSubmit = () => {
    if (!selectedAuthorId) {
      alert('Por favor, selecione um autor válido.');
      return;
    }
  
    const bookData: Book = {
      id: book?.id || Date.now(),
      name,
      pages,
      authorId: selectedAuthorId,
    };
  
    if (onSubmit) {
      onSubmit(bookData);
    }
  
    onClose();
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{mode === 'edit' ? 'Editar Livro' : 'Detalhes do Livro'}</h2>
        {mode === 'view' ? (
          <>
            <p><strong>ID:</strong> {book?.id || 'N/A'}</p>
            <p><strong>Nome:</strong> {book?.name || 'Não informado'}</p>
            <p><strong>Páginas:</strong> {book?.pages || 'Não informado'}</p>
            <p><strong>ID do Autor:</strong> {book?.authorId || 'N/A'}</p>
            <p><strong>Autor:</strong> {authors.find(a => a.id === book?.authorId)?.name || 'Autor não encontrado'}</p>
          </>
        ) : (
          <>
            <div className='add_buttons'>
              <label>
                Nome:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o nome do livro"
                />
              </label>
              <label>
                Páginas:
                <input
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(Math.max(0, Number(e.target.value)))}
                  placeholder="Digite o número de páginas"
                />
              </label>
              <label>
                Autor:
                <select
                  value={selectedAuthorId}
                  onChange={(e) => setSelectedAuthorId(Number(e.target.value))}
                >
                  <option value="0">Selecione um autor</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button onClick={handleSubmit}>Salvar</button>
          </>
        )}
        <button onClick={onClose}>Fechar</button>
        <button onClick={() => setIsAuthorModalOpen(true)}>+</button>
      </div>
    </div>
  );
};

export default BookModal;
