import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Briefcase, Clock } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — BJ & R Maintenance | Join Our Team" },
      { name: "description", content: "Join BJ & R Maintenance. We're hiring labourers, turf installers, site cleaners and trade workers across WA. Apply now." },
    ],
  }),
  component: CareersPage,
});

const jobs = [
  { title: "Artificial Grass Installer", type: "Full-time", location: "Perth, WA" },
  { title: "Construction Site Cleaner", type: "Full-time", location: "Perth, WA" },
  { title: "General Labourer", type: "Casual / Ongoing", location: "WA Wide" },
  { title: "Skid Steer / Bobcat Operator", type: "Full-time", location: "Perth, WA" },
  { title: "Landscaping Crew Member", type: "Full-time", location: "Perth, WA" },
  { title: "Handyman / Maintenance", type: "Part-time", location: "Perth Metro" },
];

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(20),
  position: z.string().trim().min(1).max(120),
  message: z.string().trim().max(1000).optional().default(""),
});

function CareersPage() {
  const [selected, setSelected] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = schema.safeParse(data);
    if (!res.success) return toast.error(res.error.issues[0]?.message ?? "Please check the form");
    toast.success("Application received! We'll be in touch soon.");
    (e.target as HTMLFormElement).reset();
    setSelected("");
  };

  return (
    <SiteLayout>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-primary text-primary-foreground">
        <div className="container-x">
          <p className="uppercase tracking-widest text-xs font-semibold opacity-80">Careers</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Join the BJ & R Maintenance crew
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/90 text-lg">
            Reliable, skilled, and ready to work? We're always looking for great people.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Open positions</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {jobs.map((j) => (
                <div key={j.title} className="rounded-2xl border bg-card p-6 hover:shadow-card hover:-translate-y-0.5 transition-all">
                  <h3 className="font-semibold text-lg">{j.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{j.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{j.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Start ASAP</span>
                  </div>
                  <Button
                    size="sm"
                    className="mt-5 bg-gradient-primary text-primary-foreground"
                    onClick={() => {
                      setSelected(j.title);
                      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Apply now
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div id="apply" className="rounded-2xl bg-card border p-6 md:p-8 shadow-card h-fit">
            <h3 className="text-xl font-bold">Apply now</h3>
            <p className="text-sm text-muted-foreground mt-1">Fill in your details — we'll be in touch.</p>
            <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
              <div>
                <Label htmlFor="cname">Full Name</Label>
                <Input id="cname" name="name" required />
              </div>
              <div>
                <Label htmlFor="cemail">Email</Label>
                <Input id="cemail" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="cphone">Phone</Label>
                <Input id="cphone" name="phone" type="tel" required />
              </div>
              <div>
                <Label htmlFor="cposition">Position</Label>
                <Input id="cposition" name="position" value={selected} onChange={(e) => setSelected(e.target.value)} placeholder="Position you're applying for" required />
              </div>
              <div>
                <Label htmlFor="cmsg">About you</Label>
                <Textarea id="cmsg" name="message" rows={4} placeholder="Experience, availability, licences..." />
              </div>
              <Button type="submit" className="bg-gradient-primary text-primary-foreground">Submit application</Button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
