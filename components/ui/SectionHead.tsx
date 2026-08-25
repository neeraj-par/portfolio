import Squiggle from "./Squiggle";

export default function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto mb-11 max-w-xl text-center">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title inline-block">{title}</h2>
      <Squiggle className="mx-auto" />
      <p className="mt-2.5 text-[15.5px] text-ink-soft">{subtitle}</p>
    </div>
  );
}
