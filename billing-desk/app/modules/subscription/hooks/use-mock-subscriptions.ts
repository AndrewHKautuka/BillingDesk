import { useState } from "react"

import type { Subscription } from "~/subscription/types/subscription-model"
import type {
  CreateSubscriptionFormData,
  UpdateSubscriptionFormData,
} from "~/subscription/validations/subscription-validations"

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

  // --- Group 1: same startDate 2024-03-15 (4 subscriptions) ---
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Slack Pro",
    cost: 87.5,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-03-15"),
    status: "active",
    category: "Communication",
  },
  {
    id: "a2b3c4d5-e6f7-8901-bcde-f12345678901",
    name: "Figma Professional",
    cost: 144.0,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-03-15"),
    status: "active",
    category: "Design",
  },
  {
    id: "a3b4c5d6-e7f8-9012-cdef-123456789012",
    name: "Trello Premium",
    cost: 60.0,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-03-15"),
    status: "active",
    category: "Productivity",
  },
  {
    id: "a4b5c6d7-e8f9-0123-def0-234567890123",
    name: "Grammarly Business",
    cost: 14.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-03-15"),
    status: "active",
    category: "Productivity",
  },

  // --- Group 2: same startDate 2024-07-01 (3 subscriptions) ---
  {
    id: "b1c2d3e4-f5a6-7890-bcde-f67890123456",
    name: "AWS Lightsail",
    cost: 5.0,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-07-01"),
    status: "active",
    category: "Development",
  },
  {
    id: "b2c3d4e5-f6a7-8901-cdef-678901234567",
    name: "Cloudflare Pro",
    cost: 20.0,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-07-01"),
    status: "active",
    category: "Development",
  },
  {
    id: "b3c4d5e6-f7a8-9012-def0-789012345678",
    name: "Vercel Pro",
    cost: 20.0,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-07-01"),
    status: "active",
    category: "Development",
  },

  // --- Group 3: same startDate 2023-11-01 (3 subscriptions) ---
  {
    id: "c1d2e3f4-a5b6-7890-cdef-890123456789",
    name: "Hulu",
    cost: 17.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-11-01"),
    status: "active",
    category: "Entertainment",
  },
  {
    id: "c2d3e4f5-a6b7-8901-def0-901234567890",
    name: "HBO Max",
    cost: 15.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-11-01"),
    status: "active",
    category: "Entertainment",
  },
  {
    id: "c3d4e5f6-a7b8-9012-ef01-012345678901",
    name: "Apple TV+",
    cost: 9.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-11-01"),
    status: "active",
    category: "Entertainment",
  },

  // --- Additional standalone subscriptions ---
  {
    id: "d1e2f3a4-b5c6-7890-def0-123456789abc",
    name: "1Password Families",
    cost: 4.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-01-20"),
    status: "active",
    category: "Security",
  },
  {
    id: "d2e3f4a5-b6c7-8901-ef01-23456789abcd",
    name: "Duolingo Plus",
    cost: 83.88,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-02-05"),
    status: "active",
    category: "Education",
  },
  {
    id: "d3e4f5a6-b7c8-9012-f012-3456789abcde",
    name: "Todoist Pro",
    cost: 48.0,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2023-09-18"),
    status: "active",
    category: "Productivity",
  },
  {
    id: "d4e5f6a7-b8c9-0123-0123-456789abcdef",
    name: "Headspace",
    cost: 69.99,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-04-10"),
    status: "active",
    category: "Health & Fitness",
  },
  {
    id: "d5e6f7a8-b9ca-1234-1234-56789abcdef0",
    name: "Coursera Plus",
    cost: 399.0,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-06-15"),
    status: "active",
    category: "Education",
  },
  {
    id: "d6e7f8a9-bacb-2345-2345-6789abcdef01",
    name: "NordVPN",
    cost: 71.88,
    currency: "eur",
    billingCycle: "yearly",
    startDate: new Date("2023-10-30"),
    status: "inactive",
    category: "Security",
  },
  {
    id: "d7e8f9aa-bbcc-3456-3456-789abcdef012",
    name: "iCloud 200GB",
    cost: 2.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-03-01"),
    status: "active",
    category: "Cloud Storage",
  },
  {
    id: "d8e9faab-bccd-4567-4567-89abcdef0123",
    name: "Google One 2TB",
    cost: 9.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-08-10"),
    status: "active",
    category: "Cloud Storage",
  },
  {
    id: "d9eafbac-cdde-5678-5678-9abcdef01234",
    name: "Plex Pass",
    cost: 39.99,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-05-25"),
    status: "active",
    category: "Entertainment",
  },
  {
    id: "daebfcbd-deef-6789-6789-abcdef012345",
    name: "Evernote Personal",
    cost: 129.99,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2023-07-04"),
    status: "inactive",
    category: "Productivity",
  },
  {
    id: "dbfcadce-ef00-7890-7890-bcdef0123456",
    name: "Dashlane Premium",
    cost: 59.99,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-01-08"),
    status: "active",
    category: "Security",
  },
  {
    id: "dcfdbecf-f011-8901-8901-cdef01234567",
    name: "Twitch Turbo",
    cost: 8.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-12-20"),
    status: "active",
    category: "Entertainment",
  },
  {
    id: "ddfecfd0-0122-9012-9012-def012345678",
    name: "Adobe Photoshop",
    cost: 20.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-02-01"),
    status: "active",
    category: "Software",
  },
  {
    id: "def0d0e1-1233-0123-0123-ef0123456789",
    name: "Electricity Bill",
    cost: 45000.0,
    currency: "mwk",
    billingCycle: "monthly",
    startDate: new Date("2024-04-01"),
    status: "active",
    category: "Utilities",
  },
  {
    id: "df01e1f2-2344-1234-1234-f01234567890",
    name: "Water Bill",
    cost: 12000.0,
    currency: "mwk",
    billingCycle: "monthly",
    startDate: new Date("2024-04-01"),
    status: "active",
    category: "Utilities",
  },
  {
    id: "e002f2a3-3455-2345-2345-012345678901",
    name: "Setapp",
    cost: 9.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2023-11-15"),
    status: "active",
    category: "Software",
  },
  {
    id: "e1030304-4566-3456-3456-123456789012",
    name: "JetBrains All Products",
    cost: 249.0,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-06-20"),
    status: "active",
    category: "Development",
  },
  {
    id: "e2041415-5677-4567-4567-234567890123",
    name: "Calm Premium",
    cost: 69.99,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2023-10-05"),
    status: "inactive",
    category: "Health & Fitness",
  },
  {
    id: "e3052526-6788-5678-5678-345678901234",
    name: "Xbox Game Pass",
    cost: 14.99,
    currency: "usd",
    billingCycle: "monthly",
    startDate: new Date("2024-07-01"),
    status: "active",
    category: "Gaming",
  },
  {
    id: "e4063637-7899-6789-6789-456789012345",
    name: "PlayStation Plus",
    cost: 59.99,
    currency: "usd",
    billingCycle: "yearly",
    startDate: new Date("2024-05-05"),
    status: "active",
    category: "Gaming",
  },
]

