"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "../../components/ui/button";

export default function UmkmDashboardBtn(umkmInfo) {
    const [dashboards, setDashboards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const res = await fetch('/api/umkm', {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch information");
                }

                const data = await res.json();
                setDashboards(data.dashboards);
            } catch (error) {
                console.error("Error Loading informations: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboards();
    }, []);


    console.log(umkmInfo);

    return (
        <div>
            {dashboards.map((umkmInfo) => (
                <div key={umkmInfo._id}>
                    <Link
                        href={`/editUmkm/${umkmInfo._id}`}
                        className="select-none bg-white hover:bg-orange-400 px-3 py-1 rounded-lg hover:text-white text-orange-400 cursor-pointer font-semibold transition">
                        Dashboard
                    </Link>
                </div>
            ))}
        </div>
    );
}