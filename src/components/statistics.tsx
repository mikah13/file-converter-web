"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { formatBytes } from "@/lib/utils";
export const dynamic = "force-dynamic";
async function getMetaData() {
  const { signal } = new AbortController();
  const res = await fetch("/api/files", { signal });
  const data = await res.json();
  return data;
}
function Statistics() {
  const { data } = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getMetaData(),
    refetchInterval: 1000,
  });
  return (
    <div className="absolute bottom-0 left-0 flex h-10 w-96 flex-row justify-evenly border-r  border-t text-sm">
      <div className="flex h-full w-full flex-row items-center justify-evenly border-r px-2">
        <span>Online</span>
        <span className="flex  h-2 w-2 rounded-full bg-green-400" />
      </div>
      <div className="flex h-full w-full flex-row items-center justify-center border-r px-2">
        <span> {data && data.fileCounts} file(s) </span>
      </div>
      <div className="flex h-full w-full flex-row items-center justify-center px-2">
        <span> {data && formatBytes(data.totalSize._sum.size || 0)} </span>
      </div>
    </div>
  );
}

export default Statistics;
