import { type NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { pages } from "@/db/schema";
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

  // TODO - pipe coverPhoto to some bucket
  // const coverPhotoBlob = formData.get("cover-photo") as unknown as Blob;
  // const coverPhoto = Buffer.from(await coverPhotoBlob.arrayBuffer());

  await db
    .update(pages)
    .set({
      title,
      slug,
      content,
      authorId: session.user.id,
    })
    .where(eq(pages.id, params.id));

  const [patchedPage] = await db
    .select()
    .from(pages)
    .where(eq(pages.id, params.id))
    .limit(1);

  return NextResponse.json(patchedPage);
}
