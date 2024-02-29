import { json } from "@remix-run/node";
import mongoose from "mongoose";
import { Form, useLoaderData } from "@remix-run/react";
import EntryForm from "~/components/entry-form";
import { redirect } from "@remix-run/node";
import { getSession } from "~/session";

export async function loader({ request, params }) {
  const { entryId } = params;

  if (!mongoose.Types.ObjectId.isValid(entryId)) {
    throw new Response("Not Found", { status: 404 });
  }

  const entry = await mongoose.models.Entry.findById(entryId);

  if (!entry) {
    throw new Response("Not Found", { status: 404 });
  }

  let session = await getSession(request.headers.get("cookie"));
  if (!session.data.isAdmin) {
    throw new Response("Not authenticated", { status: 401 });
  }

  return json({ entry });
}

export default function EditPage() {
  const { entry } = useLoaderData();

  function handleSubmit() {
    if (!confirm("Are you sure?")) {
      e.preventDefault();
    }
  }
  return (
    <>
      <div className="mt-4">
        <EntryForm entry={entry} />
      </div>
      <Form method="post" onSubmit={handleSubmit}>
        <button
          className="text-gray-500 underline"
          name="_action"
          value="delete"
        >
          Delete this entry...
        </button>
      </Form>
    </>
  );
}

export async function action({ request, params }) {
  let session = await getSession(request.headers.get("cookie"));
  if (!session.data.isAdmin) {
    throw new Response("Not authenticated", { status: 401 });
  }

  if (typeof params.entryId !== "string") {
    throw new Response("Not found", { status: 404 });
  }

  const formData = await request.formData();
  const { date, type, text, _action } = Object.fromEntries(formData);
  const { entryId } = params;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (_action == "delete") {
    if (mongoose.Types.ObjectId.isValid(entryId)) {
      await mongoose.models.Entry.findByIdAndDelete(entryId);
    }
    return redirect("/");
  } else {
    if (
      typeof date !== "string" ||
      typeof type !== "string" ||
      typeof text !== "string"
    ) {
      return new Response("Bad request", { status: 400 });
    }

    const Entry = mongoose.models.Entry;

    let entry;

    if (entryId && mongoose.Types.ObjectId.isValid(entryId)) {
      entry = await Entry.findByIdAndUpdate(
        entryId,
        { date: new Date(date), type, text },
        { new: true },
      );
    } else {
      entry = new Entry({ date: new Date(date), type, text });
      await entry.save();
    }

    if (!entry) {
      return new Response("Error saving the entry", { status: 500 });
    }

    /* return json({ entry }); */
    return redirect("/");
  }
}
