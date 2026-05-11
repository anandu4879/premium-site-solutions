// ==========================================================
// WEBSITE MAIN CONFIGURATION FILE
// ==========================================================
//
// CLIENT INSTRUCTIONS
// ----------------------------------------------------------
// This file controls MOST of the website content.
//
// You can update:
// ✅ Company Name
// ✅ Phone Number
// ✅ WhatsApp Number
// ✅ Email Address
// ✅ Address
// ✅ Social Media Links
// ✅ Available Jobs
// ✅ Services
// ✅ Service Cards
// ✅ Gallery Images
//
// IMPORTANT:
// ----------------------------------------------------------
// After making changes:
// 1. Save this file
// 2. Website updates automatically
//
// No coding knowledge needed for basic updates.
//
// ==========================================================



// ==========================================================
// SERVICE IMAGES
// ==========================================================
//
// TO CHANGE SERVICE IMAGES:
//
// 1. Add new image inside:
//    src/assets/
//
// 2. Import image below
//
// 3. Use image inside "services"
//
// Example:
// import cleaning from "@/assets/service-cleaning.jpg";
//
// ==========================================================

import grass from "@/assets/service-grass.jpg";

import construction from "@/assets/service-construction.jpg";

import labour from "@/assets/service-labour.jpg";

import sand from "@/assets/service-sand.webp";

import handyman from "@/assets/service-handyman.jpg";



// ==========================================================
// GALLERY IMAGES
// ==========================================================
//
// TO ADD GALLERY IMAGES:
//
// 1. Add image to:
//    src/assets/
//
// 2. Import image below
//
// 3. Add inside gallery array
//
// Example:
// import g7 from "@/assets/gallery-7.jpg";
//
// ==========================================================


import g7 from "@/assets/gallery-8.jpg";
import g15 from "@/assets/before.png";
import g17 from "@/assets/gallery-11.jpg";
import g22 from "@/assets/before_and _after_ppol.jpg";
import g25 from "@/assets/gallery-18.jpg";
import g26 from "@/assets/before_HANDYMAN.jpg";
// ==========================================================
// BUILDER LOGO IMAGES
// ==========================================================
//
// TO ADD BUILDER LOGOS:
//
// 1. Add logo image inside:
//    src/assets/
//
// 2. Import image below
//
// 3. Add it inside the "builders" array
//
// Example:
// import buildCoLogo from "@/assets/builder-buildco.png";
//
// ==========================================================

import builderLogo from "@/assets/logo.png";



// ==========================================================
// MAIN WEBSITE CONFIG
// ==========================================================

