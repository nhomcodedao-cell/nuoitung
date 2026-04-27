export default {
  titleTemplate: "%s – Nuôi Tùng",
  defaultTitle: "Nuôi Tùng | Hệ thống ủng hộ Vương Thanh Tùng",
  description:
    "Hệ thống chính thức nhận sự ủng hộ và đồng hành cùng Vương Thanh Tùng trong các dự án sáng tạo và phát triển cá nhân.",

  additionalMetaTags: [
    {
      property: "og:image",
      content: "https://nuoitung.vercel.app/assets/images/banner.jpg", 
      keyOverride: "og:image",
    },
    {
      name: "keywords",
      content: [
        "nuôi tùng",
        "nuoitung",
        "vương thanh tùng",
        "ủng hộ tùng",
        "donet nuoitung",
        "vương thanh tùng bank"
      ].join(", "),
    },
    { name: "robots", content: "index,follow" },
    { name: "author", content: "Vương Thanh Tùng" }
  ],

  canonical: "https://nuoitung.vercel.app/",

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://nuoitung.vercel.app/",
    site_name: "Nuôi Tùng",
    images: [
      {
        url: "https://nuoitung.vercel.app/assets/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Nuôi Tùng"
      }
    ]
  },

  twitter: {
    handle: "@tungmmo05",
    site: "@tungmmo05",
    cardType: "summary_large_image"
  },

  additionalLinkTags: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" }
  ],

  additionalScriptTags: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Nuôi Tùng",
        url: "https://nuoitung.vercel.app/",
        image: "https://nuoitung.vercel.app/assets/images/avatar.jpg",
        author: {
          "@type": "Person",
          name: "Vương Thanh Tùng"
        },
        description: "Hệ thống nhận ủng hộ cho dự án cá nhân Nuôi Tùng.",
        sameAs: [
          "https://www.facebook.com/tungmmo05/"
        ]
      })
    }
  ]
};
