// src/pages/index.js
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link href={"/search"}>
        <p>Go to Search page</p>
      </Link>
    </div>
  );
}
