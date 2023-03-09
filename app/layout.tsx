import "./globals.css";

export const metadata = {
  title: "Drizzle Fiddle",
  description: "Just a simple fiddle for testing out Drizzle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body className="h-full">{children}</body>
    </html>
  );
}
