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

import g1 from "@/assets/gallery-1.jpeg";

import g2 from "@/assets/gallery-2.jpg";

import g3 from "@/assets/gallery-3.webp";

import g4 from "@/assets/gallery-4.jpg";

import g5 from "@/assets/gallery-5.jpg";

import g6 from "@/assets/gallery-6.jpg";

import g7 from "@/assets/gallery-8.jpg";



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
    whatsapp: "61406183393",

    // Business email
    email: "hello@bjrmaintenance.com.au",

    // Business address
    address:
      "186 Honeywood Avenue, Wandi 6167",
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
        "Honeywood avenue",
    },

    {
      title:
        "Handyman",

      type: "Full-time",

      location:
        "Honeywood avenue",
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

      items: [
        "Residential lawns",
        "Commercial landscaping",
        "Artificial Grass Supply & Installation",
        "Playgrounds & Schools",
        "Pet-Friendly Turf Areas",
        "Rooftop & Balcony Turf",
        "Sports & Recreation Areas",

      ],
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

      items: [
        "Post-construction site cleaning",
        "Interior sweep out and clean ",
        "Demolition cleanup",
        "Land clearing & site preparation",
        "Rubbish removal & site clearance",
        "Debris removal & site restoration",
        "Green waste removal & landscaping",
        "Waterproofing",
        "Hazardous waste removal",
      ],
    },

    {
      slug:
        "labour-hire",

      title:
        "Labour Hire",

      image: labour,

      short:
        "Skilled labour solutions.",

      items: [
        "Construction workers",
        "General labourers",
        "Landscaping Crews",
        "Site Clean-Up Staff",
        "Maintenance Support Workers",
        "Short-Term & Long-Term Hire",
      ],
    },

    {
      slug:
        "sand-removal",

      title:
        "Sand Removal",

      image: sand,

      short:
        "Professional sand removal.",

      items: [
        "Backyard sand removal",
        "Site Levelling & Compaction ",
        "Verge Sand Clearing & Clean-Up",
        "Sand Disposal & Skip Bin Coordination",
        "Construction Site Sand Removal",
        " Tight-Access Sand Clearing with Compact Equipment ",
      ],
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

      items: [
        "Brick patching",
        "Paving replacement",
        "General Handyman Work ",
      ],
    },
  ],



  // ========================================================
  // GALLERY IMAGES
  // ========================================================
  //
  // These appear automatically in:
  // ✅ Gallery Section
  //
  // TO ADD NEW IMAGE:
  //
  // 1. Add image in:
  //    src/assets/
  //
  // 2. Import image at top
  //
  // 3. Add new object below
  //
  // Example:
  //
  // {
  //   src: g7,
  //
  //   label:
  //     "Pressure Cleaning Project",
  //
  //   tall: false,
  // },
  //
  // tall: true
  // makes image taller
  //
  // ========================================================

  gallery: [

    {
      src: g7,

      label:
        "Backyard Lawn Transformation",

      tall: false,
    },

    {
      src: g2,

      label:
        "Rooftop Turf Install",

      tall: false,
    },

    {
      src: g3,

      label:
        "School Playground Turf",

      tall: true,
    },

    {
      src: g4,

      label:
        "Site Prep & Paving",

      tall: false,
    },

    {
      src: g1,

      label:
        " Landscaping",

      tall: false,
    },

    {
      src: g6,

      label:
        "Construction Cleanup",

      tall: false,
    },
  ],
};