import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UserRound,
  ChevronRight,
  TabletSmartphone,
  Settings2,
  BookOpenText,
  MessagesSquare,
} from "lucide-react";

const mainpage_items = [
  {
    id: "1",
    icon: (
      <TabletSmartphone className="bg-blue-700 text-white p-2 rounded-lg" size="40px" />
    ),
    name: "25+ templates",
    desc: "Responsive and mobile-first projects on the web.",
  },
  {
    id: "2",
    icon: <Settings2 className="bg-blue-700 text-white p-2 rounded-lg" size="40px" />,
    name: "Customizable",
    desc: "Components are already customized and extendable.",
  },
  {
    id: "3",
    icon: <BookOpenText className="bg-blue-700 text-white p-2 rounded-lg" size="40px" />,
    name: "Free to Use",
    desc: "Every component and plugin is well documented.",
  },
  {
    id: "4",
    icon: <MessagesSquare className="bg-blue-700 text-white p-2 rounded-lg" size="40px" />,
    name: "24/7 Support",
    desc: "Contact us 24 hours a day, 7 days a week.",
  },
];

const Page = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="p-4 shadow-md border-b-2 bg-white">
        <div className="flex items-center justify-between max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <Image 
              src="/logo_1.png" 
              alt="logo" 
              width={180} height={90} 
              className="w-[120px] sm:w-[130px] md:w-44 lg:w-48" 
            />
          </div>
          <div className="text-gray-500 text-sm border-l pl-3">
            <Link
              href="/sign-in"
              className="flex gap-2 items-center font-semibold hover:text-blue-600 transition"
            >
              <UserRound size="17px" />
              <p>Get Started</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center bg-[url(/polygon-bg-element.svg)] bg-cover bg-center text-center px-4 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex gap-2">
          <span>
            AI Content{" "}
            <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
              Generator
            </span>
          </span>
        </h1>

        <p className="mt-4 text-gray-600 text-base sm:text-lg md:text-xl lg:w-1/2">
          Revolutionize your content creation with our AI-powered app, delivering engaging
          and high-quality text in seconds.
        </p>

        <Link
          href="/sign-in"
          className="mt-6 flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm sm:text-base font-medium rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-violet-700 transition-transform transform hover:scale-105"
        >
          Get Started <ChevronRight size="20px" />
        </Link>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 w-full max-w-[85rem] px-6">
          {mainpage_items.map((item) => (
            <div
              key={item.id}
              className="text-left bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
              <Link
                href="/"
                className="mt-4 flex items-center text-blue-600 font-medium hover:underline"
              >
                Learn More <ChevronRight size="16px" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
