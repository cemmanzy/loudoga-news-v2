export default function TopBar() {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="bg-[#111827] text-white text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">

        <p>{today}</p>

        <p className="hidden md:block">
          Truth • Accuracy • Integrity
        </p>

      </div>
    </div>
  );
}