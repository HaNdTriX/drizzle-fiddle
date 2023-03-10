import Link from "next/link";
import db from "@/db";
import { pages } from "@/db/schema";
import type { Metadata } from "next";
import { eq } from "drizzle-orm/expressions";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PencilIcon } from "@heroicons/react/20/solid";

// Dedupe this code!
async function getPage(slug: string) {
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
}

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPage(params.slug);
  return { title: page.title };
}

export default async function Page({ params }: PageProps) {
  const page = await getPage(params.slug);
  if (!page) notFound();

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-3">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            {page.title}
          </h1>

          <Link
            className="rounded-full bg-indigo-600 p-2 text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href={`/${page.slug}/edit`}
          >
            <PencilIcon className="h-5 w-5" aria-hidden="true" />{" "}
            <span className="sr-only">Edit</span>
          </Link>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <div className="px-4 py-5 sm:p-6 prose prose-sm prose-indigo max-w-none">
              {/* TODO: Remove remote code extecution issue because content might no be trusted! */}
              {/* @ts-expect-error Async Server Component */}
              <MDXRemote source={page.content} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
