export { default } from "next-auth/middleware";

export const config = { matcher: ["/:slug/edit", "/pages/create"] };
