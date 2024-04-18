/* eslint-disable no-restricted-imports */
"use client";
import React, { useState } from "react";
import Sidebar from "../pages/admin/Sidebar";
import Header from "../pages/admin/Header";
import Providers from "../provider";
import Head from "next/head";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="flex h-screen overflow-hidden">
            {pathname === "/admin/login" ? (
              children
            ) : (
              <>
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                      {children}
                    </div>
                  </main>
                </div>
              </>
            )}
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </Providers>
    </html>
  );
}
