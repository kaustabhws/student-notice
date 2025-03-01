import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: { categoryId: string } }
) {
  try {
    const user = await auth();

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
        id: context.params.categoryId,
      },
    });

    if (!isValid) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const category = await prismadb.category.update({
      where: {
        id: context.params.categoryId,
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
  context: { params: { categoryId: string } }
) {
  try {
    const user = await auth();

    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isValid = await prismadb.category.findUnique({
      where: {
        id: context.params.categoryId,
      },
    });

    if (!isValid) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await prismadb.category.delete({
      where: {
        id: context.params.categoryId,
      },
    });

    return new NextResponse("Category Deleted", { status: 200 });
  } catch (error) {
    console.error("CATEGORY_DELETE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