export const siteConfig = {

  // ========================================================
  // COMPANY DETAILS
  // ========================================================
  //
  // Change business name & tagline here
  //
  // ========================================================

  company: {
    name: "BJ & R Maintenance",

    tagline:
      "Premium artificial grass & site services",
  },



  // ========================================================
  // CONTACT DETAILS
  // ========================================================
  //
  // These values update automatically across:
  //
  // ✅ Contact Page
  // ✅ Header
  // ✅ Footer
  // ✅ WhatsApp Button
  // ✅ Call Buttons
  //
  // IMPORTANT:
  //
  // phone:
  // Full international number
  //
  // displayPhone:
  // Formatted number shown on website
  //
  // whatsapp:
  // Must include country code WITHOUT "+"
  //
  // ========================================================

  contact: {

    // Phone link
    phone: "+61406183393",

    // Displayed phone
    displayPhone: "0406 183 393",

    // WhatsApp number
    whatsapp: "61476448093",

    // Business email
    email: "hello@bjrmaintenance.com.au",

    // Business address
    address:
      "Honeywood Avenue, Wandi 6167",
  },



  // ========================================================
  // SOCIAL MEDIA LINKS
  // ========================================================
  //
  // Add full URLs
  //
  // Example:
  // facebook: "https://facebook.com/company"
  //
  // ========================================================

  socials: {
    facebook: "#",

    instagram: "#",

    linkedin: "#",
  },



  // ========================================================
  // AVAILABLE JOBS
  // ========================================================
  //
  // These automatically appear on:
  // ✅ Careers Page
  //
  // TO ADD NEW JOB:
  //
  // Copy one block below and edit values
  //
  // Example:
  //
  // {
  //   title: "Pressure Cleaner",
  //   type: "Full-time",
  //   location: "Perth, WA",
  // },
  //
  // ========================================================

  availableJobs: [

    {
      title:
        "Skilled Labour",

      type: "Full-time",

      location:
        "Perth",
    },

    {
      title:
        "Handyman",

      type: "Full-time",

      location:
        "Perth",
    },
    {
      title:
        "Artificial Turf Tradesman",

      type: "Full-time",

      location:
        "Perth",
    },
  ],



  // ========================================================
  // SERVICES
  // ========================================================
  //
  // These automatically update:
  //
  // ✅ Services Section Cards
  // ✅ Quote Form Services
  // ✅ Footer Services
  // ✅ Service Pages
  //
  // TO ADD NEW SERVICE:
  //
  // 1. Import image at top
  //
  // 2. Copy service block below
  //
  // 3. Change title/details
  //
  // Example:
  //
  // {
  //   slug: "pressure-cleaning",
  //
  //   title: "Pressure Cleaning",
  //
  //   image: cleaning,
  //
  //   short:
  //     "Professional pressure washing.",
  //   detail:
  //     "A longer paragraph for the individual service page only.",
  //
  //   items: [
  //     "Driveways",
  //     "Walls",
  //     "Roofs",
  //   ],
  // },
  //
  // ========================================================

  services: [

    {
      slug:
        "artificial-grass",

      title:
        "Artificial Grass",

      image: grass,

      short:
        "Premium synthetic turf installation.",

      
      detail:
      `Transform your outdoor spaces with high-quality artificial grass designed for beauty, durability, and low maintenance. We specialize in supplying and installing premium synthetic turf for residential, commercial, and landscaping projects. Whether it's your backyard, front lawn, playground, rooftop, office space, or sports area, we create clean, green spaces that look natural all year round.

Our artificial grass is pet-friendly, child-safe, weather-resistant, and built to handle heavy use while staying fresh and vibrant. Say goodbye to mowing, watering, mud, and ongoing lawn maintenance.

We focus on professional workmanship, affordable pricing, and customer satisfaction from start to finish. From site preparation to final installation, our team ensures every project is completed to the highest standard.`,
      items: [
        "Residential lawns",
        "Commercial landscaping",
        "Artificial Grass Supply & Installation",
        "Playgrounds & Schools",
        "Pet-Friendly Turf Areas",
        "Rooftop & Balcony Turf",
        "Sports & Recreation Areas",

      ],
      images: [
        {
          src: g7,
          label: "Front yard Lawn Transformation",
          size: "small"
        },
        {
          src: g15,
          label: "Before and After - Artificial Grass",
          size: "wide"
        },
        {
          src: g22,
          label: "Before and After - Artificial Grass",
          size: "tall"
        }
      ]
    },

    {
      slug:
        "construction-maintenance",

      title:
        "Construction Maintenance",

      image:
        construction,

      short:
        "Site cleaning & maintenance.",

      detail:
       'Ensure your project site is safe, compliant, and ready for the next phase with our comprehensive site cleaning and preparation services. We specialize in post-construction and demolition cleanup, providing everything from interior sweep-outs to heavy debris and hazardous waste removal. Our team also handles precision preparation tasks, including floor scraping, acid fence cleaning, and paving prep, along with professional waterproofing. Whether its green waste removal or full land clearing, we provide a blank canvas for your construction or landscaping vision.We offer ute-based transport for construction materials, including site-to-site delivery, supplier pickups, and quick drop-offs—fast, reliable, and hassle-free.',
      items: [
        "Post-construction site cleaning",
        "Interior sweep out and clean ",
        "Demolition cleanup",
        "Land clearing & site preparation",
        "Rubbish removal & site clearance",
        "Debris removal & site restoration",
        "Green waste removal & landscaping",
        "Waterproofing",
        "Ute Transport & Delivery Services",
      ],
      images: [
        {
          src: g17,
          label: "Landscape prep",
          size: "large"
        },
        
      ]
    },

    {
      slug:
        "labour-hire",

      title:
        "Labour Hire",

      image: labour,

      short:
        "Skilled labour solutions.",

      detail:
        `We provide skilled and dependable labour hire for residential, commercial, and industrial projects. Whether you need short-term workers, long-term staff, or urgent site support, we supply labourers ready to get the job done safely and efficiently.
Our team can assist with construction, landscaping, site cleaning, general labour, maintenance, moving materials, demolition support, and more. We understand the importance of punctuality, productivity, and safety on every job site.
We work closely with businesses, contractors, and project managers to deliver flexible workforce solutions tailored to your needs.`,

      items: [
        "Construction workers",
        "General labourers",
        "Landscaping Crews",
        "Site Clean-Up Staff",
        "Maintenance Support Workers",
        "Short-Term & Long-Term Hire",
      ],
      images: []
    },

    {
      slug:
        "sand-removal",

      title:
        "Sand Removal",

      image: sand,

      short:
        "Professional sand removal.",

      detail:
        'Professional sand removal and site preparation services for residential and commercial properties. We specialize in clearing excess sand from backyards, verges, and construction sites, using compact equipment for tight-access areas. From complete waste disposal and skip bin coordination to precision leveling and compaction, we ensure your ground is perfectly prepped for paving, landscaping, or new construction. We focus on efficiency, cleanliness, and leaving your site ready for its next transformation.',
      items: [
        "Backyard sand removal",
        "Site Levelling & Compaction ",
        "Verge Sand Clearing & Clean-Up",
        "Sand Disposal & Skip Bin Coordination",
        "Construction Site Sand Removal",
        " Tight-Access Sand Clearing with Compact Equipment ",
      ],
      images: [
        {
          src: g25,
          label: "Site Cleanup",
          size: "tall"
        }
      ]
    },

    {
      slug:
        "handyman",

      title:
        "Handyman Services",

      image:
        handyman,

      short:
        "General property maintenance.",

      detail:
        'Maintain the integrity and aesthetics of your property with our professional brick and paving repair services. We specialize in seamless brick patching to restore structural strength, along with paving replacements to fix sunken or hazardous surfaces in driveways and patios. Beyond masonry, we offer general handyman services to tackle those essential small repairs and maintenance tasks that keep your home or business in top condition. Our focus is on precision, safety, and high-quality finishes for every minor or major touch-up.',
      items: [
        "Brick patching",
        "Paving replacement",
        "General Handyman Work ",
      ],
      images: [
        {
          src: g26,
          label: "Handyman Services - Before and After",
          size: "wide"
        }
      ]
    },
  ],



  // ========================================================
  // BUILDER LOGOS
  // ========================================================
  //
  // These appear in:
  // ✅ Trusted by Builders & Contractors section
  //
  // TO ADD / CHANGE A BUILDER LOGO:
  //
  // 1. Add the logo image inside:
  //    src/assets/
  //
  // 2. Import it near "BUILDER LOGO IMAGES" above
  //
  // 3. Replace "builderLogo" below with your imported image
  //
  // Example:
  //
  // {
  //   name: "BuildCo",
  //   image: buildCoLogo,
  // },
  //
  // ========================================================



};

