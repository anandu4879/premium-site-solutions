import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { SiteLayout } from "@/components/site/SiteLayout";

import { siteConfig } from "@/config/siteConfig";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  MapPin,
  Briefcase,
  Clock,
} from "lucide-react";

export const Route =
  createFileRoute("/careers")({
    head: () => ({
      meta: [
        {
          title:
            "Careers — BJ & R Maintenance | Join Our Team",
        },
        {
          name: "description",
          content:
            "Join BJ & R Maintenance. We're hiring labourers, turf installers, site cleaners and trade workers across WA. Apply now.",
        },
      ],
    }),
    component: CareersPage,
  });

const schema = z.object({
  name: z.string().trim().min(2).max(80),

  email: z
    .string()
    .trim()
    .email()
    .max(160),

  phone: z
    .string()
    .trim()
    .min(6)
    .max(20),

  position: z
    .string()
    .trim()
    .min(1)
    .max(120),

  message: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .default(""),
});

function CareersPage() {
  const [selected, setSelected] =
    useState<string>("");

  const [loading, setLoading] =
    useState(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    const fd = new FormData(form);

    const data = Object.fromEntries(fd.entries());

    const res = schema.safeParse(data);

    if (!res.success) {
      toast.error(
        res.error.issues[0]?.message ??
          "Please check the form",
      );

      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...Object.fromEntries(fd.entries()),
        formType: "career",
        uploaded_files: "",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Unable to submit application.",
        );
      }

      toast.success(
        "Application submitted successfully!",
      );

      form.reset();
      setSelected("");
      setLoading(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4 mt-4">
            Careers
          </p>

          <h1 className="mt-4 text-4xl lg:text-7xl font-bold leading-[1.1] text-balance max-w-4xl">
            Join the <span className="text-[#D8C2A0]">{siteConfig.company.name}</span> Crew
          </h1>

          <p className="mt-6 max-w-3xl text-white/80 text-xl leading-relaxed">
            Reliable, skilled, and ready to work? We're always looking for great people to join our growing team.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-[#F8F6F3] to-[#F0F0F0] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-12">
          {/* JOBS */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-gray-900">
              Open <span className="text-[#D8C2A0]">Positions</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {siteConfig.availableJobs.map(
                (j) => (
                  <div
                    key={j.title}
                    className="
                      group relative rounded-2xl
                      border border-gray-200/50
                      bg-white
                      p-6
                      hover:shadow-xl hover:-translate-y-1
                      transition-all duration-300
                      overflow-hidden
                    "
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-[#D8C2A0]/5 scale-0 group-hover:scale-100 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    
                    <div className="relative z-10">
                      <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#D8C2A0] transition-colors duration-300">
                        {j.title}
                      </h3>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-[#D8C2A0]" />
                          {j.type}
                        </span>

                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#D8C2A0]" />
                          {j.location}
                        </span>

                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#D8C2A0]" />
                          Start ASAP
                        </span>
                      </div>

                      <Button
                        size="sm"
                        className="mt-6 bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        onClick={() => {
                          setSelected(
                            j.title,
                          );

                          document
                            .getElementById(
                              "apply",
                            )
                            ?.scrollIntoView(
                              {
                                behavior:
                                  "smooth",
                              },
                            );
                        }}
                      >
                        Apply now
                      </Button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* FORM */}
          <div
            id="apply"
            className="
              relative rounded-2xl
              bg-black/40 backdrop-blur-xl
              border border-white/10
              p-6
              lg:p-8
              shadow-2xl
              h-fit
              overflow-hidden
            "
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D8C2A0]/10 to-transparent opacity-50" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">
                Apply Now
              </h3>

              <p className="text-white/80 mt-2">
                Fill in your details — we'll be in touch.
              </p>

              <form
                className="mt-6 grid gap-6"
                onSubmit={onSubmit}
              >
                <input
                  type="hidden"
                  name="formType"
                  value="career"
                />
                <input
                  type="hidden"
                  name="uploaded_files"
                  value=""
                />

                <div>
                  <Label htmlFor="cname" className="text-white font-medium mb-2 block">
                    Full Name
                  </Label>

                  <Input
                    id="cname"
                    name="name"
                    required
                    className="bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <Label htmlFor="cemail" className="text-white font-medium mb-2 block">
                    Email
                  </Label>

                  <Input
                    id="cemail"
                    name="email"
                    type="email"
                    required
                    className="bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="cphone" className="text-white font-medium mb-2 block">
                    Phone
                  </Label>

                  <Input
                    id="cphone"
                    name="phone"
                    type="tel"
                    required
                    className="bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20"
                    placeholder="0400 000 000"
                  />
                </div>

                <div>
                  <Label htmlFor="cposition" className="text-white font-medium mb-2 block">
                    Position
                  </Label>

                  <Input
                    id="cposition"
                    name="position"
                    value={
                      selected
                    }
                    onChange={
                      (
                        e,
                      ) =>
                        setSelected(
                          e.target
                            .value,
                        )
                    }
                    placeholder="Position you're applying for"
                    required
                    className="bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20"
                  />
                </div>

                <div>
                  <Label htmlFor="cmsg" className="text-white font-medium mb-2 block">
                    About You
                  </Label>

                  <Textarea
                    id="cmsg"
                    name="message"
                    rows={4}
                    placeholder="Experience, availability, licences..."
                    className="bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Application"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}