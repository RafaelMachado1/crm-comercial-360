function PageTitle({ title, description }) {
  return (
    <div className="page-title">
      <p>Roadmap React • Fase 02</p>
      <h1>{title}</h1>
      <span>{description}</span>
    </div>
  );
}

export default PageTitle;