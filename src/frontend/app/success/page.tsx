import { Suspense } from "react";
import SuccessPageContent from "./SuccessPageContext";

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessPageContent />
        </Suspense>
    );
}
