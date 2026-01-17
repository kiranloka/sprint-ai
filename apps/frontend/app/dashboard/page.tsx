import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SideNav from "@/components/SideNav";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <SideNav />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Navbar />
      </div>
    </SidebarProvider>
  );
}
