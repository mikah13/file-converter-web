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
  const compressSize = await prisma.compressSize.aggregate({
    _sum: {
      size: true,
    },
  });
  return NextResponse.json({ totalSize, fileCounts, compressSize });
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
