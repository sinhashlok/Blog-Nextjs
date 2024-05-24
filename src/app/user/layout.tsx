import NavLoggedIn from "@/components/NavLoggedIn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav>
        <NavLoggedIn />
      </nav>
      <div>{children}</div>{" "}
    </div>
  );
}
