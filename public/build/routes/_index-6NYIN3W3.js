import {
  format,
  require_browser_umd,
  startOfWeek
} from "/build/_shared/chunk-QHMI7OXZ.js";
import {
  Link,
  useFetcher,
  useLoaderData
} from "/build/_shared/chunk-4FKPI676.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  createHotContext
} from "/build/_shared/chunk-WFVSIHI3.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.jsx
var import_mongoose = __toESM(require_browser_umd(), 1);

// app/components/EntryListItem.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/EntryListItem.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/EntryListItem.jsx"
  );
  import.meta.hot.lastModified = "1708948635702.6975";
}
function EntryListItem({
  entry,
  canEdit
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "group", children: [
    entry.text,
    canEdit && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/entries/${entry._id}/edit`, className: "ml-2 text-blue-500 opacity-0 group-hover:opacity-100", children: "Edit" }, void 0, false, {
      fileName: "app/components/EntryListItem.jsx",
      lineNumber: 29,
      columnNumber: 19
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/EntryListItem.jsx",
    lineNumber: 26,
    columnNumber: 10
  }, this);
}
_c = EntryListItem;
var EntryListItem_default = EntryListItem;
var _c;
$RefreshReg$(_c, "EntryListItem");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_index.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.jsx"
  );
  import.meta.hot.lastModified = "1708967144876.6926";
}
function Index() {
  _s();
  let {
    session,
    entries
  } = useLoaderData();
  const fetcher = useFetcher();
  const entriesByWeek = entries.reduce((acc, entry) => {
    const weekStart = format(startOfWeek(new Date(entry.date)), "yyyy-MM-dd");
    if (!acc[weekStart]) {
      acc[weekStart] = [];
    }
    acc[weekStart].push(entry);
    return acc;
  }, {});
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-8 text-slate-50 bg-slate-900", children: [
    session.isAdmin && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(fetcher.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("fieldset", { className: "disabled:opacity-70", disabled: fetcher.state === "submitting", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "date", children: "Date" }, void 0, false, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 64,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "date", id: "date", name: "date", required: true }, void 0, false, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 65,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 63,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "type", children: "Type" }, void 0, false, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 68,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { id: "type", name: "type", required: true, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "work", children: "Work" }, void 0, false, {
            fileName: "app/routes/_index.jsx",
            lineNumber: 70,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "learning", children: "Learning" }, void 0, false, {
            fileName: "app/routes/_index.jsx",
            lineNumber: 71,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "interesting-thing", children: "Interesting Thing" }, void 0, false, {
            fileName: "app/routes/_index.jsx",
            lineNumber: 72,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 69,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 67,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "text", children: "Text" }, void 0, false, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 76,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("textarea", { id: "text", name: "text", required: true }, void 0, false, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 77,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 75,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { type: "submit", disabled: fetcher.state === "submitting", children: fetcher.state === "submitting" ? "Saving..." : "Save" }, void 0, false, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 79,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 62,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 61,
      columnNumber: 27
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("code", { children: Object.entries(entriesByWeek).map(([weekStart, entries2]) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { children: [
        "Week of ",
        weekStart
      ] }, void 0, true, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 86,
        columnNumber: 13
      }, this),
      entries2.map((entry) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(EntryListItem_default, { entry, canEdit: session.isAdmin }, entry.id, false, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 87,
        columnNumber: 35
      }, this))
    ] }, weekStart, true, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 85,
      columnNumber: 70
    }, this)) }, void 0, false, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 84,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.jsx",
    lineNumber: 60,
    columnNumber: 10
  }, this);
}
_s(Index, "bi0GI/+SCQlbl/vNKE7lMdYc1jA=", false, function() {
  return [useLoaderData, useFetcher];
});
_c2 = Index;
var _c2;
$RefreshReg$(_c2, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-6NYIN3W3.js.map
