<<<<<<< HEAD
// middleware.js
import { NextResponse } from "next/server";

// Define which paths require authentication
const protectedPaths = ["/search", "/about"]; // remove '/' from here if you want home page to be public

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Only check auth for protected paths
  if (protectedPaths.includes(path)) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1] || "";

    // If no token on protected route, redirect to login
    if (!token) {
      //return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedPaths, // Only run middleware on protected paths
};
=======
// middleware.js
import { NextResponse } from "next/server";

// Define which paths require authentication
const protectedPaths = ["/search", "/about"]; // remove '/' from here if you want home page to be public

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Only check auth for protected paths
  if (protectedPaths.includes(path)) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1] || "";

    // If no token on protected route, redirect to login
    if (!token) {
      //return NextResponse.redirect(new URL("/login", request.url)); 
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/search", "/about"], // Only run middleware on protected paths
};
>>>>>>> 60491a33e098015ed9c92272a365e23e4c1a42f5
