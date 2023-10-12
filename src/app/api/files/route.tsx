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
