"use client";
import { useTransition } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import PageForm from "@/components/page-form";

async function POST(url: string, { arg }: { arg: FormData }) {
  const response = await fetch(url, {
    method: "POST",
    body: arg,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create page");
  }

  return response.json();
}

export default function Form() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { trigger, isMutating, error } = useSWRMutation("/api/pages", POST);
  return (
    <PageForm
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = await trigger(formData);
        startTransition(() => {
          router.refresh();
          router.push(`/${data.slug}`);
        });
      }}
      error={error}
      disabled={isMutating || isPending}
    />
  );
}
