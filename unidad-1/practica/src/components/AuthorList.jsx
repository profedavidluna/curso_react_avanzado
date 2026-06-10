import AuthorCard from './AuthorCard';

export function AuthorList({ authors }) {
  return (
    <div className="grid-authors-layout">
      {authors.map(author => (
        <AuthorCard key={author.id} author={author} />
      ))}
    </div>
  );
}

export default AuthorList;
