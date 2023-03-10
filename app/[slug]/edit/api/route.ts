import { type NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { pages } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

export async function PATCH(request: NextRequest) {
  const formData = await request.formData();

  // TODO: validate with zod
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  await db
    .update(pages)
    .set({
      title,
      slug,
      content,
      // TODO: get from session
      authorId: 1,
    })
    .where(eq(pages.id, id));

  return NextResponse.json({
    id,
    slug,
  });
}
