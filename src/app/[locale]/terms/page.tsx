import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().getFullYear()}</p>
          <p>
            By accessing this website you agree to use it for lawful purposes only. The content
            provided is for informational purposes and does not constitute legal or financial
            advice. Gringo Real Estate reserves the right to update these terms at any time.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
