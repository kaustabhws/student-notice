import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ModeToggle } from "./mode-toggle";
// import HamburgerMenu from "./hamburger";

const Navbar = async () => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/admin/sign-in");
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-[400px]:px-1">
        <div className="min-[900px]:hidden">{/* <HamburgerMenu /> */}</div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4 max-[400px]:space-x-2">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
