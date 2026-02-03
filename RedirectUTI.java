package com.example.ssoidp.util;

import jakarta.servlet.http.HttpServletRequest;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public final class RedirectUtil {
    private RedirectUtil() {}

    /** Builds a context-aware absolute path: {contextPath}{path} */
    public static String path(HttpServletRequest request, String path) {
        String ctx = request.getContextPath();
        if (ctx == null) ctx = "";
        if (path == null || path.isBlank()) path = "/";
        if (!path.startsWith("/")) path = "/" + path;
        return ctx + path;
    }

    /** For controllers: "redirect:{contextPath}{path}" */
    public static String view(HttpServletRequest request, String path) {
        return "redirect:" + path(request, path);
    }

    /** For interceptors/filters: sendRedirect target */
    public static String url(HttpServletRequest request, String path) {
        return path(request, path);
    }

    /** Add query params safely (optional) */
    public static String url(HttpServletRequest request, String path, Map<String, String> params) {
        String base = url(request, path);
        if (params == null || params.isEmpty()) return base;

        StringBuilder sb = new StringBuilder(base).append("?");
        boolean first = true;
        for (var e : params.entrySet()) {
            if (!first) sb.append("&");
            first = false;
            sb.append(encode(e.getKey())).append("=").append(encode(e.getValue()));
        }
        return sb.toString();
    }

    private static String encode(String s) {
        return URLEncoder.encode(s == null ? "" : s, StandardCharsets.UTF_8);
    }
}
