"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

import { usePathname, redirect, useRouter } from "next/navigation";
type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const isPathname = (path: string) => {
    return pathname.includes(path);
  };

  const getButtonVariant = (path: string) => {
    if (path === "converter" && pathname === "/") return "secondary";
    return isPathname(path) ? "secondary" : "ghost";
  };
  return (
    <div className="relative hidden  w-[250px] flex-col justify-between lg:flex">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-4 flex h-12 w-full items-center justify-center border-2">
            <h1 className="text-lg font-semibold tracking-tight">iConvert</h1>
          </div>
          <div className="space-y-1">
            <Button
              variant={getButtonVariant("converter")}
              onClick={() => router.push("/converter")}
              className="w-full justify-start rounded-none"
            >
              Image Converter
            </Button>
          </div>
          <div className="space-y-1">
            <Button
              variant={getButtonVariant("compressor")}
              onClick={() => router.push("/compressor")}
              className="w-full justify-start rounded-none"
            >
              Image Compressor
            </Button>
          </div>
        </div>
      </div>

      <div className="h-10 border-t px-1 py-2 text-center text-sm">
        <span>
          From{" "}
          <Link
            className="color-blue-200 hover:color_blue-100 underline"
            href="http://mike-hoang-dev.vercel.app/"
          >
            mikah
          </Link>{" "}
          with ❤️
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
