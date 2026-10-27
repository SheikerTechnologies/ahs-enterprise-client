import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MotionProvider } from "@/components/MotionProvider";
import { getSettings } from "@/lib/content";
import type { CompanyInfo } from "@/lib/data";
import "./globals.css";

const SITE_URL = "https://www.ahs-enterprise.com";
const DESCRIPTION =
  "M/S A H S Enterprise — 1st Class Contractor, Importer, Exporter, Supplier & Indenting. Civil works, marine & submarine spares, riverbank protection, dredging, electrical installation and renewable power across Bangladesh since 2021.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AHS Enterprise | We Build Tomorrow",
    template: "%s | AHS Enterprise",
  },
  description: DESCRIPTION,
  keywords: [
    "AHS Enterprise",
    "BIWTA contractor",
    "Bangladesh Navy supplier",
    "DGDP enlisted supplier",
    "riverbank protection Bangladesh",
    "dredging contractor Bangladesh",
    "1st class contractor Dhaka",
    "marine spares supplier Bangladesh",
  ],
  authors: [{ name: "M/S A H S Enterprise" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "AHS Enterprise",
    title: "AHS Enterprise | We Build Tomorrow",
    description: DESCRIPTION,
    images: [{ url: "/images/gallery/tower-1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AHS Enterprise | We Build Tomorrow",
    description: DESCRIPTION,
    images: ["/images/gallery/tower-1.jpg"],
  },
};

const buildJsonLd = (companyInfo: CompanyInfo) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "M/S A H S Enterprise",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-mark.png`,
  description: DESCRIPTION,
  telephone: companyInfo.phones[0],
  email: companyInfo.email,
  foundingDate: "2021",
  address: {
    "@type": "PostalAddress",
    streetAddress: companyInfo.address,
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: ["https://ahspdl.com", "https://sunsolaris.ltd"],
});

export const revalidate = 300;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { company } = await getSettings();
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(company)) }}
        />
        <MotionProvider>{children}</MotionProvider>
        <WhatsAppButton phone={company.phones[0]} />
      </body>
    </html>
  );
}
