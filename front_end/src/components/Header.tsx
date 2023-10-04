import { Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

const navItems = [
  { name: "home", to: "/" },
  { name: "dashboard", to: "/dashboard" },
  { name: "myaccount", to: "/myaccount" },
];

function Header() {
  return (
    <div className="py-4 text-[20px] flex justify-between items-center">
      <div className="font-bold text-2xl">ForexLy</div>

      <nav className="hidden lg:flex gap-4 ">
        {navItems.map((item) => (
          <Link key={item.name} to={item.to}>
            {item.name}
          </Link>
        ))}
        <Link to="/register">
          <Button>join now</Button>
        </Link>
      </nav>

      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex flex-col bg-primary-foreground p-4 gap-1 rounded">
            <DropdownMenuItem>
              <div>user: name</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div>bal: 1234.33</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div>Logout</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col bg-primary-foreground p-4 gap-1 rounded">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.name}>
                  <Link to={item.to}> {item.name} </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Header;
