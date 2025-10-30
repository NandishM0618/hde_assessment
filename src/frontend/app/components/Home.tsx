'use client'
import { useEffect, useState } from "react";
import apiClient from '../../services/apiService'
import Header from "./Header";
import Link from "next/link";

export default function Home() {
    const [experiences, setExperiences] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const api = new apiClient();

    async function getExperiences() {
        try {
            const res = await api.get("experiences");
            console.log(res);
            setExperiences(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getExperiences();
    }, []);

    const filteredExperiences = searchTerm
        ? experiences.filter((exp) =>
            exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : experiences;

    return (
        <>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <main className="max-w-7xl mx-auto p-4">
                <div className="grid gap-5 
                  grid-cols-1 
                  sm:grid-cols-2 
                  lg:grid-cols-3 
                  xl:grid-cols-4">
                    {filteredExperiences.length > 0 ? (
                        filteredExperiences.map((exp) => (
                            <div key={exp._id} className="bg-white rounded-xl shadow flex flex-col h-full hover:shadow-lg transition border border-gray-100">

                                <img
                                    src={exp.image}
                                    alt={exp.title}
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />

                                <div className="p-4 flex flex-col flex-1 space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <h2 className="font-semibold text-lg line-clamp-1">{exp.title}</h2>

                                        <div className="inline-flex items-center gap-1 bg-gray-100 text-black/70 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
                                            {exp.location.split(",")[1]?.trim()}
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {exp.description}
                                    </p>

                                    {/* bottom price + button */}
                                    <div className="flex items-center justify-between mt-auto pt-2">
                                        <p className="font-bold text-black/70 text-lg">
                                            <span className="text-sm font-light text-black/40">From </span>₹{exp.price}
                                        </p>

                                        <Link href={`/details/${exp._id}`}>
                                            <button className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))) : (
                        <p className="text-gray-500 col-span-full text-center">No experiences found</p>
                    )}
                </div>
            </main>
        </>
    );
}