import { Suspense } from 'react'

import PaymentSuccessContent from '@/components/payment/PaymentSuccessContent'

export const dynamic = 'force-dynamic'

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    )
}