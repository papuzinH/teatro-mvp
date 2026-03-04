import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { notifications } = useApp();
  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-teatro-bg border-b border-teatro-surface-light flex items-center justify-between px-4">
      {/* Left: Logo + Brand */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/images/logo.svg" alt="Teatro logo" className="h-8 w-8" />
        <span className="font-display text-xl font-bold text-teatro-gold">Teatro</span>
      </Link>

      {/* Right: Notifications bell */}
      <Link to="/notifications" className="relative p-2 text-teatro-text-secondary hover:text-teatro-gold transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {unreadNotificationCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-teatro-crimson text-white text-[10px] font-bold font-body leading-none">
            {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
          </span>
        )}
      </Link>
    </header>
  );
}
