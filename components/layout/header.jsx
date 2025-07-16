"use client"

import Link from "next/link"
import { MountainIcon, MenuIcon, LogInIcon, UserIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { NAV_LINKS, SITE_NAME } from "@/lib/constants"
import { useAuth } from "@/lib/auth"

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm py-4 px-4 md:px-8 sticky top-0 z-50 rounded-b-2xl">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-desa-primary font-bold text-xl">
          <MountainIcon className="h-8 w-8" />
          <span>{SITE_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) =>
            link.subLinks ? (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-base font-medium text-gray-700 hover:text-desa-primary">
                    {link.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-lg shadow-lg">
                  {link.subLinks.map((subLink) => (
                    <DropdownMenuItem key={subLink.name} asChild>
                      <Link
                        href={subLink.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {subLink.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-700 hover:text-desa-primary"
              >
                {link.name}
              </Link>
            ),
          )}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base font-medium text-gray-700 hover:text-desa-primary">
                  <UserIcon className="mr-2 h-4 w-4" />
                  {user?.name || "Dashboard"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-lg shadow-lg">
                <DropdownMenuItem asChild>
                  <Link href={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}>
                    <LayoutDashboardIcon className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOutIcon className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" className="text-base font-medium text-gray-700 hover:text-desa-primary">
                <LogInIcon className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm rounded-l-2xl">
            <div className="flex flex-col gap-6 p-4">
              <Link href="/" className="flex items-center gap-2 text-desa-primary font-bold text-xl">
                <MountainIcon className="h-8 w-8" />
                <span>{SITE_NAME}</span>
              </Link>
              <nav className="grid gap-4">
                {NAV_LINKS.map((link) =>
                  link.subLinks ? (
                    <div key={link.name}>
                      <h3 className="font-semibold text-gray-800 mb-2">{link.name}</h3>
                      <div className="grid gap-2 pl-4">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className="text-gray-600 hover:text-desa-primary"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-gray-800 font-semibold hover:text-desa-primary"
                    >
                      {link.name}
                    </Link>
                  ),
                )}
                <div className="pt-4 border-t mt-4">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                        className="flex items-center gap-2 text-gray-800 font-semibold hover:text-desa-primary mb-2"
                      >
                        <LayoutDashboardIcon className="h-5 w-5" /> Dashboard
                      </Link>
                      <Button
                        onClick={logout}
                        variant="ghost"
                        className="w-full justify-start text-gray-800 font-semibold hover:text-desa-primary"
                      >
                        <LogOutIcon className="mr-2 h-5 w-5" /> Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/auth/login">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-800 font-semibold hover:text-desa-primary"
                      >
                        <LogInIcon className="mr-2 h-5 w-5" /> Login
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
