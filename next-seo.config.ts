// next-seo.config.js
export default {
  titleTemplate: "%s – Dự án Nuôi Tùng",
  defaultTitle: "Dự án Nuôi Tùng | Chung tay vì trẻ em vùng cao",
  description:
    "Dự án Nuôi Tùng ra đời nhằm hỗ trợ bữa ăn trưa và nhu yếu phẩm cần thiết cho các em nhỏ vùng cao trong suốt năm học. Chung tay mang lại mùa đông ấm áp, giúp các em vững bước đến trường.",

  additionalMetaTags: [
    {
      property: "og:image",
      // Lưu ý: OG Image cần đường dẫn tuyệt đối (bao gồm cả https://)
      content: "https://quynguoitung.com/assets/images/banner.jpg", 
      keyOverride: "og:image",
      "data-react-helmet": "true",
    },
    {
      name: "sitemap",
      content: "https://quynguoitung.com/sitemap.xml",
    },
    {
      name: "keywords",
      content: [
        "dự án nuôi tùng",
        "quỹ nuôi tùng",
        "vương thanh tùng",
        "từ thiện",
        "thiện nguyện",
        "quyên góp",
        "trẻ em vùng cao",
        "bữa ăn trưa cho em",
        "áo ấm mùa đông",
        "hỗ trợ học sinh",
        "cộng đồng",
        "quỹ vì trẻ em"
      ].join(", "),
    },
    { name: "robots", content: "index,follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "Vương Thanh Tùng" },
    { name: "revisit-after", content: "7 days" } 
  ],

  canonical: "https://quynguoitung.com",

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://quynguoitung.com",
    site_name: "Dự án Nuôi Tùng",
    images: [
      {
        url: "https://quynguoitung.com/assets/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Dự án Nuôi Tùng - Chung tay vì trẻ em vùng cao"
      }
    ]
  },

  twitter: {
    handle: "@tungmmo05", // Có thể thay bằng username Twitter nếu có
    site: "@tungmmo05",
    cardType: "summary_large_image"
  },

  additionalLinkTags: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "manifest", href: "/site.webmanifest" },
    { rel: "alternate", hrefLang: "vi", href: "https://quynguoitung.com" }
  ],

  additionalScriptTags: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NGO", // Khai báo Schema là tổ chức phi chính phủ / thiện nguyện
        name: "Dự án Nuôi Tùng",
        url: "https://quynguoitung.com/",
        logo: "https://quynguoitung.com/assets/images/avatar.jpg",
        founder: {
          "@type": "Person",
          name: "Vương Thanh Tùng"
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+84-986-739-490",
            email: "vtung15062005@gmail.com",
            contactType: "Project Coordinator",
            areaServed: "VN",
            availableLanguage: ["Vietnamese"]
          }
        ],
        description: "Dự án Nuôi Tùng ra đời nhằm hỗ trợ bữa ăn trưa và nhu yếu phẩm cần thiết cho các em nhỏ vùng cao.",
        sameAs: [
          "https://www.facebook.com/tungmmo05/"
        ]
      })
    }
  ]
};