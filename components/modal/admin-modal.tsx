"use client";

import * as z from "zod";

import { useAdminModal } from "@/hooks/use-admin-modal";
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  name: z.string().min(1),
});

export const AdminModal = () => {
  const AdminModal = useAdminModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const user = useUser();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user || !user.user) {
      toast.error("User not found");
      return;
    }

    try {
      setLoading(true);
      const requestData = {
        ...values,
        email: user.user.primaryEmailAddress?.emailAddress,
        clerkId: user.user.id,
        imgUrl: user.user.imageUrl,
      };

      const response = await axios.post("/api/admin", requestData);

      toast.success("Admin created");

      window.location.assign(`/admin/dashboard`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create account"
      description=""
      isOpen={AdminModal.isOpen}
      onClose={AdminModal.onClose}
    >
      <div>
        <div className="space-y-4 py-4 pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={AdminModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
