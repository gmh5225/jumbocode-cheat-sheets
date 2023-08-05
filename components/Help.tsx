"use client";
import { useState } from "react";
import clsx from "clsx";

export default function Help() {
  const [open, setOpen] = useState(false);

  return !open ? (
    <button
      onClick={() => setOpen(true)}
      className="block bg-teal-700 px-3 py-2 w-max fixed right-2 bottom-2 shadow"
    >
      <div className="flex items-center gap-x-2">
        <img src="https://emojicdn.elk.sh/👋" alt="" className="w-4" />
        <p className="font-headings text-white font-semibold">
          Have questions?
        </p>
      </div>
    </button>
  ) : (
    <div
      className="fixed inset-0 bg-gray-950/20"
      onClick={() => setOpen(false)}
    >
      <div
        className={clsx(
          "fixed right-2 bottom-2 shadow bg-teal-700 p-4",
          "text-white font-body space-y-3",
          "max-w-xs"
        )}
      >
        <p>
          Hi! I’m <a href="https://benborgers.com">Ben Borgers</a>, I wrote
          these cheat sheets for the 2023-2024 year of JumboCode.
        </p>
      </div>
    </div>
  );
}
