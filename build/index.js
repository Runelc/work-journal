var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";

// app/db/connectDb.server.js
import mongoose2 from "mongoose";

// app/db/models.js
import { mongoose } from "mongoose";
var { Schema } = mongoose, entrySchema = new Schema(
  {
    date: {
      type: Date,
      required: !0
    },
    type: {
      type: String,
      enum: ["work", "learning", "interesting-thing"],
      required: !0
    },
    text: {
      type: String,
      required: !0
    }
  },
  // Automatically add `createdAt` and `updatedAt` timestamps:
  // https://mongoosejs.com/docs/timestamps.html
  { timestamps: !0 }
), models = [
  {
    name: "Entry",
    schema: entrySchema,
    collection: "entries"
  }
];

// app/db/connectDb.server.js
var { MONGODB_URL, NODE_ENV } = process.env;
if (!MONGODB_URL) {
  let errorMessage = NODE_ENV === "production" ? "Please define the MONGODB_URL environment variable \u2014 pointing to your full connection string, including database name." : "Please define the MONGODB_URL environment variable inside an .env file \u2014 pointing to your full connection string, including database name.";
  throw new Error(errorMessage);
}
function connectDb() {
  let modelCreationType = "Creating";
  NODE_ENV === "development" && (mongoose2.set("overwriteModels", !0), Object.keys(mongoose2.models).length > 0 && (modelCreationType = "Overwriting")), console.log(
    // E.g. "Mongoose: Creating 2 models (Book, Author)"
    "Mongoose: %s %d %s (%s)",
    modelCreationType,
    models.length,
    models.length === 1 ? "model" : "models",
    models.map((model) => model.name).join(", ")
  );
  for (let model of models)
    mongoose2.model(model.name, model.schema, model.collection);
  let readyState = mongoose2.connection.readyState;
  if (readyState > 0) {
    console.log(
      "Mongoose: Re-using existing connection (readyState: %d)",
      readyState
    );
    return;
  }
  mongoose2.connection.on("error", (error) => {
    console.error("Mongoose: error %s", error);
  });
  for (let event of ["connected", "reconnected", "disconnected", "close"])
    mongoose2.connection.on(event, () => console.log("Mongoose: %s", event));
  mongoose2.connect(MONGODB_URL).catch((error) => {
    console.error(error);
  });
}

// app/db/seedingDb.server.js
import mongoose3 from "mongoose";
async function seedDb() {
  await mongoose3.models.Entry.countDocuments() === 0 && (console.log("Seeding database..."), insertData());
}
async function insertData() {
  let entries = [
    {
      date: /* @__PURE__ */ new Date("2024-01-01"),
      type: "work",
      text: "I'm working"
    },
    {
      date: /* @__PURE__ */ new Date("2024-01-15"),
      type: "learning",
      text: "I'm learning"
    },
    {
      date: /* @__PURE__ */ new Date("2024-02-01"),
      type: "interesting-thing",
      text: "I'm doing something interesting"
    },
    {
      date: /* @__PURE__ */ new Date("2024-02-15"),
      type: "learning",
      text: "Remix Auth with FormStrategy and Post App"
    },
    {
      date: /* @__PURE__ */ new Date("2024-02-22"),
      type: "work",
      text: "Remix Work Journal"
    }
  ];
  await mongoose3.models.Entry.insertMany(entries);
}

// app/entry.server.jsx
import { jsxDEV } from "react/jsx-dev-runtime";
connectDb();
await seedDb();
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return isBotRequest(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.jsx",
          lineNumber: 74,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.jsx",
          lineNumber: 124,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  action: () => action,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Form
} from "@remix-run/react";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-VCIEMON7.css";

// app/session.jsx
import { createCookieSessionStorage } from "@remix-run/node";
var { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "work-journal-session",
    secrets: ["build-ui-secret"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: !0,
    secure: !1
  }
});

