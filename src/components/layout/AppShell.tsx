import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-teatro-bg text-teatro-text-primary">
      {/* Fixed header */}
      <Header />

      {/* Sidebar (md+ only) */}
      <Sidebar />

      {/* Main content */}
      <main className="pt-14 pb-16 md:pb-0 md:pl-56 min-h-screen overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom nav (mobile only) */}
      <BottomNav />
    </div>
  );
}
