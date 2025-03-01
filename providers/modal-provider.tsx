"use client"

import { AdminModal } from "@/components/modal/admin-modal"
import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
      setIsMounted(true)
    }, [])
    
    if(!isMounted) {
        return null;
    }

    return (
        <>
            <AdminModal />
        </>
    )

}