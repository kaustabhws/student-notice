import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  if (!user.userId) {
    redirect("/admin/sign-in");
  }

  const admin = await prismadb.admin.findFirst({
    where: {
      clerkId: user.userId,
    },
  });

  if (!admin) {
    redirect("/admin");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
