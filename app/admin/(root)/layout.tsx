import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();

    if(!user) {
        redirect('/sign-in')
    }

    const admin = await prismadb.admin.findFirst({
        where: {
            clerkId: user.id
        },
    });

    if(admin) {
        redirect(`/admin/dashboard`)
    }

    return (
        <>
            {children}
        </>
    )
}