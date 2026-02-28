import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BrainCircuit, Menu, X, LayoutDashboard } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sitemap, NavItem } from "@/lib/sitemap";
import { cn } from "@/lib/utils";
import useUserStore from "@/stores/userStore";
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { navItem: NavItem }
>(({ className, title, children, navItem, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={navItem.href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const logout = useUserStore((s) => s.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const capabilityModules = sitemap.find(item => item.title === "Capability Modules");
  const pillars: { pillar: NavItem; modules: NavItem[] }[] = [];
  if (capabilityModules?.children) {
    let currentPillar: { pillar: NavItem; modules: NavItem[] } | null = null;
    for (const item of capabilityModules.children) {
      if (item.isPillar) {
        if (currentPillar) {
          pillars.push(currentPillar);
        }
        currentPillar = { pillar: item, modules: [] };
      } else if (currentPillar) {
        currentPillar.modules.push(item);
      }
    }
    if (currentPillar) {
      pillars.push(currentPillar);
    }
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 mr-6">
              <BrainCircuit className="h-7 w-7 text-indigo-600" />
              <span className="font-bold text-xl text-foreground">AING™</span>
            </Link>
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {sitemap.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {item.title === "Capability Modules" ? (
                        <div className="grid gap-3 p-4 w-[600px] md:w-[700px] lg:w-[900px] grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                          {pillars.map(({ pillar, modules }) => (
                            <div key={pillar.title} className="flex flex-col space-y-1">
                              <div className="font-semibold text-foreground p-3 pb-1">{pillar.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground px-3 mb-2">{pillar.description}</p>
                              {modules.map(module => (
                                <ListItem key={module.title} title={module.title} navItem={module}>
                                  {module.description}
                                </ListItem>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] md:grid-cols-2">
                          {item.children?.map((child) => (
                            <ListItem key={child.title} title={child.title} navItem={child}>
                              {child.description}
                            </ListItem>
                          ))}
                        </ul>
                      )}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link to="/register">Get Certified</Link>
                </Button>
              </>
            )}
          </div>
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <BrainCircuit className="h-7 w-7 text-indigo-600" />
                    <span className="font-bold text-xl text-foreground">AING™</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex-grow flex flex-col space-y-2 overflow-y-auto">
                  {sitemap.map((item) => (
                    <div key={item.title}>
                      <h3 className="px-3 py-2 font-semibold text-foreground">{item.title}</h3>
                      {item.children?.filter(c => !c.isPillar).map((child) => (
                        <NavLink
                          key={child.href}
                          to={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              "block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                              isActive && "text-accent-foreground bg-accent"
                            )
                          }
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </nav>
                <div className="mt-auto pt-6 border-t">
                  {isAuthenticated ? (
                     <div className="space-y-2">
                        <Button variant="outline" asChild className="w-full justify-start">
                           <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                        </Button>
                        <Button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full">Logout</Button>
                     </div>
                  ) : (
                     <div className="space-y-2">
                        <Button variant="outline" asChild className="w-full">
                           <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                        </Button>
                        <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                           <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Get Certified</Link>
                        </Button>
                     </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}