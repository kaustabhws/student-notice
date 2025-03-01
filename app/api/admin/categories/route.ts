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
    const { name, description } = body;

    if(!name || !description) {
        return new NextResponse("Bad Request", { status: 400 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.log("CATEGORY_POST_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
