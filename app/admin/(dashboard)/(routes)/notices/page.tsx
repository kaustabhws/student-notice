import prismadb from "@/lib/prismadb";
import { NoticeClient } from "./components/client";
import { getISTTime } from "@/lib/getISTTime";
import { format } from "date-fns";

const NoticePage = async () => {
  const notice = await prismadb.notice.findMany({
    include: {
      category: true,
      author: true,
      views: true,
      files: true,
    },
  });

  const formattedNotice = notice.map((n) => ({
    id: n.id,
    title: n.title,
    description: n.description || "",
    fileType: n.files[0]?.mimeType || "unknown",
    category: {
      name: n.category.name,
    },
    status: n.status,
    publishedAt: format(getISTTime(n.createdAt), "MMMM do, yyyy"),
    views: n.views.length,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 max-[425px]:px-3">
        <NoticeClient data={formattedNotice} />
      </div>
    </div>
  );
};

export default NoticePage;
