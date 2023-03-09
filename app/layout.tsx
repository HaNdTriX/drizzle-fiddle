import "./globals.css";

export const metadata = {
  title: "Dizzle Fiddle",
  description: "Just a simple fiddle for testing out Dizzle",
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
