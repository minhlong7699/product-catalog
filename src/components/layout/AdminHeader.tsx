'use client';

import Link from 'next/link';

export const AdminHeader = () => {
    return (
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Admin Dashboard</h1>
          <Link 
            href ="/"
            className="text-[#8E9196] hover:text-[#1A1F2C] transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </header>
    );
  };