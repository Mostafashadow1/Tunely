import React from "react";
import { SITE_CONFIG } from "@/lib/seo-config";
import { FAQ_ITEMS } from "@/lib/faq-data";

export function StructuredData() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        inLanguage: "en-US",
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        legalName: SITE_CONFIG.legalName,
        url: SITE_CONFIG.url,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_CONFIG.url}/logo.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          SITE_CONFIG.repoUrl,
          SITE_CONFIG.npmUrl,
          SITE_CONFIG.author.github,
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_CONFIG.url}/#softwareapplication`,
        name: SITE_CONFIG.name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        url: SITE_CONFIG.url,
        description: SITE_CONFIG.description,
        downloadUrl: SITE_CONFIG.npmUrl,
        codeRepository: SITE_CONFIG.repoUrl,
        programmingLanguage: ["TypeScript", "JavaScript", "React", "Next.js"],
        softwareVersion: "0.1.0",
        license: "https://opensource.org/licenses/MIT",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        author: {
          "@type": "Person",
          name: SITE_CONFIG.author.name,
          url: SITE_CONFIG.author.url,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_CONFIG.url}/#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_CONFIG.url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_CONFIG.url}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaGraph),
      }}
    />
  );
}
