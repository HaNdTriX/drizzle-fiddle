import { usePathname } from "next/navigation";
import { i18n, Locale } from "@/i18n-config";

export default function useLocale() {
  const pathname = usePathname();
  return (pathname?.split("/")[1] as Locale) || undefined || i18n.defaultLocale;
}
