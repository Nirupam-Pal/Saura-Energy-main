import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import { BRAND } from "@/lib/data";
import { sendFormViaWhatsApp } from "@/lib/whatsappUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initial = {
  name: "", phone: "", email: "", city: "",
  property_type: "residential", service_interest: "",
  monthly_bill: "", message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Name and phone are required.");
      return;
    }
    try {
      sendFormViaWhatsApp(BRAND.whatsapp, {
        ...form,
        monthly_bill: form.monthly_bill ? Number(form.monthly_bill) : null,
      });
      toast.success("Opening WhatsApp! Send this message to connect with our team.");
      setForm(initial);
    } catch (err) {
      toast.error("Could not open WhatsApp. Please try again.");
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-white" data-testid="contact-section" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left info */}
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-3">Get in Touch</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              Let's design your <span className="text-[#1B3A8C]">solar future</span> together.
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Fill the form or reach us directly. Our experts respond within 4 working hours.
            </p>

            <div className="mt-9 space-y-5">
              <Info icon={Phone} label="Mobile / WhatsApp" value={BRAND.phoneDisplay} href={`tel:${BRAND.phone}`} testid="contact-info-phone" />
              <Info icon={Phone} label="Landline" value={BRAND.landline} href={`tel:${BRAND.landline}`} testid="contact-info-landline" />
              <Info icon={Mail} label="Email" value={BRAND.email} href={`mailto:${BRAND.email}`} testid="contact-info-email" />
              <Info icon={MapPin} label="Office" value={BRAND.address} testid="contact-info-address" />
              <Info icon={Clock} label="Hours" value="Mon–Sat · 9:00 AM – 7:00 PM" testid="contact-info-hours" />
            </div>

            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Saura%20Energy%2C%20I%27d%20like%20to%20discuss%20a%20solar%20installation.`}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-whatsapp-cta"
              className="mt-8 inline-flex items-center gap-3 px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold transition shadow-lg"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={onSubmit}
              data-testid="lead-form"
              className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-white to-orange-50/40 border border-slate-100 p-7 md:p-10 shadow-xl shadow-blue-900/5"
            >
              <h3 className="font-display text-2xl font-bold text-slate-900">Request a free consultation</h3>
              <p className="mt-1.5 text-sm text-slate-500">Takes 30 seconds. No obligations.</p>

              <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Your Name *" id="name">
                  <Input id="name" data-testid="form-name" value={form.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Ankit Sharma" className="rounded-xl border-slate-200" />
                </Field>
                <Field label="Phone *" id="phone">
                  <Input id="phone" data-testid="form-phone" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="98620 17266" className="rounded-xl border-slate-200" />
                </Field>
                <Field label="Email" id="email">
                  <Input id="email" type="email" data-testid="form-email" value={form.email} onChange={(e) => onChange("email", e.target.value)} placeholder="you@example.com" className="rounded-xl border-slate-200" />
                </Field>
                <Field label="City" id="city">
                  <Input id="city" data-testid="form-city" value={form.city} onChange={(e) => onChange("city", e.target.value)} placeholder="Agartala" className="rounded-xl border-slate-200" />
                </Field>

                <Field label="Property Type">
                  <Select value={form.property_type} onValueChange={(v) => onChange("property_type", v)}>
                    <SelectTrigger data-testid="form-property-type" className="rounded-xl border-slate-200"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Service Interest">
                  <Select value={form.service_interest} onValueChange={(v) => onChange("service_interest", v)}>
                    <SelectTrigger data-testid="form-service" className="rounded-xl border-slate-200"><SelectValue placeholder="Choose a service" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rooftop">Rooftop Installation</SelectItem>
                      <SelectItem value="financing">Solar Financing</SelectItem>
                      <SelectItem value="maintenance">Maintenance / O&M</SelectItem>
                      <SelectItem value="storage">Battery Storage</SelectItem>
                      <SelectItem value="ev">EV Charging</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Monthly Electricity Bill (₹)" id="bill">
                  <Input id="bill" type="number" data-testid="form-bill" value={form.monthly_bill} onChange={(e) => onChange("monthly_bill", e.target.value)} placeholder="3500" className="rounded-xl border-slate-200" />
                </Field>
                <Field label="When are you planning?">
                  <Select onValueChange={(v) => onChange("message", `Planning timeline: ${v}. ${form.message}`)}>
                    <SelectTrigger data-testid="form-timeline" className="rounded-xl border-slate-200"><SelectValue placeholder="Choose timeline" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="1-3-months">1–3 months</SelectItem>
                      <SelectItem value="3-6-months">3–6 months</SelectItem>
                      <SelectItem value="exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <div className="md:col-span-2">
                  <Field label="Anything else?" id="message">
                    <Textarea id="message" data-testid="form-message" value={form.message} onChange={(e) => onChange("message", e.target.value)} placeholder="Roof size, shading concerns, specific brands..." rows={4} className="rounded-xl border-slate-200" />
                  </Field>
                </div>
              </div>

              <Button type="submit" data-testid="form-submit" className="mt-7 w-full rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white py-6 text-base font-semibold shadow-lg hover:shadow-xl">
                <Send className="mr-2 h-5 w-5" /> Request Free Consultation
              </Button>
              <p className="text-xs text-slate-400 text-center mt-3">By submitting, you agree to our privacy policy. We never share your data.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon: I, label, value, href, testid }) {
  const inner = (
    <>
      <span className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#F26A21]/15 to-[#1B3A8C]/10 grid place-items-center flex-shrink-0">
        <I className="h-5 w-5 text-[#F26A21]" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">{label}</div>
        <div className="mt-0.5 text-slate-800 font-semibold">{value}</div>
      </div>
    </>
  );
  return href ? (
    <a href={href} data-testid={testid} className="flex items-start gap-4 group hover:text-[#F26A21] transition">{inner}</a>
  ) : (
    <div data-testid={testid} className="flex items-start gap-4">{inner}</div>
  );
}

function Field({ label, id, children }) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-slate-600">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
