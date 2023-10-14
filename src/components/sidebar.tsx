"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowsClockwise, FileArchive, Wall } from "@phosphor-icons/react";
import { usePathname, redirect, useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
type Props = {};
type LinkType = {
  name: string;
  href: string;
  icon: string;
};
const Icon = (props: { name: string; size: number; className: string }) => {
  const { name, size, className } = props;
  switch (name) {
    case "file-archive":
      return <FileArchive {...props} />;
    case "arrows-clockwise":
      return <ArrowsClockwise {...props} />;
    case "wall":
      return <Wall {...props} />;
    default:
      return null;
  }
};
const SIDEBAR_LINKS: LinkType[] = [
  {
    name: "Converter",
    href: "/converter",
    icon: "arrows-clockwise",
  },
  {
    name: "Compressor",
    href: "/compressor",
    icon: "file-archive",
  },

  {
    name: "Collage Maker",
    href: "/collage",
    icon: "wall",
  },
];
const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const isPathname = (path: string) => {
    return pathname.includes(path);
  };

  const getButtonVariant = (path: string) => {
    return isPathname(path) ? "secondary" : "ghost";
  };
  return (
    <div className="relative hidden  w-[250px] flex-col justify-between lg:flex">
      <div className="space-y-4 py-4">
        <div className="space-y-2 px-3 py-2">
          <Link
            href="/"
            className="mb-4 flex h-12 w-full items-center justify-center border-2"
          >
            <h1 className="text-lg font-semibold tracking-tight">iConvert</h1>
          </Link>

          {SIDEBAR_LINKS.map((link: LinkType, index) => (
            <div className="space-y-1" key={index}>
              <Button
                variant={getButtonVariant(link.href)}
                onClick={() => router.push(link.href)}
                className="w-full justify-start rounded-none"
              >
                <Icon name={link.icon} size={24} className="mr-1" /> {link.name}
              </Button>
            </div>
          ))}
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
