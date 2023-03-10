import { type NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { pages } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  // TODO: validate with zod
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  const [{ insertId }] = await db.insert(pages).values({
    title,
    slug,
    content,
    // TODO: get from session
    authorId: 1,
  });

  const [result] = await db
    .select({
      id: pages.id,
      slug: pages.slug,
    })
    .from(pages)
    .where(eq(pages.id, insertId))
    .limit(1);

  return NextResponse.json(result);
}
