import { useEffect, useMemo, useState } from 'react';
import CategoryCard from './CategoryCard';
import { useApiStore } from '@/store/useApiStore';

export function CategoryListAPI() {
  const categories = useApiStore((state) => state.categories);
  const loading = useApiStore((state) => state.categoriesLoading);
  const error = useApiStore((state) => state.categoriesError);
  const fetchCategories = useApiStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchCategories('http://localhost:4000/categories');
  }, [fetchCategories]);

  function calcularResultadoLento(valor) {
    console.log("Recalculando resultado lento...");
    let total = 0;
    for (let i = 0; i < 100_000_000; i += 1) {
      total += i % 10;
    }
    console.log(total)
    return `${valor.toUpperCase()} - score ${total}`;
  }
  const [texto, setTexto] = useState("react");
  //const resultado = calcularResultadoLento(texto);
  const resultado = useMemo(() => calcularResultadoLento(texto), [texto]);


  return (
    <div className="grid-categories-layout">
      {loading ? (
        <p>Cargando categorías...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))
      )}
      <p style={{ marginTop: 12 }}>Resultado: {resultado}</p>
      <button onClick={() => setTexto((t) => t + 'a')}>Cambiar texto</button>
      <button onClick={() => setTexto(() => 'react')}>Cambiar React</button>

    </div>
  );
}

export default CategoryListAPI;
