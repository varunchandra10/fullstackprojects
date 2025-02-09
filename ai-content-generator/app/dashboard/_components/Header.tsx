import { UserButton } from '@clerk/nextjs';
import { Search } from 'lucide-react';
import React from 'react';

function Header() {
  return (
    <div className="p-4 shadow-sm border-b flex justify-between items-center bg-white md:gap-4 gap-4">
      <div className="flex items-center gap-3 p-2 border rounded-md w-full max-w-md bg-gray-100">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <h2 className="hidden sm:block bg-primary p-1 rounded-full text-xs text-white px-3 cursor-pointer hover:shadow-md transition-all">
          Join Membership for $9.99/Mo
        </h2>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
