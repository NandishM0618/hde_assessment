import { Suspense } from "react";
import SuccessPageContent from "./SuccessPageContext";

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">Loading success page...</p>
        </div>}>
            <SuccessPageContent />
        </Suspense>
    );
}
