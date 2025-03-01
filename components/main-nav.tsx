"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  isOpen,
  setIsOpen,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/admin/dashboard`,
      label: "Dashboard",
      active: pathname === `//admin/dashboard`,
    },
    {
      href: `/admin/notices`,
      label: "Notices",
      active: pathname === `/admin/notices`,
    },
    {
      href: `/admin/categories`,
      label: "Categories",
      active: pathname === `/admin/categories`,
    },
    {
      href: `/admin/analytics`,
      label: "Analytics",
      active: pathname === `/admin/analytics`,
    },
    {
      href: `/admin/settings`,
      label: "Settings",
      active: pathname === `/admin/settings`,
    },
  ];

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6 text-sm",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black font-semibold dark:text-white"
              : "text-muted-foreground"
          )}
          onClick={() => {
            if (setIsOpen) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
