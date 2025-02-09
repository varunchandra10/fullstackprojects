"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'
import { SignedOut } from '@clerk/nextjs';

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>('');
  return (
    <div>
      {/* Search section */}
      <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
      {/* Template list section */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  )
}

export default Dashboard
