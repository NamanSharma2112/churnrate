module.exports = [
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript, Next.js server utility)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript)"));}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/instrumentation/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRevalidateReason",
    ()=>getRevalidateReason
]);
function getRevalidateReason(params) {
    if (params.isOnDemandRevalidate) {
        return 'on-demand';
    }
    if (params.isStaticGeneration) {
        return 'stale';
    }
    return undefined;
} //# sourceMappingURL=utils.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/interop-default.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Interop between "export default" and "module.exports".
 */ __turbopack_context__.s([
    "interopDefault",
    ()=>interopDefault
]);
function interopDefault(mod) {
    return mod.default || mod;
} //# sourceMappingURL=interop-default.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/strip-flight-headers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stripFlightHeaders",
    ()=>stripFlightHeaders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/client/components/app-router-headers.js [app-rsc] (ecmascript)");
;
function stripFlightHeaders(headers) {
    for (const header of __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FLIGHT_HEADERS"]){
        delete headers[header];
    }
} //# sourceMappingURL=strip-flight-headers.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeadersAdapter",
    ()=>HeadersAdapter,
    "ReadonlyHeadersError",
    ()=>ReadonlyHeadersError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
;
class ReadonlyHeadersError extends Error {
    constructor(){
        super('Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers');
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'append':
                    case 'delete':
                    case 'set':
                        return ReadonlyHeadersError.callable;
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(', ');
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === 'string') {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== 'undefined') return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== 'undefined';
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/cookie/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/cookie") + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/api-utils/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "COOKIE_NAME_PRERENDER_BYPASS",
    ()=>COOKIE_NAME_PRERENDER_BYPASS,
    "COOKIE_NAME_PRERENDER_DATA",
    ()=>COOKIE_NAME_PRERENDER_DATA,
    "RESPONSE_LIMIT_DEFAULT",
    ()=>RESPONSE_LIMIT_DEFAULT,
    "SYMBOL_CLEARED_COOKIES",
    ()=>SYMBOL_CLEARED_COOKIES,
    "SYMBOL_PREVIEW_DATA",
    ()=>SYMBOL_PREVIEW_DATA,
    "checkIsOnDemandRevalidate",
    ()=>checkIsOnDemandRevalidate,
    "clearPreviewData",
    ()=>clearPreviewData,
    "redirect",
    ()=>redirect,
    "sendError",
    ()=>sendError,
    "sendStatusCode",
    ()=>sendStatusCode,
    "setLazyProp",
    ()=>setLazyProp,
    "wrapApiHandler",
    ()=>wrapApiHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/trace/constants.js [app-rsc] (ecmascript)");
;
;
;
;
function wrapApiHandler(page, handler) {
    return (...args)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTracer"])().setRootSpanAttribute('next.route', page);
        // Call API route method
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeSpan"].runHandler, {
            spanName: `executing api route (pages) ${page}`
        }, ()=>handler(...args));
    };
}
function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === 'string') {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
        throw Object.defineProperty(new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`), "__NEXT_ERROR_CODE", {
            value: "E389",
            enumerable: false,
            configurable: true
        });
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(req.headers);
    const previewModeId = headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_HEADER"]);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER"]);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = 4 * 1024 * 1024;
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/cookie/index.js [app-rsc] (ecmascript)");
    const previous = res.getHeader('Set-Cookie');
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === 'string' ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
class ApiError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/api-utils/get-cookie-parser.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Parse cookies from the `headers` of request
 * @param req request object
 */ __turbopack_context__.s([
    "getCookieParser",
    ()=>getCookieParser
]);
function getCookieParser(headers) {
    return function parseCookie() {
        const { cookie } = headers;
        if (!cookie) {
            return {};
        }
        const { parse: parseCookieFn } = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/cookie/index.js [app-rsc] (ecmascript)");
        return parseCookieFn(Array.isArray(cookie) ? cookie.join('; ') : cookie);
    };
} //# sourceMappingURL=get-cookie-parser.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/base-http/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseNextRequest",
    ()=>BaseNextRequest,
    "BaseNextResponse",
    ()=>BaseNextResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/client/components/redirect-status-code.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$get$2d$cookie$2d$parser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/api-utils/get-cookie-parser.js [app-rsc] (ecmascript)");
;
;
class BaseNextRequest {
    constructor(method, url, body){
        this.method = method;
        this.url = url;
        this.body = body;
    }
    // Utils implemented using the abstract methods above
    get cookies() {
        if (this._cookies) return this._cookies;
        return this._cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$get$2d$cookie$2d$parser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookieParser"])(this.headers)();
    }
}
class BaseNextResponse {
    constructor(destination){
        this.destination = destination;
    }
    // Utils implemented using the abstract methods above
    redirect(destination, statusCode) {
        this.setHeader('Location', destination);
        this.statusCode = statusCode;
        // Since IE11 doesn't support the 308 header add backwards
        // compatibility using refresh header
        if (statusCode === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RedirectStatusCode"].PermanentRedirect) {
            this.setHeader('Refresh', `0;url=${destination}`);
        }
        return this;
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/base-http/node.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NodeNextRequest",
    ()=>NodeNextRequest,
    "NodeNextResponse",
    ()=>NodeNextResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/api-utils/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/request-meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/base-http/index.js [app-rsc] (ecmascript)");
;
;
;
let prop;
class NodeNextRequest extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseNextRequest"] {
    static #_ = prop = _NEXT_REQUEST_META = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_REQUEST_META"];
    constructor(_req){
        var _this__req;
        super(_req.method.toUpperCase(), _req.url, _req), this._req = _req, this.headers = this._req.headers, this.fetchMetrics = (_this__req = this._req) == null ? void 0 : _this__req.fetchMetrics, this[_NEXT_REQUEST_META] = this._req[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_REQUEST_META"]] || {}, this.streaming = false;
    }
    get originalRequest() {
        // Need to mimic these changes to the original req object for places where we use it:
        // render.tsx, api/ssg requests
        this._req[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_REQUEST_META"]] = this[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_REQUEST_META"]];
        this._req.url = this.url;
        this._req.cookies = this.cookies;
        return this._req;
    }
    set originalRequest(value) {
        this._req = value;
    }
    /**
   * Returns the request body as a Web Readable Stream. The body here can only
   * be read once as the body will start flowing as soon as the data handler
   * is attached.
   *
   * @internal
   */ stream() {
        if (this.streaming) {
            throw Object.defineProperty(new Error('Invariant: NodeNextRequest.stream() can only be called once'), "__NEXT_ERROR_CODE", {
                value: "E467",
                enumerable: false,
                configurable: true
            });
        }
        this.streaming = true;
        return new ReadableStream({
            start: (controller)=>{
                this._req.on('data', (chunk)=>{
                    controller.enqueue(new Uint8Array(chunk));
                });
                this._req.on('end', ()=>{
                    controller.close();
                });
                this._req.on('error', (err)=>{
                    controller.error(err);
                });
            }
        });
    }
}
class NodeNextResponse extends __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseNextResponse"] {
    get originalResponse() {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYMBOL_CLEARED_COOKIES"] in this) {
            this._res[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYMBOL_CLEARED_COOKIES"]] = this[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYMBOL_CLEARED_COOKIES"]];
        }
        return this._res;
    }
    constructor(_res){
        super(_res), this._res = _res, this.textBody = undefined;
    }
    get sent() {
        return this._res.finished || this._res.headersSent;
    }
    get statusCode() {
        return this._res.statusCode;
    }
    set statusCode(value) {
        this._res.statusCode = value;
    }
    get statusMessage() {
        return this._res.statusMessage;
    }
    set statusMessage(value) {
        this._res.statusMessage = value;
    }
    setHeader(name, value) {
        this._res.setHeader(name, value);
        return this;
    }
    removeHeader(name) {
        this._res.removeHeader(name);
        return this;
    }
    getHeaderValues(name) {
        const values = this._res.getHeader(name);
        if (values === undefined) return undefined;
        return (Array.isArray(values) ? values : [
            values
        ]).map((value)=>value.toString());
    }
    hasHeader(name) {
        return this._res.hasHeader(name);
    }
    getHeader(name) {
        const values = this.getHeaderValues(name);
        return Array.isArray(values) ? values.join(',') : undefined;
    }
    getHeaders() {
        return this._res.getHeaders();
    }
    appendHeader(name, value) {
        const currentValues = this.getHeaderValues(name) ?? [];
        if (!currentValues.includes(value)) {
            this._res.setHeader(name, [
                ...currentValues,
                value
            ]);
        }
        return this;
    }
    body(value) {
        this.textBody = value;
        return this;
    }
    send() {
        this._res.end(this.textBody);
    }
    onClose(callback) {
        this.originalResponse.on('close', callback);
    }
}
var _NEXT_REQUEST_META; //# sourceMappingURL=node.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/experimental/ppr.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If set to `incremental`, only those leaf pages that export
 * `experimental_ppr = true` will have partial prerendering enabled. If any
 * page exports this value as `false` or does not export it at all will not
 * have partial prerendering enabled. If set to a boolean, the options for
 * `experimental_ppr` will be ignored.
 */ /**
 * Returns true if partial prerendering is enabled for the application. It does
 * not tell you if a given route has PPR enabled, as that requires analysis of
 * the route's configuration.
 *
 * @see {@link checkIsRoutePPREnabled} - for checking if a specific route has PPR enabled.
 */ __turbopack_context__.s([
    "checkIsAppPPREnabled",
    ()=>checkIsAppPPREnabled,
    "checkIsRoutePPREnabled",
    ()=>checkIsRoutePPREnabled
]);
function checkIsAppPPREnabled(config) {
    // If the config is undefined, partial prerendering is disabled.
    if (typeof config === 'undefined') return false;
    // If the config is a boolean, use it directly.
    if (typeof config === 'boolean') return config;
    // If the config is a string, it must be 'incremental' to enable partial
    // prerendering.
    if (config === 'incremental') return true;
    return false;
}
function checkIsRoutePPREnabled(config) {
    // If the config is undefined, partial prerendering is disabled.
    if (typeof config === 'undefined') return false;
    // If the config is a boolean, use it directly.
    if (typeof config === 'boolean') return config;
    return false;
} //# sourceMappingURL=ppr.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/route-modules/checks.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAppPageRouteModule",
    ()=>isAppPageRouteModule,
    "isAppRouteRouteModule",
    ()=>isAppRouteRouteModule,
    "isPagesAPIRouteModule",
    ()=>isPagesAPIRouteModule,
    "isPagesRouteModule",
    ()=>isPagesRouteModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript)");
;
function isAppRouteRouteModule(routeModule) {
    return routeModule.definition.kind === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RouteKind"].APP_ROUTE;
}
function isAppPageRouteModule(routeModule) {
    return routeModule.definition.kind === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RouteKind"].APP_PAGE;
}
function isPagesRouteModule(routeModule) {
    return routeModule.definition.kind === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RouteKind"].PAGES;
}
function isPagesAPIRouteModule(routeModule) {
    return routeModule.definition.kind === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API;
} //# sourceMappingURL=checks.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */ __turbopack_context__.s([
    "ensureLeadingSlash",
    ()=>ensureLeadingSlash
]);
function ensureLeadingSlash(path) {
    return path.startsWith('/') ? path : `/${path}`;
} //# sourceMappingURL=ensure-leading-slash.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeAppPath",
    ()=>normalizeAppPath,
    "normalizeRscURL",
    ()=>normalizeRscURL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/segment.js [app-rsc] (ecmascript)");
;
;
function normalizeAppPath(route) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureLeadingSlash"])(route.split('/').reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isGroupSegment"])(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === '@') {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === 'page' || segment === 'route') && index === segments.length - 1) {
            return pathname;
        }
        return `${pathname}/${segment}`;
    }, ''));
}
function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, '$1');
} //# sourceMappingURL=app-paths.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INTERCEPTION_ROUTE_MARKERS",
    ()=>INTERCEPTION_ROUTE_MARKERS,
    "extractInterceptionRouteInformation",
    ()=>extractInterceptionRouteInformation,
    "isInterceptionRouteAppPath",
    ()=>isInterceptionRouteAppPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [app-rsc] (ecmascript)");
;
const INTERCEPTION_ROUTE_MARKERS = [
    '(..)(..)',
    '(.)',
    '(..)',
    '(...)'
];
function isInterceptionRouteAppPath(path) {
    // TODO-APP: add more serious validation
    return path.split('/').find((segment)=>INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m))) !== undefined;
}
function extractInterceptionRouteInformation(path) {
    let interceptingRoute;
    let marker;
    let interceptedRoute;
    for (const segment of path.split('/')){
        marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        if (marker) {
            ;
            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
            break;
        }
    }
    if (!interceptingRoute || !marker || !interceptedRoute) {
        throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
            value: "E269",
            enumerable: false,
            configurable: true
        });
    }
    interceptingRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAppPath"])(interceptingRoute) // normalize the path, e.g. /(blog)/feed -> /feed
    ;
    switch(marker){
        case '(.)':
            // (.) indicates that we should match with sibling routes, so we just need to append the intercepted route to the intercepting route
            if (interceptingRoute === '/') {
                interceptedRoute = `/${interceptedRoute}`;
            } else {
                interceptedRoute = interceptingRoute + '/' + interceptedRoute;
            }
            break;
        case '(..)':
            // (..) indicates that we should match at one level up, so we need to remove the last segment of the intercepting route
            if (interceptingRoute === '/') {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
                    value: "E207",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = interceptingRoute.split('/').slice(0, -1).concat(interceptedRoute).join('/');
            break;
        case '(...)':
            // (...) will match the route segment in the root directory, so we need to use the root directory to prepend the intercepted route
            interceptedRoute = '/' + interceptedRoute;
            break;
        case '(..)(..)':
            // (..)(..) indicates that we should match at two levels up, so we need to remove the last two segments of the intercepting route
            const splitInterceptingRoute = interceptingRoute.split('/');
            if (splitInterceptingRoute.length <= 2) {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
                    value: "E486",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join('/');
            break;
        default:
            throw Object.defineProperty(new Error('Invariant: unexpected marker'), "__NEXT_ERROR_CODE", {
                value: "E112",
                enumerable: false,
                configurable: true
            });
    }
    return {
        interceptingRoute,
        interceptedRoute
    };
} //# sourceMappingURL=interception-routes.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/get-segment-param.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getParamProperties",
    ()=>getParamProperties,
    "getSegmentParam",
    ()=>getSegmentParam,
    "isCatchAll",
    ()=>isCatchAll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)");
;
function getSegmentParam(segment) {
    const interceptionMarker = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["INTERCEPTION_ROUTE_MARKERS"].find((marker)=>segment.startsWith(marker));
    // if an interception marker is part of the path segment, we need to jump ahead
    // to the relevant portion for param parsing
    if (interceptionMarker) {
        segment = segment.slice(interceptionMarker.length);
    }
    if (segment.startsWith('[[...') && segment.endsWith(']]')) {
        return {
            // TODO-APP: Optional catchall does not currently work with parallel routes,
            // so for now aren't handling a potential interception marker.
            paramType: 'optional-catchall',
            paramName: segment.slice(5, -2)
        };
    }
    if (segment.startsWith('[...') && segment.endsWith(']')) {
        return {
            paramType: interceptionMarker ? `catchall-intercepted-${interceptionMarker}` : 'catchall',
            paramName: segment.slice(4, -1)
        };
    }
    if (segment.startsWith('[') && segment.endsWith(']')) {
        return {
            paramType: interceptionMarker ? `dynamic-intercepted-${interceptionMarker}` : 'dynamic',
            paramName: segment.slice(1, -1)
        };
    }
    return null;
}
function isCatchAll(type) {
    return type === 'catchall' || type === 'catchall-intercepted-(..)(..)' || type === 'catchall-intercepted-(.)' || type === 'catchall-intercepted-(..)' || type === 'catchall-intercepted-(...)' || type === 'optional-catchall';
}
function getParamProperties(paramType) {
    let repeat = false;
    let optional = false;
    switch(paramType){
        case 'catchall':
        case 'catchall-intercepted-(..)(..)':
        case 'catchall-intercepted-(.)':
        case 'catchall-intercepted-(..)':
        case 'catchall-intercepted-(...)':
            repeat = true;
            break;
        case 'optional-catchall':
            repeat = true;
            optional = true;
            break;
        case 'dynamic':
        case 'dynamic-intercepted-(..)(..)':
        case 'dynamic-intercepted-(.)':
        case 'dynamic-intercepted-(..)':
        case 'dynamic-intercepted-(...)':
            break;
        default:
            paramType;
    }
    return {
        repeat,
        optional
    };
} //# sourceMappingURL=get-segment-param.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/routes/app.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isInterceptionAppRoute",
    ()=>isInterceptionAppRoute,
    "isNormalizedAppRoute",
    ()=>isNormalizedAppRoute,
    "parseAppRoute",
    ()=>parseAppRoute,
    "parseAppRouteSegment",
    ()=>parseAppRouteSegment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/get-segment-param.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)");
;
;
;
function parseAppRouteSegment(segment) {
    if (segment === '') {
        return null;
    }
    // Check if the segment starts with an interception marker
    const interceptionMarker = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["INTERCEPTION_ROUTE_MARKERS"].find((m)=>segment.startsWith(m));
    const param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSegmentParam"])(segment);
    if (param) {
        return {
            type: 'dynamic',
            name: segment,
            param,
            interceptionMarker
        };
    } else if (segment.startsWith('(') && segment.endsWith(')')) {
        return {
            type: 'route-group',
            name: segment,
            interceptionMarker
        };
    } else if (segment.startsWith('@')) {
        return {
            type: 'parallel-route',
            name: segment,
            interceptionMarker
        };
    } else {
        return {
            type: 'static',
            name: segment,
            interceptionMarker
        };
    }
}
function isNormalizedAppRoute(route) {
    return route.normalized;
}
function isInterceptionAppRoute(route) {
    return route.interceptionMarker !== undefined && route.interceptingRoute !== undefined && route.interceptedRoute !== undefined;
}
function parseAppRoute(pathname, normalized) {
    const pathnameSegments = pathname.split('/').filter(Boolean);
    // Build segments array with static and dynamic segments
    const segments = [];
    // Parse if this is an interception route.
    let interceptionMarker;
    let interceptingRoute;
    let interceptedRoute;
    for (const segment of pathnameSegments){
        // Parse the segment into an AppSegment.
        const appSegment = parseAppRouteSegment(segment);
        if (!appSegment) {
            continue;
        }
        if (normalized && (appSegment.type === 'route-group' || appSegment.type === 'parallel-route')) {
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`${pathname} is being parsed as a normalized route, but it has a route group or parallel route segment.`), "__NEXT_ERROR_CODE", {
                value: "E923",
                enumerable: false,
                configurable: true
            });
        }
        segments.push(appSegment);
        if (appSegment.interceptionMarker) {
            const parts = pathname.split(appSegment.interceptionMarker);
            if (parts.length !== 2) {
                throw Object.defineProperty(new Error(`Invalid interception route: ${pathname}`), "__NEXT_ERROR_CODE", {
                    value: "E924",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptingRoute = normalized ? parseAppRoute(parts[0], true) : parseAppRoute(parts[0], false);
            interceptedRoute = normalized ? parseAppRoute(parts[1], true) : parseAppRoute(parts[1], false);
            interceptionMarker = appSegment.interceptionMarker;
        }
    }
    const dynamicSegments = segments.filter((segment)=>segment.type === 'dynamic');
    return {
        normalized,
        pathname,
        segments,
        dynamicSegments,
        interceptionMarker,
        interceptingRoute,
        interceptedRoute
    };
} //# sourceMappingURL=app.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/parse-loader-tree.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseLoaderTree",
    ()=>parseLoaderTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/segment.js [app-rsc] (ecmascript)");
;
function parseLoaderTree(tree) {
    const [segment, parallelRoutes, modules] = tree;
    const { layout, template } = modules;
    let { page } = modules;
    // a __DEFAULT__ segment means that this route didn't match any of the
    // segments in the route, so we should use the default page
    page = segment === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_KEY"] ? modules.defaultPage : page;
    const conventionPath = layout?.[1] || template?.[1] || page?.[1];
    return {
        page,
        segment,
        modules,
        /* it can be either layout / template / page */ conventionPath,
        parallelRoutes
    };
} //# sourceMappingURL=parse-loader-tree.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/interception-prefix-from-param-type.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "interceptionPrefixFromParamType",
    ()=>interceptionPrefixFromParamType
]);
function interceptionPrefixFromParamType(paramType) {
    switch(paramType){
        case 'catchall-intercepted-(..)(..)':
        case 'dynamic-intercepted-(..)(..)':
            return '(..)(..)';
        case 'catchall-intercepted-(.)':
        case 'dynamic-intercepted-(.)':
            return '(.)';
        case 'catchall-intercepted-(..)':
        case 'dynamic-intercepted-(..)':
            return '(..)';
        case 'catchall-intercepted-(...)':
        case 'dynamic-intercepted-(...)':
            return '(...)';
        case 'catchall':
        case 'dynamic':
        case 'optional-catchall':
        default:
            return null;
    }
} //# sourceMappingURL=interception-prefix-from-param-type.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/resolve-param-value.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveParamValue",
    ()=>resolveParamValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$prefix$2d$from$2d$param$2d$type$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/interception-prefix-from-param-type.js [app-rsc] (ecmascript)");
;
;
/**
 * Extracts the param value from a path segment, handling interception markers
 * based on the expected param type.
 *
 * @param pathSegment - The path segment to extract the value from
 * @param params - The current params object for resolving dynamic param references
 * @param paramType - The expected param type which may include interception marker info
 * @returns The extracted param value
 */ function getParamValueFromSegment(pathSegment, params, paramType) {
    // If the segment is dynamic, resolve it from the params object
    if (pathSegment.type === 'dynamic') {
        return params[pathSegment.param.paramName];
    }
    // If the paramType indicates this is an intercepted param, strip the marker
    // that matches the interception marker in the param type
    const interceptionPrefix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$prefix$2d$from$2d$param$2d$type$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interceptionPrefixFromParamType"])(paramType);
    if (interceptionPrefix === pathSegment.interceptionMarker) {
        return pathSegment.name.replace(pathSegment.interceptionMarker, '');
    }
    // For static segments, use the name
    return pathSegment.name;
}
function resolveParamValue(paramName, paramType, depth, route, params) {
    switch(paramType){
        case 'catchall':
        case 'optional-catchall':
        case 'catchall-intercepted-(..)(..)':
        case 'catchall-intercepted-(.)':
        case 'catchall-intercepted-(..)':
        case 'catchall-intercepted-(...)':
            // For catchall routes, derive from pathname using depth to determine
            // which segments to use
            const processedSegments = [];
            // Process segments to handle any embedded dynamic params
            for(let index = depth; index < route.segments.length; index++){
                const pathSegment = route.segments[index];
                if (pathSegment.type === 'static') {
                    let value = pathSegment.name;
                    // For intercepted catch-all params, strip the marker from the first segment
                    const interceptionPrefix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$prefix$2d$from$2d$param$2d$type$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interceptionPrefixFromParamType"])(paramType);
                    if (interceptionPrefix && index === depth && interceptionPrefix === pathSegment.interceptionMarker) {
                        // Strip the interception marker from the value
                        value = value.replace(pathSegment.interceptionMarker, '');
                    }
                    processedSegments.push(value);
                } else {
                    // If the segment is a param placeholder, check if we have its value
                    if (!params.hasOwnProperty(pathSegment.param.paramName)) {
                        // If the segment is an optional catchall, we can break out of the
                        // loop because it's optional!
                        if (pathSegment.param.paramType === 'optional-catchall') {
                            break;
                        }
                        // Unknown param placeholder in pathname - can't derive full value
                        return undefined;
                    }
                    // If the segment matches a param, use the param value
                    // We don't encode values here as that's handled during retrieval.
                    const paramValue = params[pathSegment.param.paramName];
                    if (Array.isArray(paramValue)) {
                        processedSegments.push(...paramValue);
                    } else {
                        processedSegments.push(paramValue);
                    }
                }
            }
            if (processedSegments.length > 0) {
                return processedSegments;
            } else if (paramType === 'optional-catchall') {
                return undefined;
            } else {
                // We shouldn't be able to match a catchall segment without any path
                // segments if it's not an optional catchall
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`Unexpected empty path segments match for a route "${route.pathname}" with param "${paramName}" of type "${paramType}"`), "__NEXT_ERROR_CODE", {
                    value: "E931",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'dynamic':
        case 'dynamic-intercepted-(..)(..)':
        case 'dynamic-intercepted-(.)':
        case 'dynamic-intercepted-(..)':
        case 'dynamic-intercepted-(...)':
            // For regular dynamic parameters, take the segment at this depth
            if (depth < route.segments.length) {
                const pathSegment = route.segments[depth];
                // Check if the segment at this depth is a placeholder for an unknown param
                if (pathSegment.type === 'dynamic' && !params.hasOwnProperty(pathSegment.param.paramName)) {
                    // The segment is a placeholder like [category] and we don't have the value
                    return undefined;
                }
                // If the segment matches a param, use the param value from params object
                // Otherwise it's a static segment, just use it directly
                // We don't encode values here as that's handled during retrieval
                return getParamValueFromSegment(pathSegment, params, paramType);
            }
            return undefined;
        default:
            paramType;
    }
} //# sourceMappingURL=resolve-param-value.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/build/static-paths/app/extract-pathname-route-param-segments-from-loader-tree.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractPathnameRouteParamSegmentsFromLoaderTree",
    ()=>extractPathnameRouteParamSegmentsFromLoaderTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$routes$2f$app$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/routes/app.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/parse-loader-tree.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$resolve$2d$param$2d$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/resolve-param-value.js [app-rsc] (ecmascript)");
;
;
;
/**
 * Validates that the static segments in currentPath match the corresponding
 * segments in targetSegments. This ensures we only extract dynamic parameters
 * that are part of the target pathname structure.
 *
 * Segments are compared literally - interception markers like "(.)photo" are
 * part of the pathname and must match exactly.
 *
 * @example
 * // Matching paths
 * currentPath: ['blog', '(.)photo']
 * targetSegments: ['blog', '(.)photo', '[id]']
 * → Returns true (both static segments match exactly)
 *
 * @example
 * // Non-matching paths
 * currentPath: ['blog', '(.)photo']
 * targetSegments: ['blog', 'photo', '[id]']
 * → Returns false (segments don't match - marker is part of pathname)
 *
 * @param currentPath - The accumulated path segments from the loader tree
 * @param targetSegments - The target pathname split into segments
 * @returns true if all static segments match, false otherwise
 */ function validatePrefixMatch(currentPath, route) {
    for(let i = 0; i < currentPath.length; i++){
        const pathSegment = currentPath[i];
        const targetPathSegment = route.segments[i];
        // Type mismatch - one is static, one is dynamic
        if (pathSegment.type !== targetPathSegment.type) {
            return false;
        }
        // One has an interception marker, the other doesn't.
        if (pathSegment.interceptionMarker !== targetPathSegment.interceptionMarker) {
            return false;
        }
        // Both are static but names don't match
        if (pathSegment.type === 'static' && targetPathSegment.type === 'static' && pathSegment.name !== targetPathSegment.name) {
            return false;
        } else if (pathSegment.type === 'dynamic' && targetPathSegment.type === 'dynamic' && pathSegment.param.paramType !== targetPathSegment.param.paramType && pathSegment.param.paramName !== targetPathSegment.param.paramName) {
            return false;
        }
    }
    return true;
}
function extractPathnameRouteParamSegmentsFromLoaderTree(loaderTree, route) {
    const pathnameRouteParamSegments = [];
    const params = {};
    // BFS traversal with depth and path tracking
    const queue = [
        {
            tree: loaderTree,
            depth: 0,
            currentPath: []
        }
    ];
    while(queue.length > 0){
        const { tree, depth, currentPath } = queue.shift();
        const { segment, parallelRoutes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseLoaderTree"])(tree);
        // Build the path for the current node
        let updatedPath = currentPath;
        let nextDepth = depth;
        const appSegment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$routes$2f$app$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseAppRouteSegment"])(segment);
        // Only add to path if it's a real segment that appears in the URL
        // Route groups and parallel markers don't contribute to URL pathname
        if (appSegment && appSegment.type !== 'route-group' && appSegment.type !== 'parallel-route') {
            updatedPath = [
                ...currentPath,
                appSegment
            ];
            nextDepth = depth + 1;
        }
        // Check if this segment has a param and matches the target pathname at this depth
        if ((appSegment == null ? void 0 : appSegment.type) === 'dynamic') {
            const { paramName, paramType } = appSegment.param;
            // Check if this segment is at the correct depth in the target pathname
            // A segment matches if:
            // 1. There's a dynamic segment at this depth in the pathname
            // 2. The parameter names match (e.g., [id] matches [id], not [category])
            // 3. The static segments leading up to this point match (prefix check)
            if (depth < route.segments.length) {
                const targetSegment = route.segments[depth];
                // Match if the target pathname has a dynamic segment at this depth
                if (targetSegment.type === 'dynamic') {
                    // Check that parameter names match exactly
                    // This prevents [category] from matching against /[id]
                    if (paramName !== targetSegment.param.paramName) {
                        continue; // Different param names, skip this segment
                    }
                    // Validate that the path leading up to this dynamic segment matches
                    // the target pathname. This prevents false matches like extracting
                    // [slug] from "/news/[slug]" when the tree has "/blog/[slug]"
                    if (validatePrefixMatch(currentPath, route)) {
                        pathnameRouteParamSegments.push({
                            name: segment,
                            paramName,
                            paramType
                        });
                    }
                }
            }
            // Resolve parameter value if it's not already known.
            if (!params.hasOwnProperty(paramName)) {
                const paramValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$resolve$2d$param$2d$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveParamValue"])(paramName, paramType, depth, route, params);
                if (paramValue !== undefined) {
                    params[paramName] = paramValue;
                }
            }
        }
        // Continue traversing all parallel routes to find matching segments
        for (const parallelRoute of Object.values(parallelRoutes)){
            queue.push({
                tree: parallelRoute,
                depth: nextDepth,
                currentPath: updatedPath
            });
        }
    }
    return {
        pathnameRouteParamSegments,
        params
    };
} //# sourceMappingURL=extract-pathname-route-param-segments-from-loader-tree.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/build/static-paths/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeParam",
    ()=>encodeParam,
    "extractPathnameRouteParamSegments",
    ()=>extractPathnameRouteParamSegments,
    "extractPathnameRouteParamSegmentsFromSegments",
    ()=>extractPathnameRouteParamSegmentsFromSegments,
    "normalizePathname",
    ()=>normalizePathname,
    "resolveRouteParamsFromTree",
    ()=>resolveRouteParamsFromTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$checks$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/route-modules/checks.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$routes$2f$app$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/routes/app.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/parse-loader-tree.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$static$2d$paths$2f$app$2f$extract$2d$pathname$2d$route$2d$param$2d$segments$2d$from$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/build/static-paths/app/extract-pathname-route-param-segments-from-loader-tree.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$resolve$2d$param$2d$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/resolve-param-value.js [app-rsc] (ecmascript)");
;
;
;
;
;
function encodeParam(value, encoder) {
    let replaceValue;
    if (Array.isArray(value)) {
        replaceValue = value.map(encoder).join('/');
    } else {
        replaceValue = encoder(value);
    }
    return replaceValue;
}
function normalizePathname(pathname) {
    return pathname.replace(/\\/g, '/').replace(/(?!^)\/$/, '');
}
function extractPathnameRouteParamSegments(routeModule, segments, route) {
    // For AppPageRouteModule, use the loaderTree traversal approach
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$checks$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAppPageRouteModule"])(routeModule)) {
        const { pathnameRouteParamSegments } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$static$2d$paths$2f$app$2f$extract$2d$pathname$2d$route$2d$param$2d$segments$2d$from$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractPathnameRouteParamSegmentsFromLoaderTree"])(routeModule.userland.loaderTree, route);
        return pathnameRouteParamSegments;
    }
    return extractPathnameRouteParamSegmentsFromSegments(segments);
}
function extractPathnameRouteParamSegmentsFromSegments(segments) {
    // TODO: should we consider what values are already present in the page?
    // For AppRouteRouteModule, filter the segments array to get the route params
    // that contribute to the pathname.
    const result = [];
    for (const segment of segments){
        // Skip segments without param info.
        if (!segment.paramName || !segment.paramType) continue;
        // Collect all the route param keys that contribute to the pathname.
        result.push({
            name: segment.name,
            paramName: segment.paramName,
            paramType: segment.paramType
        });
    }
    return result;
}
function resolveRouteParamsFromTree(loaderTree, params, route, fallbackRouteParams) {
    // Stack-based traversal with depth tracking
    const stack = [
        {
            tree: loaderTree,
            depth: 0
        }
    ];
    while(stack.length > 0){
        const { tree, depth } = stack.pop();
        const { segment, parallelRoutes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseLoaderTree"])(tree);
        const appSegment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$routes$2f$app$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseAppRouteSegment"])(segment);
        // If this segment is a route parameter, then we should process it if it's
        // not already known and is not already marked as a fallback route param.
        if ((appSegment == null ? void 0 : appSegment.type) === 'dynamic' && !params.hasOwnProperty(appSegment.param.paramName) && !fallbackRouteParams.some((param)=>param.paramName === appSegment.param.paramName)) {
            const { paramName, paramType } = appSegment.param;
            const paramValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$resolve$2d$param$2d$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveParamValue"])(paramName, paramType, depth, route, params);
            if (paramValue !== undefined) {
                params[paramName] = paramValue;
            } else if (paramType !== 'optional-catchall') {
                // If we couldn't resolve the param, mark it as a fallback
                fallbackRouteParams.push({
                    paramName,
                    paramType
                });
            }
        }
        // Calculate next depth - increment if this is not a route group and not empty
        let nextDepth = depth;
        if (appSegment && appSegment.type !== 'route-group' && appSegment.type !== 'parallel-route') {
            nextDepth++;
        }
        // Add all parallel routes to the stack for processing.
        for (const parallelRoute of Object.values(parallelRoutes)){
            stack.push({
                tree: parallelRoute,
                depth: nextDepth
            });
        }
    }
} //# sourceMappingURL=utils.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/get-short-dynamic-param-type.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dynamicParamTypes",
    ()=>dynamicParamTypes
]);
const dynamicParamTypes = {
    catchall: 'c',
    'catchall-intercepted-(..)(..)': 'ci(..)(..)',
    'catchall-intercepted-(.)': 'ci(.)',
    'catchall-intercepted-(..)': 'ci(..)',
    'catchall-intercepted-(...)': 'ci(...)',
    'optional-catchall': 'oc',
    dynamic: 'd',
    'dynamic-intercepted-(..)(..)': 'di(..)(..)',
    'dynamic-intercepted-(.)': 'di(.)',
    'dynamic-intercepted-(..)': 'di(..)',
    'dynamic-intercepted-(...)': 'di(...)'
}; //# sourceMappingURL=get-short-dynamic-param-type.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/request/fallback-params.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOpaqueFallbackRouteParams",
    ()=>createOpaqueFallbackRouteParams,
    "getFallbackRouteParams",
    ()=>getFallbackRouteParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$static$2d$paths$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/build/static-paths/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$get$2d$short$2d$dynamic$2d$param$2d$type$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/get-short-dynamic-param-type.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$routes$2f$app$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/routes/app.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$static$2d$paths$2f$app$2f$extract$2d$pathname$2d$route$2d$param$2d$segments$2d$from$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/build/static-paths/app/extract-pathname-route-param-segments-from-loader-tree.js [app-rsc] (ecmascript)");
;
;
;
;
function createOpaqueFallbackRouteParams(fallbackRouteParams) {
    // If there are no fallback route params, we can return early.
    if (fallbackRouteParams.length === 0) return null;
    // As we're creating unique keys for each of the dynamic route params, we only
    // need to generate a unique ID once per request because each of the keys will
    // be also be unique.
    const uniqueID = Math.random().toString(16).slice(2);
    const keys = new Map();
    // Generate a unique key for the fallback route param, if this key is found
    // in the static output, it represents a bug in cache components.
    for (const { paramName, paramType } of fallbackRouteParams){
        keys.set(paramName, [
            `%%drp:${paramName}:${uniqueID}%%`,
            __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$get$2d$short$2d$dynamic$2d$param$2d$type$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dynamicParamTypes"][paramType]
        ]);
    }
    return keys;
}
function getFallbackRouteParams(page, routeModule) {
    const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$routes$2f$app$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseAppRoute"])(page, true);
    // Extract the pathname-contributing segments from the loader tree. This
    // mirrors the logic in buildAppStaticPaths where we determine which segments
    // actually contribute to the pathname.
    const { pathnameRouteParamSegments, params } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$static$2d$paths$2f$app$2f$extract$2d$pathname$2d$route$2d$param$2d$segments$2d$from$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractPathnameRouteParamSegmentsFromLoaderTree"])(routeModule.userland.loaderTree, route);
    // Create fallback route params for the pathname segments.
    const fallbackRouteParams = pathnameRouteParamSegments.map(({ paramName, paramType })=>({
            paramName,
            paramType
        }));
    // Resolve route params from the loader tree. This mutates the
    // fallbackRouteParams array to add any route params that are
    // unknown at request time.
    //
    // The page parameter contains placeholders like [slug], which helps
    // resolveRouteParamsFromTree determine which params are unknown.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$static$2d$paths$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveRouteParamsFromTree"])(routeModule.userland.loaderTree, params, route, fallbackRouteParams // Will be mutated to add route params
    );
    // Convert the fallback route params to an opaque format that can be safely
    // used in the postponed state without exposing implementation details.
    return createOpaqueFallbackRouteParams(fallbackRouteParams);
} //# sourceMappingURL=fallback-params.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/manifests-singleton.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClientReferenceManifest",
    ()=>getClientReferenceManifest,
    "getServerActionsManifest",
    ()=>getServerActionsManifest,
    "getServerModuleMap",
    ()=>getServerModuleMap,
    "selectWorkerForForwarding",
    ()=>selectWorkerForForwarding,
    "setManifestsSingleton",
    ()=>setManifestsSingleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
;
;
;
;
;
// This is a global singleton that is, among other things, also used to
// encode/decode bound args of server function closures. This can't be using a
// AsyncLocalStorage as it might happen at the module level.
const MANIFESTS_SINGLETON = Symbol.for('next.server.manifests');
const globalThisWithManifests = globalThis;
function createProxiedClientReferenceManifest(clientReferenceManifestsPerRoute) {
    const createMappingProxy = (prop)=>{
        return new Proxy({}, {
            get (_, id) {
                const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
                if (workStore) {
                    const currentManifest = clientReferenceManifestsPerRoute.get(workStore.route);
                    if (currentManifest == null ? void 0 : currentManifest[prop][id]) {
                        return currentManifest[prop][id];
                    }
                    // In development, we also check all other manifests to see if the
                    // module exists there. This is to support a scenario where React's
                    // I/O tracking (dev-only) creates a connection from one page to
                    // another through an emitted async I/O node that references client
                    // components from the other page, e.g. in owner props.
                    // TODO: Maybe we need to add a `debugBundlerConfig` option to React
                    // to avoid this workaround. The current workaround has the
                    // disadvantage that one might accidentally or intentionally share
                    // client references across pages (e.g. by storing them in a global
                    // variable), which would then only be caught in production.
                    if ("TURBOPACK compile-time truthy", 1) {
                        for (const [route, manifest] of clientReferenceManifestsPerRoute){
                            if (route === workStore.route) {
                                continue;
                            }
                            const entry = manifest[prop][id];
                            if (entry !== undefined) {
                                return entry;
                            }
                        }
                    }
                } else {
                    // If there's no work store defined, we can assume that a client
                    // reference manifest is needed during module evaluation, e.g. to
                    // create a server function using a higher-order function. This
                    // might also use client components which need to be serialized by
                    // Flight, and therefore client references need to be resolvable. In
                    // that case we search all page manifests to find the module.
                    for (const manifest of clientReferenceManifestsPerRoute.values()){
                        const entry = manifest[prop][id];
                        if (entry !== undefined) {
                            return entry;
                        }
                    }
                }
                return undefined;
            }
        });
    };
    const mappingProxies = new Map();
    return new Proxy({}, {
        get (_, prop) {
            const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
            switch(prop){
                case 'moduleLoading':
                case 'entryCSSFiles':
                case 'entryJSFiles':
                    {
                        if (!workStore) {
                            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`Cannot access "${prop}" without a work store.`), "__NEXT_ERROR_CODE", {
                                value: "E952",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        const currentManifest = clientReferenceManifestsPerRoute.get(workStore.route);
                        if (!currentManifest) {
                            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`The client reference manifest for route "${workStore.route}" does not exist.`), "__NEXT_ERROR_CODE", {
                                value: "E951",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        return currentManifest[prop];
                    }
                case 'clientModules':
                case 'rscModuleMapping':
                case 'edgeRscModuleMapping':
                case 'ssrModuleMapping':
                case 'edgeSSRModuleMapping':
                    {
                        let proxy = mappingProxies.get(prop);
                        if (!proxy) {
                            proxy = createMappingProxy(prop);
                            mappingProxies.set(prop, proxy);
                        }
                        return proxy;
                    }
                default:
                    {
                        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`This is a proxied client reference manifest. The property "${String(prop)}" is not handled.`), "__NEXT_ERROR_CODE", {
                            value: "E953",
                            enumerable: false,
                            configurable: true
                        });
                    }
            }
        }
    });
}
/**
 * This function creates a Flight-acceptable server module map proxy from our
 * Server Reference Manifest similar to our client module map. This is because
 * our manifest contains a lot of internal Next.js data that are relevant to the
 * runtime, workers, etc. that React doesn't need to know.
 */ function createServerModuleMap() {
    return new Proxy({}, {
        get: (_, id)=>{
            var _getServerActionsManifest__id, _getServerActionsManifest_;
            const workers = (_getServerActionsManifest_ = getServerActionsManifest()[("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'node']) == null ? void 0 : (_getServerActionsManifest__id = _getServerActionsManifest_[id]) == null ? void 0 : _getServerActionsManifest__id.workers;
            if (!workers) {
                return undefined;
            }
            const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
            let workerEntry;
            if (workStore) {
                workerEntry = workers[normalizeWorkerPageName(workStore.page)];
            } else {
                // If there's no work store defined, we can assume that a server
                // module map is needed during module evaluation, e.g. to create a
                // server action using a higher-order function. Therefore it should be
                // safe to return any entry from the manifest that matches the action
                // ID. They all refer to the same module ID, which must also exist in
                // the current page bundle. TODO: This is currently not guaranteed in
                // Turbopack, and needs to be fixed.
                workerEntry = Object.values(workers).at(0);
            }
            if (!workerEntry) {
                return undefined;
            }
            const { moduleId, async } = workerEntry;
            return {
                id: moduleId,
                name: id,
                chunks: [],
                async
            };
        }
    });
}
/**
 * The flight entry loader keys actions by bundlePath. bundlePath corresponds
 * with the relative path (including 'app') to the page entrypoint.
 */ function normalizeWorkerPageName(pageName) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pathHasPrefix"])(pageName, 'app')) {
        return pageName;
    }
    return 'app' + pageName;
}
/**
 * Converts a bundlePath (relative path to the entrypoint) to a routable page
 * name.
 */ function denormalizeWorkerPageName(bundlePath) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAppPath"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removePathPrefix"])(bundlePath, 'app'));
}
function selectWorkerForForwarding(actionId, pageName) {
    var _serverActionsManifest__actionId;
    const serverActionsManifest = getServerActionsManifest();
    const workers = (_serverActionsManifest__actionId = serverActionsManifest[("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'node'][actionId]) == null ? void 0 : _serverActionsManifest__actionId.workers;
    // There are no workers to handle this action, nothing to forward to.
    if (!workers) {
        return;
    }
    // If there is an entry for the current page, we don't need to forward.
    if (workers[normalizeWorkerPageName(pageName)]) {
        return;
    }
    // Otherwise, grab the first worker that has a handler for this action id.
    return denormalizeWorkerPageName(Object.keys(workers)[0]);
}
function setManifestsSingleton({ page, clientReferenceManifest, serverActionsManifest }) {
    const existingSingleton = globalThisWithManifests[MANIFESTS_SINGLETON];
    if (existingSingleton) {
        existingSingleton.clientReferenceManifestsPerRoute.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAppPath"])(page), clientReferenceManifest);
        existingSingleton.serverActionsManifest = serverActionsManifest;
    } else {
        const clientReferenceManifestsPerRoute = new Map([
            [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAppPath"])(page),
                clientReferenceManifest
            ]
        ]);
        const proxiedClientReferenceManifest = createProxiedClientReferenceManifest(clientReferenceManifestsPerRoute);
        globalThisWithManifests[MANIFESTS_SINGLETON] = {
            clientReferenceManifestsPerRoute,
            proxiedClientReferenceManifest,
            serverActionsManifest,
            serverModuleMap: createServerModuleMap()
        };
    }
}
function getManifestsSingleton() {
    const manifestSingleton = globalThisWithManifests[MANIFESTS_SINGLETON];
    if (!manifestSingleton) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"]('The manifests singleton was not initialized.'), "__NEXT_ERROR_CODE", {
            value: "E950",
            enumerable: false,
            configurable: true
        });
    }
    return manifestSingleton;
}
function getClientReferenceManifest() {
    return getManifestsSingleton().proxiedClientReferenceManifest;
}
function getServerActionsManifest() {
    return getManifestsSingleton().serverActionsManifest;
}
function getServerModuleMap() {
    return getManifestsSingleton().serverModuleMap;
} //# sourceMappingURL=manifests-singleton.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/html-bots.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This regex contains the bots that we need to do a blocking render for and can't safely stream the response
// due to how they parse the DOM. For example, they might explicitly check for metadata in the `head` tag, so we can't stream metadata tags after the `head` was sent.
// Note: The pattern [\w-]+-Google captures all Google crawlers with "-Google" suffix (e.g., Mediapartners-Google, AdsBot-Google, Storebot-Google)
// as well as crawlers starting with "Google-" (e.g., Google-PageRenderer, Google-InspectionTool)
__turbopack_context__.s([
    "HTML_LIMITED_BOT_UA_RE",
    ()=>HTML_LIMITED_BOT_UA_RE
]);
const HTML_LIMITED_BOT_UA_RE = /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight/i; //# sourceMappingURL=html-bots.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/is-bot.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HTML_LIMITED_BOT_UA_RE_STRING",
    ()=>HTML_LIMITED_BOT_UA_RE_STRING,
    "getBotType",
    ()=>getBotType,
    "isBot",
    ()=>isBot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$html$2d$bots$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/html-bots.js [app-rsc] (ecmascript)");
;
// Bot crawler that will spin up a headless browser and execute JS.
// Only the main Googlebot search crawler executes JavaScript, not other Google crawlers.
// x-ref: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
// This regex specifically matches "Googlebot" but NOT "Mediapartners-Google", "AdsBot-Google", etc.
const HEADLESS_BROWSER_BOT_UA_RE = /Googlebot(?!-)|Googlebot$/i;
const HTML_LIMITED_BOT_UA_RE_STRING = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$html$2d$bots$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTML_LIMITED_BOT_UA_RE"].source;
;
function isDomBotUA(userAgent) {
    return HEADLESS_BROWSER_BOT_UA_RE.test(userAgent);
}
function isHtmlLimitedBotUA(userAgent) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$html$2d$bots$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTML_LIMITED_BOT_UA_RE"].test(userAgent);
}
function isBot(userAgent) {
    return isDomBotUA(userAgent) || isHtmlLimitedBotUA(userAgent);
}
function getBotType(userAgent) {
    if (isDomBotUA(userAgent)) {
        return 'dom';
    }
    if (isHtmlLimitedBotUA(userAgent)) {
        return 'html';
    }
    return undefined;
} //# sourceMappingURL=is-bot.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/streaming-metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHtmlBotRequest",
    ()=>isHtmlBotRequest,
    "shouldServeStreamingMetadata",
    ()=>shouldServeStreamingMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/is-bot.js [app-rsc] (ecmascript) <locals>");
;
function shouldServeStreamingMetadata(userAgent, htmlLimitedBots) {
    const blockingMetadataUARegex = new RegExp(htmlLimitedBots || __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HTML_LIMITED_BOT_UA_RE_STRING"], 'i');
    // Only block metadata for HTML-limited bots
    if (userAgent && blockingMetadataUARegex.test(userAgent)) {
        return false;
    }
    return true;
}
function isHtmlBotRequest(req) {
    const ua = req.headers['user-agent'] || '';
    const botType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getBotType"])(ua);
    return botType === 'html';
} //# sourceMappingURL=streaming-metadata.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/server-action-request-meta.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getIsPossibleServerAction",
    ()=>getIsPossibleServerAction,
    "getServerActionRequestMetadata",
    ()=>getServerActionRequestMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/client/components/app-router-headers.js [app-rsc] (ecmascript)");
;
function getServerActionRequestMetadata(req) {
    let actionId;
    let contentType;
    if (req.headers instanceof Headers) {
        actionId = req.headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ACTION_HEADER"]) ?? null;
        contentType = req.headers.get('content-type');
    } else {
        actionId = req.headers[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ACTION_HEADER"]] ?? null;
        contentType = req.headers['content-type'] ?? null;
    }
    // We don't actually support URL encoded actions, and the action handler will bail out if it sees one.
    // But we still want it to flow through to the action handler, to prevent changes in behavior when a regular
    // page component tries to handle a POST.
    const isURLEncodedAction = Boolean(req.method === 'POST' && contentType === 'application/x-www-form-urlencoded');
    const isMultipartAction = Boolean(req.method === 'POST' && (contentType == null ? void 0 : contentType.startsWith('multipart/form-data')));
    const isFetchAction = Boolean(actionId !== undefined && typeof actionId === 'string' && req.method === 'POST');
    const isPossibleServerAction = Boolean(isFetchAction || isURLEncodedAction || isMultipartAction);
    return {
        actionId,
        isURLEncodedAction,
        isMultipartAction,
        isFetchAction,
        isPossibleServerAction
    };
}
function getIsPossibleServerAction(req) {
    return getServerActionRequestMetadata(req).isPossibleServerAction;
} //# sourceMappingURL=server-action-request-meta.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/lib/fallback.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Describes the different fallback modes that a given page can have.
 */ __turbopack_context__.s([
    "FallbackMode",
    ()=>FallbackMode,
    "fallbackModeToFallbackField",
    ()=>fallbackModeToFallbackField,
    "parseFallbackField",
    ()=>parseFallbackField,
    "parseStaticPathsResult",
    ()=>parseStaticPathsResult
]);
var FallbackMode = /*#__PURE__*/ function(FallbackMode) {
    /**
   * A BLOCKING_STATIC_RENDER fallback will block the request until the page is
   * generated. No fallback page will be rendered, and users will have to wait
   * to render the page.
   */ FallbackMode["BLOCKING_STATIC_RENDER"] = "BLOCKING_STATIC_RENDER";
    /**
   * When set to PRERENDER, a fallback page will be sent to users in place of
   * forcing them to wait for the page to be generated. This allows the user to
   * see a rendered page earlier.
   */ FallbackMode["PRERENDER"] = "PRERENDER";
    /**
   * When set to NOT_FOUND, pages that are not already prerendered will result
   * in a not found response.
   */ FallbackMode["NOT_FOUND"] = "NOT_FOUND";
    return FallbackMode;
}({});
function parseFallbackField(fallbackField) {
    if (typeof fallbackField === 'string') {
        return "PRERENDER";
    } else if (fallbackField === null) {
        return "BLOCKING_STATIC_RENDER";
    } else if (fallbackField === false) {
        return "NOT_FOUND";
    } else if (fallbackField === undefined) {
        return undefined;
    } else {
        throw Object.defineProperty(new Error(`Invalid fallback option: ${fallbackField}. Fallback option must be a string, null, undefined, or false.`), "__NEXT_ERROR_CODE", {
            value: "E285",
            enumerable: false,
            configurable: true
        });
    }
}
function fallbackModeToFallbackField(fallback, page) {
    switch(fallback){
        case "BLOCKING_STATIC_RENDER":
            return null;
        case "NOT_FOUND":
            return false;
        case "PRERENDER":
            if (!page) {
                throw Object.defineProperty(new Error(`Invariant: expected a page to be provided when fallback mode is "${fallback}"`), "__NEXT_ERROR_CODE", {
                    value: "E422",
                    enumerable: false,
                    configurable: true
                });
            }
            return page;
        default:
            throw Object.defineProperty(new Error(`Invalid fallback mode: ${fallback}`), "__NEXT_ERROR_CODE", {
                value: "E254",
                enumerable: false,
                configurable: true
            });
    }
}
function parseStaticPathsResult(result) {
    if (result === true) {
        return "PRERENDER";
    } else if (result === 'blocking') {
        return "BLOCKING_STATIC_RENDER";
    } else {
        return "NOT_FOUND";
    }
} //# sourceMappingURL=fallback.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Web vitals provided to _app.reportWebVitals by Core Web Vitals plugin developed by Google Chrome team.
 * https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 */ __turbopack_context__.s([
    "DecodeError",
    ()=>DecodeError,
    "MiddlewareNotFoundError",
    ()=>MiddlewareNotFoundError,
    "MissingStaticPage",
    ()=>MissingStaticPage,
    "NormalizeError",
    ()=>NormalizeError,
    "PageNotFoundError",
    ()=>PageNotFoundError,
    "SP",
    ()=>SP,
    "ST",
    ()=>ST,
    "WEB_VITALS",
    ()=>WEB_VITALS,
    "execOnce",
    ()=>execOnce,
    "getDisplayName",
    ()=>getDisplayName,
    "getLocationOrigin",
    ()=>getLocationOrigin,
    "getURL",
    ()=>getURL,
    "isAbsoluteUrl",
    ()=>isAbsoluteUrl,
    "isResSent",
    ()=>isResSent,
    "loadGetInitialProps",
    ()=>loadGetInitialProps,
    "normalizeRepeatedSlashes",
    ()=>normalizeRepeatedSlashes,
    "stringifyError",
    ()=>stringifyError
]);
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/etag.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * FNV-1a Hash implementation
 * @author Travis Webb (tjwebb) <me@traviswebb.com>
 *
 * Ported from https://github.com/tjwebb/fnv-plus/blob/master/index.js
 *
 * Simplified, optimized and add modified for 52 bit, which provides a larger hash space
 * and still making use of Javascript's 53-bit integer space.
 */ __turbopack_context__.s([
    "fnv1a52",
    ()=>fnv1a52,
    "generateETag",
    ()=>generateETag
]);
const fnv1a52 = (str)=>{
    const len = str.length;
    let i = 0, t0 = 0, v0 = 0x2325, t1 = 0, v1 = 0x8422, t2 = 0, v2 = 0x9ce4, t3 = 0, v3 = 0xcbf2;
    while(i < len){
        v0 ^= str.charCodeAt(i++);
        t0 = v0 * 435;
        t1 = v1 * 435;
        t2 = v2 * 435;
        t3 = v3 * 435;
        t2 += v0 << 8;
        t3 += v1 << 8;
        t1 += t0 >>> 16;
        v0 = t0 & 65535;
        t2 += t1 >>> 16;
        v1 = t1 & 65535;
        v3 = t3 + (t2 >>> 16) & 65535;
        v2 = t2 & 65535;
    }
    return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
};
const generateETag = (payload, weak = false)=>{
    const prefix = weak ? 'W/"' : '"';
    return prefix + fnv1a52(payload).toString(36) + payload.length.toString(36) + '"';
}; //# sourceMappingURL=etag.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/fresh/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    var e = {
        695: (e)=>{
            /*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */ var r = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
            e.exports = fresh;
            function fresh(e, a) {
                var t = e["if-modified-since"];
                var s = e["if-none-match"];
                if (!t && !s) {
                    return false;
                }
                var i = e["cache-control"];
                if (i && r.test(i)) {
                    return false;
                }
                if (s && s !== "*") {
                    var f = a["etag"];
                    if (!f) {
                        return false;
                    }
                    var n = true;
                    var u = parseTokenList(s);
                    for(var _ = 0; _ < u.length; _++){
                        var o = u[_];
                        if (o === f || o === "W/" + f || "W/" + o === f) {
                            n = false;
                            break;
                        }
                    }
                    if (n) {
                        return false;
                    }
                }
                if (t) {
                    var p = a["last-modified"];
                    var v = !p || !(parseHttpDate(p) <= parseHttpDate(t));
                    if (v) {
                        return false;
                    }
                }
                return true;
            }
            function parseHttpDate(e) {
                var r = e && Date.parse(e);
                return typeof r === "number" ? r : NaN;
            }
            function parseTokenList(e) {
                var r = 0;
                var a = [];
                var t = 0;
                for(var s = 0, i = e.length; s < i; s++){
                    switch(e.charCodeAt(s)){
                        case 32:
                            if (t === r) {
                                t = r = s + 1;
                            }
                            break;
                        case 44:
                            a.push(e.substring(t, r));
                            t = r = s + 1;
                            break;
                        default:
                            r = s + 1;
                            break;
                    }
                }
                a.push(e.substring(t, r));
                return a;
            }
        }
    };
    var r = {};
    function __nccwpck_require__(a) {
        var t = r[a];
        if (t !== undefined) {
            return t.exports;
        }
        var s = r[a] = {
            exports: {}
        };
        var i = true;
        try {
            e[a](s, s.exports, __nccwpck_require__);
            i = false;
        } finally{
            if (i) delete r[a];
        }
        return s.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/fresh") + "/";
    var a = __nccwpck_require__(695);
    module.exports = a;
})();
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/cache-control.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCacheControlHeader",
    ()=>getCacheControlHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)");
;
function getCacheControlHeader({ revalidate, expire }) {
    const swrHeader = typeof revalidate === 'number' && expire !== undefined && revalidate < expire ? `, stale-while-revalidate=${expire - revalidate}` : '';
    if (revalidate === 0) {
        return 'private, no-cache, no-store, max-age=0, must-revalidate';
    } else if (typeof revalidate === 'number') {
        return `s-maxage=${revalidate}${swrHeader}`;
    }
    return `s-maxage=${__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CACHE_ONE_YEAR"]}${swrHeader}`;
} //# sourceMappingURL=cache-control.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/send-payload.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendEtagResponse",
    ()=>sendEtagResponse,
    "sendRenderResult",
    ()=>sendRenderResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$etag$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/etag.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$fresh$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/fresh/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$control$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/cache-control.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)");
;
;
;
;
;
function sendEtagResponse(req, res, etag) {
    if (etag) {
        /**
     * The server generating a 304 response MUST generate any of the
     * following header fields that would have been sent in a 200 (OK)
     * response to the same request: Cache-Control, Content-Location, Date,
     * ETag, Expires, and Vary. https://tools.ietf.org/html/rfc7232#section-4.1
     */ res.setHeader('ETag', etag);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$fresh$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(req.headers, {
        etag
    })) {
        res.statusCode = 304;
        res.end();
        return true;
    }
    return false;
}
async function sendRenderResult({ req, res, result, generateEtags, poweredByHeader, cacheControl }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isResSent"])(res)) {
        return;
    }
    if (poweredByHeader && result.contentType === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTML_CONTENT_TYPE_HEADER"]) {
        res.setHeader('X-Powered-By', 'Next.js');
    }
    // If cache control is already set on the response we don't
    // override it to allow users to customize it via next.config
    if (cacheControl && !res.getHeader('Cache-Control')) {
        res.setHeader('Cache-Control', (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$control$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCacheControlHeader"])(cacheControl));
    }
    const payload = result.isDynamic ? null : result.toUnchunkedString();
    if (generateEtags && payload !== null) {
        const etag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$etag$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateETag"])(payload);
        if (sendEtagResponse(req, res, etag)) {
            return;
        }
    }
    if (!res.getHeader('Content-Type') && result.contentType) {
        res.setHeader('Content-Type', result.contentType);
    }
    if (payload) {
        res.setHeader('Content-Length', Buffer.byteLength(payload));
    }
    if (req.method === 'HEAD') {
        res.end(null);
        return;
    }
    if (payload !== null) {
        res.end(payload);
        return;
    }
    // Pipe the render result to the response after we get a writer for it.
    await result.pipeToNodeResponse(res);
} //# sourceMappingURL=send-payload.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/bytes/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    var e = {
        56: (e)=>{
            /*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */ e.exports = bytes;
            e.exports.format = format;
            e.exports.parse = parse;
            var r = /\B(?=(\d{3})+(?!\d))/g;
            var a = /(?:\.0*|(\.[^0]+)0+)$/;
            var t = {
                b: 1,
                kb: 1 << 10,
                mb: 1 << 20,
                gb: 1 << 30,
                tb: Math.pow(1024, 4),
                pb: Math.pow(1024, 5)
            };
            var i = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
            function bytes(e, r) {
                if (typeof e === "string") {
                    return parse(e);
                }
                if (typeof e === "number") {
                    return format(e, r);
                }
                return null;
            }
            function format(e, i) {
                if (!Number.isFinite(e)) {
                    return null;
                }
                var n = Math.abs(e);
                var o = i && i.thousandsSeparator || "";
                var s = i && i.unitSeparator || "";
                var f = i && i.decimalPlaces !== undefined ? i.decimalPlaces : 2;
                var u = Boolean(i && i.fixedDecimals);
                var p = i && i.unit || "";
                if (!p || !t[p.toLowerCase()]) {
                    if (n >= t.pb) {
                        p = "PB";
                    } else if (n >= t.tb) {
                        p = "TB";
                    } else if (n >= t.gb) {
                        p = "GB";
                    } else if (n >= t.mb) {
                        p = "MB";
                    } else if (n >= t.kb) {
                        p = "KB";
                    } else {
                        p = "B";
                    }
                }
                var b = e / t[p.toLowerCase()];
                var l = b.toFixed(f);
                if (!u) {
                    l = l.replace(a, "$1");
                }
                if (o) {
                    l = l.split(".").map(function(e, a) {
                        return a === 0 ? e.replace(r, o) : e;
                    }).join(".");
                }
                return l + s + p;
            }
            function parse(e) {
                if (typeof e === "number" && !isNaN(e)) {
                    return e;
                }
                if (typeof e !== "string") {
                    return null;
                }
                var r = i.exec(e);
                var a;
                var n = "b";
                if (!r) {
                    a = parseInt(e, 10);
                    n = "b";
                } else {
                    a = parseFloat(r[1]);
                    n = r[4].toLowerCase();
                }
                return Math.floor(t[n] * a);
            }
        }
    };
    var r = {};
    function __nccwpck_require__(a) {
        var t = r[a];
        if (t !== undefined) {
            return t.exports;
        }
        var i = r[a] = {
            exports: {}
        };
        var n = true;
        try {
            e[a](i, i.exports, __nccwpck_require__);
            n = false;
        } finally{
            if (n) delete r[a];
        }
        return i.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/bytes") + "/";
    var a = __nccwpck_require__(56);
    module.exports = a;
})();
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/size-limit.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_MAX_POSTPONED_STATE_SIZE",
    ()=>DEFAULT_MAX_POSTPONED_STATE_SIZE,
    "parseMaxPostponedStateSize",
    ()=>parseMaxPostponedStateSize
]);
const DEFAULT_MAX_POSTPONED_STATE_SIZE = '100 MB';
function parseSizeLimit(size) {
    const bytes = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/bytes/index.js [app-rsc] (ecmascript)").parse(size);
    if (bytes === null || isNaN(bytes) || bytes < 1) {
        return undefined;
    }
    return bytes;
}
function parseMaxPostponedStateSize(size) {
    return parseSizeLimit(size ?? DEFAULT_MAX_POSTPONED_STATE_SIZE);
} //# sourceMappingURL=size-limit.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript)"));
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility) <locals>", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript) <locals>"));}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript)"));}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript)"));
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript)"));
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript)"));
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/utils/warn-once.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "warnOnce", {
    enumerable: true,
    get: function() {
        return warnOnce;
    }
});
let warnOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const warnings = new Set();
    warnOnce = (msg)=>{
        if (!warnings.has(msg)) {
            console.warn(msg);
        }
        warnings.add(msg);
    };
} //# sourceMappingURL=warn-once.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/deployment-id.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This could also be a variable instead of a function, but some unit tests want to change the ID at
// runtime. Even though that would never happen in a real deployment.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getDeploymentId: null,
    getDeploymentIdQueryOrEmptyString: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getDeploymentId: function() {
        return getDeploymentId;
    },
    getDeploymentIdQueryOrEmptyString: function() {
        return getDeploymentIdQueryOrEmptyString;
    }
});
function getDeploymentId() {
    return "TURBOPACK compile-time value", false;
}
function getDeploymentIdQueryOrEmptyString() {
    let deploymentId = getDeploymentId();
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return '';
} //# sourceMappingURL=deployment-id.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/image-blur-svg.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A shared function, used on both client and server, to generate a SVG blur placeholder.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImageBlurSvg", {
    enumerable: true,
    get: function() {
        return getImageBlurSvg;
    }
});
function getImageBlurSvg({ widthInt, heightInt, blurWidth, blurHeight, blurDataURL, objectFit }) {
    const std = 20;
    const svgWidth = blurWidth ? blurWidth * 40 : widthInt;
    const svgHeight = blurHeight ? blurHeight * 40 : heightInt;
    const viewBox = svgWidth && svgHeight ? `viewBox='0 0 ${svgWidth} ${svgHeight}'` : '';
    const preserveAspectRatio = viewBox ? 'none' : objectFit === 'contain' ? 'xMidYMid' : objectFit === 'cover' ? 'xMidYMid slice' : 'none';
    return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${viewBox}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${preserveAspectRatio}' style='filter: url(%23b);' href='${blurDataURL}'/%3E%3C/svg%3E`;
} //# sourceMappingURL=image-blur-svg.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/image-config.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    VALID_LOADERS: null,
    imageConfigDefault: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    VALID_LOADERS: function() {
        return VALID_LOADERS;
    },
    imageConfigDefault: function() {
        return imageConfigDefault;
    }
});
const VALID_LOADERS = [
    'default',
    'imgix',
    'cloudinary',
    'akamai',
    'custom'
];
const imageConfigDefault = {
    deviceSizes: [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
    ],
    imageSizes: [
        32,
        48,
        64,
        96,
        128,
        256,
        384
    ],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    /**
   * @deprecated Use `remotePatterns` instead to protect your application from malicious users.
   */ domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 14400,
    formats: [
        'image/webp'
    ],
    maximumRedirects: 3,
    maximumResponseBody: 50000000,
    dangerouslyAllowLocalIP: false,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
    contentDispositionType: 'attachment',
    localPatterns: undefined,
    remotePatterns: [],
    qualities: [
        75
    ],
    unoptimized: false
}; //# sourceMappingURL=image-config.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/get-img-props.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImgProps", {
    enumerable: true,
    get: function() {
        return getImgProps;
    }
});
const _warnonce = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/utils/warn-once.js [app-rsc] (ecmascript)");
const _deploymentid = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/deployment-id.js [app-rsc] (ecmascript)");
const _imageblursvg = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/image-blur-svg.js [app-rsc] (ecmascript)");
const _imageconfig = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/image-config.js [app-rsc] (ecmascript)");
const VALID_LOADING_VALUES = [
    'lazy',
    'eager',
    undefined
];
// Object-fit values that are not valid background-size values
const INVALID_BACKGROUND_SIZE_VALUES = [
    '-moz-initial',
    'fill',
    'none',
    'scale-down',
    undefined
];
function isStaticRequire(src) {
    return src.default !== undefined;
}
function isStaticImageData(src) {
    return src.src !== undefined;
}
function isStaticImport(src) {
    return !!src && typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}
