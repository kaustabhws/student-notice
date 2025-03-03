"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { NoticeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface NoticeClientProps {
  data: NoticeColumn[];
}

export const NoticeClient: React.FC<NoticeClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Notices (${data.length})`}
          description="Manage notices"
        />
        <Button onClick={() => router.push(`/admin/notices/new`)}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
    </>
  );
};
