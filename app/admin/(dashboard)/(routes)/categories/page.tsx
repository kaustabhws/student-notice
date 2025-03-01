import prismadb from "@/lib/prismadb";
import CategoriesClient from "./components/categories-client";

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    include: {
      _count: {
        select: {
          notices: true,
          subscribers: true,
        },
      },
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 max-[425px]:px-3">
        <CategoriesClient categories={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
