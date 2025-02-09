"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UsageTrack from "./UsageTrack";
import { usePathname } from "next/navigation";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";

const MenuList = [
    { name: "Home", icon: Home, path: "/dashboard", disabled: false },
    { name: "History", icon: FileClock, path: "/dashboard/history", disabled: false },
    { name: "Setting", icon: Settings, path: "/dashboard/settings", disabled: false },
    { name: "Billing", icon: WalletCards, path: "/dashboard/billing", disabled: true },
];

function SideNav() {
    const path = usePathname();

    useEffect(() => {}, [path]);

    return (
        <div className="h-screen relative p-3 shadow-sm border bg-white">
            <div className="flex justify-center lg:block md:hidden hidden">
                <Image src="/logo_1.png" alt="logo" width={150} height={100} />
            </div>
            <hr className="my-6 border lg:block md:hidden hidden" />
            <div className="mt-3">
                {MenuList.map((menu) => (
                    menu.disabled ? (
                        <div
                            key={menu.path}
                            className="relative group flex gap-2 mb-2 p-3 rounded-lg cursor-not-allowed items-center bg-gray-200 text-gray-400"
                        >
                            <menu.icon className="h-6 w-6" />
                            <h2 className="text-lg">{menu.name}</h2>
                            <div className="absolute left-full ml-2 w-max bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                Need to be developed
                            </div>
                        </div>
                    ) : (
                        <Link key={menu.path} href={menu.path}>
                            <div
                                className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${
                                    path === menu.path && "bg-primary text-white"
                                }`}
                            >
                                <menu.icon className="h-6 w-6" />
                                <h2 className="lg:text-lg ">{menu.name}</h2>
                            </div>
                        </Link>
                    )
                ))}
            </div>
            <div className="absolute bottom-10 left-0 w-full">
                <UsageTrack />
            </div>
        </div>
    );
}

export default SideNav;
