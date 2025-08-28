# Outre-Couture-Revamp (Frontend)

This is a fully responsive **Next.js 13 App Router** frontend for a business setup platform in the UAE. It features dynamic routing, blog listing, category filters, service pages, and reusable components built with **Tailwind CSS**, **Framer Motion**, and **Radix UI**.

---

## 📁 Project Structure

app/
├── products/
│ └── [slug]/
│ └── page.jsx # Product detail dynamic page
├── contract/page.jsx # Contract Us
├── layout.jsx # App layout
├── page.jsx # Homepage
|
components/
├── Accordion.jsx
├── BlogCard.jsx
├── BlogSlider.jsx
├── Footer.jsx
├── Header.jsx
├── Navlink.jsx
├── ServiceCard.jsx
├── SpinnerLoader.jsx # Common loader (spinner)
├── TestimonialSlider.jsx
|
lib/
├── products.json # Products data
├── faqItems.json
├── testimonialData.json


---

## 📦 Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Styling:** Tailwind CSS, Tailwind Plugins (`tailwindcss-animate`)
- **Animation:** Framer Motion
- **Form Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Slider/Carousel:** Swiper
---

## ✨ Features

- 🔍 Products Listing with Search and Category Filter
- 📄 Products Detail Page
- 📚 Dynamic Pages for About and Contract, etc.
- 🧩 Reusable and animated components using Framer Motion
- 🔄 Spinner Loader for async operations
- 🎨 Fully responsive design with Tailwind CSS
- 🧠 Organized data in `lib/*.json` for easy maintenance
- ⚡ SEO-ready and optimized structure

---

## 🧪 Getting Started

### 1. Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


2. Install Dependencies
npm install

3. Run the Development Server
npm run dev
Open your browser at http://localhost:3000

⚙️ Scripts
Script	Description
npm run dev	- Start the development server
npm run build	- Build for production
