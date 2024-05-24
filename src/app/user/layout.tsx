import NavLoggedIn from "@/components/NavLoggedIn";
// import {NextUIProvider} from "@nextui-org/react";


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
