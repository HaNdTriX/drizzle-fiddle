"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  switch (status) {
    case "loading":
      return null;
    case "authenticated":
      return (
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="sr-only">Open user menu</span>
              {session.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="h-8 w-8 rounded-full"
                  src={session.user.image}
                  alt="Profile Image"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-400"></div>
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      );
    default:
      return (
        <button
          onClick={() => signIn("github")}
          className="ml-3 inline-flex items-center rounded-md transition-colors bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Sign in
        </button>
      );
  }
}
