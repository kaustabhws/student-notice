import prismadb from "@/lib/prismadb";
import { NoticeForm } from "./components/table-form";

const NoticePage = async ({
  params,
}: {
  params: Promise<{ noticeId: string }>;
}) => {
  const noticeId = (await params).noticeId;

  const notice = await prismadb.notice.findUnique({
    where: {
      id: noticeId,
    },
    include: {
      category: true,
      files: true,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-4 max-[425px]:px-3">
        <NoticeForm initialData={notice} categories={categories} />
      </div>
    </div>
  );
};

export default NoticePage;
