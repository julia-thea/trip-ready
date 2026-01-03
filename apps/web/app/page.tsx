import Button from './components/Button';

export default function HomePage() {
  return (
    <main>
      {/* Header Section */}
      <header className="flex justify-between items-center mt-4 mx-2">
        <div className="text-2xl font-bold">Trip Ready</div>
        <div className="flex gap-4">
          <Button variant="secondary">Login</Button>
          <Button variant="outline">Sign Up</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center px-8 py-40 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Smart Packing Lists for Every Trip
        </h1>
        <p className="text-xl text-slate mb-8">
          Never forget an item again. Create customized packing lists in seconds
          and travel with confidence.
        </p>
        <div className="mt-4">
          <Button variant="primary">Create Your List</Button>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center ml-5">
            <div className="font-bold">🤖 AI-powered suggestions</div>
            <p>
              Get smart recommendations based on your destination and trip type.
            </p>
          </div>
          <div className="text-center">
            <div className="font-bold">⚙️ Trip-specific Customizations</div>
            <p>
              Tailor your packing list for beach trips, business travel, or
              adventures.
            </p>
          </div>
          <div className="text-center mr-5">
            <div className="font-bold">💾 Save and Reuse Lists</div>
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
