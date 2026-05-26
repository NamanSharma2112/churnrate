(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommandMenu",
    ()=>CommandMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/cmdk/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const CommandMenu = ({ open, setOpen })=>{
    _s();
    // Toggle the menu when ⌘K is pressed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommandMenu.useEffect": ()=>{
            const down = {
                "CommandMenu.useEffect.down": (e)=>{
                    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        setOpen({
                            "CommandMenu.useEffect.down": (open)=>!open
                        }["CommandMenu.useEffect.down"]);
                    }
                }
            }["CommandMenu.useEffect.down"];
            document.addEventListener('keydown', down);
            return ({
                "CommandMenu.useEffect": ()=>document.removeEventListener('keydown', down)
            })["CommandMenu.useEffect"];
        }
    }["CommandMenu.useEffect"], []);
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Dialog, {
        open: open,
        onOpenChange: setOpen,
        label: "Global Command Menu",
        className: "fixed inset-0 bg-stone-950/50",
        onClick: ()=>setOpen(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: (e)=>e.stopPropagation(),
            className: "bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-lg mx-auto mt-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Input, {
                    value: value,
                    onValueChange: setValue,
                    placeholder: "What do you need?",
                    className: "relative border-b  border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none"
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                    lineNumber: 34,
                    columnNumber: 10
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].List, {
                    className: "p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Empty, {
                            children: [
                                "No results found. for ",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-violet-500",
                                    children: [
                                        '"',
                                        value,
                                        '"'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                            lineNumber: 41,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Group, {
                            heading: "Teams",
                            className: "text-sm mb-3 text-stone-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Item, {
                                    className: "flex cursor-pointer transition-colors p-2 text-sm text-stone-900 hover:bg-stone-200 rounded items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiPlus"], {}, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                            lineNumber: 47,
                                            columnNumber: 5
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Invite Team Member"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                    lineNumber: 46,
                                    columnNumber: 1
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Item, {
                                    className: "flex cursor-pointer transition-colors p-2 text-sm text-stone-900 hover:bg-stone-200 rounded items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiEye"], {}, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                            lineNumber: 51,
                                            columnNumber: 5
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "See Org Chart"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                    lineNumber: 50,
                                    columnNumber: 1
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                            lineNumber: 45,
                            columnNumber: 6
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Group, {
                            heading: "Integrations",
                            className: "text-sm mb-3 text-stone-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Item, {
                                    className: "flex cursor-pointer transition-colors p-2 text-sm text-stone-900 hover:bg-stone-200 rounded items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiLink"], {}, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                            lineNumber: 58,
                                            columnNumber: 5
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Link Services"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                    lineNumber: 57,
                                    columnNumber: 1
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Item, {
                                    className: "flex cursor-pointer transition-colors p-2 text-sm text-stone-900 hover:bg-stone-200 rounded items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiPhone"], {}, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                            lineNumber: 62,
                                            columnNumber: 5
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Contact Support"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                    lineNumber: 61,
                                    columnNumber: 1
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                            lineNumber: 56,
                            columnNumber: 4
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Item, {
                            className: "flex cursor-pointer transition-colors p-2 text-sm text-stone-900 hover:bg-stone-200  rounded items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiLogOut"], {}, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                                    lineNumber: 68,
                                    columnNumber: 1
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Sign Out"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                            lineNumber: 67,
                            columnNumber: 6
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
                    lineNumber: 40,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
            lineNumber: 33,
            columnNumber: 6
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CommandMenu, "v7Yk1w38liyvTwbmnPXzElLapkk=");
_c = CommandMenu;
var _c;
__turbopack_context__.k.register(_c, "CommandMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/Search.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$compoents$2f$sidebar$2f$CommandMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/CommandMenu.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const Search = ()=>{
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-stone-200 mb-6 relative rounded flex items-center px-2 py-1.5 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiSearch"], {
                        className: "mr-2"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/Search.tsx",
                        lineNumber: 11,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        onFocus: (e)=>{
                            e.target.blur();
                            setOpen(true);
                        },
                        type: "text",
                        placeholder: "Search",
                        className: "bg-transparent w-full placeholder:text-stone-400 focus:outline-none "
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/Search.tsx",
                        lineNumber: 12,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "p-1 text-xs flex gap-0.5 items-center bg-stone-50 shadow rounded absolute right-1.5 top-1/2 -translate-y-1/2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiCommand"], {}, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/Search.tsx",
                                lineNumber: 13,
                                columnNumber: 140
                            }, ("TURBOPACK compile-time value", void 0)),
                            "K"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/Search.tsx",
                        lineNumber: 13,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/Search.tsx",
                lineNumber: 10,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$compoents$2f$sidebar$2f$CommandMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandMenu"], {
                open: open,
                setOpen: setOpen
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/Search.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/churn-rate/compoents/sidebar/Search.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Search, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = Search;
const __TURBOPACK__default__export__ = Search;
var _c;
__turbopack_context__.k.register(_c, "Search");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Desktop_churn-rate_compoents_sidebar_5e4eb265._.js.map