import db from "@/db";
import { users } from "@/db/schema";
import type { Metadata } from "next";
import { eq } from "drizzle-orm/expressions";
import { notFound } from "next/navigation";
import { cache } from "react";

const getUser = cache(async (id: string) => {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return user;
});

type PageProps = {
  params: { userId: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getUser(params.userId);
  return { title: page?.name };
}

export default async function Page({ params }: PageProps) {
  const user = await getUser(params.userId);

  if (!user) notFound();

  return (
    <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 text-center">
      {user.image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mx-auto h-56 w-56 rounded-full"
            src={user.image}
            alt="profile-image"
          />
        </>
      )}
      <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-gray-900">
        {user.name}
      </h3>
      <p className="text-sm leading-6 text-gray-600">Role: {user.role}</p>
    </div>
  );
}
