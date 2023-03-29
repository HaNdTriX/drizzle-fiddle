import { type NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { pages } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";
import { getServerSession } from "@/lib/next-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { coverPhoto } = await db
    .select({
      coverPhoto: pages.coverPhoto,
    })
    .from(pages)
    .where(eq(pages.id, Number(params.id)))
    .get();

  return new NextResponse(coverPhoto, {
    headers: {
      "Content-Type": "image/jpeg", // Set the MIME type for the image
    },
  });
}
