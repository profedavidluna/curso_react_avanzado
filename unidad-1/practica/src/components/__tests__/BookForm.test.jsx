import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookForm from '../BookForm';

const mockAuthors = [
  { id: 'a1', name: 'Gabriel García Márquez' },
  { id: 'a2', name: 'Dan Brown' },
];

const mockCategories = [
  { id: 'c1', name: 'Ficción & Novela' },
  { id: 'c2', name: 'Suspenso & Thriller' },
];

const defaultProps = {
  onSubmit: vi.fn(),
  onCancel: vi.fn(),
  authors: mockAuthors,
  categories: mockCategories,
  formTitle: '',
  setFormTitle: vi.fn(),
  formAuthorId: '',
  setFormAuthorId: vi.fn(),
  formCategoryId: '',
  setFormCategoryId: vi.fn(),
  formIsbn: '',
  setFormIsbn: vi.fn(),
  formPages: '',
  setFormPages: vi.fn(),
  formYear: '',
  setFormYear: vi.fn(),
  formSummary: '',
  setFormSummary: vi.fn(),
  formCoverUrl: '',
  setFormCoverUrl: vi.fn(),
};

describe('BookForm', () => {
  it('renderiza todos los campos del formulario', () => {
    render(<BookForm {...defaultProps} />);
    expect(screen.getByPlaceholderText('Ej. Cien años de soledad')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ej. 978-3-16...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ej. 350')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ej. 2026')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://ejemplo.com/portada.jpg')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe una breve sinopsis...')).toBeInTheDocument();
  });

  it('renderiza las opciones de autores en el select', () => {
    render(<BookForm {...defaultProps} />);
    expect(screen.getByText('Gabriel García Márquez')).toBeInTheDocument();
    expect(screen.getByText('Dan Brown')).toBeInTheDocument();
  });

  it('renderiza las opciones de categorías en el select', () => {
    render(<BookForm {...defaultProps} />);
    expect(screen.getByText('Ficción & Novela')).toBeInTheDocument();
    expect(screen.getByText('Suspenso & Thriller')).toBeInTheDocument();
  });

  it('muestra el botón de Guardar Libro y el de Cancelar', () => {
    render(<BookForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Guardar Libro' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
  });

  it('llama a onCancel al hacer click en Cancelar', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<BookForm {...defaultProps} onCancel={onCancel} />);
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('llama a onSubmit al enviar el formulario', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(<BookForm {...defaultProps} onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: 'Guardar Libro' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('llama a setFormTitle al escribir en el campo Título', async () => {
    const user = userEvent.setup();
    const setFormTitle = vi.fn();
    render(<BookForm {...defaultProps} setFormTitle={setFormTitle} />);
    await user.type(screen.getByPlaceholderText('Ej. Cien años de soledad'), 'Don Quijote');
    expect(setFormTitle).toHaveBeenCalled();
  });

  it('refleja el valor de formTitle en el campo Título', () => {
    render(<BookForm {...defaultProps} formTitle="El Principito" />);
    expect(screen.getByPlaceholderText('Ej. Cien años de soledad')).toHaveValue('El Principito');
  });
});
