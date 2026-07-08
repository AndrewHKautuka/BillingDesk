import { useState } from "react"

import type { Subscription } from "~/subscription/types/subscription-model"

const initialMockSubscriptions: Subscription[] = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    name: "Netflix Premium",
    cost: 19.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-01-15"),
    status: "active",
    category: "Entertainment",
  },
  {
    id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    name: "Spotify Family",
    cost: 16.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-11-20"),
    status: "active",
    category: "Entertainment",
  },
  {
    id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    name: "Adobe Creative Cloud",
    cost: 599.88,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-03-01"),
    status: "active",
    category: "Software",
  },
  {
    id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    name: "GitHub Pro",
    cost: 48.0,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2023-12-10"),
    status: "active",
    category: "Development",
  },
  {
    id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    name: "Microsoft 365",
    cost: 99.99,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-02-14"),
    status: "active",
    category: "Productivity",
  },
  {
    id: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
    name: "Amazon Prime",
    cost: 14.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-09-05"),
    status: "active",
    category: "Shopping",
  },
  {
    id: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
    name: "Zoom Pro",
    cost: 149.9,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-01-01"),
    status: "active",
    category: "Communication",
  },
  {
    id: "8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
    name: "Dropbox Plus",
    cost: 11.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-10-12"),
    status: "inactive",
    category: "Cloud Storage",
  },
  {
    id: "9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x",
    name: "LinkedIn Premium",
    cost: 29.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-04-20"),
    status: "active",
    category: "Professional",
  },
  {
    id: "0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y",
    name: "Notion Pro",
    cost: 96.0,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2023-08-15"),
    status: "active",
    category: "Productivity",
  },
  {
    id: "1k2l3m4n-5o6p-7q8r-9s0t-1u2v3w4x5y6z",
    name: "Disney+",
    cost: 10.99,
    currency: "eur",
    billingCycle: "monthly",
    startDate: new Date("2024-05-10"),
    status: "active",
    category: "Entertainment",
  },
  {
    id: "2l3m4n5o-6p7q-8r9s-0t1u-2v3w4x5y6z7a",
    name: "Canva Pro",
    cost: 119.99,
    currency: "eur",
    billingCycle: "yearly",
    startDate: new Date("2023-07-22"),
    status: "active",
    category: "Design",
  },
  {
    id: "3m4n5o6p-7q8r-9s0t-1u2v-3w4x5y6z7a8b",
    name: "Mobile Data Plan",
    cost: 25000.0,
    currency: "mwk",
    billingCycle: "monthly",
    startDate: new Date("2024-06-01"),
    status: "active",
    category: "Utilities",
  },
  {
    id: "4n5o6p7q-8r9s-0t1u-2v3w-4x5y6z7a8b9c",
    name: "Gym Membership",
    cost: 49.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-06-15"),
    status: "inactive",
    category: "Health & Fitness",
  },
  {
    id: "5o6p7q8r-9s0t-1u2v-3w4x-5y6z7a8b9c0d",
    name: "VPN Service",
    cost: 89.99,
    currency: "eur",
    billingCycle: "yearly",
    startDate: new Date("2024-02-28"),
    status: "active",
    category: "Security",
  },
  {
    id: "6p7q8r9s-0t1u-2v3w-4x5y-6z7a8b9c0d1e",
    name: "YouTube Premium",
    cost: 11.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-12-01"),
    status: "active",
    category: "Entertainment",
  },
]

export function useMockSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(
    initialMockSubscriptions
  )

  const addSubscription = (data: Subscription) => {
    setSubscriptions((prev) => [...prev, data])
  }

  const updateSubscription = (id: string, data: Subscription) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...data, id } : sub))
    )
  }

  return {
    subscriptions,
    isLoading: false,
    addSubscription,
    updateSubscription,
  }
}
