"use client";

import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { usePostContactMessageMutation } from "@/redux/features/contact/contact.api";

// Define validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [postContact] = usePostContactMessageMutation();

  const onSubmit = async (data: ContactFormData) => {
    const res = await handleAsyncWithToast(async () => {
      return postContact(data);
    }, "Message Sending...");
    console.log(res);
    if (res?.data?.success) {
      reset();
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Phone",
                content: "1-800-MEALBOX",
                description: "Mon-Fri from 8am to 8pm",
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email",
                content: "support@mealbox.com",
                description: "We'll respond within 24 hours",
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Office",
                content: "123 Food Street",
                description: "San Francisco, CA 94105",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-lg bg-secondary/30"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="font-medium mb-1">{item.content}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Form */}
            <div className="bg-card rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={6}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background resize-none"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-emerald-700 text-white text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden h-[600px] bg-secondary relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                  <p className="text-muted-foreground">
                    123 Food Street, San Francisco
                    <br />
                    California, 94105
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How quickly can I expect a response?",
                answer:
                  "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.",
              },
              {
                question: "Do you have offices in other cities?",
                answer:
                  "While our main office is in San Francisco, we operate in multiple cities across the country. Contact us to learn about our presence in your area.",
              },
              {
                question: "How can I become a chef on MealBox?",
                answer:
                  "To become a chef, click on the 'Become a Chef' button and fill out the application form. Our team will review your application and get back to you within 48 hours.",
              },
              {
                question: "What are your customer service hours?",
                answer:
                  "Our customer service team is available Monday through Friday, 8am to 8pm PST. You can also email us anytime, and we'll respond during business hours.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
