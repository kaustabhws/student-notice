"use client"

import { useAdminModal } from "@/hooks/use-admin-modal";
import { useEffect } from "react";

const Page = () => {

    const onOpen = useAdminModal((state) => state.onOpen)
    const isOpen = useAdminModal((state) => state.isOpen)

    useEffect(() => {
      if(!isOpen) {
        onOpen();
      }
    }, [isOpen, onOpen])
    

    return null;
}
 
export default Page;