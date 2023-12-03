import {
  SquaresPlusIcon,
  HomeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Create Event', href: '/dashboard/create', icon: SquaresPlusIcon },
  {
    name: 'Events',
    href: '/dashboard/events',
    icon: CalendarIcon,
  },
];

export default function NavLink() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-teal-600 hover:text-gray-50 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}