import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-900 to-emerald-700 text-white py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">{t("hero.title")}</h1>
            <p className="text-xl mb-8 text-emerald-100">{t("hero.subtitle")}</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link href="/listings">{t("hero.cta")}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-900" asChild>
                <Link href="/about">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t("features.title")}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t("features.bilingual.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("features.bilingual.description")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("features.legal.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("features.legal.description")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("features.local.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("features.local.description")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
