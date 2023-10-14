"use client";
import React from "react";
import Image from "next/image";
type Props = {};
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CurrencyCircleDollar, EyeSlash, Share } from "@phosphor-icons/react";

const HomeView = (props: Props) => {
  return (
    <div className="flex grow flex-col justify-center space-y-4 px-6 py-4">
      <article className="prose-lg prose-zinc ">
        <div className="mt-3 text-center">
          <h1>iConvert</h1>
          <h2 className="mt-1">A free image conversion tool.</h2>
        </div>
        <div className="flex justify-center text-center">
          <Image
            src="/home-art.png"
            width={200}
            height={200}
            alt="home-art-image"
          />
        </div>
      </article>
      <div className="grid grid-cols-3 gap-x-4">
        <Card className="group h-40  cursor-pointer border-4 duration-100 hover:border-indigo-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>
              <CurrencyCircleDollar size={36} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-xl font-bold">Free to use</div>

            <p>Free then. Free now. Free forever.</p>
          </CardContent>
        </Card>

        <Card className="group h-40  cursor-pointer  border-4 duration-100 hover:border-emerald-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>
              <EyeSlash size={36} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-xl font-bold">Free of cookies</div>
            <p>We only eat cookies here.</p>
          </CardContent>
        </Card>
        <Card className="group h-40 cursor-pointer   border-4 duration-100 hover:border-yellow-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>
              <Share size={36} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-xl font-bold">Free to share</div>

            <p>Feel free to share this tool !</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;
