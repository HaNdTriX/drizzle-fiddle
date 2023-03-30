import PageForm from "@/components/page-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Page",
};

export default async function PagesPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl  px-4 sm:px-6 lg:px-8 mb-3">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Create Page
        </h1>
      </div>
      <div className="mx-auto max-w-4xl  sm:px-6 lg:px-8">
        <PageForm />
      </div>
    </>
  );
}
