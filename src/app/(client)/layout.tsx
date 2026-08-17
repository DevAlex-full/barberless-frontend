import type { ReactNode } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { clientNav } from '@/config/site';

export default function ClientAreaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar items={clientNav} />
        <main id="main-content" className="flex-1 p-4 pb-20 sm:p-6 md:pb-6">
          {children}
        </main>
      </div>
      <MobileNav items={clientNav} />
    </div>
  );
}
