"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FilePlus2, MailWarning } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

const adminNavItems = [
  {
    name: "Crear",
    icon: <FilePlus2 className="w-4 h-4" />,
    href: "/admin",
    tooltip: "Artículos aceptados - añadir a la base de datos",
  },
  {
    name: "Solicitudes",
    icon: <MailWarning className="w-4 h-4" />,
    href: "/admin/manage-solic",
    tooltip: "Certificados de revisión - ver solicitudes",
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="fixed left-60 top-40 z-20 h-fit w-fit">
      <nav className="h-full bg-white/80 backdrop-blur-sm shadow-lg border-r border-gray-200 rounded-3xl">
        <div className="px-4 py-6">
          <div className="flex flex-col">
            <div className="flex flex-col space-y-2">
              {adminNavItems.map((item, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        href={item.href}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                          pathname === item.href
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        )}
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{item.tooltip}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}