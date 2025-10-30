import { Suspense } from "react";
import CheckoutPageClient from "./CheckoutPageClient";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading checkout...</div>}>
            <CheckoutPageClient />
        </Suspense>
    );
}
