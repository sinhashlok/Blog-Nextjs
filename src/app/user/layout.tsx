import NavLoggedIn from "@/components/NavLoggedIn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-6 md:mx-20 lg:mx-40">
      <nav>
        <NavLoggedIn />
      </nav>
      <div>{children}</div>{" "}
    </div>
  );
}
