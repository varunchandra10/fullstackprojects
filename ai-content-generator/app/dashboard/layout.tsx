"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [totalUsage, setTotalUsage] = useState<Number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <div className="bg-slate-100 min-h-screen">
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
          <button
            className="text-slate-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Image src='/logo_1.png' alt='logo' width={100} height={50}/>
        </div>
        <div
          className={`fixed top-0 left-0 h-full bg-white shadow transform transition-transform duration-300 md:w-64 z-50 
            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="md:hidden flex justify-end p-4">
            <button
              className="text-slate-700 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <SideNav />
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        <div className="md:ml-64 transition-all duration-300">
          <Header />
          <div className="">{children}</div>
        </div>
      </div>
    </TotalUsageContext.Provider>
  );
};

export default Layout;
