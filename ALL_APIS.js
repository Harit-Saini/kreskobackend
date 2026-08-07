/**
 * ============================================================
 *  KRESKO CHEMICALS - ALL BACKEND APIS (एक ही फाइल में)
 * ============================================================
 *  Base URL : http://localhost:5005
 *
 *  ADMIN AUTH:
 *  सभी [ADMIN] routes में नीचे header भेजना अनिवार्य है:
 *    Authorization: Bearer <JWT_TOKEN>
 *  (token login से मिलता है, 7 दिन valid रहता है)
 *
 *  STATIC FILES:
 *    http://localhost:5005/uploads/<folder>/<filename>
 * ============================================================
 */

const ALL_APIS = {
  server: {
    baseUrl: "http://localhost:5005",
    port: 5005,
    healthCheck: "GET /  →  'Kresko Backend Running'",
    adminAuthHeader: "Authorization: Bearer <JWT_TOKEN>",
  },

  // ==========================================================
  //  🔐 AUTH (Admin)  /api/auth
  // ==========================================================
  auth: [
    {
      method: "POST",
      url: "/api/auth/login",
      auth: "Public",
      desc: "Admin Login — token प्राप्त करें",
      body: { password: "adminPassword" },
      response_200: { message: "Login Successful", token: "eyJhbGciOi..." },
    },
    {
      method: "GET",
      url: "/api/auth/security-question",
      auth: "Public",
      desc: "Security question प्राप्त करें",
      response_200: { question: "What is your mother's maiden name?" },
    },
    {
      method: "POST",
      url: "/api/auth/change-password",
      auth: "Public",
      desc: "Password change करें",
      body: { answer: "securityAnswer", newPassword: "newPassword123" },
      response_200: { message: "Password Changed Successfully" },
    },
  ],

  // ==========================================================
  //  📦 PRODUCTS  /api/products
  // ==========================================================
  products: [
    {
      method: "POST",
      url: "/api/products/upload",
      auth: "ADMIN",
      type: "multipart/form-data",
      fields: {
        name: "string (required)",
        category: "string",
        variant: "string",
        price: "number",
        unit: "string",
        moq: "number",
        moqUnit: "string",
        dilution: "string",
        dilutedPrice: "string",
        description: "string",
        badge: "string",
        specifications: "object",
        image: "file (image)",
      },
      response_201: { message: "Product Uploaded", product: { _id: "..." } },
    },
    {
      method: "GET",
      url: "/api/products",
      auth: "Public",
      desc: "सभी products की सूची",
      response_200: [
        {
          _id: "...",
          name: "Product Name",
          category: "...",
          variant: "...",
          price: 100,
          unit: "kg",
          moq: 10,
          moqUnit: "kg",
          dilution: "...",
          dilutedPrice: "...",
          description: "...",
          badge: "...",
          specifications: {},
          image: "filename.jpg",
          createdAt: "...",
          updatedAt: "...",
        },
      ],
    },
  ],

  // ==========================================================
  //  🗂️ CATEGORIES  /api/categories
  // ==========================================================
  categories: [
    {
      method: "POST",
      url: "/api/categories/add",
      auth: "ADMIN",
      body: { categoryName: "Herbicides", uniqueKey: "herbicides", categoryImage: "image-url" },
      response_201: { message: "Category created successfully", category: { _id: "..." } },
    },
    { method: "GET", url: "/api/categories", auth: "Public", desc: "सभी categories" },
    {
      method: "PUT",
      url: "/api/categories/:id",
      auth: "ADMIN",
      body: { categoryName: "New Name", uniqueKey: "new-key", categoryImage: "new-image" },
    },
    { method: "DELETE", url: "/api/categories/:id", auth: "ADMIN", desc: "Category delete करें" },
  ],

  // ==========================================================
  //  🏷️ SUBCATEGORIES  /api/subcategories
  // ==========================================================
  subcategories: [
    {
      method: "POST",
      url: "/api/subcategories/add",
      auth: "ADMIN",
      desc: "categoryUniqueKey किसी मौजूदा category के uniqueKey से match होना चाहिए",
      body: { subcategoryName: "Fungicide", uniqueKey: "fungicide", categoryUniqueKey: "herbicides" },
    },
    { method: "GET", url: "/api/subcategories", auth: "Public", desc: "सभी subcategories" },
    {
      method: "GET",
      url: "/api/subcategories/category/:categoryKey",
      auth: "Public",
      example: "/api/subcategories/category/herbicides",
      desc: "category के अनुसार subcategories",
    },
    { method: "PUT", url: "/api/subcategories/:id", auth: "ADMIN", body: { subcategoryName: "..." } },
    { method: "DELETE", url: "/api/subcategories/:id", auth: "ADMIN", desc: "Subcategory delete करें" },
  ],

  // ==========================================================
  //  📝 BLOGS  /api/blogs
  // ==========================================================
  blogs: [
    {
      method: "POST",
      url: "/api/blogs/create",
      auth: "ADMIN",
      type: "multipart/form-data",
      fields: { title: "string (required)", description: "string (required)", image: "file (image)" },
      response_201: { message: "Blog created successfully", blog: { _id: "..." } },
    },
    { method: "GET", url: "/api/blogs", auth: "Public", desc: "सभी blogs" },
    { method: "GET", url: "/api/blogs/:id", auth: "Public", desc: "Single blog" },
    { method: "DELETE", url: "/api/blogs/:id", auth: "ADMIN", desc: "Blog delete करें" },
  ],

  // ==========================================================
  //  📰 NEWS  /api/news
  // ==========================================================
  news: [
    {
      method: "POST",
      url: "/api/news/create",
      auth: "ADMIN",
      body: { title: "News Title", slug: "news-title", category: "Industry", description: "Short desc", content: "Full content", image: "image-url" },
    },
    {
      method: "GET",
      url: "/api/news",
      auth: "Public",
      query: "?search=<keyword>  (title filter)  |  ?category=<category>",
      example: "/api/news?search=test&category=Industry",
      desc: "सभी news (search & category filter के साथ)",
    },
    { method: "GET", url: "/api/news/:slug", auth: "Public", desc: "News by slug" },
    { method: "PUT", url: "/api/news/:id", auth: "ADMIN", body: { title: "...", content: "..." } },
    { method: "DELETE", url: "/api/news/:id", auth: "ADMIN", desc: "News delete करें" },
  ],

  // ==========================================================
  //  📩 INQUIRY  /api/inquiry
  // ==========================================================
  inquiry: [
    {
      method: "POST",
      url: "/api/inquiry/send",
      auth: "Public",
      body: { fullName: "John Doe", businessEmail: "john@company.com", phone: "1234567890", companyName: "Company", productInterest: "Herbicides", message: "Inquiry message" },
      response_201: { message: "Inquiry submitted successfully", data: { _id: "..." } },
    },
    { method: "GET", url: "/api/inquiry/all", auth: "ADMIN", desc: "सभी inquiries देखें" },
    { method: "DELETE", url: "/api/inquiry/:id", auth: "ADMIN", desc: "Inquiry delete करें" },
  ],

  // ==========================================================
  //  💰 QUOTE  /api/quote
  // ==========================================================
  quote: [
    {
      method: "POST",
      url: "/api/quote/send",
      auth: "Public",
      body: { fullname: "John Doe", businessEmail: "john@company.com", phone: "1234567890", companyName: "Company", productInterest: "Herbicides", specifications: "Specs", message: "Quote message" },
    },
    { method: "GET", url: "/api/quote/all", auth: "ADMIN", desc: "सभी quotes देखें" },
    { method: "DELETE", url: "/api/quote/:id", auth: "ADMIN", desc: "Quote delete करें" },
  ],

  // ==========================================================
  //  🏪 DISTRIBUTOR  /api/distributor
  // ==========================================================
  distributor: [
    {
      method: "POST",
      url: "/api/distributor/apply",
      auth: "Public",
      body: { contactPersonName: "John Doe", businessEmail: "john@company.com", phone: "1234567890", distributionFirmName: "Firm", territory: "North India", infrastructure: "Warehouse details" },
    },
    { method: "GET", url: "/api/distributor/all", auth: "ADMIN", desc: "सभी distributors देखें" },
    { method: "DELETE", url: "/api/distributor/:id", auth: "ADMIN", desc: "Distributor delete करें" },
  ],

  // ==========================================================
  //  🏭 OEM  /api/oem
  // ==========================================================
  oem: [
    {
      method: "POST",
      url: "/api/oem/request",
      auth: "Public",
      body: { fullname: "John Doe", businessEmail: "john@company.com", phone: "1234567890", brandName: "Brand", monthlyVolume: "1000 tons", blendingSpecs: "Specs" },
    },
    { method: "GET", url: "/api/oem/all", auth: "ADMIN", desc: "सभी OEM requests देखें" },
    { method: "DELETE", url: "/api/oem/:id", auth: "ADMIN", desc: "OEM request delete करें" },
  ],

  // ==========================================================
  //  💼 CAREER  /api/career
  // ==========================================================
  career: [
    {
      method: "POST",
      url: "/api/career/apply",
      auth: "Public",
      type: "multipart/form-data",
      fields: { fullname: "string", email: "string", phone: "string", position: "string", experience: "string", coverLetter: "string", resume: "file (PDF/document)" },
      resumeUrl: "http://localhost:5005/uploads/resumes/<filename>",
    },
    { method: "GET", url: "/api/career/all", auth: "ADMIN", desc: "सभी career applications देखें" },
    { method: "DELETE", url: "/api/career/:id", auth: "ADMIN", desc: "Career application delete करें" },
  ],

  // ==========================================================
  //  📄 CATALOG  /api/catalog
  // ==========================================================
  catalog: [
    { method: "POST", url: "/api/catalog/save", auth: "ADMIN", type: "multipart/form-data", fields: { pdf: "file (PDF)" }, desc: "Catalog PDF upload करें" },
    { method: "GET", url: "/api/catalog", auth: "Public", desc: "Catalog download link प्राप्त करें" },
    { method: "DELETE", url: "/api/catalog/delete/:id", auth: "ADMIN", desc: "Catalog delete करें" },
  ],

  // ==========================================================
  //  ❓ FAQS  /api/faqs
  // ==========================================================
  faqs: [
    { method: "POST", url: "/api/faqs/create", auth: "ADMIN", desc: "FAQ बनाएं" },
    { method: "GET", url: "/api/faqs", auth: "Public", desc: "सार्वजनिक FAQs" },
    { method: "GET", url: "/api/faqs/admin", auth: "ADMIN", desc: "Admin FAQ list" },
    { method: "PUT", url: "/api/faqs/:id", auth: "ADMIN", desc: "FAQ update करें" },
    { method: "DELETE", url: "/api/faqs/:id", auth: "ADMIN", desc: "FAQ delete करें" },
  ],

  // ==========================================================
  //  ⚙️ ADMIN SETTINGS  /api/admin/settings
  // ==========================================================
  adminSettings: [
    { method: "PUT", url: "/api/admin/settings/change-password", auth: "ADMIN", desc: "Password change करें" },
    { method: "PUT", url: "/api/admin/settings/recovery-settings", auth: "ADMIN", desc: "Recovery question settings update करें" },
  ],
};

