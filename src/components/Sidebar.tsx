"use client";

import { useEffect, useState } from "react";
import request from "@/utils/axios";
import { User } from "@/types/carType";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleUserRound,
  Home,
  LayoutDashboard, ListTodo,
  SquareChartGantt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const links = [
  { name: "Home", href: "/", icon: Home },
  { name: "Cars", href: "/dashboard/cars", icon: SquareChartGantt },
  { name: "Pending Validations", href: "/dashboard/pending_cars", icon: ListTodo },
];

export function Sidebar() {
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["user_info"],
    queryFn: async () => {
      return (await request.get("/users/me")) as User;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  return (
    <div className="flex h-full flex-col border-r bg-background px-2 py-4">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span>Rentoro</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Button
                key={link.href}
                asChild
                variant={pathname === link.href ? "secondary" : "ghost"}
                className="justify-start"
              >
                <Link href={link.href}>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {link.name}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-2 py-2">
          <>
            {data && (
              <div className={"flex items-center gap-2"}>
                {data.picture ? (
                  <div className={"relative w-12 h-12"}>
                    <Image
                      src={data?.picture}
                      alt={`${data?.firstName} ${data?.lastName}`}
                      className="w-12 h-12 rounded-full border-2 border-gray-400"
                      fill
                    />
                  </div>
                ) : (
                  <CircleUserRound />
                )}
                <h2 className="text-lg font-semibold">{data?.firstName}</h2>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
