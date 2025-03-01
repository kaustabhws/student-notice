"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Tag,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modal/alert-modal";

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

interface CategoryProps {
  categories: {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: {
      notices: number;
      subscribers: number;
    };
  }[];
}

const CategoriesClient: React.FC<CategoryProps> = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (editingCategory) {
      form.reset({
        id: editingCategory.id || "",
        name: editingCategory.name || "",
        description: editingCategory.description || "",
      });
    } else {
      form.reset({
        id: "",
        name: "",
        description: "",
      });
    }
  }, [editingCategory, form]);

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };
  

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/admin/categories/${id}`);
      if (response.status === 200) {
        router.refresh();
        toast.success("Category deleted successfully");
      }
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Something went wrong");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (values.id) {
        // update
        const response = await axios.patch(
          `/api/admin/categories/${values.id}`,
          values
        );
        if (response.status === 200) {
          router.refresh();
          toast.success("Category updated successfully");
          setIsDialogOpen(false);
        }
      } else {
        // create
        const response = await axios.post("/api/admin/categories", values);
        if (response.status === 200) {
          router.refresh();
          toast.success("Category created successfully");
          setIsDialogOpen(false);
        }
      }
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        loading={loading}
      />
      <div className="flex-col">
        <div className="flex items-center justify-between mb-5">
          <Heading title="Categories" description="Manage categories" />
          <Button
            onClick={handleAddCategory}
            className="flex items-center"
            disabled={loading}
          >
            <PlusCircle className="h-4 w-4" />
            Add Category
          </Button>
        </div>
        <Separator className="mb-5" />
        {/* categories */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">
                  {category.name}
                </CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant="outline">
                  {category._count.notices} notices
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleEditCategory(category)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDeleteClick(category.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* edit/new dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Update the details of this category"
                  : "Create a new category for organizing notices"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter category name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category description</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter category description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading}>Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CategoriesClient;
