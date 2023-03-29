import { type NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { pages } from "@/db/schema";
import { getServerSession } from "@/lib/next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  const formData = await request.formData();

  console.log("session", session);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // TODO - validate with zod
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const coverPhotoBlob = formData.get("cover-photo") as unknown as Blob;
  const coverPhoto = Buffer.from(await coverPhotoBlob.arrayBuffer());

  const createdPage = await db
    .insert(pages)
    .values({
      title,
      slug,
      content,
      coverPhoto,
      authorId: session.user.id,
    })
    .returning()
    .get();

  console.log("createdPage", createdPage);

  return NextResponse.json(createdPage);
}
