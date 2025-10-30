'use client'
import Image from "next/image";
import Link from "next/link";
import success from '@/public/assets/ep_success-filled.png'
import { useSearchParams } from "next/navigation";

export default function Success() {
    const searchParams = useSearchParams();

    const id = searchParams.get("booking");

    return (
        <div className="flex flex-col items-center py-20">
            <Image
                src={success}
                alt="success"
                width={100}
                height={100}
                className="object-contain"
            />
            <h2 className="text-3xl font-bold text-green-600"> Booking Successful!</h2>
            <p className="mt-2 text-gray-600">Ref ID: {id}</p>
            <div className="bg-gray-300 rounded-sm mt-8 p-2">
                <Link href="/" className="mt-6 text-sm  text-black">
                    Back to home
                </Link>
            </div>
        </div>
    );
}
