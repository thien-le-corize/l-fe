'use client';
import React, { useState } from 'react';
import Sidebar from '../pages/admin/Sidebar';
import Header from '../pages/admin/Header';
import Providers from '../provider';
import Head from 'next/head';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const pathname = usePathname()

    console.log(pathname)

    return (


        <html lang="en">
            <Providers>
                <Head>{barlowFont}</Head>
                <body className={inter.className}>
                    <div className='flex h-screen overflow-hidden'>
                        {pathname === '/admin/login' ?
                            children
                            :
                            <>
                                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                                    <main>
                                        <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
                                            {children}
                                        </div>
                                    </main>
                                </div>
                            </>
                        }

                    </div>
                    <ReactQueryDevtools initialIsOpen={false} />
                </body>

            </Providers>
        </html>
    );
}



const barlowFont = (
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
            href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
        />
    </>
);
