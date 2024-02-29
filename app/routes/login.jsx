import { Form, useActionData } from "@remix-run/react";
import { createCookieSessionStorage } from "@remix-run/node";
import { commitSession, getSession } from "~/session";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader({ request }) {
  let storage = createCookieSessionStorage({
    cookie: {
      name: "work-journal-session",
    },
  });
  let session = await storage.getSession(request.headers.get("cookie"));

  return session.data;
}

export default function LoginPage() {
  let data = useLoaderData();
  let actionData = useActionData();

  return (
    <div className="mt-8">
      {data.isAdmin ? (
        <p>You're logged in!</p>
      ) : (
        <Form method="post">
          <input
            className="text-gray-900"
            placeholder="email"
            name="email"
            type="email"
            required
          />
          <input
            className="text-gray-900"
            placeholder="password"
            name="password"
            type="password"
            required
          />
          <button className="bg-blue-500 px-3 py-2 font-medium text-white">
            Log in
          </button>

          {actionData?.error && (
            <p className="mt-4 font-medium text-red-500">{actionData.error}</p>
          )}
        </Form>
      )}
    </div>
  );
}

export async function action({ request }) {
  let formData = await request.formData();
  let { email, password } = Object.fromEntries(formData);

  if (email === "sam@buildui.com" && password === "password") {
    let session = await getSession();
    session.set("isAdmin", true);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    let error;

    if (!email) {
      error = "Email is required.";
    } else if (!password) {
      error = "Password is required.";
    } else {
      error = "Invalid login.";
    }

    return json({ error }, 401);
  }
}
