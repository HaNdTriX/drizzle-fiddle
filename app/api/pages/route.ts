import { type NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { pages } from "@/db/schema";
import { getServerSession } from "@/lib/next-auth";
import cuid from "cuid";
import { eq } from "drizzle-orm/expressions";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  const formData = await request.formData();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // TODO - validate with zod
  const id = cuid();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  // TODO - pipe coverPhoto to some bucket
  // const coverPhotoBlob = formData.get("cover-photo") as unknown as Blob;
  // const coverPhoto = Buffer.from(await coverPhotoBlob.arrayBuffer());

  await db.insert(pages).values({
    id,
    title,
    slug,
    content,
    authorId: session.user.id,
  });

  const [createdPage] = await db
    .select({
      slug: pages.slug,
    })
    .from(pages)
    .where(eq(pages.id, id))
    .limit(1);

  console.log("createdPage", createdPage);

  return request.headers.get("Accept") === "application/json"
    ? NextResponse.json(createdPage)
    : NextResponse.redirect(request.nextUrl.origin + `/${createdPage.slug}`);
}
