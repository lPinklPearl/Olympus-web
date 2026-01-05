"use client";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1026] to-[#1c1f3a] text-white">
      <Navbar />

      {/* HERO */}
      <section id="home" className="relative flex items-center justify-center h-screen text-center bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 via-black/60 to-black/80" />

        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-serif tracking-widest">OLYMPUS</h1>
          <p className="mt-4 text-lg opacity-90">
            A VRChat Travel World inspired by Greek Mythology
          </p>
          <p className="mt-2 text-sm opacity-75">
            Walk among the gods. Create memories beyond reality.
          </p>
          <button className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 text-[#1c1f3a] font-semibold hover:scale-105 transition">
            Book Your Journey
          </button>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about"className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-serif text-center text-yellow-200 mb-16">About Olympus</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white/5 rounded-2xl p-8">
            <h3 className="font-serif text-yellow-400 text-xl mb-4">Who We Are</h3>
            <p className="opacity-85 text-sm">
              Olympus is a VRChat travel world designed for explorers who dream of stepping into the realm of Greek gods and legends.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-8">
            <h3 className="font-serif text-yellow-400 text-xl mb-4">Our Vision</h3>
            <p className="opacity-85 text-sm">
              We believe VR is not just a game, but a place for connection, emotion, and unforgettable shared experiences.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-8">
            <h3 className="font-serif text-yellow-400 text-xl mb-4">Our Promise</h3>
            <p className="opacity-85 text-sm">
              A welcoming, safe, and magical space for sightseeing, photos, roleplay, dates, and special events.
            </p>
          </div>
        </div>
      </section>

      {/* WHY OLYMPUS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-serif text-center text-yellow-200 mb-16">Why Choose Olympus?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white/5 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-yellow-400 mb-3">Divine World Design</h3>
            <p className="text-sm opacity-80">Handcrafted temples, skies, and landscapes inspired by Mount Olympus.</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-yellow-400 mb-3">Perfect for Social</h3>
            <p className="text-sm opacity-80">Ideal for couples, friends, roleplay groups, and community events.</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-yellow-400 mb-3">Guided Experience</h3>
            <p className="text-sm opacity-80">Friendly guides help you enjoy the world without pressure or confusion.</p>
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="experiences" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-serif text-center text-yellow-200 mb-16">Our Experiences</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white/5 rounded-2xl p-6 text-center">Mount Olympus Tour</div>
          <div className="bg-white/5 rounded-2xl p-6 text-center">Gods Temple Walk</div>
          <div className="bg-white/5 rounded-2xl p-6 text-center">Sunset Sky Realm</div>
          <div className="bg-white/5 rounded-2xl p-6 text-center">Private & Event Tour</div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-serif text-center text-yellow-200 mb-12">Book Your Journey</h2>
        <div className="bg-white/5 rounded-3xl p-10">
          <form className="space-y-6">
            <select className="w-full p-3 rounded bg-black/30" required>
              <option value="">Select Experience</option>
              <option>Mount Olympus Tour</option>
              <option>Gods Temple Walk</option>
              <option>Sunset Sky Realm</option>
              <option>Private Event</option>
            </select>
            <input type="date" className="w-full p-3 rounded bg-black/30" required />
            <input type="time" className="w-full p-3 rounded bg-black/30" required />
            <button className="w-full py-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 text-[#1c1f3a] font-semibold hover:scale-105 transition">
              Reserve Slot
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 py-24 bg-gradient-to-r from-[#1c1f3a] to-[#0b1026]">
        <h2 className="text-3xl font-serif text-yellow-200 mb-4">Ready to Ascend?</h2>
        <p className="opacity-80 mb-8">Step into Olympus and walk among the gods.</p>
        <button className="px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 text-[#1c1f3a] font-semibold hover:scale-105 transition">
          Join Olympus VRChat
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-sm opacity-60">
        © 2026 Olympus VRChat World · All Gods Reserved
      </footer>

    </main>
  );
}
