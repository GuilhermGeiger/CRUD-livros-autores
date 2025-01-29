import React, { useState, useEffect } from 'react';
import BookTable from './components/BookTable';
import AuthorTable from './components/AuthorTable';
import BookModal from './components/BookModal';
import AuthorModal from './components/AuthorModal';
import './App.css';

export interface Book {
  id: number;
  name: string;
  pages?: number;
  authorId: number;
  author?: Author | null;
}

export interface Author {
  id: number;
  name: string;
  email?: string;
  books?: Book[];
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  
  useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    const savedAuthors = localStorage.getItem('authors');

    if (savedBooks) {
      const loadedBooks: Book[] = JSON.parse(savedBooks);
      
      const resetBooks = loadedBooks.map((book, index) => ({
        ...book,
        id: index + 1, 
      }));
      setBooks(resetBooks);
    }

    if (savedAuthors) {
      const loadedAuthors: Author[] = JSON.parse(savedAuthors);
      
      const resetAuthors = loadedAuthors.map((author, index) => ({
        ...author,
        id: index + 1, 
      }));
      setAuthors(resetAuthors);
    }
  }, []); 

  
  useEffect(() => {
    if (books.length) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, [books]);

  
  useEffect(() => {
    if (authors.length) {
      localStorage.setItem('authors', JSON.stringify(authors));
    }
  }, [authors]);

  //Função para adicionar livros
  const addBook = (data: { name: string; pages?: number; authorId: number }) => {
    const authorExists = authors.some((author) => author.id === data.authorId);

    if (!data.name.trim()) {
      alert('O nome do livro é obrigatório. Por favor, forneça um nome válido.');
      return;
    }

    if (!authorExists) {
      alert('Autor não encontrado. Por favor, selecione um autor válido. Caso seu autor não esteja cadastrado, clique no botão "+" para adicioná-lo');
      return;
    }
  
    const nextId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  
    const newBook: Book = {
      id: nextId,
      ...data,
    };
  
    setBooks([...books, newBook]);

    window.location.reload()
  };

  const updateBook = (updatedBook: Book) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks)); 
  };

  const updateAuthor = (updatedAuthor: Author) => {
    const updatedAuthors = authors.map((author) =>
      author.id === updatedAuthor.id ? updatedAuthor : author
    );
    setAuthors(updatedAuthors);
    localStorage.setItem('authors', JSON.stringify(updatedAuthors)); 
  };
  
  

  //Função para adicionar autores
  const addAuthor = (data: { name: string; email?: string }) => {
    const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    };

    if (!data.name.trim()) {
      alert('O nome do autor é obrigatório. Por favor, forneça um nome válido.');
      return;
    }

    if (data.email && !isValidEmail(data.email)) {
      alert('Email inválido. Por favor, forneça um email válido.');
      return;
    }
    
    const nextId = authors.length > 0 ? Math.max(...authors.map((a) => a.id)) + 1 : 1;
    const newAuthor: Author = {
      id: nextId, 
      ...data,
    };
    setAuthors([...authors, newAuthor]);
};


  // Funções para excluir livros e autores
  const deleteBook = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      localStorage.setItem('books', JSON.stringify(updatedBooks)); 
    }
  };

  const deleteAuthor = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este autor?')) {
      const updatedAuthors = authors.filter((author) => author.id !== id);
      setAuthors(updatedAuthors);
      localStorage.setItem('authors', JSON.stringify(updatedAuthors)); 
    }
  };

  // Funções para exibir modais com detalhes de livros e autores
  const viewBook = (book: Book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  const viewAuthor = (author: Author) => {
    setSelectedAuthor(author);
    setIsAuthorModalOpen(true);
  };

  // Função para obter os livros vinculados a um autor
  const getBooksByAuthorId = (authorId: number): Book[] => {
    return books.filter((book) => book.authorId === authorId);
  };

  // Função para obter o autor de um livro
  const getAuthorById = (id: number): Author | null => {
    return authors.find((author) => author.id === id) || null;
  };

  const closeBookModal = () => {
    setSelectedBook(null);
    setIsBookModalOpen(false);
  };
  
  const closeAuthorModal = () => {
    setSelectedAuthor(null);
    setIsAuthorModalOpen(false);
  };

  return (
      <div className="app-container">
        <header className="app-header">
          <h1>Gerenciador de Livros e Autores</h1>
          <p>Organize e gerencie suas coleções de forma fácil e eficiente.</p>
        </header>
  
        <main className="app-main">
          <div className="actions">
          <button onClick={() => setIsAuthorModalOpen(true)}>Adicionar Autor</button>
            <button onClick={() => setIsBookModalOpen(true)}>Adicionar Livro</button>
          </div>
  
          <h2>Livros</h2>
          <BookTable
          books={books}
          onDelete={deleteBook}
          onView={viewBook}
          onEdit={(book) => {
            setSelectedBook(book);
            setIsBookModalOpen(true); 
          }}
        />

          <h2>Autores</h2>
          <AuthorTable
            authors={authors}
            onDelete={deleteAuthor}
            onView={(author) => {
              setSelectedAuthor(author); 
              setIsAuthorModalOpen(true);
            }}
            onEdit={(author) => {
              setSelectedAuthor(author); 
              setIsAuthorModalOpen(true); 
            }}
          />

  
          <BookModal
            isOpen={isBookModalOpen}
            onClose={closeBookModal}
            onSubmit={selectedBook ? updateBook : addBook} // Passa a função correta
            book={selectedBook}
            mode={selectedBook ? 'edit' : 'create'} // Novo modo para diferenciar criação e edição
            authors={authors}
            setIsAuthorModalOpen={setIsAuthorModalOpen}
        />

          <AuthorModal
            isOpen={isAuthorModalOpen}
            onClose={closeAuthorModal}
            onSubmit={selectedAuthor ? updateAuthor : addAuthor} // Define se é criação ou edição
            author={selectedAuthor}
            mode={selectedAuthor ? 'edit' : 'create'} // Diferencia os modos de edição e criação
            books={selectedAuthor ? getBooksByAuthorId(selectedAuthor.id) : []}
          />


        </main>
  
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Gerenciador de Livros e Autores. Todos os direitos reservados.</p>
          <p>Produzido por Guilherme Geiger.</p>
        </footer>
      </div>
    );
};

export default App;
