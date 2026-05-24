import { useMemo, useState } from 'react';
import { courses } from './data/courses';
import { CourseList } from './features/courses/components/CourseList';
import { CourseFilters } from './features/filters/components/CourseFilters';

const initialFilters = {
  search: '',
  level: 'all',
};

export default function App() {
  const [filters, setFilters] = useState(initialFilters);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesLevel =
        filters.level === 'all' || course.level === filters.level;

      return matchesSearch && matchesLevel;
    });
  }, [filters]);

  return (
    <main>
      <h1>Catálogo académico</h1>
      <CourseFilters filters={filters} onFiltersChange={setFilters} />
      <CourseList courses={filteredCourses} />
    </main>
  );
}
