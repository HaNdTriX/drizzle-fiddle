import { getServerSession } from "@/lib/next-auth";

export default async function MainPage() {
  const session = await getServerSession();

  return (
    <div className="mx-auto max-w-4xl  sm:px-6 lg:px-8">
      <div className="prose prose-sm prose-primary max-w-none">
        <h1>Drizzle-Fiddle</h1>
        <p>Just playing around with Drizzle & Next.js</p>
        <h2>Session Data</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
