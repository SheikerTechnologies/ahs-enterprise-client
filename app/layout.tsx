import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MotionProvider } from "@/components/MotionProvider";
import { getSettings } from "@/lib/content";
import type { CompanyInfo, Office } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

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

const buildJsonLd = (companyInfo: CompanyInfo, offices: Office[]) => {
  const allOffices = offices?.length
    ? offices
    : [{ label: "Head Office", address: companyInfo.address }];
  const primary = allOffices[0];
  const otherOffices = allOffices.slice(1);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AHS Enterprise",
    legalName: "M/S A H S Enterprise",
    alternateName: ["M/S A H S Enterprise", "AHS Enterprise Bangladesh"],
    url: SITE_URL,
    image: `${SITE_URL}/images/logo.png`,
    logo: `${SITE_URL}/images/logo.png`,
    description: DESCRIPTION,
    telephone: companyInfo.phones[0],
    email: companyInfo.email,
    foundingDate: "2021",
    address: {
      "@type": "PostalAddress",
      streetAddress: primary.address,
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    // TODO(owner): add `geo` (latitude/longitude), `openingHoursSpecification`
    // and `priceRange` once those details are confirmed — the Rich Results
    // Test flags them as recommended, but they must not be invented.
    ...(otherOffices.length
      ? {
          location: otherOffices.map((office) => ({
            "@type": "Place",
            name: office.label,
            address: {
              "@type": "PostalAddress",
              streetAddress: office.address,
              addressCountry: "BD",
            },
          })),
        }
      : {}),
    sameAs: ["https://ahspdl.com", "https://sunsolaris.ltd"],
  };
};

export const revalidate = 300;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { company, offices } = await getSettings();
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(company, offices)) }}
        />
        <MotionProvider>{children}</MotionProvider>
        <WhatsAppButton phone={company.phones[0]} />
      </body>
    </html>
  );
}
