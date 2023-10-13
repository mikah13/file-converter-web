"use client";
import React from "react";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

type Props = {};

const HeaderAction = (props: Props) => {
  return (
    <div className="flex">
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          window.open("https://github.com/mikah13/file-converter-web")
        }
      >
        <GithubIcon />
      </Button>
      <ModeToggle />
    </div>
  );
};

export default HeaderAction;
