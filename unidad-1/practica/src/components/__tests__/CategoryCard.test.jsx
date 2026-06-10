import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CategoryCard from '../CategoryCard';

const mockCategory = {
  id: 'c1',
  name: 'Ficción & Novela',
  description: 'Narrativas literarias, novelas cortas y clásicos de la literatura universal.',
};

describe('CategoryCard', () => {
  it('renderiza el nombre de la categoría', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('Ficción & Novela')).toBeInTheDocument();
  });

  it('renderiza la descripción de la categoría', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(
      screen.getByText('Narrativas literarias, novelas cortas y clásicos de la literatura universal.')
    ).toBeInTheDocument();
  });

  it('muestra el nombre dentro de un elemento h3', () => {
    render(<CategoryCard category={mockCategory} />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Ficción & Novela');
  });

  it('aplica las clases CSS correctas al contenedor', () => {
    const { container } = render(<CategoryCard category={mockCategory} />);
    expect(container.firstChild).toHaveClass('category-card-box');
  });
});
