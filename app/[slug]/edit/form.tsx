"use client";
import useSWRMutation from "swr/mutation";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { XCircleIcon } from "@heroicons/react/20/solid";

async function PATCH(url: string, { arg }: { arg: FormData }) {
  const response = await fetch(url, {
    method: "PATCH",
    body: arg,
  });

  if (!response.ok) {
    throw new Error("Failed to update page");
  }

  return response.json();
}

type FormProps = {
  defaultValues: {
    id: number;
    title: string;
    slug: string;
    content: string;
  };
};

export default function Form({ defaultValues }: FormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { trigger, isMutating, error } = useSWRMutation(
    `${pathname}/api`,
    PATCH
  );

  return (
    <form
      className="shadow bg-white sm:overflow-hidden sm:rounded-md"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = await trigger(formData);

        // TODO: Handle unmounted component
        router.push(`/${data.slug}`);
      }}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-3 gap-6">
          {error && (
            <div className="col-span-3 shadow-sm rounded-md border border-red-200 bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    There was an error creating your page
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>{error.message}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <input type="hidden" name="id" defaultValue={defaultValues.id} />

          <div className="col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                disabled={isMutating}
                required
                type="text"
                name="title"
                id="title"
                autoComplete="given-name"
                defaultValue={defaultValues.title}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="slug"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Slug
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                URL/
              </span>
              <input
                disabled={isMutating}
                required
                type="text"
                name="slug"
                id="slug"
                autoComplete="slug"
                defaultValue={defaultValues.slug}
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Content
            </label>
            <div className="mt-2">
              <textarea
                disabled={isMutating}
                required
                id="content"
                name="content"
                rows={12}
                defaultValue={defaultValues.content}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              You can use markdown here.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <Link
          href="/pages"
          className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isMutating}
          className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </div>
    </form>
  );
}
