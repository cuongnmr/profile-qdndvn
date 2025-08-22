import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cumb, setCumb] = useState("");
  const matches: any = useRouterState({ select: (s) => s.matches });
  useEffect(() => {
    // Lấy match sâu nhất có context.title hoặc context.getTitle
    const lastMatch = [...matches].reverse().find((m) => m.context?.title);

    const title = lastMatch?.context?.title;
    setCumb(title);
  }, [matches]);
  return (
    <>
      <SidebarProvider className="h-screen">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link to="/">Trang chủ</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{cumb}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
