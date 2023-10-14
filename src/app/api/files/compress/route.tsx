import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";


export async function POST(request: Request) {
  const { filesize } = await request.json();

  const newFile = await prisma.compressSize.create({
    data: {
      size: filesize,
    },
  });
  return NextResponse.json({ newFile });
}
