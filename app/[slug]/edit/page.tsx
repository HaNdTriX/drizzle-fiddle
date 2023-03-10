import db from "@/db";
import { pages } from "@/db/schema";
import type { Metadata } from "next";
import { eq } from "drizzle-orm/expressions";
import { notFound } from "next/navigation";
import Form from "./form";
import { cache } from "react";

const getPage = cache(async (slug: string) => {
  const [page] = await db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
      content: pages.content,
      updatedAt: pages.updatedAt,
    })
    .from(pages)
    .where(eq(pages.slug, slug))
    .limit(1);
  return page;
});

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPage(params.slug);
  return { title: `Edit: ${page.title}` };
}

export default async function Page({ params }: PageProps) {
  const page = await getPage(params.slug);
  if (!page) notFound();

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-4xl  px-4 sm:px-6 lg:px-8 mb-3">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Edit Page
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <Form defaultValues={page} />
        </div>
      </main>
    </div>
  );
}
