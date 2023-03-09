import Link from "next/link";

export default async function MainPage() {
  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Drizzle-Fiddle
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Just playing around with Drizzle & Next.js
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/users"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Users <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/pages"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Pages <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
