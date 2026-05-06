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

    try {
      setLoading(true);

      const form =
        e.currentTarget;

      const fd =
        new FormData(form);

      const data =
        Object.fromEntries(
          fd.entries(),
        );

      const res =
        schema.safeParse(data);

      if (!res.success) {
        toast.error(
          res.error.issues[0]
            ?.message ??
            "Please check the form",
        );

        return;
      }

      fd.append(
        "_subject",
        "New Job Application",
      );

      fd.append(
        "_captcha",
        "false",
      );

      fd.append(
        "_template",
        "table",
      );

      const response =
        await fetch(
          "https://formsubmit.co/ajax/scmslogin@gmail.com",
          {
            method: "POST",
            body: fd,
            headers: {
              Accept:
                "application/json",
            },
          },
        );

      if (!response.ok) {
        throw new Error(
          "Submission failed",
        );
      }

      toast.success(
        "Application submitted successfully!",
      );

      form.reset();

      setSelected("");
    } catch (error) {
      toast.error(
        "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gray-900 text-white">
        <div className="container-x">
          <p className="uppercase tracking-widest text-xs font-semibold opacity-80">
            Careers
          </p>

          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Join the{" "}
            {
              siteConfig
                .company
                .name
            }{" "}
            crew
          </h1>

          <p className="mt-4 max-w-2xl text-white/90 text-lg">
            Reliable, skilled,
            and ready to work?
            We're always looking
            for great people.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          {/* JOBS */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Open positions
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {siteConfig.availableJobs.map(
                (j) => (
                  <div
                    key={j.title}
                    className="
                      rounded-2xl
                      border border-gray-200
                      bg-white
                      p-6
                      hover:shadow-card
                      hover:-translate-y-0.5
                      transition-all
                    "
                  >
                    <h3 className="font-semibold text-lg">
                      {j.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {j.type}
                      </span>

                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {j.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Start ASAP
                      </span>
                    </div>

                    <Button
                      size="sm"
                      className="mt-5 bg-black text-white hover:bg-gray-800"
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
                ),
              )}
            </div>
          </div>

          {/* FORM */}
          <div
            id="apply"
            className="
              rounded-2xl
              bg-card
              border
              p-6
              md:p-8
              shadow-card
              h-fit
            "
          >
            <h3 className="text-xl font-bold">
              Apply now
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              Fill in your
              details — we'll be
              in touch.
            </p>

            <form
              className="mt-5 grid gap-4"
              onSubmit={onSubmit}
            >
              <div>
                <Label htmlFor="cname">
                  Full Name
                </Label>

                <Input
                  id="cname"
                  name="name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cemail">
                  Email
                </Label>

                <Input
                  id="cemail"
                  name="email"
                  type="email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cphone">
                  Phone
                </Label>

                <Input
                  id="cphone"
                  name="phone"
                  type="tel"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cposition">
                  Position
                </Label>

                <Input
                  id="cposition"
                  name="position"
                  value={
                    selected
                  }
                  onChange={(
                    e,
                  ) =>
                    setSelected(
                      e.target
                        .value,
                    )
                  }
                  placeholder="Position you're applying for"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cmsg">
                  About you
                </Label>

                <Textarea
                  id="cmsg"
                  name="message"
                  rows={4}
                  placeholder="Experience, availability, licences..."
                />
              </div>

              <Button
                type="submit"
                disabled={
                  loading
                }
                className="bg-black text-white hover:bg-gray-800"
              >
                {loading
                  ? "Submitting..."
                  : "Submit application"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}