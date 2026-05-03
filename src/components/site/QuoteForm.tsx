import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Send } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  email: z.string().trim().email("Invalid email").max(160),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().max(1000).optional().default(""),
});

const services = [
  "Artificial Grass",
  "Construction Maintenance",
  "Labour Hire",
  "Sand Removal",
  "Handyman Services",
  "Other",
];

export function QuoteForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success("Quote request received! We'll be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
    setFiles([]);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="John Smith" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="0400 000 000" required />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@email.com" required />
      </div>
      <div>
        <Label htmlFor="service">Service Needed</Label>
        <Select name="service" required>
          <SelectTrigger id="service">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="message">Project Details</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your project, area size, location..."
        />
      </div>
      <div>
        <Label htmlFor="files">Upload Images (optional)</Label>
        <label
          htmlFor="files"
          className="mt-1 flex items-center gap-3 border-2 border-dashed rounded-lg px-4 py-4 cursor-pointer hover:bg-secondary transition-colors"
        >
          <Upload className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {files.length ? `${files.length} file(s) selected` : "Click to upload site photos"}
          </span>
          <input
            id="files"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
        </label>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="bg-gradient-primary text-primary-foreground gap-2 w-full sm:w-auto"
      >
        <Send className="h-4 w-4" /> {submitting ? "Sending..." : "Request Free Quote"}
      </Button>
    </form>
  );
}
