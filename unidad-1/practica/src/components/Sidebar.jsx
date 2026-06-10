export function Sidebar({ currentView, setCurrentView }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-title">BookVerse</div>
      <ul className="sidebar-menu">
        <li 
          className={`sidebar-item ${currentView === 'books' ? 'sidebar-item-active' : ''}`}
          onClick={() => setCurrentView('books')}
        >
          📚 Libros
        </li>
        <li 
          className={`sidebar-item ${currentView === 'authors' ? 'sidebar-item-active' : ''}`}
          onClick={() => setCurrentView('authors')}
        >
          ✍️ Autores
        </li>
        <li 
          className={`sidebar-item ${currentView === 'categories' ? 'sidebar-item-active' : ''}`}
          onClick={() => setCurrentView('categories')}
        >
          🏷️ Categorías
        </li>
        <li
          className={`sidebar-item ${currentView === 'performance' ? 'sidebar-item-active' : ''}`}
          onClick={() => setCurrentView('performance')}
        >
          ⚡ Performance
        </li>
        <li
          className={`sidebar-item ${currentView === 'transition' ? 'sidebar-item-active' : ''}`}
          onClick={() => setCurrentView('transition')}
        >
          🔄 useTransition
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
