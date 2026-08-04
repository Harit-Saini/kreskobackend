# Kresko Chemicals - Backend API Reference

**Base URL:** `http://localhost:5005`

**Server Entry:** `Backend/server.js`

---

## 🔐 Authentication (All Admin Routes)

All routes marked **[ADMIN]** require an `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

The token is obtained from the **Admin Login** endpoint and is valid for **7 days**.

---

## 1. AUTH APIs (`/api/auth`)

### ➤ Admin Login
- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Auth:** Public
- **Body (JSON):**
  ```json
  {
    "password": "adminPassword"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Login Successful",
    "token": "eyJhbGciOi..."
  }
  ```

### ➤ Get Security Question
- **Method:** `GET`
- **URL:** `/api/auth/security-question`
- **Auth:** Public
- **Response (200):**
  ```json
  {
    "question": "What is your mother's maiden name?"
  }
  ```

### ➤ Change Password
- **Method:** `POST`
- **URL:** `/api/auth/change-password`
- **Auth:** Public
- **Body (JSON):**
  ```json
  {
    "answer": "securityAnswer",
    "newPassword": "newPassword123"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Password Changed Successfully"
  }
  ```

---

## 2. PRODUCTS APIs (`/api/products`)

### ➤ Upload Product [ADMIN]
- **Method:** `POST`
- **URL:** `/api/products/upload`
- **Auth:** Bearer Token
- **Content-Type:** `multipart/form-data`
- **Fields:**
  | Field | Type | Required |
  |-------|------|----------|
  | `name` | string | ✅ |
  | `category` | string | ❌ |
  | `variant` | string | ❌ |
  | `price` | number | ❌ |
  | `unit` | string | ❌ |
  | `moq` | number | ❌ |
  | `moqUnit` | string | ❌ |
  | `dilution` | string | ❌ |
  | `dilutedPrice` | string | ❌ |
  | `description` | string | ❌ |
  | `badge` | string | ❌ |
  | `specifications` | object | ❌ |
  | `image` | file (image) | ❌ |
- **Response (201):**
  ```json
  {
    "message": "Product Uploaded",
    "product": { "...": "..." }
  }
  ```

### ➤ Get All Products (Public)
- **Method:** `GET`
- **URL:** `/api/products`
- **Auth:** Public
- **Response (200):** Array of products
  ```json
  [
    {
      "_id": "...",
      "name": "Product Name",
      "category": "...",
      "variant": "...",
      "price": 100,
      "unit": "kg",
      "moq": 10,
      "moqUnit": "kg",
      "dilution": "...",
      "dilutedPrice": "...",
      "description": "...",
      "badge": "...",
      "specifications": {},
      "image": "filename.jpg",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
  ```
- **Image URL:** `http://localhost:5005/uploads/products/<filename>`

---

## 3. CATEGORIES APIs (`/api/categories`)

### ➤ Add Category [ADMIN]
- **Method:** `POST`
- **URL:** `/api/categories/add`
- **Auth:** Bearer Token
- **Body (JSON):**
  ```json
  {
    "categoryName": "Herbicides",
    "uniqueKey": "herbicides",
    "categoryImage": "image-url-or-filename"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Category created successfully",
    "category": { "...": "..." }
  }
  ```

### ➤ Get All Categories (Public)
- **Method:** `GET`
- **URL:** `/api/categories`
- **Auth:** Public
- **Response (200):**
  ```json
  {
    "categories": [
      {
        "_id": "...",
        "categoryName": "Herbicides",
        "uniqueKey": "herbicides",
        "categoryImage": "...",
        "createdAt": "..."
      }
    ]
  }
  ```

### ➤ Update Category [ADMIN]
- **Method:** `PUT`
- **URL:** `/api/categories/:id`
- **Auth:** Bearer Token
- **Body (JSON):**
  ```json
  {
    "categoryName": "New Name",
    "uniqueKey": "new-key",
    "categoryImage": "new-image"
  }
  ```

### ➤ Delete Category [ADMIN]
- **Method:** `DELETE`
- **URL:** `/api/categories/:id`
- **Auth:** Bearer Token

---

## 4. SUBCATEGORIES APIs (`/api/subcategories`)

### ➤ Add Subcategory [ADMIN]
- **Method:** `POST`
- **URL:** `/api/subcategories/add`
- **Auth:** Bearer Token
- **Body (JSON):**
  ```json
  {
    "subcategoryName": "Fungicide",
    "uniqueKey": "fungicide",
    "categoryUniqueKey": "herbicides"
  }
  ```
  > `categoryUniqueKey` must match an existing category's `uniqueKey`.

### ➤ Get All Subcategories (Public)
- **Method:** `GET`
- **URL:** `/api/subcategories`
- **Auth:** Public

### ➤ Get Subcategories by Category (Public)
- **Method:** `GET`
- **URL:** `/api/subcategories/category/:categoryKey`
- **Auth:** Public
- **Example:** `/api/subcategories/category/herbicides`

### ➤ Update Subcategory [ADMIN]
- **Method:** `PUT`
- **URL:** `/api/subcategories/:id`
- **Auth:** Bearer Token
- **Body (JSON):** any subcategory fields

### ➤ Delete Subcategory [ADMIN]
- **Method:** `DELETE`
- **URL:** `/api/subcategories/:id`
- **Auth:** Bearer Token

---

## 5. BLOGS APIs (`/api/blogs`)

### ➤ Upload Blog [ADMIN]
- **Method:** `POST`
- **URL:** `/api/blogs/upload`
- **Auth:** Bearer Token
- **Content-Type:** `multipart/form-data`
- **Fields:**
  | Field | Type | Required |
  |-------|------|----------|
  | `title` | string | ✅ |
  | `description` | string | ✅ |
  | `image` | file (image) | ❌ |
- **Response (201):**
  ```json
  {
    "message": "Blog created successfully",
    "blog": { "...": "..." }
  }
  ```
- **Image URL:** `http://localhost:5005/uploads/blogs/<filename>`

### ➤ Get All Blogs (Public)
- **Method:** `GET`
- **URL:** `/api/blogs`
- **Auth:** Public

### ➤ Get Single Blog (Public)
- **Method:** `GET`
- **URL:** `/api/blogs/:id`
- **Auth:** Public

### ➤ Delete Blog [ADMIN]
- **Method:** `DELETE`
- **URL:** `/api/blogs/:id`
- **Auth:** Bearer Token

---

## 6. NEWS APIs (`/api/news`)

### ➤ Create News [ADMIN]
- **Method:** `POST`
- **URL:** `/api/news/create`
- **Auth:** Bearer Token
- **Body (JSON):**
  ```json
  {
    "title": "News Title",
    "slug": "news-title",
    "category": "Industry",
    "description": "Short description",
    "content": "Full content",
    "image": "image-url"
  }
  ```

### ➤ Get All News (Public)
- **Method:** `GET`
- **URL:** `/api/news`
- **Auth:** Public
- **Query Params (optional):**
  - `?search=<keyword>` — filters by title (case-insensitive)
  - `?category=<category>` — filters by category
- **Example:** `/api/news?search=&category=Industry`

### ➤ Get Single News by Slug (Public)
- **Method:** `GET`
- **URL:** `/api/news/:slug`
- **Auth:** Public

### ➤ Update News [ADMIN]
- **Method:** `PUT`
- **URL:** `/api/news/:id`
- **Auth:** Bearer Token
- **Body (JSON):** any news fields

### ➤ Delete News [ADMIN]
- **Method:** `DELETE`
- **URL:** `/api/news/:id`
- **Auth:** Bearer Token

---

## 7. INQUIRY APIs (`/api/inquiry`)

### ➤ Send Inquiry (Public)
- **Method:** `POST`
- **URL:** `/api/inquiry/send`
- **Auth:** Public
- **Body (JSON):**
  ```json
  {
    "fullName": "John Doe",
    "businessEmail": "john@company.com",
    "phone": "1234567890",
    "companyName": "Company",
    "productInterest": "Herbicides",
    "message": "Inquiry message"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Inquiry submitted successfully",
    "data": { "...": "..." }
  }
  ```

### ➤ Get All Inquiries [ADMIN]
- **Method:** `GET`
- **URL:** `/api/inquiry/all`
- **Auth:** Bearer Token

### ➤ Delete Inquiry [ADMIN]
- **Method:** `DELETE`
- **URL:** `/api/inquiry/:id`
- **Auth:** Bearer Token

---

## 8. QUOTE APIs (`/api/quote`)

### ➤ Send Quote Request (Public)
- **Method:** `POST`
- **URL:** `/api/quote/send`
- **Auth:** Public
- **Body (JSON):**
  ```json
  {
    "fullname": "John Doe",
    "businessEmail": "john@company.com",
    "phone": "1234567890",
    "companyName": "Company",
    "productInterest": "Herbicides",
    "specifications": "Specifications",
    "message": "Quote message"
  }
  ```

### ➤ Get All Quotes [ADMIN]
- **Method:** `GET`
- **URL:** `/api/quote/all`
- **Auth:** Bearer Token

### ➤ Delete Quote [ADMIN]
- **Method:** `DELETE`
- **URL:** `/api/quote/:id`
- **Auth:** Bearer Token

---

## 9. DISTRIBUTOR APIs (`/api/distributor`)

### ➤ Apply as Distributor (Public)
- **Method:** `POST`
- **URL:** `/api/distributor/apply`
- **Auth:** Public
- **Body (JSON):**
  ```json
  {
    "contactPersonName": "John Doe",
    "businessEmail": "john@company.com",
    "phone": "1234567890",
    "distributionFirmName": "Firm",
    "territory": "North India",
    "infrastructure": "Warehouse details"
  }
  ```

### ➤ Get All Distributors [ADMIN]
- **Method:** `GET`
- **URL:** `/api/distributor/all`
- **Auth:** Bearer Token

### ➤ Delete Distributor [ADMIN]
- **Method:** `DELETE`
- **URL:** `/api/distributor/:id`
- **Auth:** Bearer Token

---

## 10. OEM APIs (`/api/oem`)

### ➤ Request OEM (Public)
- **Method:** `POST`
- **URL:** `/api/oem/request`
- **Auth:** Public
- **Body (JSON):**
  ```json
  {
    "fullname": "John Doe",
    "businessEmail": "john@company.com",
    "phone": "1234567890",
    "brandName": "Brand",
    "monthlyVolume": "1000 tons",
    "blendingSpecs": "Specifications"
  }
  ```

### ➤ Get All OEM Requests [ADMIN]
- **Method:** `GET`
- **URL:** `/api/oem/all`
- **Auth:** Bearer Token

### ➤ Delete OEM Request [ADMIN]
- **Method:** `DELETE`
- **URL:** `/api/oem/:id`
- **Auth:** Bearer Token

---

## 11. CAREER APIs (`/api/career`)

### ➤ Apply for Career (Public)
- **Method:** `POST`
- **URL:** `/api/career/apply`
- **Auth:** Public
- **Content-Type:** `multipart/form-data`
- **Fields:**
  | Field | Type | Required |
  |-------|------|----------|
  | `fullname` | string | ❌ |
  | `email` | string | ❌ |
  | `phone` | string | ❌ |
  | `position` | string | ❌ |
  | `experience` | string | ❌ |
  | `coverLetter` | string | ❌ |
  | `resume` | file (PDF/document) | ❌ |
- **Resume URL:** `http://localhost:5005/uploads/resumes/<filename>`

### ➤ Get All Career Applications [ADMIN]
- **Method:** `GET`
- **URL:** `/api/career/all`
- **Auth:** Bearer Token

### ➤ Delete Career Application [ADMIN]
- **Method:** `DELETE`
- **URL:** `/api/career/:id`
- **Auth:** Bearer Token

---

## 📌 Quick Summary Table

| # | Method | Endpoint | Auth | Purpose |
|---|--------|----------|------|---------|
| 1 | POST | `/api/auth/login` | - | Admin login |
| 2 | GET | `/api/auth/security-question` | - | Get security question |
| 3 | POST | `/api/auth/change-password` | - | Change password |
| 4 | POST | `/api/products/upload` | ✅ | Upload product |
| 5 | GET | `/api/products` | - | Get products |
| 6 | POST | `/api/categories/add` | ✅ | Add category |
| 7 | GET | `/api/categories` | - | Get categories |
| 8 | PUT | `/api/categories/:id` | ✅ | Update category |
| 9 | DELETE | `/api/categories/:id` | ✅ | Delete category |
| 10 | POST | `/api/subcategories/add` | ✅ | Add subcategory |
| 11 | GET | `/api/subcategories` | - | Get subcategories |
| 12 | GET | `/api/subcategories/category/:key` | - | Subcategories by category |
| 13 | PUT | `/api/subcategories/:id` | ✅ | Update subcategory |
| 14 | DELETE | `/api/subcategories/:id` | ✅ | Delete subcategory |
| 15 | POST | `/api/blogs/upload` | ✅ | Upload blog |
| 16 | GET | `/api/blogs` | - | Get blogs |
| 17 | GET | `/api/blogs/:id` | - | Get single blog |
| 18 | DELETE | `/api/blogs/:id` | ✅ | Delete blog |
| 19 | POST | `/api/news/create` | ✅ | Create news |
| 20 | GET | `/api/news` | - | Get news |
| 21 | GET | `/api/news/:slug` | - | Get news by slug |
| 22 | PUT | `/api/news/:id` | ✅ | Update news |
| 23 | DELETE | `/api/news/:id` | ✅ | Delete news |
| 24 | POST | `/api/inquiry/send` | - | Send inquiry |
| 25 | GET | `/api/inquiry/all` | ✅ | Get inquiries |
| 26 | DELETE | `/api/inquiry/:id` | ✅ | Delete inquiry |
| 27 | POST | `/api/quote/send` | - | Send quote |
| 28 | GET | `/api/quote/all` | ✅ | Get quotes |
| 29 | DELETE | `/api/quote/:id` | ✅ | Delete quote |
| 30 | POST | `/api/distributor/apply` | - | Apply distributor |
| 31 | GET | `/api/distributor/all` | ✅ | Get distributors |
| 32 | DELETE | `/api/distributor/:id` | ✅ | Delete distributor |
| 33 | POST | `/api/oem/request` | - | Request OEM |
| 34 | GET | `/api/oem/all` | ✅ | Get OEM requests |
| 35 | DELETE | `/api/oem/:id` | ✅ | Delete OEM |
| 36 | POST | `/api/career/apply` | - | Apply career |
| 37 | GET | `/api/career/all` | ✅ | Get career applications |
| 38 | DELETE | `/api/career/:id` | ✅ | Delete career |
