type PageTitleProps = {
  label?: string;
  title: string;
  description: string;
};

function PageTitle({
  label = "Roadmap React",
  title,
  description,
}: PageTitleProps) {
  return (
    <div className="page-title">
      <p>{label}</p>
      <h1>{title}</h1>
      <span>{description}</span>
    </div>
  );
}

export default PageTitle;