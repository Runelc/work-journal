import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";
import { useFetcher } from "@remix-run/react";
import { startOfWeek, format } from "date-fns";
import { Link } from "@remix-run/react";
import EntryListItem from "../components/EntryListItem";
import { getSession } from "~/session";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const Entry = mongoose.model("Entry");
  const entries = await Entry.find();

  const formattedEntries = entries.map((entry) => ({
    ...entry.toObject(),
    date: entry.date.toISOString().substring(0, 10),
  }));

  return { session: session.data, entries: formattedEntries };
}

export default function Index() {
  let { session, entries } = useLoaderData();
  const fetcher = useFetcher();

  const entriesByWeek = entries.reduce((acc, entry) => {
    const weekStart = format(startOfWeek(new Date(entry.date)), "yyyy-MM-dd");
    if (!acc[weekStart]) {
      acc[weekStart] = [];
    }
    acc[weekStart].push(entry);
    return acc;
  }, {});

  return (
    <div className="p-8 text-slate-50 bg-slate-900">
      {session.isAdmin && (
        <fetcher.Form method="post">
          <fieldset
            className="disabled:opacity-70"
            disabled={fetcher.state === "submitting"}
          >
            <div>
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" required />
            </div>
            <div>
              <label htmlFor="type">Type</label>
              <select id="type" name="type" required>
                <option value="work">Work</option>
                <option value="learning">Learning</option>
                <option value="interesting-thing">Interesting Thing</option>
              </select>
            </div>
            <div>
              <label htmlFor="text">Text</label>
              <textarea id="text" name="text" required />
            </div>
            <button type="submit" disabled={fetcher.state === "submitting"}>
              {fetcher.state === "submitting" ? "Saving..." : "Save"}
            </button>
          </fieldset>
        </fetcher.Form>
      )}
      <code>
        {Object.entries(entriesByWeek).map(([weekStart, entries]) => (
          <div key={weekStart}>
            <h2>Week of {weekStart}</h2>
            {entries.map((entry) => (
              <EntryListItem
                key={entry.id}
                entry={entry}
                canEdit={session.isAdmin}
              />
            ))}
          </div>
        ))}
      </code>
    </div>
  );
}

export const action = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  if (!session.data.isAdmin) {
    throw new Response("Not authenticated", {
      status: 401,
      statusText: "Not authenticated",
    });
  }

  const formData = await request.formData();

  const { date, type, text } = Object.fromEntries(formData);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    typeof date !== "string" ||
    typeof type !== "string" ||
    typeof text !== "string"
  ) {
    throw new Error("Bad request");
  }

  return await mongoose.models.Entry.create({ date, type, text });
};
