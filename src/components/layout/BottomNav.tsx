import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/',
    label: 'Inicio',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: '/discounts',
    label: 'Descuentos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" />
        <path d="M2 15a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" />
        <line x1="9" y1="6" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="18" />
      </svg>
    ),
  },
  {
    to: '/chatbot',
    label: 'Recomendador',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
        <path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
      </svg>
    ),
  },
  {
    to: '/news',
    label: 'Noticias',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="16" y2="11" />
        <line x1="8" y1="15" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Perfil',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-teatro-surface border-t border-teatro-surface-light flex items-center justify-around md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-[10px] font-body transition-colors ${
              isActive ? 'text-teatro-gold' : 'text-teatro-text-muted'
            }`
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
