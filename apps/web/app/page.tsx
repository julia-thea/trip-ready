export default function HomePage() {
  return (
    <main>
      {/* Header Section */}
      <header className="flex justify-between items-center">
        <div className="text-2xl font-sora font-bold text-navy">Trip Ready</div>
        <div className="flex gap-4">
          <button className="px-5 py-2.5 text-navy font-semibold">Login</button>
          <button className="px-6 py-2.5 bg-royal font-semibold">
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center px-8 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl font-sora font-bold mb-6">
          Smart Packing Lists for Every Trip
        </h1>
        <p className="text-xl text-slate mb-8">
          Never forget an item again. Create customized packing lists in seconds
          and travel with confidence.
        </p>
        <button className="text-lg font-semibold">Create Your List</button>
      </section>

      {/* Features Section */}
      <section>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="text-center ml-5">
            <div>🤖 AI-powered suggestions</div>
            <p>
              Get smart recommendations based on your destination and trip type.
            </p>
          </div>
          <div className="text-center">
            <div>⚙️ Trip-specific Customizations</div>
            <p>
              Tailor your packing list for beach trips, business travel, or
              adventures.
            </p>
          </div>
          <div className="text-center mr-5">
            <div>💾 Save and Reuse Lists</div>
            <p>
              Build your perfect packing list once and reuse it for future
              trips.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
