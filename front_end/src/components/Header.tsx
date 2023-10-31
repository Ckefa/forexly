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
import { useState } from "react";

type parVal = {
  user: {
    user: string | null;
    bal: string | null;
  };
  host: string;
};
function Header({ user, host }: parVal) {
  const [logout, setLogout] = useState(false);
  const [login, setLogin] = useState(false);

  const navItems = [
    { name: "home", to: "/" },
    { name: "dashboard", to: "/dashboard" },
    { name: "myaccount", to: "/myaccount" },
  ];

  const onLogin = () => {
    setLogin(true);
  };
  const onLogout = () => {
    fetch(`${host}logout`)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
    setLogout(true);
  };

  if (logout) window.location.href = "/";
  else if (login) window.location.href = "/login";

  return (
    <div className="py-4 text-[20px] flex justify-between items-center">
      <div className="font-bold text-2xl">Trade IQ Investment</div>

      <nav className="hidden lg:flex gap-4 ">
        {navItems.map((item) => (
          <Link key={item.name} to={item.to}>
            {item.name}
          </Link>
        ))}

        {!user.user && (
          <Link to="/register">
            <Button>join now</Button>
          </Link>
        )}
      </nav>

      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex flex-col bg-primary-foreground p-4 gap-1 rounded">
            <DropdownMenuItem>
              <div>user: {user.user}</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div>bal: {user.bal}</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {user.user ? (
                <Button onClick={onLogout}>Logout</Button>
              ) : (
                <Button onClick={onLogin}>Login</Button>
              )}
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