// ==========================================================
//  📋 QUICK SUMMARY TABLE (सभी endpoints एक नज़र में)
// ==========================================================
const QUICK_SUMMARY = [
  ["POST", "/api/auth/login", "-", "Admin login"],
  ["GET", "/api/auth/security-question", "-", "Get security question"],
  ["POST", "/api/auth/change-password", "-", "Change password"],
  ["POST", "/api/products/upload", "ADMIN", "Upload product"],
  ["GET", "/api/products", "-", "Get products"],
  ["POST", "/api/categories/add", "ADMIN", "Add category"],
  ["GET", "/api/categories", "-", "Get categories"],
  ["PUT", "/api/categories/:id", "ADMIN", "Update category"],
  ["DELETE", "/api/categories/:id", "ADMIN", "Delete category"],
  ["POST", "/api/subcategories/add", "ADMIN", "Add subcategory"],
  ["GET", "/api/subcategories", "-", "Get subcategories"],
  ["GET", "/api/subcategories/category/:key", "-", "Subcategories by category"],
  ["PUT", "/api/subcategories/:id", "ADMIN", "Update subcategory"],
  ["DELETE", "/api/subcategories/:id", "ADMIN", "Delete subcategory"],
  ["POST", "/api/blogs/create", "ADMIN", "Create blog"],
  ["GET", "/api/blogs", "-", "Get blogs"],
  ["GET", "/api/blogs/:id", "-", "Get single blog"],
  ["DELETE", "/api/blogs/:id", "ADMIN", "Delete blog"],
  ["POST", "/api/news/create", "ADMIN", "Create news"],
  ["GET", "/api/news", "-", "Get news"],
  ["GET", "/api/news/:slug", "-", "Get news by slug"],
  ["PUT", "/api/news/:id", "ADMIN", "Update news"],
  ["DELETE", "/api/news/:id", "ADMIN", "Delete news"],
  ["POST", "/api/inquiry/send", "-", "Send inquiry"],
  ["GET", "/api/inquiry/all", "ADMIN", "Get inquiries"],
  ["DELETE", "/api/inquiry/:id", "ADMIN", "Delete inquiry"],
  ["POST", "/api/quote/send", "-", "Send quote"],
  ["GET", "/api/quote/all", "ADMIN", "Get quotes"],
  ["DELETE", "/api/quote/:id", "ADMIN", "Delete quote"],
  ["POST", "/api/distributor/apply", "-", "Apply distributor"],
  ["GET", "/api/distributor/all", "ADMIN", "Get distributors"],
  ["DELETE", "/api/distributor/:id", "ADMIN", "Delete distributor"],
  ["POST", "/api/oem/request", "-", "Request OEM"],
  ["GET", "/api/oem/all", "ADMIN", "Get OEM requests"],
  ["DELETE", "/api/oem/:id", "ADMIN", "Delete OEM"],
  ["POST", "/api/career/apply", "-", "Apply career"],
  ["GET", "/api/career/all", "ADMIN", "Get career applications"],
  ["DELETE", "/api/career/:id", "ADMIN", "Delete career"],
  ["POST", "/api/catalog/save", "ADMIN", "Upload catalog PDF"],
  ["GET", "/api/catalog", "-", "Get catalog"],
  ["DELETE", "/api/catalog/delete/:id", "ADMIN", "Delete catalog"],
  ["POST", "/api/faqs/create", "ADMIN", "Create FAQ"],
  ["GET", "/api/faqs", "-", "Get public FAQs"],
  ["GET", "/api/faqs/admin", "ADMIN", "Get admin FAQs"],
  ["PUT", "/api/faqs/:id", "ADMIN", "Update FAQ"],
  ["DELETE", "/api/faqs/:id", "ADMIN", "Delete FAQ"],
  ["PUT", "/api/admin/settings/change-password", "ADMIN", "Change password"],
  ["PUT", "/api/admin/settings/recovery-settings", "ADMIN", "Update recovery settings"],
];

module.exports = { ALL_APIS, QUICK_SUMMARY };

// console.log(JSON.stringify(ALL_APIS, null, 2));
