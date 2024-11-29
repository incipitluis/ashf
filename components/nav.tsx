"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const elements = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Certificados de publicación",
    href: "/certificates",
  },
  {
    name: "Administración",
    href: "/admin",
  },
  {
    name: "Certificados de revisión",
    href: "/evaluation-certificate",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <div className="fixed w-full z-50 flex justify-center px-4 py-4">
      <nav className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 w-fit">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4 w-full">
              <div className="flex-shrink-0 flex items-center space-x-3">
                <Image
                  src="/filosofia-y-sociedad.jpg"
                  alt="UCM Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
                <span className="text-lg font-bold text-gray-800">ASHF</span>
              </div>
                <div className="hidden sm:flex sm:space-x-4">
                  {elements.map((element, index) => (
                  <Link
                    key={index}
                    href={element.href}
                    className={cn(
                      "inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                      pathname === element.href
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    )}
                  >
                    {element.name}
                  </Link>
                ))}
              </div>
            </div>  
          </div>
        </div>

        {/* Menú móvil */}
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              href="/"
              className={cn(
                "block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200",
                pathname === "/"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              )}
            >
              Inicio
            </Link>
            <Link
              href="/certificates"
              className={cn(
                "block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200",
                pathname === "/certificates"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              )}
            >
              Certificados
            </Link>
            <Link
              href="/admin"
              className={cn(
                "block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200",
                pathname === "/admin"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              )}
            >
              Administración
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
