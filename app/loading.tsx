import React, { JSX } from "react";

export default function Loading(): JSX.Element {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-50 opacity-75 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
  );
}
