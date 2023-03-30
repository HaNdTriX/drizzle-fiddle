import { type NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { pages } from "@/db/schema";
import { getServerSession } from "@/lib/next-auth";
import cuid from "cuid";
import { eq } from "drizzle-orm/expressions";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  const formData = await request.formData();

  // HTML Forms do not support PUT/PATCH/DELETE
  // Thats why we use a hidden input field to send the method
  const method = (formData.get("_METHOD") as string) || "POST";

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // TODO - validate with zod
  const id = method === "PUT" ? (formData.get("id") as string) : cuid();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  // TODO - pipe coverPhoto to some bucket
  // const coverPhotoBlob = formData.get("cover-photo") as unknown as Blob;
  // const coverPhoto = Buffer.from(await coverPhotoBlob.arrayBuffer());

  if (method === "PUT") {
    await db
      .update(pages)
      .set({
        id,
        title,
        slug,
        content,
        authorId: session.user.id,
      })
      .where(eq(pages.id, id));
  } else {
    await db.insert(pages).values({
      id,
      title,
      slug,
      content,
      authorId: session.user.id,
    });
  }

  const [page] = await db
    .select({
      slug: pages.slug,
    })
    .from(pages)
    .where(eq(pages.id, id))
    .limit(1);

  // This endpoint can be called via ajax (fetch) or via main request (PRG)
  return request.headers.get("Accept") === "application/json"
    ? NextResponse.json(page)
    : NextResponse.redirect(request.nextUrl.origin + `/${page.slug}`, {
        status: 303,
      });
}
