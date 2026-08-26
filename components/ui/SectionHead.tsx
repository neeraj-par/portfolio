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
    <div className="mx-auto mb-9 max-w-xl text-center md:mb-14">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title inline-block">{title}</h2>
      <Squiggle className="mx-auto" />
      <p className="mx-auto mt-2 max-w-[320px] text-[14.5px] leading-relaxed text-ink-soft md:mt-3 md:max-w-[520px] md:text-[15.5px]">
        {subtitle}
      </p>
    </div>
  );
}
