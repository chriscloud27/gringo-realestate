import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Gringo Real Estate is a boutique agency specializing in helping expats and foreign
            buyers find their perfect property in Latin America. Our multilingual team provides
            end-to-end support from property search through legal closing.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
