import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ListingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Property Listings</h1>
          <p className="text-gray-500 text-center">Listings coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
