"use client"

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function ConfigStepProfile({
  value,
  onChange,
}: Props) {

  const profiles = [
    "Ideal 4000",
    "Ideal 5000",
    "Ideal 7000",
    "Ideal 8000",
  ]

  return (

    <div className="rounded-[28px] bg-[#071120] border border-white/5 p-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Profile Selection
      </h2>

      <div className="grid gap-4">

        {profiles.map((profile) => (

          <button
            key={profile}
            onClick={() => onChange(profile)}
            className={`p-5 rounded-2xl border transition-all text-left ${
              value === profile
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 bg-[#0B1728] hover:border-blue-500/50"
            }`}
          >

            <div className="font-semibold text-white">
              {profile}
            </div>

          </button>

        ))}

      </div>

    </div>

  )
}