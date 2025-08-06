import { Link } from "@/i18n/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import LocaleSwitcher from "./locale-switcher";
import { Suspense } from "react";
import { Button } from "@/components/ui/button"

export default async function NavMenu() {
  return <NavigationMenu>
    <NavigationMenuList className="flex gap-2 text-menu-color">
      <NavigationMenuItem>
        <Link className="text-2xl" href="/">Mediaschool.ai</Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/courses">Courses</Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/library">Library</Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/events">Events</Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Suspense>
          <LocaleSwitcher />
        </Suspense>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
}

export function ButtonAccount() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button>Account</Button>
    </div>
  )
}