const allImgs = new Map();
let perfObserver;
function getInt(x) {
    if (typeof x === 'undefined') {
        return x;
    }
    if (typeof x === 'number') {
        return Number.isFinite(x) ? x : NaN;
    }
    if (typeof x === 'string' && /^[0-9]+$/.test(x)) {
        return parseInt(x, 10);
    }
    return NaN;
}
function getWidths({ deviceSizes, allSizes }, width, sizes) {
    if (sizes) {
        // Find all the "vw" percent sizes used in the sizes prop
        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
        const percentSizes = [];
        for(let match; match = viewportWidthRe.exec(sizes); match){
            percentSizes.push(parseInt(match[2]));
        }
        if (percentSizes.length) {
            const smallestRatio = Math.min(...percentSizes) * 0.01;
            return {
                widths: allSizes.filter((s)=>s >= deviceSizes[0] * smallestRatio),
                kind: 'w'
            };
        }
        return {
            widths: allSizes,
            kind: 'w'
        };
    }
    if (typeof width !== 'number') {
        return {
            widths: deviceSizes,
            kind: 'w'
        };
    }
    const widths = [
        ...new Set(// > are actually 3x in the green color, but only 1.5x in the red and
        // > blue colors. Showing a 3x resolution image in the app vs a 2x
        // > resolution image will be visually the same, though the 3x image
        // > takes significantly more data. Even true 3x resolution screens are
        // > wasteful as the human eye cannot see that level of detail without
        // > something like a magnifying glass.
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [
            width,
            width * 2 /*, width * 3*/ 
        ].map((w)=>allSizes.find((p)=>p >= w) || allSizes[allSizes.length - 1]))
    ];
    return {
        widths,
        kind: 'x'
    };
}
function generateImgAttrs({ config, src, unoptimized, width, quality, sizes, loader }) {
    if (unoptimized) {
        const deploymentId = (0, _deploymentid.getDeploymentId)();
        if (src.startsWith('/') && !src.startsWith('//') && deploymentId) {
            const sep = src.includes('?') ? '&' : '?';
            src = `${src}${sep}dpl=${deploymentId}`;
        }
        return {
            src,
            srcSet: undefined,
            sizes: undefined
        };
    }
    const { widths, kind } = getWidths(config, width, sizes);
    const last = widths.length - 1;
    return {
        sizes: !sizes && kind === 'w' ? '100vw' : sizes,
        srcSet: widths.map((w, i)=>`${loader({
                config,
                src,
                quality,
                width: w
            })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        src: loader({
            config,
            src,
            quality,
            width: widths[last]
        })
    };
}
function getImgProps({ src, sizes, unoptimized = false, priority = false, preload = false, loading, className, quality, width, height, fill = false, style, overrideSrc, onLoad, onLoadingComplete, placeholder = 'empty', blurDataURL, fetchPriority, decoding = 'async', layout, objectFit, objectPosition, lazyBoundary, lazyRoot, ...rest }, _state) {
    const { imgConf, showAltText, blurComplete, defaultLoader } = _state;
    let config;
    let c = imgConf || _imageconfig.imageConfigDefault;
    if ('allSizes' in c) {
        config = c;
    } else {
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        const qualities = c.qualities?.sort((a, b)=>a - b);
        config = {
            ...c,
            allSizes,
            deviceSizes,
            qualities
        };
    }
    if (typeof defaultLoader === 'undefined') {
        throw Object.defineProperty(new Error('images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config'), "__NEXT_ERROR_CODE", {
            value: "E163",
            enumerable: false,
            configurable: true
        });
    }
    let loader = rest.loader || defaultLoader;
    // Remove property so it's not spread on <img> element
    delete rest.loader;
    delete rest.srcSet;
    // This special value indicates that the user
    // didn't define a "loader" prop or "loader" config.
    const isDefaultLoader = '__next_img_default' in loader;
    if (isDefaultLoader) {
        if (config.loader === 'custom') {
            throw Object.defineProperty(new Error(`Image with src "${src}" is missing "loader" prop.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
                value: "E252",
                enumerable: false,
                configurable: true
            });
        }
    } else {
        // The user defined a "loader" prop or config.
        // Since the config object is internal only, we
        // must not pass it to the user-defined "loader".
        const customImageLoader = loader;
        loader = (obj)=>{
            const { config: _, ...opts } = obj;
            return customImageLoader(opts);
        };
    }
    if (layout) {
        if (layout === 'fill') {
            fill = true;
        }
        const layoutToStyle = {
            intrinsic: {
                maxWidth: '100%',
                height: 'auto'
            },
            responsive: {
                width: '100%',
                height: 'auto'
            }
        };
        const layoutToSizes = {
            responsive: '100vw',
            fill: '100vw'
        };
        const layoutStyle = layoutToStyle[layout];
        if (layoutStyle) {
            style = {
                ...style,
                ...layoutStyle
            };
        }
        const layoutSizes = layoutToSizes[layout];
        if (layoutSizes && !sizes) {
            sizes = layoutSizes;
        }
    }
    let staticSrc = '';
    let widthInt = getInt(width);
    let heightInt = getInt(height);
    let blurWidth;
    let blurHeight;
    if (isStaticImport(src)) {
        const staticImageData = isStaticRequire(src) ? src.default : src;
        if (!staticImageData.src) {
            throw Object.defineProperty(new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`), "__NEXT_ERROR_CODE", {
                value: "E460",
                enumerable: false,
                configurable: true
            });
        }
        if (!staticImageData.height || !staticImageData.width) {
            throw Object.defineProperty(new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`), "__NEXT_ERROR_CODE", {
                value: "E48",
                enumerable: false,
                configurable: true
            });
        }
        blurWidth = staticImageData.blurWidth;
        blurHeight = staticImageData.blurHeight;
        blurDataURL = blurDataURL || staticImageData.blurDataURL;
        staticSrc = staticImageData.src;
        if (!fill) {
            if (!widthInt && !heightInt) {
                widthInt = staticImageData.width;
                heightInt = staticImageData.height;
            } else if (widthInt && !heightInt) {
                const ratio = widthInt / staticImageData.width;
                heightInt = Math.round(staticImageData.height * ratio);
            } else if (!widthInt && heightInt) {
                const ratio = heightInt / staticImageData.height;
                widthInt = Math.round(staticImageData.width * ratio);
            }
        }
    }
    src = typeof src === 'string' ? src : staticSrc;
    let isLazy = !priority && !preload && (loading === 'lazy' || typeof loading === 'undefined');
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
        // https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
        unoptimized = true;
        isLazy = false;
    }
    if (config.unoptimized) {
        unoptimized = true;
    }
    if (isDefaultLoader && !config.dangerouslyAllowSVG && src.split('?', 1)[0].endsWith('.svg')) {
        // Special case to make svg serve as-is to avoid proxying
        // through the built-in Image Optimization API.
        unoptimized = true;
    }
    const qualityInt = getInt(quality);
    if ("TURBOPACK compile-time truthy", 1) {
        if (config.output === 'export' && isDefaultLoader && !unoptimized) {
            throw Object.defineProperty(new Error(`Image Optimization using the default loader is not compatible with \`{ output: 'export' }\`.
  Possible solutions:
    - Remove \`{ output: 'export' }\` and run "next start" to run server mode including the Image Optimization API.
    - Configure \`{ images: { unoptimized: true } }\` in \`next.config.js\` to disable the Image Optimization API.
  Read more: https://nextjs.org/docs/messages/export-image-api`), "__NEXT_ERROR_CODE", {
                value: "E500",
                enumerable: false,
                configurable: true
            });
        }
        if (!src) {
            // React doesn't show the stack trace and there's
            // no `src` to help identify which image, so we
            // instead console.error(ref) during mount.
            unoptimized = true;
        } else {
            if (fill) {
                if (width) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "width" and "fill" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                        value: "E96",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (height) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "height" and "fill" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                        value: "E115",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.position && style.position !== 'absolute') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E216",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.width && style.width !== '100%') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E73",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.height && style.height !== '100%') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E404",
                        enumerable: false,
                        configurable: true
                    });
                }
            } else {
                if (typeof widthInt === 'undefined') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" is missing required "width" property.`), "__NEXT_ERROR_CODE", {
                        value: "E451",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(widthInt)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "width" property. Expected a numeric value in pixels but received "${width}".`), "__NEXT_ERROR_CODE", {
                        value: "E66",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (typeof heightInt === 'undefined') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" is missing required "height" property.`), "__NEXT_ERROR_CODE", {
                        value: "E397",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(heightInt)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "height" property. Expected a numeric value in pixels but received "${height}".`), "__NEXT_ERROR_CODE", {
                        value: "E444",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/^[\x00-\x20]/.test(src)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.`), "__NEXT_ERROR_CODE", {
                        value: "E176",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/[\x00-\x20]$/.test(src)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.`), "__NEXT_ERROR_CODE", {
                        value: "E21",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!VALID_LOADING_VALUES.includes(loading)) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(',')}.`), "__NEXT_ERROR_CODE", {
                value: "E357",
                enumerable: false,
                configurable: true
            });
        }
        if (priority && loading === 'lazy') {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                value: "E218",
                enumerable: false,
                configurable: true
            });
        }
        if (preload && loading === 'lazy') {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "preload" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                value: "E803",
                enumerable: false,
                configurable: true
            });
        }
        if (preload && priority) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "preload" and "priority" properties. Only "preload" should be used.`), "__NEXT_ERROR_CODE", {
                value: "E802",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty' && placeholder !== 'blur' && !placeholder.startsWith('data:image/')) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "placeholder" property "${placeholder}".`), "__NEXT_ERROR_CODE", {
                value: "E431",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty') {
            if (widthInt && heightInt && widthInt * heightInt < 1600) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.`);
            }
        }
        if (qualityInt && config.qualities && !config.qualities.includes(qualityInt)) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using quality "${qualityInt}" which is not configured in images.qualities [${config.qualities.join(', ')}]. Please update your config to [${[
                ...config.qualities,
                qualityInt
            ].sort().join(', ')}].` + `\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-qualities`);
        }
        if (placeholder === 'blur' && !blurDataURL) {
            const VALID_BLUR_EXT = [
                'jpeg',
                'png',
                'webp',
                'avif'
            ] // should match next-image-loader
            ;
            throw Object.defineProperty(new Error(`Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
        Possible solutions:
          - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
          - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(',')} (animated images not supported)
          - Remove the "placeholder" property, effectively no blur effect
        Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`), "__NEXT_ERROR_CODE", {
                value: "E371",
                enumerable: false,
                configurable: true
            });
        }
        if ('ref' in rest) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using unsupported "ref" property. Consider using the "onLoad" property instead.`);
        }
        if (!unoptimized && !isDefaultLoader) {
            const urlStr = loader({
                config,
                src,
                width: widthInt || 400,
                quality: qualityInt || 75
            });
            let url;
            try {
                url = new URL(urlStr);
            } catch (err) {}
            if (urlStr === src || url && url.pathname === src && !url.search) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
            }
        }
        if (onLoadingComplete) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.`);
        }
        for (const [legacyKey, legacyValue] of Object.entries({
            layout,
            objectFit,
            objectPosition,
            lazyBoundary,
            lazyRoot
        })){
            if (legacyValue) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" has legacy prop "${legacyKey}". Did you forget to run the codemod?` + `\nRead more: https://nextjs.org/docs/messages/next-image-upgrade-to-13`);
            }
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    const imgStyle = Object.assign(fill ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit,
        objectPosition
    } : {}, showAltText ? {} : {
        color: 'transparent'
    }, style);
    const backgroundImage = !blurComplete && placeholder !== 'empty' ? placeholder === 'blur' ? `url("data:image/svg+xml;charset=utf-8,${(0, _imageblursvg.getImageBlurSvg)({
        widthInt,
        heightInt,
        blurWidth,
        blurHeight,
        blurDataURL: blurDataURL || '',
        objectFit: imgStyle.objectFit
    })}")` : `url("${placeholder}")` // assume `data:image/`
     : null;
    const backgroundSize = !INVALID_BACKGROUND_SIZE_VALUES.includes(imgStyle.objectFit) ? imgStyle.objectFit : imgStyle.objectFit === 'fill' ? '100% 100%' // the background-size equivalent of `fill`
     : 'cover';
    let placeholderStyle = backgroundImage ? {
        backgroundSize,
        backgroundPosition: imgStyle.objectPosition || '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundImage
    } : {};
    if ("TURBOPACK compile-time truthy", 1) {
        if (placeholderStyle.backgroundImage && placeholder === 'blur' && blurDataURL?.startsWith('/')) {
            // During `next dev`, we don't want to generate blur placeholders with webpack
            // because it can delay starting the dev server. Instead, `next-image-loader.js`
            // will inline a special url to lazily generate the blur placeholder at request time.
            placeholderStyle.backgroundImage = `url("${blurDataURL}")`;
        }
    }
    const imgAttributes = generateImgAttrs({
        config,
        src,
        unoptimized,
        width: widthInt,
        quality: qualityInt,
        sizes,
        loader
    });
    const loadingFinal = isLazy ? 'lazy' : loading;
    if ("TURBOPACK compile-time truthy", 1) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    const props = {
        ...rest,
        loading: loadingFinal,
        fetchPriority,
        width: widthInt,
        height: heightInt,
        decoding,
        className,
        style: {
            ...imgStyle,
            ...placeholderStyle
        },
        sizes: imgAttributes.sizes,
        srcSet: imgAttributes.srcSet,
        src: overrideSrc || imgAttributes.src
    };
    const meta = {
        unoptimized,
        preload: preload || priority,
        placeholder,
        fill
    };
    return {
        props,
        meta
    };
} //# sourceMappingURL=get-img-props.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/image-component.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/image-component.js <module evaluation>"));
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/image-component.js [app-rsc] (client reference proxy)", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/image-component.js"));
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/image-component.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/image-component.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/image-component.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/find-closest-quality.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findClosestQuality", {
    enumerable: true,
    get: function() {
        return findClosestQuality;
    }
});
function findClosestQuality(quality, config) {
    const q = quality || 75;
    if (!config?.qualities?.length) {
        return q;
    }
    return config.qualities.reduce((prev, cur)=>Math.abs(cur - q) < Math.abs(prev - q) ? cur : prev, 0);
} //# sourceMappingURL=find-closest-quality.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/picomatch/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    var t = {
        170: (t, e, u)=>{
            const n = u(510);
            const isWindows = ()=>{
                if (typeof navigator !== "undefined" && navigator.platform) {
                    const t = navigator.platform.toLowerCase();
                    return t === "win32" || t === "windows";
                }
                if (typeof process !== "undefined" && process.platform) {
                    return process.platform === "win32";
                }
                return false;
            };
            function picomatch(t, e, u = false) {
                if (e && (e.windows === null || e.windows === undefined)) {
                    e = {
                        ...e,
                        windows: isWindows()
                    };
                }
                return n(t, e, u);
            }
            Object.assign(picomatch, n);
            t.exports = picomatch;
        },
        154: (t)=>{
            const e = "\\\\/";
            const u = `[^${e}]`;
            const n = "\\.";
            const o = "\\+";
            const s = "\\?";
            const r = "\\/";
            const a = "(?=.)";
            const i = "[^/]";
            const c = `(?:${r}|$)`;
            const p = `(?:^|${r})`;
            const l = `${n}{1,2}${c}`;
            const f = `(?!${n})`;
            const A = `(?!${p}${l})`;
            const _ = `(?!${n}{0,1}${c})`;
            const R = `(?!${l})`;
            const E = `[^.${r}]`;
            const h = `${i}*?`;
            const g = "/";
            const b = {
                DOT_LITERAL: n,
                PLUS_LITERAL: o,
                QMARK_LITERAL: s,
                SLASH_LITERAL: r,
                ONE_CHAR: a,
                QMARK: i,
                END_ANCHOR: c,
                DOTS_SLASH: l,
                NO_DOT: f,
                NO_DOTS: A,
                NO_DOT_SLASH: _,
                NO_DOTS_SLASH: R,
                QMARK_NO_DOT: E,
                STAR: h,
                START_ANCHOR: p,
                SEP: g
            };
            const C = {
                ...b,
                SLASH_LITERAL: `[${e}]`,
                QMARK: u,
                STAR: `${u}*?`,
                DOTS_SLASH: `${n}{1,2}(?:[${e}]|$)`,
                NO_DOT: `(?!${n})`,
                NO_DOTS: `(?!(?:^|[${e}])${n}{1,2}(?:[${e}]|$))`,
                NO_DOT_SLASH: `(?!${n}{0,1}(?:[${e}]|$))`,
                NO_DOTS_SLASH: `(?!${n}{1,2}(?:[${e}]|$))`,
                QMARK_NO_DOT: `[^.${e}]`,
                START_ANCHOR: `(?:^|[${e}])`,
                END_ANCHOR: `(?:[${e}]|$)`,
                SEP: "\\"
            };
            const y = {
                alnum: "a-zA-Z0-9",
                alpha: "a-zA-Z",
                ascii: "\\x00-\\x7F",
                blank: " \\t",
                cntrl: "\\x00-\\x1F\\x7F",
                digit: "0-9",
                graph: "\\x21-\\x7E",
                lower: "a-z",
                print: "\\x20-\\x7E ",
                punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
                space: " \\t\\r\\n\\v\\f",
                upper: "A-Z",
                word: "A-Za-z0-9_",
                xdigit: "A-Fa-f0-9"
            };
            t.exports = {
                MAX_LENGTH: 1024 * 64,
                POSIX_REGEX_SOURCE: y,
                REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
                REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
                REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
                REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
                REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
                REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
                REPLACEMENTS: {
                    "***": "*",
                    "**/**": "**",
                    "**/**/**": "**"
                },
                CHAR_0: 48,
                CHAR_9: 57,
                CHAR_UPPERCASE_A: 65,
                CHAR_LOWERCASE_A: 97,
                CHAR_UPPERCASE_Z: 90,
                CHAR_LOWERCASE_Z: 122,
                CHAR_LEFT_PARENTHESES: 40,
                CHAR_RIGHT_PARENTHESES: 41,
                CHAR_ASTERISK: 42,
                CHAR_AMPERSAND: 38,
                CHAR_AT: 64,
                CHAR_BACKWARD_SLASH: 92,
                CHAR_CARRIAGE_RETURN: 13,
                CHAR_CIRCUMFLEX_ACCENT: 94,
                CHAR_COLON: 58,
                CHAR_COMMA: 44,
                CHAR_DOT: 46,
                CHAR_DOUBLE_QUOTE: 34,
                CHAR_EQUAL: 61,
                CHAR_EXCLAMATION_MARK: 33,
                CHAR_FORM_FEED: 12,
                CHAR_FORWARD_SLASH: 47,
                CHAR_GRAVE_ACCENT: 96,
                CHAR_HASH: 35,
                CHAR_HYPHEN_MINUS: 45,
                CHAR_LEFT_ANGLE_BRACKET: 60,
                CHAR_LEFT_CURLY_BRACE: 123,
                CHAR_LEFT_SQUARE_BRACKET: 91,
                CHAR_LINE_FEED: 10,
                CHAR_NO_BREAK_SPACE: 160,
                CHAR_PERCENT: 37,
                CHAR_PLUS: 43,
                CHAR_QUESTION_MARK: 63,
                CHAR_RIGHT_ANGLE_BRACKET: 62,
                CHAR_RIGHT_CURLY_BRACE: 125,
                CHAR_RIGHT_SQUARE_BRACKET: 93,
                CHAR_SEMICOLON: 59,
                CHAR_SINGLE_QUOTE: 39,
                CHAR_SPACE: 32,
                CHAR_TAB: 9,
                CHAR_UNDERSCORE: 95,
                CHAR_VERTICAL_LINE: 124,
                CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
                extglobChars (t) {
                    return {
                        "!": {
                            type: "negate",
                            open: "(?:(?!(?:",
                            close: `))${t.STAR})`
                        },
                        "?": {
                            type: "qmark",
                            open: "(?:",
                            close: ")?"
                        },
                        "+": {
                            type: "plus",
                            open: "(?:",
                            close: ")+"
                        },
                        "*": {
                            type: "star",
                            open: "(?:",
                            close: ")*"
                        },
                        "@": {
                            type: "at",
                            open: "(?:",
                            close: ")"
                        }
                    };
                },
                globChars (t) {
                    return t === true ? C : b;
                }
            };
        },
        697: (t, e, u)=>{
            const n = u(154);
            const o = u(96);
            const { MAX_LENGTH: s, POSIX_REGEX_SOURCE: r, REGEX_NON_SPECIAL_CHARS: a, REGEX_SPECIAL_CHARS_BACKREF: i, REPLACEMENTS: c } = n;
            const expandRange = (t, e)=>{
                if (typeof e.expandRange === "function") {
                    return e.expandRange(...t, e);
                }
                t.sort();
                const u = `[${t.join("-")}]`;
                try {
                    new RegExp(u);
                } catch (e) {
                    return t.map((t)=>o.escapeRegex(t)).join("..");
                }
                return u;
            };
            const syntaxError = (t, e)=>`Missing ${t}: "${e}" - use "\\\\${e}" to match literal characters`;
            const parse = (t, e)=>{
                if (typeof t !== "string") {
                    throw new TypeError("Expected a string");
                }
                t = c[t] || t;
                const u = {
                    ...e
                };
                const p = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                let l = t.length;
                if (l > p) {
                    throw new SyntaxError(`Input length: ${l}, exceeds maximum allowed length: ${p}`);
                }
                const f = {
                    type: "bos",
                    value: "",
                    output: u.prepend || ""
                };
                const A = [
                    f
                ];
                const _ = u.capture ? "" : "?:";
                const R = n.globChars(u.windows);
                const E = n.extglobChars(R);
                const { DOT_LITERAL: h, PLUS_LITERAL: g, SLASH_LITERAL: b, ONE_CHAR: C, DOTS_SLASH: y, NO_DOT: $, NO_DOT_SLASH: x, NO_DOTS_SLASH: S, QMARK: H, QMARK_NO_DOT: v, STAR: d, START_ANCHOR: L } = R;
                const globstar = (t)=>`(${_}(?:(?!${L}${t.dot ? y : h}).)*?)`;
                const T = u.dot ? "" : $;
                const O = u.dot ? H : v;
                let k = u.bash === true ? globstar(u) : d;
                if (u.capture) {
                    k = `(${k})`;
                }
                if (typeof u.noext === "boolean") {
                    u.noextglob = u.noext;
                }
                const m = {
                    input: t,
                    index: -1,
                    start: 0,
                    dot: u.dot === true,
                    consumed: "",
                    output: "",
                    prefix: "",
                    backtrack: false,
                    negated: false,
                    brackets: 0,
                    braces: 0,
                    parens: 0,
                    quotes: 0,
                    globstar: false,
                    tokens: A
                };
                t = o.removePrefix(t, m);
                l = t.length;
                const w = [];
                const N = [];
                const I = [];
                let B = f;
                let G;
                const eos = ()=>m.index === l - 1;
                const D = m.peek = (e = 1)=>t[m.index + e];
                const M = m.advance = ()=>t[++m.index] || "";
                const remaining = ()=>t.slice(m.index + 1);
                const consume = (t = "", e = 0)=>{
                    m.consumed += t;
                    m.index += e;
                };
                const append = (t)=>{
                    m.output += t.output != null ? t.output : t.value;
                    consume(t.value);
                };
                const negate = ()=>{
                    let t = 1;
                    while(D() === "!" && (D(2) !== "(" || D(3) === "?")){
                        M();
                        m.start++;
                        t++;
                    }
                    if (t % 2 === 0) {
                        return false;
                    }
                    m.negated = true;
                    m.start++;
                    return true;
                };
                const increment = (t)=>{
                    m[t]++;
                    I.push(t);
                };
                const decrement = (t)=>{
                    m[t]--;
                    I.pop();
                };
                const push = (t)=>{
                    if (B.type === "globstar") {
                        const e = m.braces > 0 && (t.type === "comma" || t.type === "brace");
                        const u = t.extglob === true || w.length && (t.type === "pipe" || t.type === "paren");
                        if (t.type !== "slash" && t.type !== "paren" && !e && !u) {
                            m.output = m.output.slice(0, -B.output.length);
                            B.type = "star";
                            B.value = "*";
                            B.output = k;
                            m.output += B.output;
                        }
                    }
                    if (w.length && t.type !== "paren") {
                        w[w.length - 1].inner += t.value;
                    }
                    if (t.value || t.output) append(t);
                    if (B && B.type === "text" && t.type === "text") {
                        B.output = (B.output || B.value) + t.value;
                        B.value += t.value;
                        return;
                    }
                    t.prev = B;
                    A.push(t);
                    B = t;
                };
                const extglobOpen = (t, e)=>{
                    const n = {
                        ...E[e],
                        conditions: 1,
                        inner: ""
                    };
                    n.prev = B;
                    n.parens = m.parens;
                    n.output = m.output;
                    const o = (u.capture ? "(" : "") + n.open;
                    increment("parens");
                    push({
                        type: t,
                        value: e,
                        output: m.output ? "" : C
                    });
                    push({
                        type: "paren",
                        extglob: true,
                        value: M(),
                        output: o
                    });
                    w.push(n);
                };
                const extglobClose = (t)=>{
                    let n = t.close + (u.capture ? ")" : "");
                    let o;
                    if (t.type === "negate") {
                        let s = k;
                        if (t.inner && t.inner.length > 1 && t.inner.includes("/")) {
                            s = globstar(u);
                        }
                        if (s !== k || eos() || /^\)+$/.test(remaining())) {
                            n = t.close = `)$))${s}`;
                        }
                        if (t.inner.includes("*") && (o = remaining()) && /^\.[^\\/.]+$/.test(o)) {
                            const u = parse(o, {
                                ...e,
                                fastpaths: false
                            }).output;
                            n = t.close = `)${u})${s})`;
                        }
                        if (t.prev.type === "bos") {
                            m.negatedExtglob = true;
                        }
                    }
                    push({
                        type: "paren",
                        extglob: true,
                        value: G,
                        output: n
                    });
                    decrement("parens");
                };
                if (u.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(t)) {
                    let n = false;
                    let s = t.replace(i, (t, e, u, o, s, r)=>{
                        if (o === "\\") {
                            n = true;
                            return t;
                        }
                        if (o === "?") {
                            if (e) {
                                return e + o + (s ? H.repeat(s.length) : "");
                            }
                            if (r === 0) {
                                return O + (s ? H.repeat(s.length) : "");
                            }
                            return H.repeat(u.length);
                        }
                        if (o === ".") {
                            return h.repeat(u.length);
                        }
                        if (o === "*") {
                            if (e) {
                                return e + o + (s ? k : "");
                            }
                            return k;
                        }
                        return e ? t : `\\${t}`;
                    });
                    if (n === true) {
                        if (u.unescape === true) {
                            s = s.replace(/\\/g, "");
                        } else {
                            s = s.replace(/\\+/g, (t)=>t.length % 2 === 0 ? "\\\\" : t ? "\\" : "");
                        }
                    }
                    if (s === t && u.contains === true) {
                        m.output = t;
                        return m;
                    }
                    m.output = o.wrapOutput(s, m, e);
                    return m;
                }
                while(!eos()){
                    G = M();
                    if (G === "\0") {
                        continue;
                    }
                    if (G === "\\") {
                        const t = D();
                        if (t === "/" && u.bash !== true) {
                            continue;
                        }
                        if (t === "." || t === ";") {
                            continue;
                        }
                        if (!t) {
                            G += "\\";
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                        const e = /^\\+/.exec(remaining());
                        let n = 0;
                        if (e && e[0].length > 2) {
                            n = e[0].length;
                            m.index += n;
                            if (n % 2 !== 0) {
                                G += "\\";
                            }
                        }
                        if (u.unescape === true) {
                            G = M();
                        } else {
                            G += M();
                        }
                        if (m.brackets === 0) {
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                    }
                    if (m.brackets > 0 && (G !== "]" || B.value === "[" || B.value === "[^")) {
                        if (u.posix !== false && G === ":") {
                            const t = B.value.slice(1);
                            if (t.includes("[")) {
                                B.posix = true;
                                if (t.includes(":")) {
                                    const t = B.value.lastIndexOf("[");
                                    const e = B.value.slice(0, t);
                                    const u = B.value.slice(t + 2);
                                    const n = r[u];
                                    if (n) {
                                        B.value = e + n;
                                        m.backtrack = true;
                                        M();
                                        if (!f.output && A.indexOf(B) === 1) {
                                            f.output = C;
                                        }
                                        continue;
                                    }
                                }
                            }
                        }
                        if (G === "[" && D() !== ":" || G === "-" && D() === "]") {
                            G = `\\${G}`;
                        }
                        if (G === "]" && (B.value === "[" || B.value === "[^")) {
                            G = `\\${G}`;
                        }
                        if (u.posix === true && G === "!" && B.value === "[") {
                            G = "^";
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (m.quotes === 1 && G !== '"') {
                        G = o.escapeRegex(G);
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (G === '"') {
                        m.quotes = m.quotes === 1 ? 0 : 1;
                        if (u.keepQuotes === true) {
                            push({
                                type: "text",
                                value: G
                            });
                        }
                        continue;
                    }
                    if (G === "(") {
                        increment("parens");
                        push({
                            type: "paren",
                            value: G
                        });
                        continue;
                    }
                    if (G === ")") {
                        if (m.parens === 0 && u.strictBrackets === true) {
                            throw new SyntaxError(syntaxError("opening", "("));
                        }
                        const t = w[w.length - 1];
                        if (t && m.parens === t.parens + 1) {
                            extglobClose(w.pop());
                            continue;
                        }
                        push({
                            type: "paren",
                            value: G,
                            output: m.parens ? ")" : "\\)"
                        });
                        decrement("parens");
                        continue;
                    }
                    if (G === "[") {
                        if (u.nobracket === true || !remaining().includes("]")) {
                            if (u.nobracket !== true && u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("closing", "]"));
                            }
                            G = `\\${G}`;
                        } else {
                            increment("brackets");
                        }
                        push({
                            type: "bracket",
                            value: G
                        });
                        continue;
                    }
                    if (G === "]") {
                        if (u.nobracket === true || B && B.type === "bracket" && B.value.length === 1) {
                            push({
                                type: "text",
                                value: G,
                                output: `\\${G}`
                            });
                            continue;
                        }
                        if (m.brackets === 0) {
                            if (u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("opening", "["));
                            }
                            push({
                                type: "text",
                                value: G,
                                output: `\\${G}`
                            });
                            continue;
                        }
                        decrement("brackets");
                        const t = B.value.slice(1);
                        if (B.posix !== true && t[0] === "^" && !t.includes("/")) {
                            G = `/${G}`;
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        if (u.literalBrackets === false || o.hasRegexChars(t)) {
                            continue;
                        }
                        const e = o.escapeRegex(B.value);
                        m.output = m.output.slice(0, -B.value.length);
                        if (u.literalBrackets === true) {
                            m.output += e;
                            B.value = e;
                            continue;
                        }
                        B.value = `(${_}${e}|${B.value})`;
                        m.output += B.value;
                        continue;
                    }
                    if (G === "{" && u.nobrace !== true) {
                        increment("braces");
                        const t = {
                            type: "brace",
                            value: G,
                            output: "(",
                            outputIndex: m.output.length,
                            tokensIndex: m.tokens.length
                        };
                        N.push(t);
                        push(t);
                        continue;
                    }
                    if (G === "}") {
                        const t = N[N.length - 1];
                        if (u.nobrace === true || !t) {
                            push({
                                type: "text",
                                value: G,
                                output: G
                            });
                            continue;
                        }
                        let e = ")";
                        if (t.dots === true) {
                            const t = A.slice();
                            const n = [];
                            for(let e = t.length - 1; e >= 0; e--){
                                A.pop();
                                if (t[e].type === "brace") {
                                    break;
                                }
                                if (t[e].type !== "dots") {
                                    n.unshift(t[e].value);
                                }
                            }
                            e = expandRange(n, u);
                            m.backtrack = true;
                        }
                        if (t.comma !== true && t.dots !== true) {
                            const u = m.output.slice(0, t.outputIndex);
                            const n = m.tokens.slice(t.tokensIndex);
                            t.value = t.output = "\\{";
                            G = e = "\\}";
                            m.output = u;
                            for (const t of n){
                                m.output += t.output || t.value;
                            }
                        }
                        push({
                            type: "brace",
                            value: G,
                            output: e
                        });
                        decrement("braces");
                        N.pop();
                        continue;
                    }
                    if (G === "|") {
                        if (w.length > 0) {
                            w[w.length - 1].conditions++;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G === ",") {
                        let t = G;
                        const e = N[N.length - 1];
                        if (e && I[I.length - 1] === "braces") {
                            e.comma = true;
                            t = "|";
                        }
                        push({
                            type: "comma",
                            value: G,
                            output: t
                        });
                        continue;
                    }
                    if (G === "/") {
                        if (B.type === "dot" && m.index === m.start + 1) {
                            m.start = m.index + 1;
                            m.consumed = "";
                            m.output = "";
                            A.pop();
                            B = f;
                            continue;
                        }
                        push({
                            type: "slash",
                            value: G,
                            output: b
                        });
                        continue;
                    }
                    if (G === ".") {
                        if (m.braces > 0 && B.type === "dot") {
                            if (B.value === ".") B.output = h;
                            const t = N[N.length - 1];
                            B.type = "dots";
                            B.output += G;
                            B.value += G;
                            t.dots = true;
                            continue;
                        }
                        if (m.braces + m.parens === 0 && B.type !== "bos" && B.type !== "slash") {
                            push({
                                type: "text",
                                value: G,
                                output: h
                            });
                            continue;
                        }
                        push({
                            type: "dot",
                            value: G,
                            output: h
                        });
                        continue;
                    }
                    if (G === "?") {
                        const t = B && B.value === "(";
                        if (!t && u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("qmark", G);
                            continue;
                        }
                        if (B && B.type === "paren") {
                            const t = D();
                            let e = G;
                            if (B.value === "(" && !/[!=<:]/.test(t) || t === "<" && !/<([!=]|\w+>)/.test(remaining())) {
                                e = `\\${G}`;
                            }
                            push({
                                type: "text",
                                value: G,
                                output: e
                            });
                            continue;
                        }
                        if (u.dot !== true && (B.type === "slash" || B.type === "bos")) {
                            push({
                                type: "qmark",
                                value: G,
                                output: v
                            });
                            continue;
                        }
                        push({
                            type: "qmark",
                            value: G,
                            output: H
                        });
                        continue;
                    }
                    if (G === "!") {
                        if (u.noextglob !== true && D() === "(") {
                            if (D(2) !== "?" || !/[!=<:]/.test(D(3))) {
                                extglobOpen("negate", G);
                                continue;
                            }
                        }
                        if (u.nonegate !== true && m.index === 0) {
                            negate();
                            continue;
                        }
                    }
                    if (G === "+") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("plus", G);
                            continue;
                        }
                        if (B && B.value === "(" || u.regex === false) {
                            push({
                                type: "plus",
                                value: G,
                                output: g
                            });
                            continue;
                        }
                        if (B && (B.type === "bracket" || B.type === "paren" || B.type === "brace") || m.parens > 0) {
                            push({
                                type: "plus",
                                value: G
                            });
                            continue;
                        }
                        push({
                            type: "plus",
                            value: g
                        });
                        continue;
                    }
                    if (G === "@") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            push({
                                type: "at",
                                extglob: true,
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G !== "*") {
                        if (G === "$" || G === "^") {
                            G = `\\${G}`;
                        }
                        const t = a.exec(remaining());
                        if (t) {
                            G += t[0];
                            m.index += t[0].length;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (B && (B.type === "globstar" || B.star === true)) {
                        B.type = "star";
                        B.star = true;
                        B.value += G;
                        B.output = k;
                        m.backtrack = true;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    let e = remaining();
                    if (u.noextglob !== true && /^\([^?]/.test(e)) {
                        extglobOpen("star", G);
                        continue;
                    }
                    if (B.type === "star") {
                        if (u.noglobstar === true) {
                            consume(G);
                            continue;
                        }
                        const n = B.prev;
                        const o = n.prev;
                        const s = n.type === "slash" || n.type === "bos";
                        const r = o && (o.type === "star" || o.type === "globstar");
                        if (u.bash === true && (!s || e[0] && e[0] !== "/")) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        const a = m.braces > 0 && (n.type === "comma" || n.type === "brace");
                        const i = w.length && (n.type === "pipe" || n.type === "paren");
                        if (!s && n.type !== "paren" && !a && !i) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        while(e.slice(0, 3) === "/**"){
                            const u = t[m.index + 4];
                            if (u && u !== "/") {
                                break;
                            }
                            e = e.slice(3);
                            consume("/**", 3);
                        }
                        if (n.type === "bos" && eos()) {
                            B.type = "globstar";
                            B.value += G;
                            B.output = globstar(u);
                            m.output = B.output;
                            m.globstar = true;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && !r && eos()) {
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = `(?:${n.output}`;
                            B.type = "globstar";
                            B.output = globstar(u) + (u.strictSlashes ? ")" : "|$)");
                            B.value += G;
                            m.globstar = true;
                            m.output += n.output + B.output;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && e[0] === "/") {
                            const t = e[1] !== void 0 ? "|$" : "";
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = `(?:${n.output}`;
                            B.type = "globstar";
                            B.output = `${globstar(u)}${b}|${b}${t})`;
                            B.value += G;
                            m.output += n.output + B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        if (n.type === "bos" && e[0] === "/") {
                            B.type = "globstar";
                            B.value += G;
                            B.output = `(?:^|${b}|${globstar(u)}${b})`;
                            m.output = B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        m.output = m.output.slice(0, -B.output.length);
                        B.type = "globstar";
                        B.output = globstar(u);
                        B.value += G;
                        m.output += B.output;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    const n = {
                        type: "star",
                        value: G,
                        output: k
                    };
                    if (u.bash === true) {
                        n.output = ".*?";
                        if (B.type === "bos" || B.type === "slash") {
                            n.output = T + n.output;
                        }
                        push(n);
                        continue;
                    }
                    if (B && (B.type === "bracket" || B.type === "paren") && u.regex === true) {
                        n.output = G;
                        push(n);
                        continue;
                    }
                    if (m.index === m.start || B.type === "slash" || B.type === "dot") {
                        if (B.type === "dot") {
                            m.output += x;
                            B.output += x;
                        } else if (u.dot === true) {
                            m.output += S;
                            B.output += S;
                        } else {
                            m.output += T;
                            B.output += T;
                        }
                        if (D() !== "*") {
                            m.output += C;
                            B.output += C;
                        }
                    }
                    push(n);
                }
                while(m.brackets > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
                    m.output = o.escapeLast(m.output, "[");
                    decrement("brackets");
                }
                while(m.parens > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
                    m.output = o.escapeLast(m.output, "(");
                    decrement("parens");
                }
                while(m.braces > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
                    m.output = o.escapeLast(m.output, "{");
                    decrement("braces");
                }
                if (u.strictSlashes !== true && (B.type === "star" || B.type === "bracket")) {
                    push({
                        type: "maybe_slash",
                        value: "",
                        output: `${b}?`
                    });
                }
                if (m.backtrack === true) {
                    m.output = "";
                    for (const t of m.tokens){
                        m.output += t.output != null ? t.output : t.value;
                        if (t.suffix) {
                            m.output += t.suffix;
                        }
                    }
                }
                return m;
            };
            parse.fastpaths = (t, e)=>{
                const u = {
                    ...e
                };
                const r = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                const a = t.length;
                if (a > r) {
                    throw new SyntaxError(`Input length: ${a}, exceeds maximum allowed length: ${r}`);
                }
                t = c[t] || t;
                const { DOT_LITERAL: i, SLASH_LITERAL: p, ONE_CHAR: l, DOTS_SLASH: f, NO_DOT: A, NO_DOTS: _, NO_DOTS_SLASH: R, STAR: E, START_ANCHOR: h } = n.globChars(u.windows);
                const g = u.dot ? _ : A;
                const b = u.dot ? R : A;
                const C = u.capture ? "" : "?:";
                const y = {
                    negated: false,
                    prefix: ""
                };
                let $ = u.bash === true ? ".*?" : E;
                if (u.capture) {
                    $ = `(${$})`;
                }
                const globstar = (t)=>{
                    if (t.noglobstar === true) return $;
                    return `(${C}(?:(?!${h}${t.dot ? f : i}).)*?)`;
                };
                const create = (t)=>{
                    switch(t){
                        case "*":
                            return `${g}${l}${$}`;
                        case ".*":
                            return `${i}${l}${$}`;
                        case "*.*":
                            return `${g}${$}${i}${l}${$}`;
                        case "*/*":
                            return `${g}${$}${p}${l}${b}${$}`;
                        case "**":
                            return g + globstar(u);
                        case "**/*":
                            return `(?:${g}${globstar(u)}${p})?${b}${l}${$}`;
                        case "**/*.*":
                            return `(?:${g}${globstar(u)}${p})?${b}${$}${i}${l}${$}`;
                        case "**/.*":
                            return `(?:${g}${globstar(u)}${p})?${i}${l}${$}`;
                        default:
                            {
                                const e = /^(.*?)\.(\w+)$/.exec(t);
                                if (!e) return;
                                const u = create(e[1]);
                                if (!u) return;
                                return u + i + e[2];
                            }
                    }
                };
                const x = o.removePrefix(t, y);
                let S = create(x);
                if (S && u.strictSlashes !== true) {
                    S += `${p}?`;
                }
                return S;
            };
            t.exports = parse;
        },
        510: (t, e, u)=>{
            const n = u(716);
            const o = u(697);
            const s = u(96);
            const r = u(154);
            const isObject = (t)=>t && typeof t === "object" && !Array.isArray(t);
            const picomatch = (t, e, u = false)=>{
                if (Array.isArray(t)) {
                    const n = t.map((t)=>picomatch(t, e, u));
                    const arrayMatcher = (t)=>{
                        for (const e of n){
                            const u = e(t);
                            if (u) return u;
                        }
                        return false;
                    };
                    return arrayMatcher;
                }
                const n = isObject(t) && t.tokens && t.input;
                if (t === "" || typeof t !== "string" && !n) {
                    throw new TypeError("Expected pattern to be a non-empty string");
                }
                const o = e || {};
                const s = o.windows;
                const r = n ? picomatch.compileRe(t, e) : picomatch.makeRe(t, e, false, true);
                const a = r.state;
                delete r.state;
                let isIgnored = ()=>false;
                if (o.ignore) {
                    const t = {
                        ...e,
                        ignore: null,
                        onMatch: null,
                        onResult: null
                    };
                    isIgnored = picomatch(o.ignore, t, u);
                }
                const matcher = (u, n = false)=>{
                    const { isMatch: i, match: c, output: p } = picomatch.test(u, r, e, {
                        glob: t,
                        posix: s
                    });
                    const l = {
                        glob: t,
                        state: a,
                        regex: r,
                        posix: s,
                        input: u,
                        output: p,
                        match: c,
                        isMatch: i
                    };
                    if (typeof o.onResult === "function") {
                        o.onResult(l);
                    }
                    if (i === false) {
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (isIgnored(u)) {
                        if (typeof o.onIgnore === "function") {
                            o.onIgnore(l);
                        }
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (typeof o.onMatch === "function") {
                        o.onMatch(l);
                    }
                    return n ? l : true;
                };
                if (u) {
                    matcher.state = a;
                }
                return matcher;
            };
            picomatch.test = (t, e, u, { glob: n, posix: o } = {})=>{
                if (typeof t !== "string") {
                    throw new TypeError("Expected input to be a string");
                }
                if (t === "") {
                    return {
                        isMatch: false,
                        output: ""
                    };
                }
                const r = u || {};
                const a = r.format || (o ? s.toPosixSlashes : null);
                let i = t === n;
                let c = i && a ? a(t) : t;
                if (i === false) {
                    c = a ? a(t) : t;
                    i = c === n;
                }
                if (i === false || r.capture === true) {
                    if (r.matchBase === true || r.basename === true) {
                        i = picomatch.matchBase(t, e, u, o);
                    } else {
                        i = e.exec(c);
                    }
                }
                return {
                    isMatch: Boolean(i),
                    match: i,
                    output: c
                };
            };
            picomatch.matchBase = (t, e, u)=>{
                const n = e instanceof RegExp ? e : picomatch.makeRe(e, u);
                return n.test(s.basename(t));
            };
            picomatch.isMatch = (t, e, u)=>picomatch(e, u)(t);
            picomatch.parse = (t, e)=>{
                if (Array.isArray(t)) return t.map((t)=>picomatch.parse(t, e));
                return o(t, {
                    ...e,
                    fastpaths: false
                });
            };
            picomatch.scan = (t, e)=>n(t, e);
            picomatch.compileRe = (t, e, u = false, n = false)=>{
                if (u === true) {
                    return t.output;
                }
                const o = e || {};
                const s = o.contains ? "" : "^";
                const r = o.contains ? "" : "$";
                let a = `${s}(?:${t.output})${r}`;
                if (t && t.negated === true) {
                    a = `^(?!${a}).*$`;
                }
                const i = picomatch.toRegex(a, e);
                if (n === true) {
                    i.state = t;
                }
                return i;
            };
            picomatch.makeRe = (t, e = {}, u = false, n = false)=>{
                if (!t || typeof t !== "string") {
                    throw new TypeError("Expected a non-empty string");
                }
                let s = {
                    negated: false,
                    fastpaths: true
                };
                if (e.fastpaths !== false && (t[0] === "." || t[0] === "*")) {
                    s.output = o.fastpaths(t, e);
                }
                if (!s.output) {
                    s = o(t, e);
                }
                return picomatch.compileRe(s, e, u, n);
            };
            picomatch.toRegex = (t, e)=>{
                try {
                    const u = e || {};
                    return new RegExp(t, u.flags || (u.nocase ? "i" : ""));
                } catch (t) {
                    if (e && e.debug === true) throw t;
                    return /$^/;
                }
            };
            picomatch.constants = r;
            t.exports = picomatch;
        },
        716: (t, e, u)=>{
            const n = u(96);
            const { CHAR_ASTERISK: o, CHAR_AT: s, CHAR_BACKWARD_SLASH: r, CHAR_COMMA: a, CHAR_DOT: i, CHAR_EXCLAMATION_MARK: c, CHAR_FORWARD_SLASH: p, CHAR_LEFT_CURLY_BRACE: l, CHAR_LEFT_PARENTHESES: f, CHAR_LEFT_SQUARE_BRACKET: A, CHAR_PLUS: _, CHAR_QUESTION_MARK: R, CHAR_RIGHT_CURLY_BRACE: E, CHAR_RIGHT_PARENTHESES: h, CHAR_RIGHT_SQUARE_BRACKET: g } = u(154);
            const isPathSeparator = (t)=>t === p || t === r;
            const depth = (t)=>{
                if (t.isPrefix !== true) {
                    t.depth = t.isGlobstar ? Infinity : 1;
                }
            };
            const scan = (t, e)=>{
                const u = e || {};
                const b = t.length - 1;
                const C = u.parts === true || u.scanToEnd === true;
                const y = [];
                const $ = [];
                const x = [];
                let S = t;
                let H = -1;
                let v = 0;
                let d = 0;
                let L = false;
                let T = false;
                let O = false;
                let k = false;
                let m = false;
                let w = false;
                let N = false;
                let I = false;
                let B = false;
                let G = false;
                let D = 0;
                let M;
                let P;
                let K = {
                    value: "",
                    depth: 0,
                    isGlob: false
                };
                const eos = ()=>H >= b;
                const peek = ()=>S.charCodeAt(H + 1);
                const advance = ()=>{
                    M = P;
                    return S.charCodeAt(++H);
                };
                while(H < b){
                    P = advance();
                    let t;
                    if (P === r) {
                        N = K.backslashes = true;
                        P = advance();
                        if (P === l) {
                            w = true;
                        }
                        continue;
                    }
                    if (w === true || P === l) {
                        D++;
                        while(eos() !== true && (P = advance())){
                            if (P === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (P === l) {
                                D++;
                                continue;
                            }
                            if (w !== true && P === i && (P = advance()) === i) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (w !== true && P === a) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (P === E) {
                                D--;
                                if (D === 0) {
                                    w = false;
                                    L = K.isBrace = true;
                                    G = true;
                                    break;
                                }
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === p) {
                        y.push(H);
                        $.push(K);
                        K = {
                            value: "",
                            depth: 0,
                            isGlob: false
                        };
                        if (G === true) continue;
                        if (M === i && H === v + 1) {
                            v += 2;
                            continue;
                        }
                        d = H + 1;
                        continue;
                    }
                    if (u.noext !== true) {
                        const t = P === _ || P === s || P === o || P === R || P === c;
                        if (t === true && peek() === f) {
                            O = K.isGlob = true;
                            k = K.isExtglob = true;
                            G = true;
                            if (P === c && H === v) {
                                B = true;
                            }
                            if (C === true) {
                                while(eos() !== true && (P = advance())){
                                    if (P === r) {
                                        N = K.backslashes = true;
                                        P = advance();
                                        continue;
                                    }
                                    if (P === h) {
                                        O = K.isGlob = true;
                                        G = true;
                                        break;
                                    }
                                }
                                continue;
                            }
                            break;
                        }
                    }
                    if (P === o) {
                        if (M === o) m = K.isGlobstar = true;
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === R) {
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === A) {
                        while(eos() !== true && (t = advance())){
                            if (t === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (t === g) {
                                T = K.isBracket = true;
                                O = K.isGlob = true;
                                G = true;
                                break;
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (u.nonegate !== true && P === c && H === v) {
                        I = K.negated = true;
                        v++;
                        continue;
                    }
                    if (u.noparen !== true && P === f) {
                        O = K.isGlob = true;
                        if (C === true) {
                            while(eos() !== true && (P = advance())){
                                if (P === f) {
                                    N = K.backslashes = true;
                                    P = advance();
                                    continue;
                                }
                                if (P === h) {
                                    G = true;
                                    break;
                                }
                            }
                            continue;
                        }
                        break;
                    }
                    if (O === true) {
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                }
                if (u.noext === true) {
                    k = false;
                    O = false;
                }
                let U = S;
                let X = "";
                let F = "";
                if (v > 0) {
                    X = S.slice(0, v);
                    S = S.slice(v);
                    d -= v;
                }
                if (U && O === true && d > 0) {
                    U = S.slice(0, d);
                    F = S.slice(d);
                } else if (O === true) {
                    U = "";
                    F = S;
                } else {
                    U = S;
                }
                if (U && U !== "" && U !== "/" && U !== S) {
                    if (isPathSeparator(U.charCodeAt(U.length - 1))) {
                        U = U.slice(0, -1);
                    }
                }
                if (u.unescape === true) {
                    if (F) F = n.removeBackslashes(F);
                    if (U && N === true) {
                        U = n.removeBackslashes(U);
                    }
                }
                const Q = {
                    prefix: X,
                    input: t,
                    start: v,
                    base: U,
                    glob: F,
                    isBrace: L,
                    isBracket: T,
                    isGlob: O,
                    isExtglob: k,
                    isGlobstar: m,
                    negated: I,
                    negatedExtglob: B
                };
                if (u.tokens === true) {
                    Q.maxDepth = 0;
                    if (!isPathSeparator(P)) {
                        $.push(K);
                    }
                    Q.tokens = $;
                }
                if (u.parts === true || u.tokens === true) {
                    let e;
                    for(let n = 0; n < y.length; n++){
                        const o = e ? e + 1 : v;
                        const s = y[n];
                        const r = t.slice(o, s);
                        if (u.tokens) {
                            if (n === 0 && v !== 0) {
                                $[n].isPrefix = true;
                                $[n].value = X;
                            } else {
                                $[n].value = r;
                            }
                            depth($[n]);
                            Q.maxDepth += $[n].depth;
                        }
                        if (n !== 0 || r !== "") {
                            x.push(r);
                        }
                        e = s;
                    }
                    if (e && e + 1 < t.length) {
                        const n = t.slice(e + 1);
                        x.push(n);
                        if (u.tokens) {
                            $[$.length - 1].value = n;
                            depth($[$.length - 1]);
                            Q.maxDepth += $[$.length - 1].depth;
                        }
                    }
                    Q.slashes = y;
                    Q.parts = x;
                }
                return Q;
            };
            t.exports = scan;
        },
        96: (t, e, u)=>{
            const { REGEX_BACKSLASH: n, REGEX_REMOVE_BACKSLASH: o, REGEX_SPECIAL_CHARS: s, REGEX_SPECIAL_CHARS_GLOBAL: r } = u(154);
            e.isObject = (t)=>t !== null && typeof t === "object" && !Array.isArray(t);
            e.hasRegexChars = (t)=>s.test(t);
            e.isRegexChar = (t)=>t.length === 1 && e.hasRegexChars(t);
            e.escapeRegex = (t)=>t.replace(r, "\\$1");
            e.toPosixSlashes = (t)=>t.replace(n, "/");
            e.removeBackslashes = (t)=>t.replace(o, (t)=>t === "\\" ? "" : t);
            e.escapeLast = (t, u, n)=>{
                const o = t.lastIndexOf(u, n);
                if (o === -1) return t;
                if (t[o - 1] === "\\") return e.escapeLast(t, u, o - 1);
                return `${t.slice(0, o)}\\${t.slice(o)}`;
            };
            e.removePrefix = (t, e = {})=>{
                let u = t;
                if (u.startsWith("./")) {
                    u = u.slice(2);
                    e.prefix = "./";
                }
                return u;
            };
            e.wrapOutput = (t, e = {}, u = {})=>{
                const n = u.contains ? "" : "^";
                const o = u.contains ? "" : "$";
                let s = `${n}(?:${t})${o}`;
                if (e.negated === true) {
                    s = `(?:^(?!${s}).*$)`;
                }
                return s;
            };
            e.basename = (t, { windows: e } = {})=>{
                const u = t.split(e ? /[\\/]/ : "/");
                const n = u[u.length - 1];
                if (n === "") {
                    return u[u.length - 2];
                }
                return n;
            };
        }
    };
    var e = {};
    function __nccwpck_require__(u) {
        var n = e[u];
        if (n !== undefined) {
            return n.exports;
        }
        var o = e[u] = {
            exports: {}
        };
        var s = true;
        try {
            t[u](o, o.exports, __nccwpck_require__);
            s = false;
        } finally{
            if (s) delete e[u];
        }
        return o.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/picomatch") + "/";
    var u = __nccwpck_require__(170);
    module.exports = u;
})();
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/match-local-pattern.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasLocalMatch: null,
    matchLocalPattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasLocalMatch: function() {
        return hasLocalMatch;
    },
    matchLocalPattern: function() {
        return matchLocalPattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/picomatch/index.js [app-rsc] (ecmascript)");
function matchLocalPattern(pattern, url) {
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    if (!(0, _picomatch.makeRe)(pattern.pathname ?? '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasLocalMatch(localPatterns, urlPathAndQuery) {
    if (!localPatterns) {
        // if the user didn't define "localPatterns", we allow all local images
        return true;
    }
    const url = new URL(urlPathAndQuery, 'http://n');
    return localPatterns.some((p)=>matchLocalPattern(p, url));
} //# sourceMappingURL=match-local-pattern.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasRemoteMatch: null,
    matchRemotePattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasRemoteMatch: function() {
        return hasRemoteMatch;
    },
    matchRemotePattern: function() {
        return matchRemotePattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/compiled/picomatch/index.js [app-rsc] (ecmascript)");
function matchRemotePattern(pattern, url) {
    if (pattern.protocol !== undefined) {
        if (pattern.protocol.replace(/:$/, '') !== url.protocol.replace(/:$/, '')) {
            return false;
        }
    }
    if (pattern.port !== undefined) {
        if (pattern.port !== url.port) {
            return false;
        }
    }
    if (pattern.hostname === undefined) {
        throw Object.defineProperty(new Error(`Pattern should define hostname but found\n${JSON.stringify(pattern)}`), "__NEXT_ERROR_CODE", {
            value: "E410",
            enumerable: false,
            configurable: true
        });
    } else {
        if (!(0, _picomatch.makeRe)(pattern.hostname).test(url.hostname)) {
            return false;
        }
    }
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    // Should be the same as writeImagesManifest()
    if (!(0, _picomatch.makeRe)(pattern.pathname ?? '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasRemoteMatch(domains, remotePatterns, url) {
    return domains.some((domain)=>url.hostname === domain) || remotePatterns.some((p)=>matchRemotePattern(p, url));
} //# sourceMappingURL=match-remote-pattern.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/image-loader.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _findclosestquality = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/find-closest-quality.js [app-rsc] (ecmascript)");
const _deploymentid = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/deployment-id.js [app-rsc] (ecmascript)");
function defaultLoader({ config, src, width, quality }) {
    if (src.startsWith('/') && src.includes('?') && config.localPatterns?.length === 1 && config.localPatterns[0].pathname === '**' && config.localPatterns[0].search === '') {
        throw Object.defineProperty(new Error(`Image with src "${src}" is using a query string which is not configured in images.localPatterns.` + `\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
            value: "E871",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const missingValues = [];
        // these should always be provided but make sure they are
        if (!src) missingValues.push('src');
        if (!width) missingValues.push('width');
        if (missingValues.length > 0) {
            throw Object.defineProperty(new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
                src,
                width,
                quality
            })}`), "__NEXT_ERROR_CODE", {
                value: "E188",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('//')) {
            throw Object.defineProperty(new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`), "__NEXT_ERROR_CODE", {
                value: "E360",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('/') && config.localPatterns) {
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasLocalMatch } = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/match-local-pattern.js [app-rsc] (ecmascript)");
                if (!hasLocalMatch(config.localPatterns, src)) {
                    throw Object.defineProperty(new Error(`Invalid src prop (${src}) on \`next/image\` does not match \`images.localPatterns\` configured in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
                        value: "E426",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!src.startsWith('/') && (config.domains || config.remotePatterns)) {
            let parsedSrc;
            try {
                parsedSrc = new URL(src);
            } catch (err) {
                console.error(err);
                throw Object.defineProperty(new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`), "__NEXT_ERROR_CODE", {
                    value: "E63",
                    enumerable: false,
                    configurable: true
                });
            }
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasRemoteMatch } = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-rsc] (ecmascript)");
                if (!hasRemoteMatch(config.domains, config.remotePatterns, parsedSrc)) {
                    throw Object.defineProperty(new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`), "__NEXT_ERROR_CODE", {
                        value: "E231",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const q = (0, _findclosestquality.findClosestQuality)(quality, config);
    let deploymentId = (0, _deploymentid.getDeploymentId)();
    return `${config.path}?url=${encodeURIComponent(src)}&w=${width}&q=${q}${src.startsWith('/') && deploymentId ? `&dpl=${deploymentId}` : ''}`;
}
// We use this to determine if the import is the default loader
// or a custom loader defined by the user in next.config.js
defaultLoader.__next_img_default = true;
const _default = defaultLoader; //# sourceMappingURL=image-loader.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/image-external.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    getImageProps: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    getImageProps: function() {
        return getImageProps;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-rsc] (ecmascript)");
const _getimgprops = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/get-img-props.js [app-rsc] (ecmascript)");
const _imagecomponent = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/image-component.js [app-rsc] (ecmascript)");
const _imageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/image-loader.js [app-rsc] (ecmascript)"));
function getImageProps(imgProps) {
    const { props } = (0, _getimgprops.getImgProps)(imgProps, {
        defaultLoader: _imageloader.default,
        // This is replaced by webpack define plugin
        imgConf: ("TURBOPACK compile-time value", {
            "deviceSizes": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 640),
                ("TURBOPACK compile-time value", 750),
                ("TURBOPACK compile-time value", 828),
                ("TURBOPACK compile-time value", 1080),
                ("TURBOPACK compile-time value", 1200),
                ("TURBOPACK compile-time value", 1920),
                ("TURBOPACK compile-time value", 2048),
                ("TURBOPACK compile-time value", 3840)
            ]),
            "imageSizes": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 32),
                ("TURBOPACK compile-time value", 48),
                ("TURBOPACK compile-time value", 64),
                ("TURBOPACK compile-time value", 96),
                ("TURBOPACK compile-time value", 128),
                ("TURBOPACK compile-time value", 256),
                ("TURBOPACK compile-time value", 384)
            ]),
            "qualities": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 75)
            ]),
            "path": ("TURBOPACK compile-time value", "/_next/image"),
            "loader": ("TURBOPACK compile-time value", "default"),
            "dangerouslyAllowSVG": ("TURBOPACK compile-time value", false),
            "unoptimized": ("TURBOPACK compile-time value", false),
            "domains": ("TURBOPACK compile-time value", []),
            "remotePatterns": ("TURBOPACK compile-time value", []),
            "localPatterns": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", {
                    "pathname": ("TURBOPACK compile-time value", "**"),
                    "search": ("TURBOPACK compile-time value", "")
                })
            ])
        })
    });
    // Normally we don't care about undefined props because we pass to JSX,
    // but this exported function could be used by the end user for anything
    // so we delete undefined props to clean it up a little.
    for (const [key, value] of Object.entries(props)){
        if (value === undefined) {
            delete props[key];
        }
    }
    return {
        props
    };
}
const _default = _imagecomponent.Image; //# sourceMappingURL=image-external.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/image.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/shared/lib/image-external.js [app-rsc] (ecmascript)");
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/react-icons/lib/iconContext.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultContext",
    ()=>DefaultContext,
    "IconContext",
    ()=>IconContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
var DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
};
var IconContext = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createContext && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createContext(DefaultContext);
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/react-icons/lib/iconBase.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GenIcon",
    ()=>GenIcon,
    "IconBase",
    ()=>IconBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconContext$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/react-icons/lib/iconContext.mjs [app-rsc] (ecmascript)");
var _excluded = [
    "attr",
    "size",
    "title"
];
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    for(var key in source){
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (excluded.indexOf(key) >= 0) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _extends() {
    _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable";
    return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
;
;
function Tree2Element(tree) {
    return tree && tree.map((node, i)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement(node.tag, _objectSpread({
            key: i
        }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
    return (props)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement(IconBase, _extends({
            attr: _objectSpread({}, data.attr)
        }, props), Tree2Element(data.child));
}
function IconBase(props) {
    var elem = (conf)=>{
        var { attr, size, title } = props, svgProps = _objectWithoutProperties(props, _excluded);
        var computedSize = size || conf.size || "1em";
        var className;
        if (conf.className) className = conf.className;
        if (props.className) className = (className ? className + " " : "") + props.className;
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement("svg", _extends({
            stroke: "currentColor",
            fill: "currentColor",
            strokeWidth: "0"
        }, conf.attr, attr, svgProps, {
            className: className,
            style: _objectSpread(_objectSpread({
                color: props.color || conf.color
            }, conf.style), props.style),
            height: computedSize,
            width: computedSize,
            xmlns: "http://www.w3.org/2000/svg"
        }), title && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement("title", null, title), props.children);
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconContext$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IconContext"] !== undefined ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconContext$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IconContext"].Consumer, null, (conf)=>elem(conf)) : elem(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconContext$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultContext"]);
}
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/react-icons/fi/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FiActivity",
    ()=>FiActivity,
    "FiAirplay",
    ()=>FiAirplay,
    "FiAlertCircle",
    ()=>FiAlertCircle,
    "FiAlertOctagon",
    ()=>FiAlertOctagon,
    "FiAlertTriangle",
    ()=>FiAlertTriangle,
    "FiAlignCenter",
    ()=>FiAlignCenter,
    "FiAlignJustify",
    ()=>FiAlignJustify,
    "FiAlignLeft",
    ()=>FiAlignLeft,
    "FiAlignRight",
    ()=>FiAlignRight,
    "FiAnchor",
    ()=>FiAnchor,
    "FiAperture",
    ()=>FiAperture,
    "FiArchive",
    ()=>FiArchive,
    "FiArrowDown",
    ()=>FiArrowDown,
    "FiArrowDownCircle",
    ()=>FiArrowDownCircle,
    "FiArrowDownLeft",
    ()=>FiArrowDownLeft,
    "FiArrowDownRight",
    ()=>FiArrowDownRight,
    "FiArrowLeft",
    ()=>FiArrowLeft,
    "FiArrowLeftCircle",
    ()=>FiArrowLeftCircle,
    "FiArrowRight",
    ()=>FiArrowRight,
    "FiArrowRightCircle",
    ()=>FiArrowRightCircle,
    "FiArrowUp",
    ()=>FiArrowUp,
    "FiArrowUpCircle",
    ()=>FiArrowUpCircle,
    "FiArrowUpLeft",
    ()=>FiArrowUpLeft,
    "FiArrowUpRight",
    ()=>FiArrowUpRight,
    "FiAtSign",
    ()=>FiAtSign,
    "FiAward",
    ()=>FiAward,
    "FiBarChart",
    ()=>FiBarChart,
    "FiBarChart2",
    ()=>FiBarChart2,
    "FiBattery",
    ()=>FiBattery,
    "FiBatteryCharging",
    ()=>FiBatteryCharging,
    "FiBell",
    ()=>FiBell,
    "FiBellOff",
    ()=>FiBellOff,
    "FiBluetooth",
    ()=>FiBluetooth,
    "FiBold",
    ()=>FiBold,
    "FiBook",
    ()=>FiBook,
    "FiBookOpen",
    ()=>FiBookOpen,
    "FiBookmark",
    ()=>FiBookmark,
    "FiBox",
    ()=>FiBox,
    "FiBriefcase",
    ()=>FiBriefcase,
    "FiCalendar",
    ()=>FiCalendar,
    "FiCamera",
    ()=>FiCamera,
    "FiCameraOff",
    ()=>FiCameraOff,
    "FiCast",
    ()=>FiCast,
    "FiCheck",
    ()=>FiCheck,
    "FiCheckCircle",
    ()=>FiCheckCircle,
    "FiCheckSquare",
    ()=>FiCheckSquare,
    "FiChevronDown",
    ()=>FiChevronDown,
    "FiChevronLeft",
    ()=>FiChevronLeft,
    "FiChevronRight",
    ()=>FiChevronRight,
    "FiChevronUp",
    ()=>FiChevronUp,
    "FiChevronsDown",
    ()=>FiChevronsDown,
    "FiChevronsLeft",
    ()=>FiChevronsLeft,
    "FiChevronsRight",
    ()=>FiChevronsRight,
    "FiChevronsUp",
    ()=>FiChevronsUp,
    "FiChrome",
    ()=>FiChrome,
    "FiCircle",
    ()=>FiCircle,
    "FiClipboard",
    ()=>FiClipboard,
    "FiClock",
    ()=>FiClock,
    "FiCloud",
    ()=>FiCloud,
    "FiCloudDrizzle",
    ()=>FiCloudDrizzle,
    "FiCloudLightning",
    ()=>FiCloudLightning,
    "FiCloudOff",
    ()=>FiCloudOff,
    "FiCloudRain",
    ()=>FiCloudRain,
    "FiCloudSnow",
    ()=>FiCloudSnow,
    "FiCode",
    ()=>FiCode,
    "FiCodepen",
    ()=>FiCodepen,
    "FiCodesandbox",
    ()=>FiCodesandbox,
    "FiCoffee",
    ()=>FiCoffee,
    "FiColumns",
    ()=>FiColumns,
    "FiCommand",
    ()=>FiCommand,
    "FiCompass",
    ()=>FiCompass,
    "FiCopy",
    ()=>FiCopy,
    "FiCornerDownLeft",
    ()=>FiCornerDownLeft,
    "FiCornerDownRight",
    ()=>FiCornerDownRight,
    "FiCornerLeftDown",
    ()=>FiCornerLeftDown,
    "FiCornerLeftUp",
    ()=>FiCornerLeftUp,
    "FiCornerRightDown",
    ()=>FiCornerRightDown,
    "FiCornerRightUp",
    ()=>FiCornerRightUp,
    "FiCornerUpLeft",
    ()=>FiCornerUpLeft,
    "FiCornerUpRight",
    ()=>FiCornerUpRight,
    "FiCpu",
    ()=>FiCpu,
    "FiCreditCard",
    ()=>FiCreditCard,
    "FiCrop",
    ()=>FiCrop,
    "FiCrosshair",
    ()=>FiCrosshair,
    "FiDatabase",
    ()=>FiDatabase,
    "FiDelete",
    ()=>FiDelete,
    "FiDisc",
    ()=>FiDisc,
    "FiDivide",
    ()=>FiDivide,
    "FiDivideCircle",
    ()=>FiDivideCircle,
    "FiDivideSquare",
    ()=>FiDivideSquare,
    "FiDollarSign",
    ()=>FiDollarSign,
    "FiDownload",
    ()=>FiDownload,
    "FiDownloadCloud",
    ()=>FiDownloadCloud,
    "FiDribbble",
    ()=>FiDribbble,
    "FiDroplet",
    ()=>FiDroplet,
    "FiEdit",
    ()=>FiEdit,
    "FiEdit2",
    ()=>FiEdit2,
    "FiEdit3",
    ()=>FiEdit3,
    "FiExternalLink",
    ()=>FiExternalLink,
    "FiEye",
    ()=>FiEye,
    "FiEyeOff",
    ()=>FiEyeOff,
    "FiFacebook",
    ()=>FiFacebook,
    "FiFastForward",
    ()=>FiFastForward,
    "FiFeather",
    ()=>FiFeather,
    "FiFigma",
    ()=>FiFigma,
    "FiFile",
    ()=>FiFile,
    "FiFileMinus",
    ()=>FiFileMinus,
    "FiFilePlus",
    ()=>FiFilePlus,
    "FiFileText",
    ()=>FiFileText,
    "FiFilm",
    ()=>FiFilm,
    "FiFilter",
    ()=>FiFilter,
    "FiFlag",
    ()=>FiFlag,
    "FiFolder",
    ()=>FiFolder,
    "FiFolderMinus",
    ()=>FiFolderMinus,
    "FiFolderPlus",
    ()=>FiFolderPlus,
    "FiFramer",
    ()=>FiFramer,
    "FiFrown",
    ()=>FiFrown,
    "FiGift",
    ()=>FiGift,
    "FiGitBranch",
    ()=>FiGitBranch,
    "FiGitCommit",
    ()=>FiGitCommit,
    "FiGitMerge",
    ()=>FiGitMerge,
    "FiGitPullRequest",
    ()=>FiGitPullRequest,
    "FiGithub",
    ()=>FiGithub,
    "FiGitlab",
    ()=>FiGitlab,
    "FiGlobe",
    ()=>FiGlobe,
    "FiGrid",
    ()=>FiGrid,
    "FiHardDrive",
    ()=>FiHardDrive,
    "FiHash",
    ()=>FiHash,
    "FiHeadphones",
    ()=>FiHeadphones,
    "FiHeart",
    ()=>FiHeart,
    "FiHelpCircle",
    ()=>FiHelpCircle,
    "FiHexagon",
    ()=>FiHexagon,
    "FiHome",
    ()=>FiHome,
    "FiImage",
    ()=>FiImage,
    "FiInbox",
    ()=>FiInbox,
    "FiInfo",
    ()=>FiInfo,
    "FiInstagram",
    ()=>FiInstagram,
    "FiItalic",
    ()=>FiItalic,
    "FiKey",
    ()=>FiKey,
    "FiLayers",
    ()=>FiLayers,
    "FiLayout",
    ()=>FiLayout,
    "FiLifeBuoy",
    ()=>FiLifeBuoy,
    "FiLink",
    ()=>FiLink,
    "FiLink2",
    ()=>FiLink2,
    "FiLinkedin",
    ()=>FiLinkedin,
    "FiList",
    ()=>FiList,
    "FiLoader",
    ()=>FiLoader,
    "FiLock",
    ()=>FiLock,
    "FiLogIn",
    ()=>FiLogIn,
    "FiLogOut",
    ()=>FiLogOut,
    "FiMail",
    ()=>FiMail,
    "FiMap",
    ()=>FiMap,
    "FiMapPin",
    ()=>FiMapPin,
    "FiMaximize",
    ()=>FiMaximize,
    "FiMaximize2",
    ()=>FiMaximize2,
    "FiMeh",
    ()=>FiMeh,
    "FiMenu",
    ()=>FiMenu,
    "FiMessageCircle",
    ()=>FiMessageCircle,
    "FiMessageSquare",
    ()=>FiMessageSquare,
    "FiMic",
    ()=>FiMic,
    "FiMicOff",
    ()=>FiMicOff,
    "FiMinimize",
    ()=>FiMinimize,
    "FiMinimize2",
    ()=>FiMinimize2,
    "FiMinus",
    ()=>FiMinus,
    "FiMinusCircle",
    ()=>FiMinusCircle,
    "FiMinusSquare",
    ()=>FiMinusSquare,
    "FiMonitor",
    ()=>FiMonitor,
    "FiMoon",
    ()=>FiMoon,
    "FiMoreHorizontal",
    ()=>FiMoreHorizontal,
    "FiMoreVertical",
    ()=>FiMoreVertical,
    "FiMousePointer",
    ()=>FiMousePointer,
    "FiMove",
    ()=>FiMove,
    "FiMusic",
    ()=>FiMusic,
    "FiNavigation",
    ()=>FiNavigation,
    "FiNavigation2",
    ()=>FiNavigation2,
    "FiOctagon",
    ()=>FiOctagon,
    "FiPackage",
    ()=>FiPackage,
    "FiPaperclip",
    ()=>FiPaperclip,
    "FiPause",
    ()=>FiPause,
    "FiPauseCircle",
    ()=>FiPauseCircle,
    "FiPenTool",
    ()=>FiPenTool,
    "FiPercent",
    ()=>FiPercent,
    "FiPhone",
    ()=>FiPhone,
    "FiPhoneCall",
    ()=>FiPhoneCall,
    "FiPhoneForwarded",
    ()=>FiPhoneForwarded,
    "FiPhoneIncoming",
    ()=>FiPhoneIncoming,
    "FiPhoneMissed",
    ()=>FiPhoneMissed,
    "FiPhoneOff",
    ()=>FiPhoneOff,
    "FiPhoneOutgoing",
    ()=>FiPhoneOutgoing,
    "FiPieChart",
    ()=>FiPieChart,
    "FiPlay",
    ()=>FiPlay,
    "FiPlayCircle",
    ()=>FiPlayCircle,
    "FiPlus",
    ()=>FiPlus,
    "FiPlusCircle",
    ()=>FiPlusCircle,
    "FiPlusSquare",
    ()=>FiPlusSquare,
    "FiPocket",
    ()=>FiPocket,
    "FiPower",
    ()=>FiPower,
    "FiPrinter",
    ()=>FiPrinter,
    "FiRadio",
    ()=>FiRadio,
    "FiRefreshCcw",
    ()=>FiRefreshCcw,
    "FiRefreshCw",
    ()=>FiRefreshCw,
    "FiRepeat",
    ()=>FiRepeat,
    "FiRewind",
    ()=>FiRewind,
    "FiRotateCcw",
    ()=>FiRotateCcw,
    "FiRotateCw",
    ()=>FiRotateCw,
    "FiRss",
    ()=>FiRss,
    "FiSave",
    ()=>FiSave,
    "FiScissors",
    ()=>FiScissors,
    "FiSearch",
    ()=>FiSearch,
    "FiSend",
    ()=>FiSend,
    "FiServer",
    ()=>FiServer,
    "FiSettings",
    ()=>FiSettings,
    "FiShare",
    ()=>FiShare,
    "FiShare2",
    ()=>FiShare2,
    "FiShield",
    ()=>FiShield,
    "FiShieldOff",
    ()=>FiShieldOff,
    "FiShoppingBag",
    ()=>FiShoppingBag,
    "FiShoppingCart",
    ()=>FiShoppingCart,
    "FiShuffle",
    ()=>FiShuffle,
    "FiSidebar",
    ()=>FiSidebar,
    "FiSkipBack",
    ()=>FiSkipBack,
    "FiSkipForward",
    ()=>FiSkipForward,
    "FiSlack",
    ()=>FiSlack,
    "FiSlash",
    ()=>FiSlash,
    "FiSliders",
    ()=>FiSliders,
    "FiSmartphone",
    ()=>FiSmartphone,
    "FiSmile",
    ()=>FiSmile,
    "FiSpeaker",
    ()=>FiSpeaker,
    "FiSquare",
    ()=>FiSquare,
    "FiStar",
    ()=>FiStar,
    "FiStopCircle",
    ()=>FiStopCircle,
    "FiSun",
    ()=>FiSun,
    "FiSunrise",
    ()=>FiSunrise,
    "FiSunset",
    ()=>FiSunset,
    "FiTable",
    ()=>FiTable,
    "FiTablet",
    ()=>FiTablet,
    "FiTag",
    ()=>FiTag,
    "FiTarget",
    ()=>FiTarget,
    "FiTerminal",
    ()=>FiTerminal,
    "FiThermometer",
    ()=>FiThermometer,
    "FiThumbsDown",
    ()=>FiThumbsDown,
    "FiThumbsUp",
    ()=>FiThumbsUp,
    "FiToggleLeft",
    ()=>FiToggleLeft,
    "FiToggleRight",
    ()=>FiToggleRight,
    "FiTool",
    ()=>FiTool,
    "FiTrash",
    ()=>FiTrash,
    "FiTrash2",
    ()=>FiTrash2,
    "FiTrello",
    ()=>FiTrello,
    "FiTrendingDown",
    ()=>FiTrendingDown,
    "FiTrendingUp",
    ()=>FiTrendingUp,
    "FiTriangle",
    ()=>FiTriangle,
    "FiTruck",
    ()=>FiTruck,
    "FiTv",
    ()=>FiTv,
    "FiTwitch",
    ()=>FiTwitch,
    "FiTwitter",
    ()=>FiTwitter,
    "FiType",
    ()=>FiType,
    "FiUmbrella",
    ()=>FiUmbrella,
    "FiUnderline",
    ()=>FiUnderline,
    "FiUnlock",
    ()=>FiUnlock,
    "FiUpload",
    ()=>FiUpload,
    "FiUploadCloud",
    ()=>FiUploadCloud,
    "FiUser",
    ()=>FiUser,
    "FiUserCheck",
    ()=>FiUserCheck,
    "FiUserMinus",
    ()=>FiUserMinus,
    "FiUserPlus",
    ()=>FiUserPlus,
    "FiUserX",
    ()=>FiUserX,
    "FiUsers",
    ()=>FiUsers,
    "FiVideo",
    ()=>FiVideo,
    "FiVideoOff",
    ()=>FiVideoOff,
    "FiVoicemail",
    ()=>FiVoicemail,
    "FiVolume",
    ()=>FiVolume,
    "FiVolume1",
    ()=>FiVolume1,
    "FiVolume2",
    ()=>FiVolume2,
    "FiVolumeX",
    ()=>FiVolumeX,
    "FiWatch",
    ()=>FiWatch,
    "FiWifi",
    ()=>FiWifi,
    "FiWifiOff",
    ()=>FiWifiOff,
    "FiWind",
    ()=>FiWind,
    "FiX",
    ()=>FiX,
    "FiXCircle",
    ()=>FiXCircle,
    "FiXOctagon",
    ()=>FiXOctagon,
    "FiXSquare",
    ()=>FiXSquare,
    "FiYoutube",
    ()=>FiYoutube,
    "FiZap",
    ()=>FiZap,
    "FiZapOff",
    ()=>FiZapOff,
    "FiZoomIn",
    ()=>FiZoomIn,
    "FiZoomOut",
    ()=>FiZoomOut
]);
// THIS FILE IS AUTO GENERATED
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/react-icons/lib/iconBase.mjs [app-rsc] (ecmascript)");
;
function FiActivity(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "22 12 18 12 15 21 9 3 6 12 2 12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAirplay(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
                },
                "child": []
            },
            {
                "tag": "polygon",
                "attr": {
                    "points": "12 15 17 21 7 21 12 15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAlertCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "8",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "16",
                    "x2": "12.01",
                    "y2": "16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAlertOctagon(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "8",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "16",
                    "x2": "12.01",
                    "y2": "16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAlertTriangle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "9",
                    "x2": "12",
                    "y2": "13"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "17",
                    "x2": "12.01",
                    "y2": "17"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAlignCenter(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "18",
                    "y1": "10",
                    "x2": "6",
                    "y2": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "6",
                    "x2": "3",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "14",
                    "x2": "3",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "18",
                    "y1": "18",
                    "x2": "6",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAlignJustify(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "10",
                    "x2": "3",
                    "y2": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "6",
                    "x2": "3",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "14",
                    "x2": "3",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "18",
                    "x2": "3",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAlignLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "10",
                    "x2": "3",
                    "y2": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "6",
                    "x2": "3",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "14",
                    "x2": "3",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "18",
                    "x2": "3",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAlignRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "10",
                    "x2": "7",
                    "y2": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "6",
                    "x2": "3",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "14",
                    "x2": "3",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "18",
                    "x2": "7",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAnchor(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "5",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "22",
                    "x2": "12",
                    "y2": "8"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M5 12H2a10 10 0 0 0 20 0h-3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAperture(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14.31",
                    "y1": "8",
                    "x2": "20.05",
                    "y2": "17.94"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9.69",
                    "y1": "8",
                    "x2": "21.17",
                    "y2": "8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "7.38",
                    "y1": "12",
                    "x2": "13.12",
                    "y2": "2.06"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9.69",
                    "y1": "16",
                    "x2": "3.95",
                    "y2": "6.06"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14.31",
                    "y1": "16",
                    "x2": "2.83",
                    "y2": "16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16.62",
                    "y1": "12",
                    "x2": "10.88",
                    "y2": "21.94"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArchive(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "21 8 21 21 3 21 3 8"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "1",
                    "y": "3",
                    "width": "22",
                    "height": "5"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "10",
                    "y1": "12",
                    "x2": "14",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowDownCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "8 12 12 16 16 12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "8",
                    "x2": "12",
                    "y2": "16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowDownLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "7",
                    "x2": "7",
                    "y2": "17"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 17 7 17 7 7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowDownRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "7",
                    "y1": "7",
                    "x2": "17",
                    "y2": "17"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 7 17 17 7 17"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowDown(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "5",
                    "x2": "12",
                    "y2": "19"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "19 12 12 19 5 12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowLeftCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "12 8 8 12 12 16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "12",
                    "x2": "8",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "19",
                    "y1": "12",
                    "x2": "5",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "12 19 5 12 12 5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowRightCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "12 16 16 12 12 8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "12",
                    "x2": "16",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "5",
                    "y1": "12",
                    "x2": "19",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "12 5 19 12 12 19"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowUpCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "16 12 12 8 8 12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "16",
                    "x2": "12",
                    "y2": "8"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowUpLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "17",
                    "x2": "7",
                    "y2": "7"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "7 17 7 7 17 7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowUpRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "7",
                    "y1": "17",
                    "x2": "17",
                    "y2": "7"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "7 7 17 7 17 17"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiArrowUp(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "19",
                    "x2": "12",
                    "y2": "5"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "5 12 12 5 19 12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAtSign(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiAward(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "8",
                    "r": "7"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "8.21 13.89 7 23 12 20 17 23 15.79 13.88"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBarChart2(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "18",
                    "y1": "20",
                    "x2": "18",
                    "y2": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "20",
                    "x2": "12",
                    "y2": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "20",
                    "x2": "6",
                    "y2": "14"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBarChart(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "20",
                    "x2": "12",
                    "y2": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "18",
                    "y1": "20",
                    "x2": "18",
                    "y2": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "20",
                    "x2": "6",
                    "y2": "16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBatteryCharging(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "13",
                    "x2": "23",
                    "y2": "11"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "11 6 7 12 13 12 9 18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBattery(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "1",
                    "y": "6",
                    "width": "18",
                    "height": "12",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "13",
                    "x2": "23",
                    "y2": "11"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBellOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M13.73 21a2 2 0 0 1-3.46 0"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M18.63 13A17.89 17.89 0 0 1 18 8"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M18 8a6 6 0 0 0-9.33-5"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "1",
                    "x2": "23",
                    "y2": "23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBell(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M13.73 21a2 2 0 0 1-3.46 0"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBluetooth(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBold(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBookOpen(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBook(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBookmark(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBox(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "3.27 6.96 12 12.01 20.73 6.96"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "22.08",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiBriefcase(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "2",
                    "y": "7",
                    "width": "20",
                    "height": "14",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCalendar(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "4",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "2",
                    "x2": "16",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "2",
                    "x2": "8",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "10",
                    "x2": "21",
                    "y2": "10"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCameraOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "1",
                    "x2": "23",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCamera(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "13",
                    "r": "4"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCast(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "2",
                    "y1": "20",
                    "x2": "2.01",
                    "y2": "20"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCheckCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "22 4 12 14.01 9 11.01"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCheckSquare(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "9 11 12 14 22 4"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCheck(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "20 6 9 17 4 12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiChevronDown(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "6 9 12 15 18 9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiChevronLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "15 18 9 12 15 6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiChevronRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "9 18 15 12 9 6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiChevronUp(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "18 15 12 9 6 15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiChevronsDown(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "7 13 12 18 17 13"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "7 6 12 11 17 6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiChevronsLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "11 17 6 12 11 7"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "18 17 13 12 18 7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiChevronsRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "13 17 18 12 13 7"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "6 17 11 12 6 7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiChevronsUp(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 11 12 6 7 11"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 18 12 13 7 18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiChrome(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21.17",
                    "y1": "8",
                    "x2": "12",
                    "y2": "8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3.95",
                    "y1": "6.06",
                    "x2": "8.54",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "10.88",
                    "y1": "21.94",
                    "x2": "15.46",
                    "y2": "14"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiClipboard(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "8",
                    "y": "2",
                    "width": "8",
                    "height": "4",
                    "rx": "1",
                    "ry": "1"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiClock(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "12 6 12 12 16 14"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCloudDrizzle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "19",
                    "x2": "8",
                    "y2": "21"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "13",
                    "x2": "8",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "19",
                    "x2": "16",
                    "y2": "21"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "13",
                    "x2": "16",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "21",
                    "x2": "12",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "15",
                    "x2": "12",
                    "y2": "17"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCloudLightning(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "13 11 9 17 15 17 11 23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCloudOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "1",
                    "x2": "23",
                    "y2": "23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCloudRain(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "13",
                    "x2": "16",
                    "y2": "21"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "13",
                    "x2": "8",
                    "y2": "21"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "15",
                    "x2": "12",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCloudSnow(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "16",
                    "x2": "8.01",
                    "y2": "16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "20",
                    "x2": "8.01",
                    "y2": "20"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "18",
                    "x2": "12.01",
                    "y2": "18"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "22",
                    "x2": "12.01",
                    "y2": "22"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "16",
                    "x2": "16.01",
                    "y2": "16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "20",
                    "x2": "16.01",
                    "y2": "20"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCloud(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCode(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "16 18 22 12 16 6"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "8 6 2 12 8 18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCodepen(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "22",
                    "x2": "12",
                    "y2": "15.5"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "22 8.5 12 15.5 2 8.5"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "2 15.5 12 8.5 22 15.5"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "2",
                    "x2": "12",
                    "y2": "8.5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCodesandbox(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "7.5 4.21 12 6.81 16.5 4.21"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "7.5 19.79 7.5 14.6 3 12"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "21 12 16.5 14.6 16.5 19.79"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "3.27 6.96 12 12.01 20.73 6.96"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "22.08",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCoffee(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M18 8h1a4 4 0 0 1 0 8h-1"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "1",
                    "x2": "6",
                    "y2": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "10",
                    "y1": "1",
                    "x2": "10",
                    "y2": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14",
                    "y1": "1",
                    "x2": "14",
                    "y2": "4"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiColumns(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCommand(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCompass(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "polygon",
                "attr": {
                    "points": "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCopy(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "9",
                    "y": "9",
                    "width": "13",
                    "height": "13",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCornerDownLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "9 10 4 15 9 20"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20 4v7a4 4 0 0 1-4 4H4"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCornerDownRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "15 10 20 15 15 20"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M4 4v7a4 4 0 0 0 4 4h12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCornerLeftDown(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "14 15 9 20 4 15"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20 4h-7a4 4 0 0 0-4 4v12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCornerLeftUp(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "14 9 9 4 4 9"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20 20h-7a4 4 0 0 1-4-4V4"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCornerRightDown(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "10 15 15 20 20 15"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M4 4h7a4 4 0 0 1 4 4v12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCornerRightUp(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "10 9 15 4 20 9"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M4 20h7a4 4 0 0 0 4-4V4"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCornerUpLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "9 14 4 9 9 4"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20 20v-7a4 4 0 0 0-4-4H4"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCornerUpRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "15 14 20 9 15 4"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M4 20v-7a4 4 0 0 1 4-4h12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCpu(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "4",
                    "y": "4",
                    "width": "16",
                    "height": "16",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "9",
                    "y": "9",
                    "width": "6",
                    "height": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "1",
                    "x2": "9",
                    "y2": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "1",
                    "x2": "15",
                    "y2": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "20",
                    "x2": "9",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "20",
                    "x2": "15",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "20",
                    "y1": "9",
                    "x2": "23",
                    "y2": "9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "20",
                    "y1": "14",
                    "x2": "23",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "9",
                    "x2": "4",
                    "y2": "9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "14",
                    "x2": "4",
                    "y2": "14"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCreditCard(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "1",
                    "y": "4",
                    "width": "22",
                    "height": "16",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "10",
                    "x2": "23",
                    "y2": "10"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCrop(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M6.13 1L6 16a2 2 0 0 0 2 2h15"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M1 6.13L16 6a2 2 0 0 1 2 2v15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiCrosshair(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "22",
                    "y1": "12",
                    "x2": "18",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "12",
                    "x2": "2",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "6",
                    "x2": "12",
                    "y2": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "22",
                    "x2": "12",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDatabase(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "ellipse",
                "attr": {
                    "cx": "12",
                    "cy": "5",
                    "rx": "9",
                    "ry": "3"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDelete(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "18",
                    "y1": "9",
                    "x2": "12",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "9",
                    "x2": "18",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDisc(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDivideCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "12",
                    "x2": "16",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "16",
                    "x2": "12",
                    "y2": "16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "8",
                    "x2": "12",
                    "y2": "8"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDivideSquare(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "12",
                    "x2": "16",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "16",
                    "x2": "12",
                    "y2": "16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "8",
                    "x2": "12",
                    "y2": "8"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDivide(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "6",
                    "r": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "5",
                    "y1": "12",
                    "x2": "19",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "18",
                    "r": "2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDollarSign(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "1",
                    "x2": "12",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDownloadCloud(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "8 17 12 21 16 17"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "12",
                    "x2": "12",
                    "y2": "21"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDownload(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "7 10 12 15 17 10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "15",
                    "x2": "12",
                    "y2": "3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDribbble(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiDroplet(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiEdit2(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiEdit3(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M12 20h9"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiEdit(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiExternalLink(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "15 3 21 3 21 9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "10",
                    "y1": "14",
                    "x2": "21",
                    "y2": "3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiEyeOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "1",
                    "x2": "23",
                    "y2": "23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiEye(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFacebook(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFastForward(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "13 19 22 12 13 5 13 19"
                },
                "child": []
            },
            {
                "tag": "polygon",
                "attr": {
                    "points": "2 19 11 12 2 5 2 19"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFeather(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "8",
                    "x2": "2",
                    "y2": "22"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17.5",
                    "y1": "15",
                    "x2": "9",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFigma(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFileMinus(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "14 2 14 8 20 8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "15",
                    "x2": "15",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFilePlus(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "14 2 14 8 20 8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "18",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "15",
                    "x2": "15",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFileText(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "14 2 14 8 20 8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "13",
                    "x2": "8",
                    "y2": "13"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "17",
                    "x2": "8",
                    "y2": "17"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "10 9 9 9 8 9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFile(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "13 2 13 9 20 9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFilm(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "2",
                    "y": "2",
                    "width": "20",
                    "height": "20",
                    "rx": "2.18",
                    "ry": "2.18"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "7",
                    "y1": "2",
                    "x2": "7",
                    "y2": "22"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "2",
                    "x2": "17",
                    "y2": "22"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "2",
                    "y1": "12",
                    "x2": "22",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "2",
                    "y1": "7",
                    "x2": "7",
                    "y2": "7"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "2",
                    "y1": "17",
                    "x2": "7",
                    "y2": "17"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "17",
                    "x2": "22",
                    "y2": "17"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "7",
                    "x2": "22",
                    "y2": "7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFilter(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFlag(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4",
                    "y1": "22",
                    "x2": "4",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFolderMinus(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "14",
                    "x2": "15",
                    "y2": "14"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFolderPlus(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "11",
                    "x2": "12",
                    "y2": "17"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "14",
                    "x2": "15",
                    "y2": "14"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFolder(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFramer(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiFrown(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16 16s-1.5-2-4-2-4 2-4 2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "9",
                    "x2": "9.01",
                    "y2": "9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "9",
                    "x2": "15.01",
                    "y2": "9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiGift(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "20 12 20 22 4 22 4 12"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "2",
                    "y": "7",
                    "width": "20",
                    "height": "5"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "22",
                    "x2": "12",
                    "y2": "7"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiGitBranch(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "3",
                    "x2": "6",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "18",
                    "cy": "6",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "6",
                    "cy": "18",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M18 9a9 9 0 0 1-9 9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiGitCommit(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1.05",
                    "y1": "12",
                    "x2": "7",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17.01",
                    "y1": "12",
                    "x2": "22.96",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiGitMerge(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "18",
                    "cy": "18",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "6",
                    "cy": "6",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M6 21V9a9 9 0 0 0 9 9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiGitPullRequest(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "18",
                    "cy": "18",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "6",
                    "cy": "6",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M13 6h3a2 2 0 0 1 2 2v7"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "9",
                    "x2": "6",
                    "y2": "21"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiGithub(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiGitlab(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiGlobe(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "2",
                    "y1": "12",
                    "x2": "22",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiGrid(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "7",
                    "height": "7"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "14",
                    "y": "3",
                    "width": "7",
                    "height": "7"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "14",
                    "y": "14",
                    "width": "7",
                    "height": "7"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "14",
                    "width": "7",
                    "height": "7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiHardDrive(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "22",
                    "y1": "12",
                    "x2": "2",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "16",
                    "x2": "6.01",
                    "y2": "16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "10",
                    "y1": "16",
                    "x2": "10.01",
                    "y2": "16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiHash(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "4",
                    "y1": "9",
                    "x2": "20",
                    "y2": "9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4",
                    "y1": "15",
                    "x2": "20",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "10",
                    "y1": "3",
                    "x2": "8",
                    "y2": "21"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "3",
                    "x2": "14",
                    "y2": "21"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiHeadphones(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M3 18v-6a9 9 0 0 1 18 0v6"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiHeart(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiHelpCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "17",
                    "x2": "12.01",
                    "y2": "17"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiHexagon(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiHome(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "9 22 9 12 15 12 15 22"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiImage(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "8.5",
                    "cy": "8.5",
                    "r": "1.5"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "21 15 16 10 5 21"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiInbox(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "22 12 16 12 14 15 10 15 8 12 2 12"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiInfo(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "16",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "8",
                    "x2": "12.01",
                    "y2": "8"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiInstagram(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "2",
                    "y": "2",
                    "width": "20",
                    "height": "20",
                    "rx": "5",
                    "ry": "5"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17.5",
                    "y1": "6.5",
                    "x2": "17.51",
                    "y2": "6.5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiItalic(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "19",
                    "y1": "4",
                    "x2": "10",
                    "y2": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14",
                    "y1": "20",
                    "x2": "5",
                    "y2": "20"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "4",
                    "x2": "9",
                    "y2": "20"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiKey(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLayers(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "12 2 2 7 12 12 22 7 12 2"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "2 17 12 22 22 17"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "2 12 12 17 22 12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLayout(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "9",
                    "x2": "21",
                    "y2": "9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "21",
                    "x2": "9",
                    "y2": "9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLifeBuoy(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4.93",
                    "y1": "4.93",
                    "x2": "9.17",
                    "y2": "9.17"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14.83",
                    "y1": "14.83",
                    "x2": "19.07",
                    "y2": "19.07"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14.83",
                    "y1": "9.17",
                    "x2": "19.07",
                    "y2": "4.93"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14.83",
                    "y1": "9.17",
                    "x2": "18.36",
                    "y2": "5.64"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4.93",
                    "y1": "19.07",
                    "x2": "9.17",
                    "y2": "14.83"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLink2(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "12",
                    "x2": "16",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLink(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLinkedin(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "2",
                    "y": "9",
                    "width": "4",
                    "height": "12"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "4",
                    "cy": "4",
                    "r": "2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiList(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "6",
                    "x2": "21",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "12",
                    "x2": "21",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "18",
                    "x2": "21",
                    "y2": "18"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "6",
                    "x2": "3.01",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "12",
                    "x2": "3.01",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "18",
                    "x2": "3.01",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLoader(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "2",
                    "x2": "12",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "18",
                    "x2": "12",
                    "y2": "22"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4.93",
                    "y1": "4.93",
                    "x2": "7.76",
                    "y2": "7.76"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16.24",
                    "y1": "16.24",
                    "x2": "19.07",
                    "y2": "19.07"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "2",
                    "y1": "12",
                    "x2": "6",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "18",
                    "y1": "12",
                    "x2": "22",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4.93",
                    "y1": "19.07",
                    "x2": "7.76",
                    "y2": "16.24"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16.24",
                    "y1": "7.76",
                    "x2": "19.07",
                    "y2": "4.93"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLock(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "11",
                    "width": "18",
                    "height": "11",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M7 11V7a5 5 0 0 1 10 0v4"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLogIn(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "10 17 15 12 10 7"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "12",
                    "x2": "3",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiLogOut(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "16 17 21 12 16 7"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "12",
                    "x2": "9",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMail(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "22,6 12,13 2,6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMapPin(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "10",
                    "r": "3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMap(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "2",
                    "x2": "8",
                    "y2": "18"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "6",
                    "x2": "16",
                    "y2": "22"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMaximize2(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "15 3 21 3 21 9"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "9 21 3 21 3 15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "3",
                    "x2": "14",
                    "y2": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "21",
                    "x2": "10",
                    "y2": "14"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMaximize(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMeh(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "15",
                    "x2": "16",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "9",
                    "x2": "9.01",
                    "y2": "9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "9",
                    "x2": "15.01",
                    "y2": "9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMenu(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "12",
                    "x2": "21",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "6",
                    "x2": "21",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "18",
                    "x2": "21",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMessageCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMessageSquare(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMicOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "1",
                    "x2": "23",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "19",
                    "x2": "12",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "23",
                    "x2": "16",
                    "y2": "23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMic(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M19 10v2a7 7 0 0 1-14 0v-2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "19",
                    "x2": "12",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "23",
                    "x2": "16",
                    "y2": "23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMinimize2(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "4 14 10 14 10 20"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "20 10 14 10 14 4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14",
                    "y1": "10",
                    "x2": "21",
                    "y2": "3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "21",
                    "x2": "10",
                    "y2": "14"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMinimize(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMinusCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "12",
                    "x2": "16",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMinusSquare(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "12",
                    "x2": "16",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMinus(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "5",
                    "y1": "12",
                    "x2": "19",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMonitor(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "2",
                    "y": "3",
                    "width": "20",
                    "height": "14",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "21",
                    "x2": "16",
                    "y2": "21"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "17",
                    "x2": "12",
                    "y2": "21"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMoon(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMoreHorizontal(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "1"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "19",
                    "cy": "12",
                    "r": "1"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "5",
                    "cy": "12",
                    "r": "1"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMoreVertical(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "1"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "5",
                    "r": "1"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "19",
                    "r": "1"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMousePointer(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M13 13l6 6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMove(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "5 9 2 12 5 15"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "9 5 12 2 15 5"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "15 19 12 22 9 19"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "19 9 22 12 19 15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "2",
                    "y1": "12",
                    "x2": "22",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "2",
                    "x2": "12",
                    "y2": "22"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiMusic(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M9 18V5l12-2v13"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "6",
                    "cy": "18",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "18",
                    "cy": "16",
                    "r": "3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiNavigation2(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "12 2 19 21 12 17 5 21 12 2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiNavigation(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "3 11 22 2 13 21 11 13 3 11"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiOctagon(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPackage(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "16.5",
                    "y1": "9.4",
                    "x2": "7.5",
                    "y2": "4.21"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "3.27 6.96 12 12.01 20.73 6.96"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "22.08",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPaperclip(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPauseCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "10",
                    "y1": "15",
                    "x2": "10",
                    "y2": "9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14",
                    "y1": "15",
                    "x2": "14",
                    "y2": "9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPause(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "6",
                    "y": "4",
                    "width": "4",
                    "height": "16"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "14",
                    "y": "4",
                    "width": "4",
                    "height": "16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPenTool(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M12 19l7-7 3 3-7 7-3-3z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M2 2l7.586 7.586"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "11",
                    "cy": "11",
                    "r": "2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPercent(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "19",
                    "y1": "5",
                    "x2": "5",
                    "y2": "19"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "6.5",
                    "cy": "6.5",
                    "r": "2.5"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "17.5",
                    "cy": "17.5",
                    "r": "2.5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPhoneCall(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPhoneForwarded(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "19 1 23 5 19 9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "5",
                    "x2": "23",
                    "y2": "5"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPhoneIncoming(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "16 2 16 8 22 8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "1",
                    "x2": "16",
                    "y2": "8"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPhoneMissed(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "1",
                    "x2": "17",
                    "y2": "7"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "1",
                    "x2": "23",
                    "y2": "7"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPhoneOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "1",
                    "x2": "1",
                    "y2": "23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPhoneOutgoing(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "23 7 23 1 17 1"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "16",
                    "y1": "8",
                    "x2": "23",
                    "y2": "1"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPhone(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPieChart(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21.21 15.89A10 10 0 1 1 8 2.83"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M22 12A10 10 0 0 0 12 2v10z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPlayCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "polygon",
                "attr": {
                    "points": "10 8 16 12 10 16 10 8"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPlay(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "5 3 19 12 5 21 5 3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPlusCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "8",
                    "x2": "12",
                    "y2": "16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "12",
                    "x2": "16",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPlusSquare(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "8",
                    "x2": "12",
                    "y2": "16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "12",
                    "x2": "16",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPlus(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "5",
                    "x2": "12",
                    "y2": "19"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "5",
                    "y1": "12",
                    "x2": "19",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPocket(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "8 10 12 14 16 10"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPower(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M18.36 6.64a9 9 0 1 1-12.73 0"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "2",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiPrinter(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "6 9 6 2 18 2 18 9"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "6",
                    "y": "14",
                    "width": "12",
                    "height": "8"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiRadio(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "2"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiRefreshCcw(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "1 4 1 10 7 10"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "23 20 23 14 17 14"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiRefreshCw(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "23 4 23 10 17 10"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "1 20 1 14 7 14"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiRepeat(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 1 21 5 17 9"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M3 11V9a4 4 0 0 1 4-4h14"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "7 23 3 19 7 15"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M21 13v2a4 4 0 0 1-4 4H3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiRewind(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "11 19 2 12 11 5 11 19"
                },
                "child": []
            },
            {
                "tag": "polygon",
                "attr": {
                    "points": "22 19 13 12 22 5 22 19"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiRotateCcw(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "1 4 1 10 7 10"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiRotateCw(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "23 4 23 10 17 10"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiRss(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M4 11a9 9 0 0 1 9 9"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M4 4a16 16 0 0 1 16 16"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "5",
                    "cy": "19",
                    "r": "1"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSave(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 21 17 13 7 13 7 21"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "7 3 7 8 15 8"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiScissors(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "6",
                    "cy": "6",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "6",
                    "cy": "18",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "20",
                    "y1": "4",
                    "x2": "8.12",
                    "y2": "15.88"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14.47",
                    "y1": "14.48",
                    "x2": "20",
                    "y2": "20"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8.12",
                    "y1": "8.12",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSearch(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "11",
                    "cy": "11",
                    "r": "8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "21",
                    "x2": "16.65",
                    "y2": "16.65"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSend(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "22",
                    "y1": "2",
                    "x2": "11",
                    "y2": "13"
                },
                "child": []
            },
            {
                "tag": "polygon",
                "attr": {
                    "points": "22 2 15 22 11 13 2 9 22 2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiServer(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "2",
                    "y": "2",
                    "width": "20",
                    "height": "8",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "2",
                    "y": "14",
                    "width": "20",
                    "height": "8",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "6",
                    "x2": "6.01",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "18",
                    "x2": "6.01",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSettings(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiShare2(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "18",
                    "cy": "5",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "6",
                    "cy": "12",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "18",
                    "cy": "19",
                    "r": "3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8.59",
                    "y1": "13.51",
                    "x2": "15.42",
                    "y2": "17.49"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15.41",
                    "y1": "6.51",
                    "x2": "8.59",
                    "y2": "10.49"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiShare(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "16 6 12 2 8 6"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "2",
                    "x2": "12",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiShieldOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "1",
                    "x2": "23",
                    "y2": "23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiShield(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiShoppingBag(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "3",
                    "y1": "6",
                    "x2": "21",
                    "y2": "6"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16 10a4 4 0 0 1-8 0"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiShoppingCart(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "9",
                    "cy": "21",
                    "r": "1"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "20",
                    "cy": "21",
                    "r": "1"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiShuffle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "16 3 21 3 21 8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4",
                    "y1": "20",
                    "x2": "21",
                    "y2": "3"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "21 16 21 21 16 21"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "15",
                    "x2": "21",
                    "y2": "21"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4",
                    "y1": "4",
                    "x2": "9",
                    "y2": "9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSidebar(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "3",
                    "x2": "9",
                    "y2": "21"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSkipBack(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "19 20 9 12 19 4 19 20"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "5",
                    "y1": "19",
                    "x2": "5",
                    "y2": "5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSkipForward(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "5 4 15 12 5 20 5 4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "19",
                    "y1": "5",
                    "x2": "19",
                    "y2": "19"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSlack(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSlash(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4.93",
                    "y1": "4.93",
                    "x2": "19.07",
                    "y2": "19.07"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSliders(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "4",
                    "y1": "21",
                    "x2": "4",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4",
                    "y1": "10",
                    "x2": "4",
                    "y2": "3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "21",
                    "x2": "12",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "8",
                    "x2": "12",
                    "y2": "3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "20",
                    "y1": "21",
                    "x2": "20",
                    "y2": "16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "20",
                    "y1": "12",
                    "x2": "20",
                    "y2": "3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "14",
                    "x2": "7",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "8",
                    "x2": "15",
                    "y2": "8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "16",
                    "x2": "23",
                    "y2": "16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSmartphone(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "5",
                    "y": "2",
                    "width": "14",
                    "height": "20",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "18",
                    "x2": "12.01",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSmile(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M8 14s1.5 2 4 2 4-2 4-2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "9",
                    "x2": "9.01",
                    "y2": "9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "9",
                    "x2": "15.01",
                    "y2": "9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSpeaker(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "4",
                    "y": "2",
                    "width": "16",
                    "height": "20",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "14",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "6",
                    "x2": "12.01",
                    "y2": "6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSquare(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiStar(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiStopCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "9",
                    "y": "9",
                    "width": "6",
                    "height": "6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSun(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "5"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "1",
                    "x2": "12",
                    "y2": "3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "21",
                    "x2": "12",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4.22",
                    "y1": "4.22",
                    "x2": "5.64",
                    "y2": "5.64"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "18.36",
                    "y1": "18.36",
                    "x2": "19.78",
                    "y2": "19.78"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "12",
                    "x2": "3",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "12",
                    "x2": "23",
                    "y2": "12"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4.22",
                    "y1": "19.78",
                    "x2": "5.64",
                    "y2": "18.36"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "18.36",
                    "y1": "5.64",
                    "x2": "19.78",
                    "y2": "4.22"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSunrise(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M17 18a5 5 0 0 0-10 0"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "2",
                    "x2": "12",
                    "y2": "9"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4.22",
                    "y1": "10.22",
                    "x2": "5.64",
                    "y2": "11.64"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "18",
                    "x2": "3",
                    "y2": "18"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "18",
                    "x2": "23",
                    "y2": "18"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "18.36",
                    "y1": "11.64",
                    "x2": "19.78",
                    "y2": "10.22"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "22",
                    "x2": "1",
                    "y2": "22"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "8 6 12 2 16 6"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiSunset(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M17 18a5 5 0 0 0-10 0"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "9",
                    "x2": "12",
                    "y2": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4.22",
                    "y1": "10.22",
                    "x2": "5.64",
                    "y2": "11.64"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "18",
                    "x2": "3",
                    "y2": "18"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "18",
                    "x2": "23",
                    "y2": "18"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "18.36",
                    "y1": "11.64",
                    "x2": "19.78",
                    "y2": "10.22"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "22",
                    "x2": "1",
                    "y2": "22"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "16 5 12 9 8 5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTable(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTablet(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "4",
                    "y": "2",
                    "width": "16",
                    "height": "20",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "18",
                    "x2": "12.01",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTag(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "7",
                    "y1": "7",
                    "x2": "7.01",
                    "y2": "7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTarget(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "6"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTerminal(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "4 17 10 11 4 5"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "19",
                    "x2": "20",
                    "y2": "19"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiThermometer(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiThumbsDown(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiThumbsUp(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiToggleLeft(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "1",
                    "y": "5",
                    "width": "22",
                    "height": "14",
                    "rx": "7",
                    "ry": "7"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "8",
                    "cy": "12",
                    "r": "3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiToggleRight(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "1",
                    "y": "5",
                    "width": "22",
                    "height": "14",
                    "rx": "7",
                    "ry": "7"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "16",
                    "cy": "12",
                    "r": "3"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTool(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTrash2(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "3 6 5 6 21 6"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "10",
                    "y1": "11",
                    "x2": "10",
                    "y2": "17"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "14",
                    "y1": "11",
                    "x2": "14",
                    "y2": "17"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTrash(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "3 6 5 6 21 6"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTrello(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "7",
                    "y": "7",
                    "width": "3",
                    "height": "9"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "14",
                    "y": "7",
                    "width": "3",
                    "height": "5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTrendingDown(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "23 18 13.5 8.5 8.5 13.5 1 6"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 18 23 18 23 12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTrendingUp(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "23 6 13.5 15.5 8.5 10.5 1 18"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 6 23 6 23 12"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTriangle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTruck(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "1",
                    "y": "3",
                    "width": "15",
                    "height": "13"
                },
                "child": []
            },
            {
                "tag": "polygon",
                "attr": {
                    "points": "16 8 20 8 23 11 23 16 16 16 16 8"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "5.5",
                    "cy": "18.5",
                    "r": "2.5"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "18.5",
                    "cy": "18.5",
                    "r": "2.5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTv(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "2",
                    "y": "7",
                    "width": "20",
                    "height": "15",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 2 12 7 7 2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTwitch(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiTwitter(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiType(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "4 7 4 4 20 4 20 7"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "20",
                    "x2": "15",
                    "y2": "20"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "4",
                    "x2": "12",
                    "y2": "20"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUmbrella(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUnderline(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "4",
                    "y1": "21",
                    "x2": "20",
                    "y2": "21"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUnlock(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "11",
                    "width": "18",
                    "height": "11",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M7 11V7a5 5 0 0 1 9.9-1"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUploadCloud(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "16 16 12 12 8 16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "12",
                    "x2": "12",
                    "y2": "21"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "16 16 12 12 8 16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUpload(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 8 12 3 7 8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "3",
                    "x2": "12",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUserCheck(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "8.5",
                    "cy": "7",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "17 11 19 13 23 9"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUserMinus(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "8.5",
                    "cy": "7",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "11",
                    "x2": "17",
                    "y2": "11"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUserPlus(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "8.5",
                    "cy": "7",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "20",
                    "y1": "8",
                    "x2": "20",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "11",
                    "x2": "17",
                    "y2": "11"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUserX(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "8.5",
                    "cy": "7",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "18",
                    "y1": "8",
                    "x2": "23",
                    "y2": "13"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "8",
                    "x2": "18",
                    "y2": "13"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUser(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "7",
                    "r": "4"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiUsers(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "9",
                    "cy": "7",
                    "r": "4"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M23 21v-2a4 4 0 0 0-3-3.87"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16 3.13a4 4 0 0 1 0 7.75"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiVideoOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "1",
                    "x2": "23",
                    "y2": "23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiVideo(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "23 7 16 12 23 17 23 7"
                },
                "child": []
            },
            {
                "tag": "rect",
                "attr": {
                    "x": "1",
                    "y": "5",
                    "width": "15",
                    "height": "14",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiVoicemail(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "5.5",
                    "cy": "11.5",
                    "r": "4.5"
                },
                "child": []
            },
            {
                "tag": "circle",
                "attr": {
                    "cx": "18.5",
                    "cy": "11.5",
                    "r": "4.5"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "5.5",
                    "y1": "16",
                    "x2": "18.5",
                    "y2": "16"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiVolume1(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M15.54 8.46a5 5 0 0 1 0 7.07"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiVolume2(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiVolumeX(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "23",
                    "y1": "9",
                    "x2": "17",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "17",
                    "y1": "9",
                    "x2": "23",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiVolume(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiWatch(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "7"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "12 9 12 12 13.5 13.5"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiWifiOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "1",
                    "x2": "23",
                    "y2": "23"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M16.72 11.06A10.94 10.94 0 0 1 19 12.55"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M5 12.55a10.94 10.94 0 0 1 5.17-2.39"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M10.71 5.05A16 16 0 0 1 22.58 9"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M8.53 16.11a6 6 0 0 1 6.95 0"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "20",
                    "x2": "12.01",
                    "y2": "20"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiWifi(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M5 12.55a11 11 0 0 1 14.08 0"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M1.42 9a16 16 0 0 1 21.16 0"
                },
                "child": []
            },
            {
                "tag": "path",
                "attr": {
                    "d": "M8.53 16.11a6 6 0 0 1 6.95 0"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "12",
                    "y1": "20",
                    "x2": "12.01",
                    "y2": "20"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiWind(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiXCircle(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "12",
                    "cy": "12",
                    "r": "10"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "9",
                    "x2": "9",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "9",
                    "x2": "15",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiXOctagon(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "9",
                    "x2": "9",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "9",
                    "x2": "15",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiXSquare(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "rect",
                "attr": {
                    "x": "3",
                    "y": "3",
                    "width": "18",
                    "height": "18",
                    "rx": "2",
                    "ry": "2"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "9",
                    "y1": "9",
                    "x2": "15",
                    "y2": "15"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "15",
                    "y1": "9",
                    "x2": "9",
                    "y2": "15"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiX(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "line",
                "attr": {
                    "x1": "18",
                    "y1": "6",
                    "x2": "6",
                    "y2": "18"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "6",
                    "y1": "6",
                    "x2": "18",
                    "y2": "18"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiYoutube(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "path",
                "attr": {
                    "d": "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                },
                "child": []
            },
            {
                "tag": "polygon",
                "attr": {
                    "points": "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiZapOff(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polyline",
                "attr": {
                    "points": "12.41 6.75 13 2 10.57 4.92"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "18.57 12.91 21 10 15.66 10"
                },
                "child": []
            },
            {
                "tag": "polyline",
                "attr": {
                    "points": "8 8 3 14 12 14 11 22 16 16"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "1",
                    "y1": "1",
                    "x2": "23",
                    "y2": "23"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiZap(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "polygon",
                "attr": {
                    "points": "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiZoomIn(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "11",
                    "cy": "11",
                    "r": "8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "21",
                    "x2": "16.65",
                    "y2": "16.65"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "11",
                    "y1": "8",
                    "x2": "11",
                    "y2": "14"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "11",
                    "x2": "14",
                    "y2": "11"
                },
                "child": []
            }
        ]
    })(props);
}
;
function FiZoomOut(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$react$2d$icons$2f$lib$2f$iconBase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GenIcon"])({
        "tag": "svg",
        "attr": {
            "viewBox": "0 0 24 24",
            "fill": "none",
            "stroke": "currentColor",
            "strokeWidth": "2",
            "strokeLinecap": "round",
            "strokeLinejoin": "round"
        },
        "child": [
            {
                "tag": "circle",
                "attr": {
                    "cx": "11",
                    "cy": "11",
                    "r": "8"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "21",
                    "y1": "21",
                    "x2": "16.65",
                    "y2": "16.65"
                },
                "child": []
            },
            {
                "tag": "line",
                "attr": {
                    "x1": "8",
                    "y1": "11",
                    "x2": "14",
                    "y2": "11"
                },
                "child": []
            }
        ]
    })(props);
}
;
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/build/templates/app-page.js?page=/page { GLOBAL_ERROR_MODULE => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_0 => \"[project]/OneDrive/Desktop/churn-rate/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_1 => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_2 => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_3 => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_4 => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_5 => \"[project]/OneDrive/Desktop/churn-rate/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)\" } [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__next_app__",
    ()=>__next_app__,
    "handler",
    ()=>handler,
    "routeModule",
    ()=>routeModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$instrumentation$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/instrumentation/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/request-meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/trace/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$interop$2d$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/interop-default.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$strip$2d$flight$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/strip-flight-headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/base-http/node.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$experimental$2f$ppr$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/experimental/ppr.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/request/fallback-params.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$manifests$2d$singleton$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/manifests-singleton.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$streaming$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/streaming-metadata.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$server$2d$action$2d$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/lib/server-action-request-meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/client/components/app-router-headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/is-bot.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/response-cache/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/response-cache/types.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/lib/fallback.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/render-result.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$stream$2d$utils$2f$encoded$2d$tags$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/stream-utils/encoded-tags.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/send-payload.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$size$2d$limit$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/size-limit.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/client/components/redirect-status-code.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/lib/scheduler.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)");
const __TURBOPACK__layout__$23$0__ = ()=>__turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__not$2d$found__$23$1__ = ()=>__turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__forbidden__$23$2__ = ()=>__turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__unauthorized__$23$3__ = ()=>__turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__global$2d$error__$23$4__ = ()=>__turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__page__$23$5__ = ()=>__turbopack_context__.r("[project]/OneDrive/Desktop/churn-rate/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = [
    "",
    {
        "children": [
            "__PAGE__",
            {},
            {
                metadata: {},
                "page": [
                    __TURBOPACK__page__$23$5__,
                    "[project]/OneDrive/Desktop/churn-rate/app/page.tsx"
                ]
            }
        ]
    },
    {
        "layout": [
            __TURBOPACK__layout__$23$0__,
            "[project]/OneDrive/Desktop/churn-rate/app/layout.tsx"
        ],
        "not-found": [
            __TURBOPACK__not$2d$found__$23$1__,
            "[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/not-found.js"
        ],
        "forbidden": [
            __TURBOPACK__forbidden__$23$2__,
            "[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/forbidden.js"
        ],
        "unauthorized": [
            __TURBOPACK__unauthorized__$23$3__,
            "[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/unauthorized.js"
        ],
        "global-error": [
            __TURBOPACK__global$2d$error__$23$4__,
            "[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js"
        ]
    }
];
;
;
const __next_app_require__ = __turbopack_context__.r.bind(__turbopack_context__);
const __next_app_load_chunk__ = __turbopack_context__.l.bind(__turbopack_context__);
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};
;
;
;
;
;
;
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppPageRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RouteKind"].APP_PAGE,
        page: "/page",
        pathname: "/",
        // The following aren't used in production.
        bundlePath: '',
        filename: '',
        appPaths: []
    },
    userland: {
        loaderTree: tree
    },
    distDir: ("TURBOPACK compile-time value", ".next\\dev") || '',
    relativeProjectDir: ("TURBOPACK compile-time value", "") || ''
});
async function handler(req, res, ctx) {
    var _this;
    if (routeModule.isDev) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addRequestMeta"])(req, 'devRequestTimingInternalsEnd', process.hrtime.bigint());
    }
    const isMinimalMode = Boolean(("TURBOPACK compile-time value", false) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'minimalMode'));
    let srcPage = "/page";
    // turbopack doesn't normalize `/index` in the page name
    // so we need to to process dynamic routes properly
    // TODO: fix turbopack providing differing value from webpack
    if ("TURBOPACK compile-time truthy", 1) {
        srcPage = srcPage.replace(/\/index$/, '') || '/';
    } else if (srcPage === '/index') {
        // we always normalize /index specifically
        srcPage = '/';
    }
    const multiZoneDraftMode = ("TURBOPACK compile-time value", false);
    const prepareResult = await routeModule.prepare(req, res, {
        srcPage,
        multiZoneDraftMode
    });
    if (!prepareResult) {
        res.statusCode = 400;
        res.end('Bad Request');
        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());
        return null;
    }
    const { buildId, query, params, pageIsDynamic, buildManifest, nextFontManifest, reactLoadableManifest, serverActionsManifest, clientReferenceManifest, subresourceIntegrityManifest, prerenderManifest, isDraftMode, resolvedPathname, revalidateOnlyGenerated, routerServerContext, nextConfig, parsedUrl, interceptionRoutePatterns, deploymentId } = prepareResult;
    const normalizedSrcPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAppPath"])(srcPage);
    let { isOnDemandRevalidate } = prepareResult;
    // We use the resolvedPathname instead of the parsedUrl.pathname because it
    // is not rewritten as resolvedPathname is. This will ensure that the correct
    // prerender info is used instead of using the original pathname as the
    // source. If however PPR is enabled and cacheComponents is disabled, we
    // treat the pathname as dynamic. Currently, there's a bug in the PPR
    // implementation that incorrectly leaves %%drp placeholders in the output of
    // parallel routes. This is addressed with cacheComponents.
    const prerenderInfo = nextConfig.experimental.ppr && !nextConfig.cacheComponents && (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isInterceptionRouteAppPath"])(resolvedPathname) ? null : routeModule.match(resolvedPathname, prerenderManifest);
    const isPrerendered = !!prerenderManifest.routes[resolvedPathname];
    const userAgent = req.headers['user-agent'] || '';
    const botType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getBotType"])(userAgent);
    const isHtmlBot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$streaming$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isHtmlBotRequest"])(req);
    /**
   * If true, this indicates that the request being made is for an app
   * prefetch request.
   */ const isPrefetchRSCRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'isPrefetchRSCRequest') ?? req.headers[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_ROUTER_PREFETCH_HEADER"]] === '1' // exclude runtime prefetches, which use '2'
    ;
    // NOTE: Don't delete headers[RSC] yet, it still needs to be used in renderToHTML later
    const isRSCRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'isRSCRequest') ?? Boolean(req.headers[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RSC_HEADER"]]);
    const isPossibleServerAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$server$2d$action$2d$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getIsPossibleServerAction"])(req);
    /**
   * If the route being rendered is an app page, and the ppr feature has been
   * enabled, then the given route _could_ support PPR.
   */ const couldSupportPPR = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$experimental$2f$ppr$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkIsAppPPREnabled"])(nextConfig.experimental.ppr);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'postponed') && couldSupportPPR && req.headers[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_RESUME_HEADER"]] === '1' && req.method === 'POST') {
        // Decode the postponed state from the request body, it will come as
        // an array of buffers, so collect them and then concat them to form
        // the string.
        const body = [];
        for await (const chunk of req){
            body.push(chunk);
        }
        const postponed = Buffer.concat(body).toString('utf8');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addRequestMeta"])(req, 'postponed', postponed);
    }
    // When enabled, this will allow the use of the `?__nextppronly` query to
    // enable debugging of the static shell.
    const hasDebugStaticShellQuery = ("TURBOPACK compile-time value", false) === '1' && typeof query.__nextppronly !== 'undefined' && couldSupportPPR;
    // When enabled, this will allow the use of the `?__nextppronly` query
    // to enable debugging of the fallback shell.
    const hasDebugFallbackShellQuery = hasDebugStaticShellQuery && query.__nextppronly === 'fallback';
    // This page supports PPR if it is marked as being `PARTIALLY_STATIC` in the
    // prerender manifest and this is an app page.
    const isRoutePPREnabled = couldSupportPPR && (((_this = prerenderManifest.routes[normalizedSrcPage] ?? prerenderManifest.dynamicRoutes[normalizedSrcPage]) == null ? void 0 : _this.renderingMode) === 'PARTIALLY_STATIC' || // Ideally we'd want to check the appConfig to see if this page has PPR
    // enabled or not, but that would require plumbing the appConfig through
    // to the server during development. We assume that the page supports it
    // but only during development.
    hasDebugStaticShellQuery && (routeModule.isDev === true || (routerServerContext == null ? void 0 : routerServerContext.experimentalTestProxy) === true));
    const isDebugStaticShell = hasDebugStaticShellQuery && isRoutePPREnabled;
    // We should enable debugging dynamic accesses when the static shell
    // debugging has been enabled and we're also in development mode.
    const isDebugDynamicAccesses = isDebugStaticShell && routeModule.isDev === true;
    const isDebugFallbackShell = hasDebugFallbackShellQuery && isRoutePPREnabled;
    // If we're in minimal mode, then try to get the postponed information from
    // the request metadata. If available, use it for resuming the postponed
    // render.
    const minimalPostponed = isRoutePPREnabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'postponed') : undefined;
    // If PPR is enabled, and this is a RSC request (but not a prefetch), then
    // we can use this fact to only generate the flight data for the request
    // because we can't cache the HTML (as it's also dynamic).
    let isDynamicRSCRequest = isRoutePPREnabled && isRSCRequest && !isPrefetchRSCRequest;
    // During a PPR revalidation, the RSC request is not dynamic if we do not have the postponed data.
    // We only attach the postponed data during a resume. If there's no postponed data, then it must be a revalidation.
    // This is to ensure that we don't bypass the cache during a revalidation.
    if (isMinimalMode) {
        isDynamicRSCRequest = isDynamicRSCRequest && !!minimalPostponed;
    }
    // Need to read this before it's stripped by stripFlightHeaders. We don't
    // need to transfer it to the request meta because it's only read
    // within this function; the static segment data should have already been
    // generated, so we will always either return a static response or a 404.
    const segmentPrefetchHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'segmentPrefetchRSCRequest');
    // TODO: investigate existing bug with shouldServeStreamingMetadata always
    // being true for a revalidate due to modifying the base-server this.renderOpts
    // when fixing this to correct logic it causes hydration issue since we set
    // serveStreamingMetadata to true during export
    const serveStreamingMetadata = isHtmlBot && isRoutePPREnabled ? false : !userAgent ? true : (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$streaming$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["shouldServeStreamingMetadata"])(userAgent, nextConfig.htmlLimitedBots);
    const isSSG = Boolean((prerenderInfo || isPrerendered || prerenderManifest.routes[normalizedSrcPage]) && // If this is a html bot request and PPR is enabled, then we don't want
    // to serve a static response.
    !(isHtmlBot && isRoutePPREnabled));
    // When a page supports cacheComponents, we can support RDC for Navigations
    const supportsRDCForNavigations = isRoutePPREnabled && nextConfig.cacheComponents === true;
    // In development, we always want to generate dynamic HTML.
    const supportsDynamicResponse = // a data request, in which case we only produce static HTML.
    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports
    // dynamic HTML.
    !isSSG || // If this request has provided postponed data, it supports dynamic
    // HTML.
    typeof minimalPostponed === 'string' || // If this handler supports onCacheEntryV2, then we can only support
    // dynamic responses if it's a dynamic RSC request and not in minimal mode. If it
    // doesn't support it we must fallback to the default behavior.
    (supportsRDCForNavigations && (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'onCacheEntryV2') ? // RSC request, we'll pass the minimal postponed data to the render
    // which will trigger the `supportsDynamicResponse` to be true.
    isDynamicRSCRequest && !isMinimalMode : isDynamicRSCRequest);
    // When html bots request PPR page, perform the full dynamic rendering.
    const shouldWaitOnAllReady = isHtmlBot && isRoutePPREnabled;
    let ssgCacheKey = null;
    if (!isDraftMode && isSSG && !supportsDynamicResponse && !isPossibleServerAction && !minimalPostponed && !isDynamicRSCRequest) {
        ssgCacheKey = resolvedPathname;
    }
    // the staticPathKey differs from ssgCacheKey since
    // ssgCacheKey is null in dev since we're always in "dynamic"
    // mode in dev to bypass the cache, but we still need to honor
    // dynamicParams = false in dev mode
    let staticPathKey = ssgCacheKey;
    if (!staticPathKey && routeModule.isDev) {
        staticPathKey = resolvedPathname;
    }
    // If this is a request for an app path that should be statically generated
    // and we aren't in the edge runtime, strip the flight headers so it will
    // generate the static response.
    if (!routeModule.isDev && !isDraftMode && isSSG && isRSCRequest && !isDynamicRSCRequest) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$strip$2d$flight$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripFlightHeaders"])(req.headers);
    }
    const ComponentMod = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__,
        tree,
        GlobalError: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29$__["default"],
        handler,
        routeModule,
        __next_app__
    };
    // Before rendering (which initializes component tree modules), we have to
    // set the reference manifests to our global store so Server Action's
    // encryption util can access to them at the top level of the page module.
    if (serverActionsManifest && clientReferenceManifest) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$manifests$2d$singleton$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setManifestsSingleton"])({
            page: srcPage,
            clientReferenceManifest,
            serverActionsManifest
        });
    }
    const method = req.method || 'GET';
    const tracer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTracer"])();
    const activeSpan = tracer.getActiveScopeSpan();
    const render404 = async ()=>{
        // TODO: should route-module itself handle rendering the 404
        if (routerServerContext == null ? void 0 : routerServerContext.render404) {
            await routerServerContext.render404(req, res, parsedUrl, false);
        } else {
            res.end('This page could not be found');
        }
        return null;
    };
    try {
        const varyHeader = routeModule.getVaryHeader(resolvedPathname, interceptionRoutePatterns);
        res.setHeader('Vary', varyHeader);
        const invokeRouteModule = async (span, context)=>{
            const nextReq = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeNextRequest"](req);
            const nextRes = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeNextResponse"](res);
            return routeModule.render(nextReq, nextRes, context).finally(()=>{
                if (!span) return;
                span.setAttributes({
                    'http.status_code': res.statusCode,
                    'next.rsc': false
                });
                const rootSpanAttributes = tracer.getRootSpanAttributes();
                // We were unable to get attributes, probably OTEL is not enabled
                if (!rootSpanAttributes) {
                    return;
                }
                if (rootSpanAttributes.get('next.span_type') !== __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseServerSpan"].handleRequest) {
                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                    return;
                }
                const route = rootSpanAttributes.get('next.route');
                if (route) {
                    const name = `${method} ${route}`;
                    span.setAttributes({
                        'next.route': route,
                        'http.route': route,
                        'next.span_name': name
                    });
                    span.updateName(name);
                } else {
                    span.updateName(`${method} ${srcPage}`);
                }
            });
        };
        const incrementalCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'incrementalCache');
        const doRender = async ({ span, postponed, fallbackRouteParams, forceStaticRender })=>{
            const context = {
                query,
                params,
                page: normalizedSrcPage,
                sharedContext: {
                    buildId
                },
                serverComponentsHmrCache: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'serverComponentsHmrCache'),
                fallbackRouteParams,
                renderOpts: {
                    App: ()=>null,
                    Document: ()=>null,
                    pageConfig: {},
                    ComponentMod,
                    Component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$interop$2d$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interopDefault"])(ComponentMod),
                    params,
                    routeModule,
                    page: srcPage,
                    postponed,
                    shouldWaitOnAllReady,
                    serveStreamingMetadata,
                    supportsDynamicResponse: typeof postponed === 'string' || supportsDynamicResponse,
                    buildManifest,
                    nextFontManifest,
                    reactLoadableManifest,
                    subresourceIntegrityManifest,
                    setCacheStatus: routerServerContext == null ? void 0 : routerServerContext.setCacheStatus,
                    setIsrStatus: routerServerContext == null ? void 0 : routerServerContext.setIsrStatus,
                    setReactDebugChannel: routerServerContext == null ? void 0 : routerServerContext.setReactDebugChannel,
                    sendErrorsToBrowser: routerServerContext == null ? void 0 : routerServerContext.sendErrorsToBrowser,
                    dir: ("TURBOPACK compile-time truthy", 1) ? require('path').join(/* turbopackIgnore: true */ process.cwd(), routeModule.relativeProjectDir) : "TURBOPACK unreachable",
                    isDraftMode,
                    botType,
                    isOnDemandRevalidate,
                    isPossibleServerAction,
                    assetPrefix: nextConfig.assetPrefix,
                    nextConfigOutput: nextConfig.output,
                    crossOrigin: nextConfig.crossOrigin,
                    trailingSlash: nextConfig.trailingSlash,
                    images: nextConfig.images,
                    previewProps: prerenderManifest.preview,
                    deploymentId: deploymentId,
                    enableTainting: nextConfig.experimental.taint,
                    htmlLimitedBots: nextConfig.htmlLimitedBots,
                    reactMaxHeadersLength: nextConfig.reactMaxHeadersLength,
                    multiZoneDraftMode,
                    incrementalCache,
                    cacheLifeProfiles: nextConfig.cacheLife,
                    basePath: nextConfig.basePath,
                    serverActions: nextConfig.experimental.serverActions,
                    ...isDebugStaticShell || isDebugDynamicAccesses || isDebugFallbackShell ? {
                        nextExport: true,
                        supportsDynamicResponse: false,
                        isStaticGeneration: true,
                        isDebugDynamicAccesses: isDebugDynamicAccesses
                    } : {},
                    cacheComponents: Boolean(nextConfig.cacheComponents),
                    experimental: {
                        isRoutePPREnabled,
                        expireTime: nextConfig.expireTime,
                        staleTimes: nextConfig.experimental.staleTimes,
                        dynamicOnHover: Boolean(nextConfig.experimental.dynamicOnHover),
                        inlineCss: Boolean(nextConfig.experimental.inlineCss),
                        authInterrupts: Boolean(nextConfig.experimental.authInterrupts),
                        clientTraceMetadata: nextConfig.experimental.clientTraceMetadata || [],
                        clientParamParsingOrigins: nextConfig.experimental.clientParamParsingOrigins,
                        maxPostponedStateSizeBytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$size$2d$limit$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseMaxPostponedStateSize"])(nextConfig.experimental.maxPostponedStateSize)
                    },
                    waitUntil: ctx.waitUntil,
                    onClose: (cb)=>{
                        res.on('close', cb);
                    },
                    onAfterTaskError: ()=>{},
                    onInstrumentationRequestError: (error, _request, errorContext, silenceLog)=>routeModule.onRequestError(req, error, errorContext, silenceLog, routerServerContext),
                    err: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'invokeError'),
                    dev: routeModule.isDev
                }
            };
            if (isDebugStaticShell || isDebugDynamicAccesses) {
                context.renderOpts.nextExport = true;
                context.renderOpts.supportsDynamicResponse = false;
                context.renderOpts.isDebugDynamicAccesses = isDebugDynamicAccesses;
            }
            // When we're revalidating in the background, we should not allow dynamic
            // responses.
            if (forceStaticRender) {
                context.renderOpts.supportsDynamicResponse = false;
            }
            const result = await invokeRouteModule(span, context);
            const { metadata } = result;
            const { cacheControl, headers = {}, fetchTags: cacheTags, fetchMetrics } = metadata;
            if (cacheTags) {
                headers[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"]] = cacheTags;
            }
            // Pull any fetch metrics from the render onto the request.
            ;
            req.fetchMetrics = fetchMetrics;
            // we don't throw static to dynamic errors in dev as isSSG
            // is a best guess in dev since we don't have the prerender pass
            // to know whether the path is actually static or not
            if (isSSG && (cacheControl == null ? void 0 : cacheControl.revalidate) === 0 && !routeModule.isDev && !isRoutePPREnabled) {
                const staticBailoutInfo = metadata.staticBailoutInfo;
                const err = Object.defineProperty(new Error(`Page changed from static to dynamic at runtime ${resolvedPathname}${(staticBailoutInfo == null ? void 0 : staticBailoutInfo.description) ? `, reason: ${staticBailoutInfo.description}` : ``}` + `\nsee more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`), "__NEXT_ERROR_CODE", {
                    value: "E132",
                    enumerable: false,
                    configurable: true
                });
                if (staticBailoutInfo == null ? void 0 : staticBailoutInfo.stack) {
                    const stack = staticBailoutInfo.stack;
                    err.stack = err.message + stack.substring(stack.indexOf('\n'));
                }
                throw err;
            }
            return {
                value: {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE,
                    html: result,
                    headers,
                    rscData: metadata.flightData,
                    postponed: metadata.postponed,
                    status: metadata.statusCode,
                    segmentData: metadata.segmentData
                },
                cacheControl
            };
        };
        const responseGenerator = async ({ hasResolved, previousCacheEntry: previousIncrementalCacheEntry, isRevalidating, span, forceStaticRender = false })=>{
            const isProduction = routeModule.isDev === false;
            const didRespond = hasResolved || res.writableEnded;
            // skip on-demand revalidate if cache is not present and
            // revalidate-if-generated is set
            if (isOnDemandRevalidate && revalidateOnlyGenerated && !previousIncrementalCacheEntry && !isMinimalMode) {
                if (routerServerContext == null ? void 0 : routerServerContext.render404) {
                    await routerServerContext.render404(req, res);
                } else {
                    res.statusCode = 404;
                    res.end('This page could not be found');
                }
                return null;
            }
            let fallbackMode;
            if (prerenderInfo) {
                fallbackMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseFallbackField"])(prerenderInfo.fallback);
            }
            // When serving a HTML bot request, we want to serve a blocking render and
            // not the prerendered page. This ensures that the correct content is served
            // to the bot in the head.
            if (fallbackMode === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].PRERENDER && (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isBot"])(userAgent)) {
                if (!isRoutePPREnabled || isHtmlBot) {
                    fallbackMode = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].BLOCKING_STATIC_RENDER;
                }
            }
            if ((previousIncrementalCacheEntry == null ? void 0 : previousIncrementalCacheEntry.isStale) === -1) {
                isOnDemandRevalidate = true;
            }
            // TODO: adapt for PPR
            // only allow on-demand revalidate for fallback: true/blocking
            // or for prerendered fallback: false paths
            if (isOnDemandRevalidate && (fallbackMode !== __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].NOT_FOUND || previousIncrementalCacheEntry)) {
                fallbackMode = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].BLOCKING_STATIC_RENDER;
            }
            if (!isMinimalMode && fallbackMode !== __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].BLOCKING_STATIC_RENDER && staticPathKey && !didRespond && !isDraftMode && pageIsDynamic && (isProduction || !isPrerendered)) {
                // if the page has dynamicParams: false and this pathname wasn't
                // prerendered trigger the no fallback handling
                if (// getStaticPaths.
                (isProduction || prerenderInfo) && // When fallback isn't present, abort this render so we 404
                fallbackMode === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].NOT_FOUND) {
                    if (nextConfig.experimental.adapterPath) {
                        return await render404();
                    }
                    throw new __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js$2c$__cjs$29$__["NoFallbackError"]();
                }
                // When cacheComponents is enabled, we can use the fallback
                // response if the request is not a dynamic RSC request because the
                // RSC data when this feature flag is enabled does not contain any
                // param references. Without this feature flag enabled, the RSC data
                // contains param references, and therefore we can't use the fallback.
                if (isRoutePPREnabled && (nextConfig.cacheComponents ? !isDynamicRSCRequest : !isRSCRequest)) {
                    const cacheKey = isProduction && typeof (prerenderInfo == null ? void 0 : prerenderInfo.fallback) === 'string' ? prerenderInfo.fallback : normalizedSrcPage;
                    const fallbackRouteParams = // can use the manifest fallback route params.
                    isProduction && (prerenderInfo == null ? void 0 : prerenderInfo.fallbackRouteParams) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createOpaqueFallbackRouteParams"])(prerenderInfo.fallbackRouteParams) : isDebugFallbackShell ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFallbackRouteParams"])(normalizedSrcPage, routeModule) : null;
                    // We use the response cache here to handle the revalidation and
                    // management of the fallback shell.
                    const fallbackResponse = await routeModule.handleResponse({
                        cacheKey,
                        req,
                        nextConfig,
                        routeKind: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RouteKind"].APP_PAGE,
                        isFallback: true,
                        prerenderManifest,
                        isRoutePPREnabled,
                        responseGenerator: async ()=>doRender({
                                span,
                                // We pass `undefined` as rendering a fallback isn't resumed
                                // here.
                                postponed: undefined,
                                fallbackRouteParams,
                                forceStaticRender: false
                            }),
                        waitUntil: ctx.waitUntil,
                        isMinimalMode
                    });
                    // If the fallback response was set to null, then we should return null.
                    if (fallbackResponse === null) return null;
                    // Otherwise, if we did get a fallback response, we should return it.
                    if (fallbackResponse) {
                        // Remove the cache control from the response to prevent it from being
                        // used in the surrounding cache.
                        delete fallbackResponse.cacheControl;
                        return fallbackResponse;
                    }
                }
            }
            // Only requests that aren't revalidating can be resumed. If we have the
            // minimal postponed data, then we should resume the render with it.
            let postponed = !isOnDemandRevalidate && !isRevalidating && minimalPostponed ? minimalPostponed : undefined;
            // If this is a dynamic RSC request, we should use the postponed data from
            // the static render (if available). This ensures that we can utilize the
            // resume data cache (RDC) from the static render to ensure that the data
            // is consistent between the static and dynamic renders.
            if (supportsRDCForNavigations && ("TURBOPACK compile-time value", "nodejs") !== 'edge' && !isMinimalMode && incrementalCache && isDynamicRSCRequest && // We don't typically trigger an on-demand revalidation for dynamic RSC
            // requests, as we're typically revalidating the page in the background
            // instead. However, if the cache entry is stale, we should trigger a
            // background revalidation on dynamic RSC requests. This prevents us
            // from entering an infinite loop of revalidations.
            !forceStaticRender) {
                const incrementalCacheEntry = await incrementalCache.get(resolvedPathname, {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IncrementalCacheKind"].APP_PAGE,
                    isRoutePPREnabled: true,
                    isFallback: false
                });
                // If the cache entry is found, we should use the postponed data from
                // the cache.
                if (incrementalCacheEntry && incrementalCacheEntry.value && incrementalCacheEntry.value.kind === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE) {
                    // CRITICAL: we're assigning the postponed data from the cache entry
                    // here as we're using the RDC to resume the render.
                    postponed = incrementalCacheEntry.value.postponed;
                    // If the cache entry is stale, we should trigger a background
                    // revalidation so that subsequent requests will get a fresh response.
                    if (incrementalCacheEntry && // We want to trigger this flow if the cache entry is stale and if
                    // the requested revalidation flow is either foreground or
                    // background.
                    (incrementalCacheEntry.isStale === -1 || incrementalCacheEntry.isStale === true)) {
                        // We want to schedule this on the next tick to ensure that the
                        // render is not blocked on it.
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["scheduleOnNextTick"])(async ()=>{
                            const responseCache = routeModule.getResponseCache(req);
                            try {
                                await responseCache.revalidate(resolvedPathname, incrementalCache, isRoutePPREnabled, false, (c)=>responseGenerator({
                                        ...c,
                                        // CRITICAL: we need to set this to true as we're
                                        // revalidating in the background and typically this dynamic
                                        // RSC request is not treated as static.
                                        forceStaticRender: true
                                    }), // previous cache entry here (which is stale) will switch on
                                // isOnDemandRevalidate and break the prerendering.
                                null, hasResolved, ctx.waitUntil);
                            } catch (err) {
                                console.error('Error revalidating the page in the background', err);
                            }
                        });
                    }
                }
            }
            // When we're in minimal mode, if we're trying to debug the static shell,
            // we should just return nothing instead of resuming the dynamic render.
            if ((isDebugStaticShell || isDebugDynamicAccesses) && typeof postponed !== 'undefined') {
                return {
                    cacheControl: {
                        revalidate: 1,
                        expire: undefined
                    },
                    value: {
                        kind: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].PAGES,
                        html: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].EMPTY,
                        pageData: {},
                        headers: undefined,
                        status: undefined
                    }
                };
            }
            const fallbackRouteParams = // can use the manifest fallback route params if we need to render the
            // fallback shell.
            isProduction && (prerenderInfo == null ? void 0 : prerenderInfo.fallbackRouteParams) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'renderFallbackShell') ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createOpaqueFallbackRouteParams"])(prerenderInfo.fallbackRouteParams) : isDebugFallbackShell ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFallbackRouteParams"])(normalizedSrcPage, routeModule) : null;
            // Perform the render.
            return doRender({
                span,
                postponed,
                fallbackRouteParams,
                forceStaticRender
            });
        };
        const handleResponse = async (span)=>{
            var _cacheEntry_value, _cachedData_headers;
            const cacheEntry = await routeModule.handleResponse({
                cacheKey: ssgCacheKey,
                responseGenerator: (c)=>responseGenerator({
                        span,
                        ...c
                    }),
                routeKind: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RouteKind"].APP_PAGE,
                isOnDemandRevalidate,
                isRoutePPREnabled,
                req,
                nextConfig,
                prerenderManifest,
                waitUntil: ctx.waitUntil,
                isMinimalMode
            });
            if (isDraftMode) {
                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
            }
            // In dev, we should not cache pages for any reason.
            if (routeModule.isDev) {
                res.setHeader('Cache-Control', 'no-store, must-revalidate');
            }
            if (!cacheEntry) {
                if (ssgCacheKey) {
                    // A cache entry might not be generated if a response is written
                    // in `getInitialProps` or `getServerSideProps`, but those shouldn't
                    // have a cache key. If we do have a cache key but we don't end up
                    // with a cache entry, then either Next.js or the application has a
                    // bug that needs fixing.
                    throw Object.defineProperty(new Error('invariant: cache entry required but not generated'), "__NEXT_ERROR_CODE", {
                        value: "E62",
                        enumerable: false,
                        configurable: true
                    });
                }
                return null;
            }
            if (((_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE) {
                var _cacheEntry_value1;
                throw Object.defineProperty(new Error(`Invariant app-page handler received invalid cache entry ${(_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), "__NEXT_ERROR_CODE", {
                    value: "E707",
                    enumerable: false,
                    configurable: true
                });
            }
            const didPostpone = typeof cacheEntry.value.postponed === 'string';
            if (isSSG && // We don't want to send a cache header for requests that contain dynamic
            // data. If this is a Dynamic RSC request or wasn't a Prefetch RSC
            // request, then we should set the cache header.
            !isDynamicRSCRequest && (!didPostpone || isPrefetchRSCRequest)) {
                if (!isMinimalMode) {
                    // set x-nextjs-cache header to match the header
                    // we set for the image-optimizer
                    res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');
                }
                // Set a header used by the client router to signal the response is static
                // and should respect the `static` cache staleTime value.
                res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_IS_PRERENDER_HEADER"], '1');
            }
            const { value: cachedData } = cacheEntry;
            // Coerce the cache control parameter from the render.
            let cacheControl;
            // If this is a resume request in minimal mode it is streamed with dynamic
            // content and should not be cached.
            if (minimalPostponed) {
                cacheControl = {
                    revalidate: 0,
                    expire: undefined
                };
            } else if (isDynamicRSCRequest) {
                cacheControl = {
                    revalidate: 0,
                    expire: undefined
                };
            } else if (!routeModule.isDev) {
                // If this is a preview mode request, we shouldn't cache it
                if (isDraftMode) {
                    cacheControl = {
                        revalidate: 0,
                        expire: undefined
                    };
                } else if (!isSSG) {
                    if (!res.getHeader('Cache-Control')) {
                        cacheControl = {
                            revalidate: 0,
                            expire: undefined
                        };
                    }
                } else if (cacheEntry.cacheControl) {
                    // If the cache entry has a cache control with a revalidate value that's
                    // a number, use it.
                    if (typeof cacheEntry.cacheControl.revalidate === 'number') {
                        var _cacheEntry_cacheControl;
                        if (cacheEntry.cacheControl.revalidate < 1) {
                            throw Object.defineProperty(new Error(`Invalid revalidate configuration provided: ${cacheEntry.cacheControl.revalidate} < 1`), "__NEXT_ERROR_CODE", {
                                value: "E22",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        cacheControl = {
                            revalidate: cacheEntry.cacheControl.revalidate,
                            expire: ((_cacheEntry_cacheControl = cacheEntry.cacheControl) == null ? void 0 : _cacheEntry_cacheControl.expire) ?? nextConfig.expireTime
                        };
                    } else {
                        cacheControl = {
                            revalidate: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CACHE_ONE_YEAR"],
                            expire: undefined
                        };
                    }
                }
            }
            cacheEntry.cacheControl = cacheControl;
            if (typeof segmentPrefetchHeader === 'string' && (cachedData == null ? void 0 : cachedData.kind) === __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE && cachedData.segmentData) {
                var _cachedData_headers1;
                // This is a prefetch request issued by the client Segment Cache. These
                // should never reach the application layer (lambda). We should either
                // respond from the cache (HIT) or respond with 204 No Content (MISS).
                // Set a header to indicate that PPR is enabled for this route. This
                // lets the client distinguish between a regular cache miss and a cache
                // miss due to PPR being disabled. In other contexts this header is used
                // to indicate that the response contains dynamic data, but here we're
                // only using it to indicate that the feature is enabled — the segment
                // response itself contains whether the data is dynamic.
                res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_DID_POSTPONE_HEADER"], '2');
                // Add the cache tags header to the response if it exists and we're in
                // minimal mode while rendering a static page.
                const tags = (_cachedData_headers1 = cachedData.headers) == null ? void 0 : _cachedData_headers1[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"]];
                if (isMinimalMode && isSSG && tags && typeof tags === 'string') {
                    res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"], tags);
                }
                const matchedSegment = cachedData.segmentData.get(segmentPrefetchHeader);
                if (matchedSegment !== undefined) {
                    // Cache hit
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                        req,
                        res,
                        generateEtags: nextConfig.generateEtags,
                        poweredByHeader: nextConfig.poweredByHeader,
                        result: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].fromStatic(matchedSegment, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RSC_CONTENT_TYPE_HEADER"]),
                        cacheControl: cacheEntry.cacheControl
                    });
                }
                // Cache miss. Either a cache entry for this route has not been generated
                // (which technically should not be possible when PPR is enabled, because
                // at a minimum there should always be a fallback entry) or there's no
                // match for the requested segment. Respond with a 204 No Content. We
                // don't bother to respond with 404, because these requests are only
                // issued as part of a prefetch.
                res.statusCode = 204;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                    req,
                    res,
                    generateEtags: nextConfig.generateEtags,
                    poweredByHeader: nextConfig.poweredByHeader,
                    result: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].EMPTY,
                    cacheControl: cacheEntry.cacheControl
                });
            }
            // If there's a callback for `onCacheEntry`, call it with the cache entry
            // and the revalidate options. If we support RDC for Navigations, we
            // prefer the `onCacheEntryV2` callback. Once RDC for Navigations is the
            // default, we can remove the fallback to `onCacheEntry` as
            // `onCacheEntryV2` is now fully supported.
            const onCacheEntry = supportsRDCForNavigations ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'onCacheEntryV2') ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'onCacheEntry') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'onCacheEntry');
            if (onCacheEntry) {
                const finished = await onCacheEntry(cacheEntry, {
                    url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'initURL') ?? req.url
                });
                if (finished) return null;
            }
            if (cachedData.headers) {
                const headers = {
                    ...cachedData.headers
                };
                if (!isMinimalMode || !isSSG) {
                    delete headers[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"]];
                }
                for (let [key, value] of Object.entries(headers)){
                    if (typeof value === 'undefined') continue;
                    if (Array.isArray(value)) {
                        for (const v of value){
                            res.appendHeader(key, v);
                        }
                    } else if (typeof value === 'number') {
                        value = value.toString();
                        res.appendHeader(key, value);
                    } else {
                        res.appendHeader(key, value);
                    }
                }
            }
            // Add the cache tags header to the response if it exists and we're in
            // minimal mode while rendering a static page.
            const tags = (_cachedData_headers = cachedData.headers) == null ? void 0 : _cachedData_headers[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"]];
            if (isMinimalMode && isSSG && tags && typeof tags === 'string') {
                res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"], tags);
            }
            // If the request is a data request, then we shouldn't set the status code
            // from the response because it should always be 200. This should be gated
            // behind the experimental PPR flag.
            if (cachedData.status && (!isRSCRequest || !isRoutePPREnabled)) {
                res.statusCode = cachedData.status;
            }
            // Redirect information is encoded in RSC payload, so we don't need to use redirect status codes
            if (!isMinimalMode && cachedData.status && __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RedirectStatusCode"][cachedData.status] && isRSCRequest) {
                res.statusCode = 200;
            }
            // Mark that the request did postpone.
            if (didPostpone && !isDynamicRSCRequest) {
                res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_DID_POSTPONE_HEADER"], '1');
            }
            // we don't go through this block when preview mode is true
            // as preview mode is a dynamic request (bypasses cache) and doesn't
            // generate both HTML and payloads in the same request so continue to just
            // return the generated payload
            if (isRSCRequest && !isDraftMode) {
                // If this is a dynamic RSC request, then stream the response.
                if (typeof cachedData.rscData === 'undefined') {
                    // If the response is not an RSC response, then we can't serve it.
                    if (cachedData.html.contentType !== __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RSC_CONTENT_TYPE_HEADER"]) {
                        if (nextConfig.cacheComponents) {
                            res.statusCode = 404;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                                req,
                                res,
                                generateEtags: nextConfig.generateEtags,
                                poweredByHeader: nextConfig.poweredByHeader,
                                result: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].EMPTY,
                                cacheControl: cacheEntry.cacheControl
                            });
                        } else {
                            // Otherwise this case is not expected.
                            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`Expected RSC response, got ${cachedData.html.contentType}`), "__NEXT_ERROR_CODE", {
                                value: "E789",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    }
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                        req,
                        res,
                        generateEtags: nextConfig.generateEtags,
                        poweredByHeader: nextConfig.poweredByHeader,
                        result: cachedData.html,
                        cacheControl: cacheEntry.cacheControl
                    });
                }
                // As this isn't a prefetch request, we should serve the static flight
                // data.
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                    req,
                    res,
                    generateEtags: nextConfig.generateEtags,
                    poweredByHeader: nextConfig.poweredByHeader,
                    result: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].fromStatic(cachedData.rscData, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RSC_CONTENT_TYPE_HEADER"]),
                    cacheControl: cacheEntry.cacheControl
                });
            }
            // This is a request for HTML data.
            const body = cachedData.html;
            // If there's no postponed state, we should just serve the HTML. This
            // should also be the case for a resume request because it's completed
            // as a server render (rather than a static render).
            if (!didPostpone || isMinimalMode || isRSCRequest) {
                // If we're in test mode, we should add a sentinel chunk to the response
                // that's between the static and dynamic parts so we can compare the
                // chunks and add assertions.
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                    req,
                    res,
                    generateEtags: nextConfig.generateEtags,
                    poweredByHeader: nextConfig.poweredByHeader,
                    result: body,
                    cacheControl: cacheEntry.cacheControl
                });
            }
            // If we're debugging the static shell or the dynamic API accesses, we
            // should just serve the HTML without resuming the render. The returned
            // HTML will be the static shell so all the Dynamic API's will be used
            // during static generation.
            if (isDebugStaticShell || isDebugDynamicAccesses) {
                // Since we're not resuming the render, we need to at least add the
                // closing body and html tags to create valid HTML.
                body.push(new ReadableStream({
                    start (controller) {
                        controller.enqueue(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$stream$2d$utils$2f$encoded$2d$tags$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ENCODED_TAGS"].CLOSED.BODY_AND_HTML);
                        controller.close();
                    }
                }));
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                    req,
                    res,
                    generateEtags: nextConfig.generateEtags,
                    poweredByHeader: nextConfig.poweredByHeader,
                    result: body,
                    cacheControl: {
                        revalidate: 0,
                        expire: undefined
                    }
                });
            }
            // If we're in test mode, we should add a sentinel chunk to the response
            // that's between the static and dynamic parts so we can compare the
            // chunks and add assertions.
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // This request has postponed, so let's create a new transformer that the
            // dynamic data can pipe to that will attach the dynamic data to the end
            // of the response.
            const transformer = new TransformStream();
            body.push(transformer.readable);
            // Perform the render again, but this time, provide the postponed state.
            // We don't await because we want the result to start streaming now, and
            // we've already chained the transformer's readable to the render result.
            doRender({
                span,
                postponed: cachedData.postponed,
                // This is a resume render, not a fallback render, so we don't need to
                // set this.
                fallbackRouteParams: null,
                forceStaticRender: false
            }).then(async (result)=>{
                var _result_value;
                if (!result) {
                    throw Object.defineProperty(new Error('Invariant: expected a result to be returned'), "__NEXT_ERROR_CODE", {
                        value: "E463",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (((_result_value = result.value) == null ? void 0 : _result_value.kind) !== __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE) {
                    var _result_value1;
                    throw Object.defineProperty(new Error(`Invariant: expected a page response, got ${(_result_value1 = result.value) == null ? void 0 : _result_value1.kind}`), "__NEXT_ERROR_CODE", {
                        value: "E305",
                        enumerable: false,
                        configurable: true
                    });
                }
                // Pipe the resume result to the transformer.
                await result.value.html.pipeTo(transformer.writable);
            }).catch((err)=>{
                // An error occurred during piping or preparing the render, abort
                // the transformers writer so we can terminate the stream.
                transformer.writable.abort(err).catch((e)=>{
                    console.error("couldn't abort transformer", e);
                });
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                req,
                res,
                generateEtags: nextConfig.generateEtags,
                poweredByHeader: nextConfig.poweredByHeader,
                result: body,
                // We don't want to cache the response if it has postponed data because
                // the response being sent to the client it's dynamic parts are streamed
                // to the client on the same request.
                cacheControl: {
                    revalidate: 0,
                    expire: undefined
                }
            });
        };
        // TODO: activeSpan code path is for when wrapped by
        // next-server can be removed when this is no longer used
        if (activeSpan) {
            await handleResponse(activeSpan);
        } else {
            return await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseServerSpan"].handleRequest, {
                    spanName: `${method} ${srcPage}`,
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SpanKind"].SERVER,
                    attributes: {
                        'http.method': method,
                        'http.target': req.url
                    }
                }, handleResponse));
        }
    } catch (err) {
        if (!(err instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js$2c$__cjs$29$__["NoFallbackError"])) {
            const silenceLog = false;
            await routeModule.onRequestError(req, err, {
                routerKind: 'App Router',
                routePath: srcPage,
                routeType: 'render',
                revalidateReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$instrumentation$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRevalidateReason"])({
                    isStaticGeneration: isSSG,
                    isOnDemandRevalidate
                })
            }, silenceLog, routerServerContext);
        }
        // rethrow so that we can handle serving error page
        throw err;
    }
}
// TODO: omit this from production builds, only test builds should include it
/**
 * Creates a readable stream that emits a PPR boundary sentinel.
 *
 * @returns A readable stream that emits a PPR boundary sentinel.
 */ function createPPRBoundarySentinel() {
    return new ReadableStream({
        start (controller) {
            controller.enqueue(new TextEncoder().encode('<!-- PPR_BOUNDARY_SENTINEL -->'));
            controller.close();
        }
    });
} //# sourceMappingURL=app-page.js.map
}),
"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/build/templates/app-page.js?page=/page { GLOBAL_ERROR_MODULE => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_0 => \"[project]/OneDrive/Desktop/churn-rate/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_1 => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_2 => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_3 => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_4 => \"[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_5 => \"[project]/OneDrive/Desktop/churn-rate/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)\" } [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientPageRoot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["ClientPageRoot"],
    "ClientSegmentRoot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["ClientSegmentRoot"],
    "Fragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["Fragment"],
    "GlobalError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29$__["default"],
    "HTTPAccessFallbackBoundary",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["HTTPAccessFallbackBoundary"],
    "LayoutRouter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["LayoutRouter"],
    "Postpone",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["Postpone"],
    "RenderFromTemplateContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RenderFromTemplateContext"],
    "RootLayoutBoundary",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RootLayoutBoundary"],
    "SegmentViewNode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["SegmentViewNode"],
    "SegmentViewStateNode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["SegmentViewStateNode"],
    "__next_app__",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$page__$7b$__GLOBAL_ERROR_MODULE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_0__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$not$2d$found$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$forbidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$unauthorized$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__next_app__"],
    "actionAsyncStorage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["actionAsyncStorage"],
    "captureOwnerStack",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["captureOwnerStack"],
    "collectSegmentData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["collectSegmentData"],
    "createElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createElement"],
    "createMetadataComponents",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createMetadataComponents"],
    "createPrerenderParamsForClientSegment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createPrerenderParamsForClientSegment"],
    "createPrerenderSearchParamsForClientPage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createPrerenderSearchParamsForClientPage"],
    "createServerParamsForServerSegment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createServerParamsForServerSegment"],
    "createServerSearchParamsForServerPage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createServerSearchParamsForServerPage"],
    "createTemporaryReferenceSet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createTemporaryReferenceSet"],
    "decodeAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["decodeAction"],
    "decodeFormState",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["decodeFormState"],
    "decodeReply",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["decodeReply"],
    "handler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$page__$7b$__GLOBAL_ERROR_MODULE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_0__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$not$2d$found$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$forbidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$unauthorized$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["handler"],
    "patchFetch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["patchFetch"],
    "preconnect",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["preconnect"],
    "preloadFont",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["preloadFont"],
    "preloadStyle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["preloadStyle"],
    "prerender",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["prerender"],
    "renderToReadableStream",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["renderToReadableStream"],
    "routeModule",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$page__$7b$__GLOBAL_ERROR_MODULE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_0__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$not$2d$found$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$forbidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$unauthorized$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["routeModule"],
    "serverHooks",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["serverHooks"],
    "taintObjectReference",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["taintObjectReference"],
    "workAsyncStorage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["workAsyncStorage"],
    "workUnitAsyncStorage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["workUnitAsyncStorage"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$page__$7b$__GLOBAL_ERROR_MODULE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_0__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$not$2d$found$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$forbidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$unauthorized$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/build/templates/app-page.js?page=/page { GLOBAL_ERROR_MODULE => "[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_0 => "[project]/OneDrive/Desktop/churn-rate/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", MODULE_1 => "[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_2 => "[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_3 => "[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_4 => "[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_5 => "[project]/OneDrive/Desktop/churn-rate/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)" } [app-rsc] (ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$churn$2d$rate$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/churn-rate/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility)");
}),
];

//# sourceMappingURL=7b9f9_5fae0d67._.js.map