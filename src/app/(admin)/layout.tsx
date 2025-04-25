import { ConvexClientProvider } from "../ConvexClientProvider";
import { AdminHeader } from "@/components/layout/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </>
  );
}