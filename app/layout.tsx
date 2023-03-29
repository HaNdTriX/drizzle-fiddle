import "./globals.css";
import type { Metadata } from "next";
import ClientProvider from "@/components/client-provider";
import { CircleStackIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import AuthButtons from "@/components/auth-button";

export const metadata: Metadata = {
  title: {
    default: "Drizzle Fiddle",
    template: "%s | Drizzle Fiddle",
  },
  description: "Just a simple fiddle for testing out Drizzle & Next.js",
  keywords: ["drizzle", "next.js", "react", "typescript", "tailwindcss"],
  themeColor: "#1f2937",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <ClientProvider>
        <body className="h-full bg-gray-100 flex flex-col">
          <nav className="bg-gray-800 text-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link
                      href="/"
                      className="text-white h-16 w-14 flex items-center transition-colors justify-center group hover:text-gray-50 hover:bg-primary-700 bg-primary-600"
                    >
                      <CircleStackIcon className="h-8 w-8" aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </Link>
                  </div>
                  <div className="ml-6 flex items-baseline space-x-4">
                    <Link
                      className="text-gray-300 transition-colors hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      href="/"
                    >
                      Home
                    </Link>
                    <Link
                      className="text-gray-300 transition-colors hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      href="/pages"
                    >
                      Pages
                    </Link>
                    <Link
                      className="text-gray-300 transition-colors hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      href="/users"
                    >
                      Users
                    </Link>
                  </div>
                </div>
                <div>
                  <AuthButtons />
                </div>
              </div>
            </div>
          </nav>
          <main className="grow py-6">{children}</main>
          <footer>
            <p className="my-2 text-center text-xs leading-5 text-gray-500">
              © 2020 Your Company, Inc. All rights reserved.
            </p>
          </footer>
        </body>
      </ClientProvider>
    </html>
  );
}
