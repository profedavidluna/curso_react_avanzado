import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CategoryList from '../CategoryList';

const mockCategories = [
  { id: 'c1', name: 'Ficción & Novela', description: 'Narrativas literarias y clásicos.' },
  { id: 'c2', name: 'Suspenso & Thriller', description: 'Historias llenas de misterio.' },
  { id: 'c3', name: 'Ciencia & Divulgación', description: 'Ensayos científicos y física.' },
];

describe('CategoryList', () => {
  it('renderiza todas las categorías recibidas', () => {
    render(<CategoryList categories={mockCategories} />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });

  it('muestra el nombre de cada categoría', () => {
    render(<CategoryList categories={mockCategories} />);
    mockCategories.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('muestra la descripción de cada categoría', () => {
    render(<CategoryList categories={mockCategories} />);
    mockCategories.forEach(({ description }) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('no renderiza ninguna tarjeta cuando la lista está vacía', () => {
    render(<CategoryList categories={[]} />);
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0);
  });

  it('aplica la clase grid al contenedor principal', () => {
    const { container } = render(<CategoryList categories={mockCategories} />);
    expect(container.firstChild).toHaveClass('grid-categories-layout');
  });
});
