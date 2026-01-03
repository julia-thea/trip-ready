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
      <section>
        <h1>Smart Packing Lists for Every Trip</h1>
        <p>
          Never forget an item again. Create customized packing lists in seconds
          and travel with confidence.
        </p>
        <button>Create Your List</button>
      </section>

      {/* Features Section */}
      <section>
        <div>Feature 1</div>
        <div>Feature 2</div>
        <div>Feature 3</div>
      </section>
    </main>
  );
}
