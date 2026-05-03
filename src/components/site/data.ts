import grass from "@/assets/service-grass.jpg";
import construction from "@/assets/service-construction.jpg";
import labour from "@/assets/service-labour.jpg";
import sand from "@/assets/service-sand.jpg";
import handyman from "@/assets/service-handyman.jpg";

export const services = [
  {
    slug: "artificial-grass",
    title: "Artificial Grass",
    image: grass,
    short: "Premium synthetic turf supply & installation for any space.",
    items: [
      "Supply & Installation",
      "Residential Lawns",
      "Commercial Landscaping",
      "Playgrounds & Schools",
      "Rooftop & Balcony Turf",
      "Pet-Friendly Turf",
      "Sports & Recreation Areas",
    ],
  },
  {
    slug: "construction-maintenance",
    title: "Construction Maintenance",
    image: construction,
    short: "Post-build cleaning, demolition cleanup, waste & site care.",
    items: [
      "Site cleaning",
      "Demolition cleaning",
      "Waste removal",
      "Waterproofing",
      "Paving prep",
      "Fence cleaning (acid)",
      "Land clearing",
    ],
  },
  {
    slug: "labour-hire",
    title: "Labour Hire",
    image: labour,
    short: "Skilled, reliable workers ready for residential & commercial sites.",
    items: [
      "General labourers",
      "Construction workers",
      "Landscaping crews",
      "Maintenance support",
      "Short-term & long-term hire",
    ],
  },
  {
    slug: "sand-removal",
    title: "Sand Removal",
    image: sand,
    short: "Backyard, verge & site sand removal with compact equipment.",
    items: [
      "Backyard sand removal",
      "Verge clearing",
      "Site levelling & compaction",
      "Construction site cleanup",
      "Tight-access sand clearing",
    ],
  },
  {
    slug: "handyman",
    title: "Handyman Services",
    image: handyman,
    short: "Brick patching, paving repair & general property maintenance.",
    items: [
      "Brick patching",
      "Paving replacement",
      "Property maintenance",
      "General handyman work",
    ],
  },
] as const;

export type Service = (typeof services)[number];
