import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const user = await auth();
    const categoryId = (await params).categoryId

    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, description } = body;

    if (!name || !description) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const isValid = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!isValid) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const category = await prismadb.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error("CATEGORY_PATCH_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
) {
  try {
    const user = await auth();
    const body = await req.json();
    const { id } = body;

    if(!id) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isValid = await prismadb.category.findUnique({
      where: {
        id,
      },
    });

    if (!isValid) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await prismadb.category.delete({
      where: {
        id,
      },
    });

    return new NextResponse("Category Deleted", { status: 200 });
  } catch (error) {
    console.error("CATEGORY_DELETE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
