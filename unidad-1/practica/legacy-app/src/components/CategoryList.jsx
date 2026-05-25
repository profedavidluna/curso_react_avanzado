import React from 'react';
import CategoryCard from './CategoryCard';

export function CategoryList({ categories }) {
  return (
    <div className="grid-categories-layout">
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoryList;
