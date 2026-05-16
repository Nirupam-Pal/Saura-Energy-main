/**
 * WhatsApp form submission utility
 * Constructs WhatsApp messages from form data and opens WhatsApp chat
 */

export const sendFormViaWhatsApp = (phoneNumber, formData) => {
  const buildMessage = (data) => {
    const parts = [];
    parts.push("📋 *New Consultation Request*");
    parts.push("");
    if (data.name) parts.push(`*Name:* ${data.name}`);
    if (data.phone) parts.push(`*Phone:* ${data.phone}`);
    if (data.email) parts.push(`*Email:* ${data.email}`);
    if (data.city) parts.push(`*City:* ${data.city}`);
    if (data.property_type) parts.push(`*Property Type:* ${data.property_type}`);
    if (data.service_interest) parts.push(`*Service Interest:* ${data.service_interest}`);
    if (data.monthly_bill) parts.push(`*Monthly Bill:* ₹${data.monthly_bill}`);
    if (data.message) parts.push(`*Message:* ${data.message}`);
    parts.push("");
    parts.push("_Submitted via Saura Energy website_");
    return parts.join("%0A");
  };

  const message = buildMessage(formData);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");
};

export const sendNewsletterViaWhatsApp = (phoneNumber, email) => {
  const message = `📧 *Newsletter Subscription*%0A%0AEmail: ${email}%0A%0A_Submitted via Saura Energy website_`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");
};
