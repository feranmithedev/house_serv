
import { Search, CalendarCheck, KeyRound, Sparkles } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover your space',
    description:
      'Explore properties for rent or sale and find a place that matches your needs.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Schedule an inspection',
    description:
      'Contact the agent and arrange a physical visit to see the property yourself.',
  },
  {
    number: '03',
    icon: KeyRound,
    title: 'Make it your home',
    description:
      'Once you have visited and confirmed your decision, move forward with your property deal.',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Settle in with ease',
    description:
      'Discover trusted home-service providers to help make your new space comfortable.',
  },
]

function HowItWorks() {
  return (
    <section className="bg-[#F7F3EA] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#174C3C]">
            Simple process
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#252925] md:text-5xl">
            From searching to settling in.
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Finding a property is just the beginning. House&Serv helps you
            navigate every step towards making it feel like home.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div key={step.number} className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#174C3C] text-white">
                  <Icon size={25} />
                </div>

                <span className="text-sm font-bold tracking-widest text-[#174C3C]/60">
                  STEP {step.number}
                </span>

                <h3 className="mt-3 text-xl font-bold text-[#252925]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks