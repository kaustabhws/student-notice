import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await auth();

    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, clerkId, imgUrl, email } = body;

    const admin = await prismadb.admin.create({
      data: {
        clerkId,
        name,
        imgUrl,
        email,
      },
    });

    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    console.log("ADMIN_POST_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
