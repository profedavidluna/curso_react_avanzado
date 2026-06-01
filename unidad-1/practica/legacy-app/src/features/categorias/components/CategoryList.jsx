import CategoryCard from './CategoryCard';

function CategoryList({ categories }) {
  return (
    <div className="grid-categories-layout">
      <CategoryCard category={{ id: 'all', name: 'Todas las categorías' }} />
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoryList;