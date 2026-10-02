import type { ReactNode } from "react";

const TAG_COLORS = { yellow: "", red: "!bg-signal !text-white", blue: "!bg-cobalt !text-white" } as const;

interface Props {
  title: string;
  lead: string;
  tag?: ReactNode;
  tagColor?: keyof typeof TAG_COLORS;
  children?: ReactNode;
}

export default function PageHero({ title, lead, tag, tagColor = "yellow", children }: Props) {
  return (
    <>
      <div className="bg-ink py-14 text-paper md:py-24">
        <div className="wrap">
          {tag && <span className={`tag mb-5 ${TAG_COLORS[tagColor]}`}>{tag}</span>}
          <h1 className="display mb-4">{title}</h1>
          <p className="text-xl text-fog">{lead}</p>
          {children}
        </div>
      </div>
      <div className="pole" aria-hidden="true" />
    </>
  );
}
