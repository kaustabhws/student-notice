"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type NoticeColumn = {
  id: string;
  title: string;
  description: string;
  fileType: string;
  category: {
    name: string;
  };
  status: string;
  publishedAt: string;
  views: number;
};

export const columns: ColumnDef<NoticeColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "fileType",
    header: ""
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category?.name || "No Category",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "publishedAt",
    header: "Published At",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