// app/root.jsx
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  {
    rel: "stylesheet",
    href: tailwind_default
  }
];
function meta() {
  return [{ title: "Work Journal" }];
}
async function loader({ request }) {
  return { session: (await getSession(request.headers.get("cookie"))).data };
}
function App() {
  let { session } = useLoaderData();
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 43,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2("div", { className: "p-10", children: [
        /* @__PURE__ */ jsxDEV2("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxDEV2("div", { children: [
            /* @__PURE__ */ jsxDEV2("h1", { className: "text-5xl", children: "Work Journal" }, void 0, !1, {
              fileName: "app/root.jsx",
              lineNumber: 49,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV2("p", { className: "mt-2 text-lg text-gray-400", children: "Learnings and doings. Updated weekly." }, void 0, !1, {
              fileName: "app/root.jsx",
              lineNumber: 50,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/root.jsx",
            lineNumber: 48,
            columnNumber: 13
          }, this),
          session.isAdmin ? /* @__PURE__ */ jsxDEV2(Form, { method: "post", children: /* @__PURE__ */ jsxDEV2("button", { children: "Logout" }, void 0, !1, {
            fileName: "app/root.jsx",
            lineNumber: 57,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/root.jsx",
            lineNumber: 56,
            columnNumber: 13
          }, this) : /* @__PURE__ */ jsxDEV2(Link, { to: "/login", children: "Login" }, void 0, !1, {
            fileName: "app/root.jsx",
            lineNumber: 60,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/root.jsx",
          lineNumber: 47,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
          fileName: "app/root.jsx",
          lineNumber: 64,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.jsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 68,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 45,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.jsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  let error = useRouteError();
  return console.error(error), /* @__PURE__ */ jsxDEV2("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("title", { children: "Oh no!" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 83,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 80,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { className: "flex h-full flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxDEV2("p", { className: "text-3xl", children: "Whoops!" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      isRouteErrorResponse(error) ? /* @__PURE__ */ jsxDEV2("p", { children: [
        error.status,
        " \u2013 ",
        error.statusText
      ] }, void 0, !0, {
        fileName: "app/root.jsx",
        lineNumber: 89,
        columnNumber: 9
      }, this) : error instanceof Error ? /* @__PURE__ */ jsxDEV2("p", { children: error.message }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 93,
        columnNumber: 9
      }, this) : /* @__PURE__ */ jsxDEV2("p", { children: "Something happened." }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 98,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 85,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.jsx",
    lineNumber: 79,
    columnNumber: 5
  }, this);
}
async function action({ request }) {
  let session = await getSession(request.headers.get("cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
}

// app/routes/entries.$entryId.edit.jsx
var entries_entryId_edit_exports = {};
__export(entries_entryId_edit_exports, {
  action: () => action2,
  default: () => EditPage,
  loader: () => loader2
});
import { json } from "@remix-run/node";
import mongoose4 from "mongoose";
import { Form as Form2, useLoaderData as useLoaderData2 } from "@remix-run/react";

// app/components/entry-form.jsx
import { useFetcher } from "@remix-run/react";
import { format, parseISO } from "date-fns";
import { useRef, useEffect } from "react";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
function EntryForm({ entry: entry2 }) {
  let fetcher = useFetcher(), textareaRef = useRef(null), { date, type, text } = entry2 || {}, formattedDate = entry2 && entry2.date ? format(parseISO(entry2.date), "yyyy-MM-dd") : null, typeOptions = [
    { label: "Work", value: "work" },
    { label: "Learning", value: "learning" },
    { label: "Interesting Thing", value: "interesting-thing" }
  ];
  return useEffect(() => {
    fetcher.data !== void 0 && fetcher.state === "idle" && textareaRef.current && (textareaRef.current.value = "", textareaRef.current.focus());
  }, [fetcher.state, fetcher.data]), /* @__PURE__ */ jsxDEV3(fetcher.Form, { method: "post", className: "mt-2", children: /* @__PURE__ */ jsxDEV3(
    "fieldset",
    {
      className: "disabled:opacity-70",
      disabled: fetcher.state !== "idle",
      children: [
        /* @__PURE__ */ jsxDEV3("div", { children: /* @__PURE__ */ jsxDEV3(
          "input",
          {
            type: "date",
            name: "date",
            required: !0,
            className: "text-gray-900",
            defaultValue: formattedDate || (/* @__PURE__ */ new Date()).toISOString().substring(0, 10)
          },
          void 0,
          !1,
          {
            fileName: "app/components/entry-form.jsx",
            lineNumber: 36,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/entry-form.jsx",
          lineNumber: 35,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { className: "mt-4 space-x-4", children: typeOptions.map((option) => /* @__PURE__ */ jsxDEV3("label", { className: "inline-block", children: [
          /* @__PURE__ */ jsxDEV3(
            "input",
            {
              required: !0,
              type: "radio",
              className: "mr-1",
              name: "type",
              value: option.value,
              defaultChecked: option.value === (type ?? "work")
            },
            void 0,
            !1,
            {
              fileName: "app/components/entry-form.jsx",
              lineNumber: 49,
              columnNumber: 15
            },
            this
          ),
          option.label
        ] }, option.value, !0, {
          fileName: "app/components/entry-form.jsx",
          lineNumber: 48,
          columnNumber: 13
        }, this)) }, void 0, !1, {
          fileName: "app/components/entry-form.jsx",
          lineNumber: 46,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { className: "mt-4", children: /* @__PURE__ */ jsxDEV3(
          "textarea",
          {
            ref: textareaRef,
            placeholder: "Type your entry...",
            name: "text",
            className: "w-full text-gray-700",
            required: !0,
            defaultValue: text || ""
          },
          void 0,
          !1,
          {
            fileName: "app/components/entry-form.jsx",
            lineNumber: 62,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/entry-form.jsx",
          lineNumber: 61,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { className: "mt-2 text-right", children: /* @__PURE__ */ jsxDEV3(
          "button",
          {
            type: "submit",
            className: "bg-blue-500 px-4 py-1 font-semibold text-white",
            children: fetcher.state !== "idle" ? "Saving..." : "Save"
          },
          void 0,
          !1,
          {
            fileName: "app/components/entry-form.jsx",
            lineNumber: 72,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/entry-form.jsx",
          lineNumber: 71,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/entry-form.jsx",
      lineNumber: 31,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/entry-form.jsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
}

// app/routes/entries.$entryId.edit.jsx
import { redirect as redirect2 } from "@remix-run/node";
import { Fragment, jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
async function loader2({ request, params }) {
  let { entryId } = params;
  if (!mongoose4.Types.ObjectId.isValid(entryId))
    throw new Response("Not Found", { status: 404 });
  let entry2 = await mongoose4.models.Entry.findById(entryId);
  if (!entry2)
    throw new Response("Not Found", { status: 404 });
  if (!(await getSession(request.headers.get("cookie"))).data.isAdmin)
    throw new Response("Not authenticated", { status: 401 });
  return json({ entry: entry2 });
}
function EditPage() {
  let { entry: entry2 } = useLoaderData2();
  function handleSubmit() {
    confirm("Are you sure?") || e.preventDefault();
  }
  return /* @__PURE__ */ jsxDEV4(Fragment, { children: [
    /* @__PURE__ */ jsxDEV4("div", { className: "mt-4", children: /* @__PURE__ */ jsxDEV4(EntryForm, { entry: entry2 }, void 0, !1, {
      fileName: "app/routes/entries.$entryId.edit.jsx",
      lineNumber: 40,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/entries.$entryId.edit.jsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Form2, { method: "post", onSubmit: handleSubmit, children: /* @__PURE__ */ jsxDEV4(
      "button",
      {
        className: "text-gray-500 underline",
        name: "_action",
        value: "delete",
        children: "Delete this entry..."
      },
      void 0,
      !1,
      {
        fileName: "app/routes/entries.$entryId.edit.jsx",
        lineNumber: 43,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/entries.$entryId.edit.jsx",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/entries.$entryId.edit.jsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
async function action2({ request, params }) {
  if (!(await getSession(request.headers.get("cookie"))).data.isAdmin)
    throw new Response("Not authenticated", { status: 401 });
  if (typeof params.entryId != "string")
    throw new Response("Not found", { status: 404 });
  let formData = await request.formData(), { date, type, text, _action } = Object.fromEntries(formData), { entryId } = params;
  if (await new Promise((resolve) => setTimeout(resolve, 1e3)), _action == "delete")
    return mongoose4.Types.ObjectId.isValid(entryId) && await mongoose4.models.Entry.findByIdAndDelete(entryId), redirect2("/");
  {
    if (typeof date != "string" || typeof type != "string" || typeof text != "string")
      return new Response("Bad request", { status: 400 });
    let Entry = mongoose4.models.Entry, entry2;
    return entryId && mongoose4.Types.ObjectId.isValid(entryId) ? entry2 = await Entry.findByIdAndUpdate(
      entryId,
      { date: new Date(date), type, text },
      { new: !0 }
    ) : (entry2 = new Entry({ date: new Date(date), type, text }), await entry2.save()), entry2 ? redirect2("/") : new Response("Error saving the entry", { status: 500 });
  }
}

// app/routes/_index.jsx
var index_exports = {};
__export(index_exports, {
  action: () => action3,
  default: () => Index,
  loader: () => loader3
});
import "@remix-run/node";
import { useLoaderData as useLoaderData3 } from "@remix-run/react";
import mongoose5 from "mongoose";
import { useFetcher as useFetcher2 } from "@remix-run/react";
import { startOfWeek, format as format2 } from "date-fns";
import "@remix-run/react";

// app/components/EntryListItem.jsx
import { Link as Link2 } from "@remix-run/react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function EntryListItem({ entry: entry2, canEdit }) {
  return /* @__PURE__ */ jsxDEV5("li", { className: "group", children: [
    entry2.text,
    canEdit && /* @__PURE__ */ jsxDEV5(
      Link2,
      {
        to: `/entries/${entry2._id}/edit`,
        className: "ml-2 text-blue-500 opacity-0 group-hover:opacity-100",
        children: "Edit"
      },
      void 0,
      !1,
      {
        fileName: "app/components/EntryListItem.jsx",
        lineNumber: 9,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/EntryListItem.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
var EntryListItem_default = EntryListItem;

// app/routes/_index.jsx
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
async function loader3({ request }) {
  let session = await getSession(request.headers.get("Cookie")), formattedEntries = (await mongoose5.model("Entry").find()).map((entry2) => ({
    ...entry2.toObject(),
    date: entry2.date.toISOString().substring(0, 10)
  }));
  return { session: session.data, entries: formattedEntries };
}
function Index() {
  let { session, entries } = useLoaderData3(), fetcher = useFetcher2(), entriesByWeek = entries.reduce((acc, entry2) => {
    let weekStart = format2(startOfWeek(new Date(entry2.date)), "yyyy-MM-dd");
    return acc[weekStart] || (acc[weekStart] = []), acc[weekStart].push(entry2), acc;
  }, {});
  return /* @__PURE__ */ jsxDEV6("div", { className: "p-8 text-slate-50 bg-slate-900", children: [
    session.isAdmin && /* @__PURE__ */ jsxDEV6(fetcher.Form, { method: "post", children: /* @__PURE__ */ jsxDEV6(
      "fieldset",
      {
        className: "disabled:opacity-70",
        disabled: fetcher.state === "submitting",
        children: [
          /* @__PURE__ */ jsxDEV6("div", { children: [
            /* @__PURE__ */ jsxDEV6("label", { htmlFor: "date", children: "Date" }, void 0, !1, {
              fileName: "app/routes/_index.jsx",
              lineNumber: 45,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV6("input", { type: "date", id: "date", name: "date", required: !0 }, void 0, !1, {
              fileName: "app/routes/_index.jsx",
              lineNumber: 46,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.jsx",
            lineNumber: 44,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV6("div", { children: [
            /* @__PURE__ */ jsxDEV6("label", { htmlFor: "type", children: "Type" }, void 0, !1, {
              fileName: "app/routes/_index.jsx",
              lineNumber: 49,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV6("select", { id: "type", name: "type", required: !0, children: [
              /* @__PURE__ */ jsxDEV6("option", { value: "work", children: "Work" }, void 0, !1, {
                fileName: "app/routes/_index.jsx",
                lineNumber: 51,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV6("option", { value: "learning", children: "Learning" }, void 0, !1, {
                fileName: "app/routes/_index.jsx",
                lineNumber: 52,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV6("option", { value: "interesting-thing", children: "Interesting Thing" }, void 0, !1, {
                fileName: "app/routes/_index.jsx",
                lineNumber: 53,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.jsx",
              lineNumber: 50,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.jsx",
            lineNumber: 48,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV6("div", { children: [
            /* @__PURE__ */ jsxDEV6("label", { htmlFor: "text", children: "Text" }, void 0, !1, {
              fileName: "app/routes/_index.jsx",
              lineNumber: 57,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV6("textarea", { id: "text", name: "text", required: !0 }, void 0, !1, {
              fileName: "app/routes/_index.jsx",
              lineNumber: 58,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.jsx",
            lineNumber: 56,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV6("button", { type: "submit", disabled: fetcher.state === "submitting", children: fetcher.state === "submitting" ? "Saving..." : "Save" }, void 0, !1, {
            fileName: "app/routes/_index.jsx",
            lineNumber: 60,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_index.jsx",
        lineNumber: 40,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 39,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV6("code", { children: Object.entries(entriesByWeek).map(([weekStart, entries2]) => /* @__PURE__ */ jsxDEV6("div", { children: [
      /* @__PURE__ */ jsxDEV6("h2", { children: [
        "Week of ",
        weekStart
      ] }, void 0, !0, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 69,
        columnNumber: 13
      }, this),
      entries2.map((entry2) => /* @__PURE__ */ jsxDEV6(
        EntryListItem_default,
        {
          entry: entry2,
          canEdit: session.isAdmin
        },
        entry2.id,
        !1,
        {
          fileName: "app/routes/_index.jsx",
          lineNumber: 71,
          columnNumber: 15
        },
        this
      ))
    ] }, weekStart, !0, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 68,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 66,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.jsx",
    lineNumber: 37,
    columnNumber: 5
  }, this);
}
var action3 = async ({ request }) => {
  if (!(await getSession(request.headers.get("cookie"))).data.isAdmin)
    throw new Response("Not authenticated", {
      status: 401,
      statusText: "Not authenticated"
    });
  let formData = await request.formData(), { date, type, text } = Object.fromEntries(formData);
  if (await new Promise((resolve) => setTimeout(resolve, 1e3)), typeof date != "string" || typeof type != "string" || typeof text != "string")
    throw new Error("Bad request");
  return await mongoose5.models.Entry.create({ date, type, text });
};

// app/routes/login.jsx
var login_exports = {};
__export(login_exports, {
  action: () => action4,
  default: () => LoginPage,
  loader: () => loader4
});
import { Form as Form3, useActionData } from "@remix-run/react";
import { createCookieSessionStorage as createCookieSessionStorage2 } from "@remix-run/node";
import { redirect as redirect3 } from "@remix-run/node";
import { useLoaderData as useLoaderData4 } from "@remix-run/react";
import { json as json3 } from "@remix-run/node";
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
async function loader4({ request }) {
  return (await createCookieSessionStorage2({
    cookie: {
      name: "work-journal-session"
    }
  }).getSession(request.headers.get("cookie"))).data;
}
function LoginPage() {
  let data = useLoaderData4(), actionData = useActionData();
  return /* @__PURE__ */ jsxDEV7("div", { className: "mt-8", children: data.isAdmin ? /* @__PURE__ */ jsxDEV7("p", { children: "You're logged in!" }, void 0, !1, {
    fileName: "app/routes/login.jsx",
    lineNumber: 26,
    columnNumber: 9
  }, this) : /* @__PURE__ */ jsxDEV7(Form3, { method: "post", children: [
    /* @__PURE__ */ jsxDEV7(
      "input",
      {
        className: "text-gray-900",
        placeholder: "email",
        name: "email",
        type: "email",
        required: !0
      },
      void 0,
      !1,
      {
        fileName: "app/routes/login.jsx",
        lineNumber: 29,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ jsxDEV7(
      "input",
      {
        className: "text-gray-900",
        placeholder: "password",
        name: "password",
        type: "password",
        required: !0
      },
      void 0,
      !1,
      {
        fileName: "app/routes/login.jsx",
        lineNumber: 36,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ jsxDEV7("button", { className: "bg-blue-500 px-3 py-2 font-medium text-white", children: "Log in" }, void 0, !1, {
      fileName: "app/routes/login.jsx",
      lineNumber: 43,
      columnNumber: 11
    }, this),
    actionData?.error && /* @__PURE__ */ jsxDEV7("p", { className: "mt-4 font-medium text-red-500", children: actionData.error }, void 0, !1, {
      fileName: "app/routes/login.jsx",
      lineNumber: 48,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.jsx",
    lineNumber: 28,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.jsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
async function action4({ request }) {
  let formData = await request.formData(), { email, password } = Object.fromEntries(formData);
  if (email === "sam@buildui.com" && password === "password") {
    let session = await getSession();
    return session.set("isAdmin", !0), redirect3("/", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  } else {
    let error;
    return email ? password ? error = "Invalid login." : error = "Password is required." : error = "Email is required.", json3({ error }, 401);
  }
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-YRTIUQ7A.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-4FKPI676.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-WFVSIHI3.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-6TCVB6X2.js", imports: ["/build/_shared/chunk-G7CHZRZX.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-6NYIN3W3.js", imports: ["/build/_shared/chunk-QHMI7OXZ.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/entries.$entryId.edit": { id: "routes/entries.$entryId.edit", parentId: "root", path: "entries/:entryId/edit", index: void 0, caseSensitive: void 0, module: "/build/routes/entries.$entryId.edit-42ND2E4M.js", imports: ["/build/_shared/chunk-QHMI7OXZ.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-LQ2OEZ4A.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "b17f73db", hmr: { runtime: "/build/_shared/chunk-WFVSIHI3.js", timestamp: 1708981894445 }, url: "/build/manifest-B17F73DB.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/entries.$entryId.edit": {
    id: "routes/entries.$entryId.edit",
    parentId: "root",
    path: "entries/:entryId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: entries_entryId_edit_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
