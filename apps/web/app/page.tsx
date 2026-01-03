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
      <section className="text-center">
        <h1>Smart Packing Lists for Every Trip</h1>
        <p>
          Never forget an item again. Create customized packing lists in seconds
          and travel with confidence.
        </p>
        <button>Create Your List</button>
      </section>

      {/* Features Section */}
      <section>
        <div className="grid grid-cols-3">
          <div>Feature 1</div>
          <div>Feature 2</div>
          <div>Feature 3</div>
        </div>
      </section>
    </main>
    // <main className="min-h-screen bg-ivory">
    //   {/* Hero Section */}
    //   <section className="px-8 py-20 max-w-4xl mx-auto text-center">
    //     <h1 className="text-5xl md:text-6xl font-sora font-bold text-navy mb-6">
    //       Smart Packing Lists for Every Trip
    //     </h1>
    //     <p className="text-xl text-slate mb-8 max-w-2xl mx-auto">
    //       Never forget an item again. Create customized packing lists in seconds
    //       and travel with confidence.
    //     </p>
    //     <button className="px-8 py-4 bg-gold text-white text-lg font-semibold rounded-lg hover:bg-navy transition-colors">
    //       Create Your List
    //     </button>
    //   </section>

    //   {/* Features Section */}
    //   <section className="px-8 py-16 max-w-5xl mx-auto">
    //     <div className="grid md:grid-cols-3 gap-8">
    //       {/* Feature 1 */}
    //       <div className="bg-white p-8 rounded-xl text-center">
    //         <div className="text-5xl mb-4">🤖</div>
    //         <h3 className="text-xl font-sora font-semibold text-navy mb-3">
    //           AI-Powered Suggestions
    //         </h3>
    //         <p className="text-slate">
    //           Get smart recommendations based on your destination and trip type.
    //         </p>
    //       </div>

    //       {/* Feature 2 */}
    //       <div className="bg-white p-8 rounded-xl text-center">
    //         <div className="text-5xl mb-4">⚙️</div>
    //         <h3 className="text-xl font-sora font-semibold text-navy mb-3">
    //           Trip-Specific Customization
    //         </h3>
    //         <p className="text-slate">
    //           Tailor your packing list for beach trips, business travel, or
    //           adventures.
    //         </p>
    //       </div>

    //       {/* Feature 3 */}
    //       <div className="bg-white p-8 rounded-xl text-center">
    //         <div className="text-5xl mb-4">💾</div>
    //         <h3 className="text-xl font-sora font-semibold text-navy mb-3">
    //           Save and Reuse Lists
    //         </h3>
    //         <p className="text-slate">
    //           Build your perfect packing list once and reuse it for future
    //           trips.
    //         </p>
    //       </div>
    //     </div>
    //   </section>
    // </main>
  );
}
