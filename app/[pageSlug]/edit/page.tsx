import db from "@/db";
import { pages } from "@/db/schema";
import type { Metadata } from "next";
import { eq } from "drizzle-orm/expressions";
import { notFound } from "next/navigation";
import Form from "./form";
import { cache } from "react";
import { getServerSession } from "@/lib/next-auth";

const getPage = cache(async (slug: string) =>
  db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
      authorId: pages.authorId,
      content: pages.content,
    })
    .from(pages)
    .where(eq(pages.slug, slug))
    .get()
);

type PageProps = {
  params: { pageSlug: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPage(params.pageSlug);
  return { title: `Edit: ${page.title}` };
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession();
  const page = await getPage(params.pageSlug);
  const ownsPage = session?.user?.id === page?.authorId;
  if (!page || !ownsPage) notFound();
  return (
    <>
      <div className="mx-auto max-w-4xl  px-4 sm:px-6 lg:px-8 mb-3">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Edit Page
        </h1>
      </div>
      <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
        <Form defaultValues={page} />
      </div>
    </>
  );
}
