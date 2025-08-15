"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "../../components/ui/button";

export default function DashboardBtn(villageInfo) {
    const [dashboards, setDashboards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const res = await fetch('/api/dashboard', {
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


    console.log(villageInfo);

    return (
        <div>
            {dashboards.map((villageInfo) => (
                <div key={villageInfo._id}>
                    <Link
                        href={`/editDashboard/${villageInfo._id}`}
                        className={buttonVariants({
                            size: "sm",
                            variant: "ghost",
                        })}>
                        Dashboard
                    </Link>
                </div>
            ))}
        </div>
    );
}