import { type NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { pages, users } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";
import { getServerSession } from "@/lib/next-auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  const formData = await request.formData();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const coverPhotoBlob = formData.get("cover-photo") as unknown as Blob;
  const coverPhoto = Buffer.from(await coverPhotoBlob.arrayBuffer());

  const patchedPage = await db
    .update(pages)
    .set({
      title,
      slug,
      content,
      coverPhoto,
      authorId: session.user.id,
    })
    .where(eq(pages.id, Number(params.id)))
    .returning()
    .get();

  console.log(patchedPage);

  return NextResponse.json(patchedPage);
}
