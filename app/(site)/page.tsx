export default function Home() {
  return (
    <div>
      <div className="py-32 px-4 border-b border-gray-950/5 bg-gray-950/[3%]">
        <div className="flex items-center justify-center gap-x-2">
          <span className="text-xs font-body uppercase font-semibold bg-teal-600 text-white px-1.5 py-0.5 h-max -rotate-2">
            New!
          </span>
          <p className="font-headings font-semibold text-lg text-gray-500">
            Written for 2023–2024
          </p>
        </div>
        <h1 className="mt-4 font-headings text-6xl text-gray-950 font-black text-center">
          JumboCode Cheat Sheets
        </h1>
      </div>
    </div>
  );
}
