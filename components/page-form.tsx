import { XCircleIcon, PhotoIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

type PageFormProps = {
  defaultValues?: {
    id: string;
    title: string;
    slug: string;
    content: string;
  };
  error?: Error;
  disabled?: boolean;
} & React.FormHTMLAttributes<HTMLFormElement>;

export default function PageForm({
  defaultValues,
  disabled,
  error,
  className,
  ...props
}: PageFormProps) {
  return (
    <form
      className={classNames(
        "shadow bg-white sm:overflow-hidden sm:rounded-md",
        className
      )}
      action="/api/pages"
      method="POST"
      {...props}
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

          <div className="col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                disabled={disabled}
                required
                type="text"
                name="title"
                minLength={3}
                maxLength={255}
                id="title"
                autoComplete="given-name"
                defaultValue={defaultValues?.title}
                className="block w-full invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="cover-photo"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="cover-photo"
                      name="cover-photo"
                      type="file"
                      accept="image/png, image/jpeg, , image/gif"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
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
                disabled={disabled}
                required
                type="text"
                name="slug"
                minLength={5}
                maxLength={255}
                pattern="[a-z0-9-]+"
                id="slug"
                autoComplete="slug"
                defaultValue={defaultValues?.slug}
                className="block w-full invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
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
                disabled={disabled}
                required
                id="content"
                name="content"
                rows={12}
                defaultValue={defaultValues?.content}
                className="block w-full invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              You can use markdown here.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          type="reset"
          className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={disabled}
          className="ml-3 inline-flex justify-center rounded-md bg-primary-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
