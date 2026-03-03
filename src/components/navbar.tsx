"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar() {
  const t = useTranslations("nav");

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-emerald-700">
          Gringo Real Estate
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-emerald-700 transition-colors">
            {t("home")}
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-emerald-700 transition-colors">
            {t("blog")}
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-emerald-700 transition-colors">
            {t("contact")}
          </Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
