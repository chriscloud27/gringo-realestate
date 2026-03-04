import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().getFullYear()}</p>
          <p>
            Gringo Real Estate respects your privacy. Any personal data collected through our
            contact form is used solely to respond to your inquiry and is never shared with
            third parties without your consent.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
