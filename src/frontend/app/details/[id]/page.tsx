'use client'
import apiClient from "@/services/apiService";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Details() {
    const { id } = useParams();
    const [exp, setExp] = useState<any>(null);
    const [qty, setQty] = useState<any>(1)
    const [selectedDate, setSelectedDate] = useState<String>("");
    const [selectedTime, setSelectedTime] = useState<String>("");

    const api = new apiClient();

    async function getExperience() {
        try {
            const res = await api.get(`experiences/${id}`);
            console.log(res)
            setExp(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id) getExperience();
    }, [id]);

    if (!exp) return <p className="text-center py-20 text-lg font-medium">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto p-5 mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="md:col-span-2 space-y-6">

                {/* Back Button */}
                <Link href="/" className="font-medium text-lg flex items-center gap-1 text-gray-700 hover:text-black">
                    <span>←</span> Details
                </Link>

                {/* Image */}
                <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-64 sm:h-80 object-cover rounded-xl shadow"
                />

                {/* Title & Description */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{exp.title}</h1>
                <p className="text-gray-500 text-sm sm:text-base">{exp.location}</p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{exp.description}</p>

                {/* Choose Date */}
                <div>
                    <h2 className="font-semibold text-lg mb-2">Choose Date</h2>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(new Set((exp.slots || []).map((s: any) => s.date))).map((date) => {
                            const formattedDate = new Date(date as string).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            });

                            return (
                                <button
                                    key={date as string}
                                    onClick={() => setSelectedDate(date as string)}
                                    className={`px-3 py-2 rounded-md border text-sm transition-all ${selectedDate === date
                                            ? "bg-yellow-500 border-yellow-600 text-black font-medium"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {formattedDate}
                                </button>
                            );
                        })}

                    </div>
                </div>

                {/* Choose Time */}
                <div>
                    <h2 className="font-semibold text-lg mb-2">Choose Time</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {(exp.slots || []).map((slot: any) => {
                            const isSoldOut = slot.isBooked;

                            return (
                                <button
                                    key={slot._id}
                                    onClick={() => !isSoldOut && (setSelectedTime(slot.time), setSelectedDate(slot.date))}
                                    disabled={isSoldOut}
                                    className={`px-4 py-2 cursor-pointer rounded-md border text-sm min-w-[110px] flex justify-between
                  ${selectedTime === slot.time && !isSoldOut
                                            ? "bg-yellow-500 border-yellow-600 text-black font-bold"
                                            : isSoldOut
                                                ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    <div className="flex gap-2">
                                        <span>{slot.time}</span>
                                        <span className={`text-xs ${isSoldOut ? "text-red-500" : "text-red-500"}`}>
                                            {isSoldOut ? "Sold out" : "2 left"}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="">
                        <p className="text-gray-400 text-sm">All times are in IST GMT(+5:30)</p>
                    </div>
                </div>

                <div className="">
                    <h2 className="mb-2 font-medium text-lg">About</h2>
                    <div className=" bg-gray-300 w-full p-2 rounded-sm">
                        <p className="text-sm text-gray-500">Scenic routes, trained guides, and safety breifing. Minimum age 10.</p>
                    </div>
                </div>

            </div>

            {/* RIGHT */}
            <div className="bg-gray-100 w-full rounded-md shadow-md p-5 sticky top-20 h-fit space-y-5">

                <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
                    <div className="space-y-4 font-medium text-gray-700">
                        <p>Starts at</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                        <p>Taxes</p>
                        <hr />
                        <p className="text-lg font-bold text-black">Total</p>
                    </div>

                    <div className="space-y-4 text-right">
                        <p className="font-bold text-gray-900">₹{exp.price}</p>

                        <div className="flex justify-end items-center gap-2">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2 border border-gray-400 font-bold">−</button>
                            <span className="font-semibold">{qty}</span>
                            <button onClick={() => setQty(qty + 1)} className="px-2 border border-gray-400 font-bold">+</button>
                        </div>

                        <p className="font-bold">₹{(exp.price * qty).toLocaleString()}</p>
                        <p className="font-bold">₹{Math.round(exp.price * qty * 0.18).toLocaleString()}</p>
                        <hr />
                        <p className="text-lg font-bold">₹{(exp.price * qty + Math.round(exp.price * qty * 0.18)).toLocaleString()}</p>
                    </div>
                </div>

                <button
                    disabled={!selectedDate || !selectedTime}
                    className={`w-full py-3 rounded-lg font-semibold transition text-sm
          ${!selectedDate || !selectedTime
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600 text-black"
                        }`}
                >
                    <Link
                        href={`/checkout/${id}?exp=${exp.title}&date=${selectedDate}&time=${selectedTime}&qty=${qty}&subtotal=${exp.price * qty}`}
                    >
                        Confirm
                    </Link>

                </button>
            </div>
        </div>

    );
}
