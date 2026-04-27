export default {
  titleTemplate: "%s – Nuôi Tùng",
  defaultTitle: "Nuôi Tùng | Hỗ trợ bữa ăn cho trẻ em vùng cao",
  description:
    "Dự án Nuôi Tùng tập trung hỗ trợ bữa ăn trưa và nhu yếu phẩm cần thiết cho các em nhỏ vùng cao trong suốt năm học, giúp các em vững bước đến trường.",

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
        "hỗ trợ trẻ em vùng cao",
        "bữa ăn cho em",
        "thiện nguyện cá nhân"
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
        alt: "Nuôi Tùng - Hỗ trợ trẻ em vùng cao"
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
        image: "https://nuoitung.vercel.app/assets/images/banner.jpg",
        author: {
          "@type": "Person",
          name: "Vương Thanh Tùng"
        },
        description: "Dự án cá nhân hỗ trợ bữa ăn trưa cho học sinh vùng cao.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+84-986-739-490",
          contactType: "Chủ dự án"
        }
      })
    }
  ]
};
