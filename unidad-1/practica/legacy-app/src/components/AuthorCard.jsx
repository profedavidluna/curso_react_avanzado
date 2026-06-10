
export function AuthorCard({ author }) {
  return (
    <div className="author-card-box">
      <img className="author-avatar-img" src={author.avatarUrl} alt={author.name} />
      <div className="author-info-block">
        <h3 className="author-name-text">{author.name}</h3>
        <p className="author-bio-text">{author.bio}</p>
      </div>
    </div>
  );
}

export default AuthorCard;
