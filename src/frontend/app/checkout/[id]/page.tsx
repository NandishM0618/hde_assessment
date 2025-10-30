"use client";

import apiClient from "@/services/apiService";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Checkout({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [promo, setPromo] = useState("");
    const [discount, setDiscount] = useState<{ type: string; value: number } | null>(null);
    const [agree, setAgree] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter()

    const title = searchParams.get("exp")
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const qty = Number(searchParams.get("qty") || 1);
    const subtotal = Number(searchParams.get("subtotal") || 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    const api = new apiClient();

    const discountAmount =
        discount?.type === "percent"
            ? Math.round((subtotal * discount.value) / 100)
            : discount?.type === "flat"
                ? discount.value
                : 0;

    const finalAmount = subtotal + tax - discountAmount;

    async function handleBooking() {
        try {
            const res = await api.post("bookings/", {
                experienceId: id,
                customerName: name,
                customerEmail: email,
                date,
                time,
                qty,
                subtotal,
                tax,
                promoCode: promo,
                price: finalAmount
            });

            console.log(res)
            if (res.message === "Booking successful") {
                router.push(`/success?booking=${res.booking._id}`);
            }

        } catch (error) {
            alert("Booking failed ❌");
        }
    }

    async function validatePromo() {
        try {
            const res = await api.post("promo/validate", { code: promo });

            console.log(res)
            if (res.valid) {
                setDiscount({
                    type: res.type,
                    value: res.value
                });
                alert("Promo applied successfully ✅");
            }

        } catch (error) {
            alert("Invalid promo code ❌");
        }
    }

    return (
        <>

            <div className="max-w-6xl mx-auto p-5 mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className=" md:col-span-2 p-3 rounded-sm space-y-6">
                    <Link href="/" className="font-medium text-lg flex items-center gap-1 text-gray-700 hover:text-black">
                        <span>←</span> Checkout
                    </Link>
                    <div className="bg-gray-200 p-8 space-y-6 rounded-sm">
                        <div className="flex gap-5 w-full">
                            <div>
                                <label className="font-medium text-sm text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full  bg-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-black"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="font-medium text-sm text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-black"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-medium text-sm text-gray-700">Promo Code</label>
                            <div className="flex gap-2 mt-1">
                                <input
                                    type="text"
                                    className="w-full bg-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-black"
                                    placeholder="Enter promo code"
                                    value={promo}
                                    onChange={(e) => setPromo(e.target.value)}
                                />
                                <button onClick={validatePromo} className="px-4 py-2 cursor-pointer rounded-md bg-black text-white text-sm hover:bg-opacity-80">
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                                className="mt-1 cursor-pointer"
                            />
                            <p className="text-sm text-gray-600">
                                I confirm that the details provided are correct and agree to the terms.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl shadow-md h-fit space-y-4 sticky top-20">

                    <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

                    <div className="space-y-2 text-sm text-gray-700">
                        <p><span className="font-medium">Experience:</span> {title}</p>
                        <p><span className="font-medium">Date:</span> {date}</p>
                        <p><span className="font-medium">Time:</span> {time}</p>
                        <p><span className="font-medium">Quantity:</span> {qty}</p>
                    </div>

                    <hr />

                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxes</span>
                            <span className="font-medium">₹{tax.toLocaleString()}</span>
                        </div>

                        <hr />

                        {discount && (
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>Discount</span>
                                <span>-₹{discountAmount.toLocaleString()}</span>
                            </div>
                        )}

                        <hr />

                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>₹{finalAmount.toLocaleString()}</span>
                        </div>

                    </div>

                    <button
                        disabled={!agree}
                        onClick={handleBooking}
                        className={`w-full py-2.5 rounded-lg text-sm font-medium transition ${!agree
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-yellow-500 text-black hover:bg-yellow-600"
                            }`}
                    >
                        Proceed to Pay
                    </button>


                </div>
            </div>
        </>
    );
}
