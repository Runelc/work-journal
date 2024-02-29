import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
  useActionData,
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

// app/routes/login.jsx
var import_node = __toESM(require_node(), 1);
var import_node2 = __toESM(require_node(), 1);
var import_node3 = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/login.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/login.jsx"
  );
  import.meta.hot.lastModified = "1708968352745.404";
}
function LoginPage() {
  _s();
  let data = useLoaderData();
  let actionData = useActionData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-8", children: data.isAdmin ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "You're logged in!" }, void 0, false, {
    fileName: "app/routes/login.jsx",
    lineNumber: 44,
    columnNumber: 23
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: "text-gray-900", placeholder: "email", name: "email", type: "email", required: true }, void 0, false, {
      fileName: "app/routes/login.jsx",
      lineNumber: 45,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { className: "text-gray-900", placeholder: "password", name: "password", type: "password", required: true }, void 0, false, {
      fileName: "app/routes/login.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-blue-500 px-3 py-2 font-medium text-white", children: "Log in" }, void 0, false, {
      fileName: "app/routes/login.jsx",
      lineNumber: 47,
      columnNumber: 11
    }, this),
    actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-4 font-medium text-red-500", children: actionData.error }, void 0, false, {
      fileName: "app/routes/login.jsx",
      lineNumber: 51,
      columnNumber: 33
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login.jsx",
    lineNumber: 44,
    columnNumber: 50
  }, this) }, void 0, false, {
    fileName: "app/routes/login.jsx",
    lineNumber: 43,
    columnNumber: 10
  }, this);
}
_s(LoginPage, "1e25SFC8uAEJL70nU/asewoV2OE=", false, function() {
  return [useLoaderData, useActionData];
});
_c = LoginPage;
var _c;
$RefreshReg$(_c, "LoginPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LoginPage as default
};
//# sourceMappingURL=/build/routes/login-LQ2OEZ4A.js.map
