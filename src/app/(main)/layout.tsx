import { Footer } from "@/components/layout/Footer";
import { ConvexClientProvider } from "../ConvexClientProvider";
import { Header } from "@/components/layout/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ConvexClientProvider>{children}</ConvexClientProvider>
      <Footer />
    </>
  );
}