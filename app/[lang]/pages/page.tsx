import Link from "next/link";
import db from "@/db";
import { pages, users } from "@/db/schema";
import type { Metadata } from "next";
import {
  PlusIcon,
  ChevronRightIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { cache } from "react";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm/expressions";

const getAllPages = cache(async (pageNumber = 1, pageSize = 2) =>
  db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
      updatedAt: pages.updatedAt,
      authorname: users.name,
    })
    .from(pages)
    .leftJoin(users, eq(pages.authorId, users.id))
    .limit(pageSize)
    .offset(pageSize * (pageNumber - 1))
);

const getPagesCount = cache(async () => {
  const [{ count }] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(pages)
    .limit(1);
  return count;
});

export const metadata: Metadata = {
  title: "Pages",
};

export default async function PagesPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams.page || "1");
  const pageSize = 10;

  const [allPages, pagesCount] = await Promise.all([
    getAllPages(currentPage, pageSize),
    getPagesCount(),
  ]);

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-3">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Pages
        </h1>{" "}
        <Link
          href="/pages/create"
          className="rounded-full bg-primary-600 p-1.5 text-white shadow hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Create Page</span>
        </Link>
      </div>

      <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          {/* List */}
          <ul role="list" className="divide-y divide-gray-200">
            {allPages.map((page) => (
              <li key={page.id}>
                <Link href={`/${page.slug}`} className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="truncate font-medium text-primary-600">
                            {page.title}
                          </p>
                        </div>
                        <div className="mt-2 flex space-x-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Updated on{" "}
                              <time dateTime={page.updatedAt.toDateString()}>
                                {new Intl.DateTimeFormat("en-US").format(
                                  page.updatedAt
                                )}
                              </time>
                            </p>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <UserCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>{page.authorname}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * pageSize + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * pageSize, pagesCount)}
                  </span>{" "}
                  of <span className="font-medium">{pagesCount}</span> results
                </p>
              </div>
              <nav
                role="navigation"
                aria-label="pagination"
                className="flex flex-1 justify-end"
              >
                {currentPage > 1 && (
                  <Link
                    href={`/pages?page=${currentPage - 1}`}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                {currentPage * pageSize <= pagesCount && (
                  <Link
                    href={`/pages?page=${currentPage + 1}`}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
