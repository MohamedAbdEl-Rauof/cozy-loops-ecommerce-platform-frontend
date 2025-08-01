import { Suspense } from 'react';

import PaymentContent from '@/components/payment/PaymentContent';

export const dynamic = 'force-dynamic';

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentContent />
        </Suspense>
    );
}