"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';

export default function RemoveBtn({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isModalOpen]);

    const handleDeleteQuiz = async () => {
        const res = await fetch(`https://sinarogan-website.vercel.app/api/umkm/${id}`, {
            method: "PUT",
        });

        if (res.ok) {
            window.location.reload();
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Tombol untuk membuka modal konfirmasi */}
            <button onClick={openModal} className="text-red-400 py-3 px-3 cursor-pointer">
                <HiOutlineTrash size={34} />
            </button>

            {/* Modal untuk konfirmasi penghapusan */}
        </div>
    );
}
