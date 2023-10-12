import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function GET() {
  const totalSize = await prisma.file.aggregate({
    _sum: {
      size: true,
    },
  });
  const fileCounts = await prisma.file.count();
  return NextResponse.json({ totalSize, fileCounts });
}

export async function POST(request: Request) {
  const { filesize } = await request.json();

  const newFile = await prisma.file.create({
    data: {
      size: filesize,
    },
  });
  return NextResponse.json({ newFile });
}
