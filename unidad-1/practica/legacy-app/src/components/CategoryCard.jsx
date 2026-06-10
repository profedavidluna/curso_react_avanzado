
export function CategoryCard({ category }) {
  return (
    <div className="category-card-box">
      <div className="category-info-block">
        <h3 className="category-name-text">{category.name}</h3>
        <p className="category-desc-text">{category.description}</p>
      </div>
    </div>
  );
}

export default CategoryCard;
