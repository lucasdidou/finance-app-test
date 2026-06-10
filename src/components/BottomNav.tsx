"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, History } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/", icon: Home, label: "Início" },
    { href: "/add", icon: PlusCircle, label: "Adicionar" },
    { href: "/history", icon: History, label: "Histórico" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50">
      {tabs.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center py-2 gap-1 text-xs transition-colors ${
              active ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
