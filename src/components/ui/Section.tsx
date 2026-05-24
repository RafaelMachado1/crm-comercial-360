import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="section">
      <h2>{title}</h2>

      <div className="section-content">{children}</div>
    </section>
  );
}

export default Section;