interface Props {
  children: React.ReactNode;
}

export default function Badge({
  children,
}: Props) {
  return (
    <span className="rounded-full bg-[#C8102E] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">

      {children}

    </span>
  );
}