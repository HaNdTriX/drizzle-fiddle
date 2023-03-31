import Link from "next/link";
import db from "@/db";
import { pages, users } from "@/db/schema";
import type { Metadata } from "next";
import { eq } from "drizzle-orm/expressions";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PencilIcon } from "@heroicons/react/20/solid";
import { cache } from "react";
import { getServerSession } from "@/lib/next-auth";

const getPage = cache(async (slug: string) => {
  const [page] = await db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
      authorId: pages.authorId,
      content: pages.content,
      updatedAt: pages.updatedAt,
      authorname: users.name,
    })
    .from(pages)
    .leftJoin(users, eq(pages.authorId, users.id))
    .where(eq(pages.slug, slug))
    .limit(1);
  return page;
});

type PageProps = {
  params: { pageSlug: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPage(params.pageSlug);
  return { title: page?.title };
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession();
  const page = await getPage(params.pageSlug);
  const ownsPage = session?.user?.id === page?.authorId;

  if (!page) notFound();

  return (
    <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <div className="p-4 bg-gray-50 border-b sm:p-6 flex items-center justify-between mb-3">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            {page.title}
          </h1>

          {ownsPage && (
            <Link
              className="rounded-full bg-primary-600 p-2 text-white shadow hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              href={`/${page.slug}/edit`}
            >
              <PencilIcon className="h-5 w-5" aria-hidden="true" />{" "}
              <span className="sr-only">Edit</span>
            </Link>
          )}
        </div>
        <div className="px-4 py-4 sm:p-6 prose prose-sm prose-primary max-w-none">
          {/* TODO - Remove remote code extecution issue because content might no be trusted! */}
          {/* @ts-expect-error Async Server Component */}
          <MDXRemote source={page.content} />
        </div>
      </div>
      <div className="p-2 text-xs text-right text-gray-500">
        Created by {page.authorname}
      </div>
    </div>
  );
}
