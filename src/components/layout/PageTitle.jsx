function PageTitle({ label = "Roadmap React", title, description }) {
  return (
    <div className="page-title">
      <p>{label}</p>
      <h1>{title}</h1>
      <span>{description}</span>
    </div>
  );
}

export default PageTitle;