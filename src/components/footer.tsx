import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Gringo Real Estate. {t("rights")}
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm">
            {t("terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
