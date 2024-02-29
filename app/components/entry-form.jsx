import { useFetcher } from "@remix-run/react";
import { format, parseISO } from "date-fns";
import { useRef, useEffect } from "react";

export default function EntryForm({ entry }) {
  let fetcher = useFetcher();
  let textareaRef = useRef(null);
  const { date, type, text } = entry || {};
  const formattedDate =
    entry && entry.date ? format(parseISO(entry.date), "yyyy-MM-dd") : null;

  const typeOptions = [
    { label: "Work", value: "work" },
    { label: "Learning", value: "learning" },
    { label: "Interesting Thing", value: "interesting-thing" },
  ];

  useEffect(() => {
    if (
      fetcher.data !== undefined &&
      fetcher.state === "idle" &&
      textareaRef.current
    ) {
      textareaRef.current.value = "";
      textareaRef.current.focus();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <fetcher.Form method="post" className="mt-2">
      <fieldset
        className="disabled:opacity-70"
        disabled={fetcher.state !== "idle"}
      >
        <div>
          <input
            type="date"
            name="date"
            required
            className="text-gray-900"
            defaultValue={
              formattedDate || new Date().toISOString().substring(0, 10)
            }
          />
        </div>
        <div className="mt-4 space-x-4">
          {typeOptions.map((option) => (
            <label key={option.value} className="inline-block">
              <input
                required
                type="radio"
                className="mr-1"
                name="type"
                value={option.value}
                defaultChecked={option.value === (type ?? "work")}
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <textarea
            ref={textareaRef}
            placeholder="Type your entry..."
            name="text"
            className="w-full text-gray-700"
            required
            defaultValue={text || ""}
          />
        </div>
        <div className="mt-2 text-right">
          <button
            type="submit"
            className="bg-blue-500 px-4 py-1 font-semibold text-white"
          >
            {fetcher.state !== "idle" ? "Saving..." : "Save"}
          </button>
        </div>
      </fieldset>
    </fetcher.Form>
  );
}
