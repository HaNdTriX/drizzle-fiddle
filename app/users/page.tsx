import db from "@/db";
import { users } from "@/db/schema";
import { cache } from "react";
import type { Metadata } from "next";

const getAllUsers = cache(async () =>
  db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
    })
    .from(users)
);

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const allUsers = await getAllUsers();
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-3">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Users
        </h1>
      </div>

      <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
        <ul
          role="list"
          className="divide-y divide-gray-200 bg-white sm:rounded-md shadow mt-2"
        >
          {allUsers.map((user) => (
            <li key={user.id} className="flex p-4">
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  className="h-10 w-10 rounded-full bg-gray-200"
                  alt={user?.name?.[0]?.toUpperCase()}
                />
              ) : (
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-lg bg-gray-200">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
              )}

              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
