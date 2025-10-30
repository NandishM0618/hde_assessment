import { Suspense } from "react";
import CheckoutPageClient from "./CheckoutPageClient";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">Loading checkout...</p>
        </div>}>
            <CheckoutPageClient />
        </Suspense>
    );
}
