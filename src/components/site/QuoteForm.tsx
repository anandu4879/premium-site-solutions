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
import { siteConfig } from "@/config/siteConfig";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  email: z.string().trim().email("Invalid email").max(160),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().max(1000).optional().default(""),
});

const services = siteConfig.services.map(
  (service) => service.title,
);

export function QuoteForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    const fd = new FormData(form);

    const data = Object.fromEntries(fd.entries());

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ??
          "Please check the form",
      );

      return;
    }

    try {
      setSubmitting(true);

      let uploadedUrls: string[] = [];

      // Upload files to Cloudinary
      if (files.length > 0) {
        for (const file of files) {
          const cloudinaryData =
            new FormData();

          cloudinaryData.append(
            "file",
            file,
          );

          cloudinaryData.append(
            "upload_preset",
            "xyt5y8cg",
          );

          const uploadRes = await fetch(
            "https://api.cloudinary.com/v1_1/dhd74hitg/image/upload",
            {
              method: "POST",
              body: cloudinaryData,
            },
          );

          const uploadJson =
            await uploadRes.json();

          uploadedUrls.push(
            uploadJson.secure_url,
          );
        }
      }

      // FormSubmit Config
      fd.append(
        "_subject",
        "New Quote Request",
      );

      fd.append(
        "_captcha",
        "false",
      );

      fd.append(
        "_template",
        "table",
      );

      fd.append(
        "_next",
        "https://www.bjrmaintenance.com/thank-you",
      );

      fd.append(
        "uploaded_files",
        uploadedUrls.join("\n"),
      );

      // Send Form
      const response = await fetch(
        "https://formsubmit.co/hellobjrmaintenance@gmail.com",
        {
          method: "POST",
          body: fd,
        },
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      toast.success(
        "Quote request submitted successfully!",
      );

      form.reset();

      setFiles([]);
    } catch (error) {
      toast.error(
        "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label
            htmlFor="name"
            className="text-gray-900 font-medium mb-2 block"
          >
            Full Name
          </Label>

          <Input
            id="name"
            name="name"
            placeholder="John Smith"
            required
            className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20"
          />
        </div>

        <div>
          <Label
            htmlFor="phone"
            className="text-gray-900 font-medium mb-2 block"
          >
            Phone
          </Label>

          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="0400 000 000"
            required
            className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20"
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="email"
          className="text-gray-900 font-medium mb-2 block"
        >
          Email
        </Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          required
          className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20"
        />
      </div>

      <div>
        <Label
          htmlFor="service"
          className="text-gray-900 font-medium mb-2 block"
        >
          Service Needed
        </Label>

        <Select name="service" required>
          <SelectTrigger
            id="service"
            className="bg-white border-gray-300 text-black focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20 [&>span]:text-black"
          >
            <SelectValue
              placeholder="Select a service"
              className="text-gray-500"
            />
          </SelectTrigger>

          <SelectContent className="bg-white border-gray-300 text-black [&>div>span]:text-black">
            {services.map((s) => (
              <SelectItem
                key={s}
                value={s}
                className="hover:bg-[#D8C2A0]/20 focus:bg-[#D8C2A0]/20 text-black data-[highlighted]:text-black"
              >
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="message"
          className="text-gray-900 font-medium mb-2 block"
        >
          Project Details
        </Label>

        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your project, area size, location..."
          className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-[#D8C2A0] focus:ring-[#D8C2A0]/20 resize-none"
        />
      </div>

      <div>
        <Label
          htmlFor="files"
          className="text-gray-900 font-medium mb-2 block"
        >
          Upload Images (optional)
        </Label>

        <label
          htmlFor="files"
          className="mt-1 flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-xl px-6 py-4 cursor-pointer hover:bg-[#D8C2A0]/5 hover:border-[#D8C2A0]/50 transition-all duration-300 group"
        >
          <Upload className="h-5 w-5 text-gray-500 group-hover:text-[#D8C2A0] transition-colors" />

          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            {files.length
              ? `${files.length} file(s) selected`
              : "Click to upload site photos"}
          </span>

          <input
            id="files"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setFiles(
                Array.from(e.target.files ?? []),
              )
            }
          />
        </label>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold gap-3 w-full sm:w-auto transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl px-8 py-4"
      >
        <Send className="h-5 w-5" />

        {submitting
          ? "Sending..."
          : "Request Free Quote"}
      </Button>
    </form>
  );
}