export function useMockSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(
    initialMockSubscriptions
  )

  const addSubscription = (data: CreateSubscriptionFormData) => {
    setSubscriptions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        status: "active",
        ...data,
      },
    ])
  }

  const updateSubscription = (id: string, data: UpdateSubscriptionFormData) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              id,
              status: sub.status,
              ...data,
            }
          : sub
      )
    )
  }

  const deleteSubscription = (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id))
  }

  const toggleSubscriptionStatus = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: sub.status === "active" ? "inactive" : "active",
            }
          : sub
      )
    )
  }

  return {
    subscriptions,
    inactiveSubscriptions: subscriptions.filter(
      (sub) => sub.status === "inactive"
    ),
    isLoading: true,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    toggleSubscriptionStatus,
  }
}

export function useMockMonthlyTotal() {
  const { subscriptions } = useMockSubscriptions()

  // Calculate total monthly spending from active subscriptions
  // Yearly costs are divided by 12, monthly costs are used as-is
  const total = subscriptions.reduce((sum, sub) => {
    // Only include active subscriptions
    if (sub.status !== "active") {
      return sum
    }

    // Normalize to monthly cost based on billing cycle
    const monthlyCost = sub.billingCycle === "yearly" ? sub.cost / 12 : sub.cost

    return sum + monthlyCost
  }, 0)

  return {
    total,
    isLoading: true,
  }
}
