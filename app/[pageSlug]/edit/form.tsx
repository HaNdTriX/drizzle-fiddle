"use client";
import { useTransition } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import PageForm from "@/components/page-form";

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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { trigger, isMutating, error } = useSWRMutation(
    `/api/pages/${defaultValues.id}`,
    PATCH
  );
  return (
    <PageForm
      defaultValues={defaultValues}
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
