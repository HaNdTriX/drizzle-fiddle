import Link from "next/link";
import db from "@/db";
import { pages } from "@/db/schema";
import type { Metadata } from "next";
import {
  PlusIcon,
  ChevronRightIcon,
  CalendarIcon,
} from "@heroicons/react/20/solid";
import { cache } from "react";

const getAllPages = cache(async () =>
  db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
      updatedAt: pages.updatedAt,
    })
    .from(pages)
);

export const metadata: Metadata = {
  title: "Pages",
};

export default async function PagesPage() {
  const allPages = await getAllPages();
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
                        <div className="mt-2 flex">
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
        </div>
      </div>
    </>
  );
}
