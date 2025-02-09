import { SignIn } from '@clerk/nextjs';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      {/* Background */}
      <div className="bg-[url(/polygon-bg-element.svg)] bg-cover bg-center min-h-screen">
        <div className="flex items-center justify-center min-h-[80vh] py-12">
          {/* Container for Sign-In and Home Page Button */}
          <div className="flex flex-col items-center justify-center gap-6">

            {/* Home Page Button */}
            <Link
              href="/"
              className="flex items-center text-[14px] sm:text-[16px] gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-violet-700 transition-transform transform hover:scale-105">
              Home Page <ChevronRight size={17} />
            </Link>

            {/* Sign-In Section */}
            <div className="w-full ">
              <SignIn redirectUrl="/dashboard" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
