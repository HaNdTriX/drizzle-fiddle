import Link from "next/link";
import db from "@/db";
import { pages } from "@/db/schema";

export default async function PagesPage() {
  const allPages = await db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
    })
    .from(pages);

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Pages
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <ul role="list" className="divide-y divide-gray-200">
            {allPages.map((page) => (
              <li key={page.id} className="flex py-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="ml-3">
                  <Link
                    href={`/page/${page.slug}`}
                    className="text-sm font-medium text-gray-900"
                  >
                    {page.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit perspiciatis delectus alias mollitia? Illum.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
