import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      {/* We'll add the Sidebar component here later */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;