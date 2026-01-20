import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideNav from "@/components/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SideNav />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
