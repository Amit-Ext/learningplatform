import Link from 'next/link'
import { 
  BookOpen, 
  BrainCircuit, 
  BotIcon, 
  Code 
} from 'lucide-react'

const features = [
  {
    name: 'Artificial Intelligence',
    description: 'Learn the fundamentals of AI and machine learning through interactive lessons.',
    icon: BrainCircuit
  },
  {
    name: 'Generative AI',
    description: 'Explore the world of generative AI and create amazing projects.',
    icon: Code
  },
  {
    name: 'Robotics',
    description: 'Get hands-on experience with robotics and automation.',
    icon: BotIcon
  },
  {
    name: 'Programming',
    description: 'Master programming fundamentals with practical exercises.',
    icon: BookOpen
  }
]

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Learn Technology Skills for the Future
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join our comprehensive learning platform designed for grades 1-12. Master AI, robotics, and programming through interactive lessons.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get started
              </Link>
              <Link href="/courses" className="text-sm font-semibold leading-6 text-gray-900">
                View courses <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Learn Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to excel in technology
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our curriculum is designed to make learning technology fun and accessible for all age groups.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <Icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
