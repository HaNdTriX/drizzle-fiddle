"use client";
import { Fragment } from "react";
import { GlobeAltIcon, CheckIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/i18n-config";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import useLocale from "@/lib/i18n/use-locale";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const langDisplayName = new Intl.DisplayNames([currentLocale], {
    type: "language",
  });
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <GlobeAltIcon className="h-8 w-8 rounded-full" />
          <span className="sr-only">Select Language</span>
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
          {i18n.locales.map((locale) => (
            <Menu.Item key={locale}>
              {({ active }) => (
                <Link
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "px-4 py-2 text-sm text-gray-700 w-full text-left flex justify-between"
                  )}
                  href={redirectedPathName(locale, pathname)}
                >
                  {langDisplayName.of(locale)}
                  {currentLocale === locale && (
                    <span className="text-primary-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function redirectedPathName<
  T extends typeof i18n.locales[number],
  Z extends string | null
>(locale: T, pathname: Z): `/${T}` {
  if (!pathname) return `/${i18n.defaultLocale}` as `/${T}`;
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") as `/${T}`;
}
