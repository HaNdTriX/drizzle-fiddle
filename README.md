# Drizzle Fiddle

This Fiddle explores some new strategies for using [React Server Components](https://beta.reactjs.org/blog/2022/06/15/react-labs-what-we-have-been-working-on-june-2022#server-components) with [Next.js AppDir](https://beta.nextjs.org/docs/routing/fundamentals) and [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm). Please note that these patterns are experimental and should not be used in production.

## Getting Started

1. Run `yarn` to install the project dependencies
2. Run `cp .env.example .env` and add your Credentials to the newly created `.env` file.
3. Run `yarn db:push` to sync the db schema with your db.
4. Run `yarn dev` to start the Development Server.

## Experiments

- 🔥 FormData on the Server: [→](/app/api/pages/route.ts#L21-L28)
- 🫣 Isomorphic Form Submission: [→](/app/api/pages/route.ts#L59-L64)
- 🔥 Make a schema change - run: `yarn db:push`) - no need form migrations: [→](/package.json#L10)
- 💡 Tailwind Config in TS: [→](/tailwind.config.ts)
- 🫣 Next.js Meta API: [→](/app/layout.tsx#L8-L40)
- 🔥 Next.js Typed Routes: [→](/next.config.js#L6)
- 🔥 DB Schema in Typescript: [→](/db/schema.ts)
- 🫣 Streaming Binary Data (Image) from form input into DB [→](/sqlite/app/api/pages/route.ts#L20-L21)
- 💡Using transitions to disable form while loading the next page [→](/components/page-form.tsx#L50-L53)
- 💡Using FormData with fetch automatically takes care of setting the corresponding http headers: [→](/components/page-form.tsx#L11)
- 🫣 Rails Form Methods are back [→](/components/page-form.tsx#L71)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://beta.nextjs.org/docs)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- [Tailwindcss](https://tailwindcss.com/)
- [MySQL](https://www.mysql.com/de/)

## Special Thanks

- [Marouane](https://github.com/retconned)
