import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Contact = () => {
  const { content } = useContent();
  const { toast } = useToast();
  const formAnim = useScrollAnimation({ threshold: 0.1 });
  const mapAnim = useScrollAnimation({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: 'Message Sent!',
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero-dynamic text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/20 rounded-full blur-[120px] animate-float" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="container-premium relative">
          <span className="text-label animate-fade-up">Get in Touch</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6 animate-fade-up-delay-1">
            Contact Us
          </h1>
          <p className="text-xl text-white/70 max-w-2xl animate-fade-up-delay-2">
            Have questions about joining the academy, partnerships, or media inquiries?
            We'd love to hear from you.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-premium">
          <div ref={formAnim.ref as React.RefObject<HTMLDivElement>} className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 ${formAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, title: 'Location', value: `${content.contact.locationDetail}, ${content.contact.location}` },
                    { icon: Mail, title: 'Email', value: content.contact.email },
                    { icon: Phone, title: 'Phone', value: content.contact.phone },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary-blue))]/10 flex items-center justify-center shrink-0 group-hover:bg-[hsl(var(--primary-blue))] transition-colors">
                        <item.icon className="w-6 h-6 text-[hsl(var(--primary-blue))] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-12 h-12 rounded-xl bg-[hsl(var(--primary-blue))]/10 flex items-center justify-center hover:bg-[hsl(var(--primary-blue))] hover:text-white transition-all hover-lift"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`lg:col-span-3 transition-all duration-1000 delay-200 ${formAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="card-premium">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text" id="name" name="name" value={formData.name} onChange={handleChange} required maxLength={100}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--royal-blue))] focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email" id="email" name="email" value={formData.email} onChange={handleChange} required maxLength={255}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--royal-blue))] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <select
                      id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--royal-blue))] focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="academy">Academy Enrollment</option>
                      <option value="scouting">Scouting Inquiry</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="media">Media & Press</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message" name="message" value={formData.message} onChange={handleChange} required maxLength={1000} rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--royal-blue))] focus:border-transparent transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full btn-neon py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : (<>Send Message <Send className="w-4 h-4" /></>)}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-[hsl(var(--midnight-blue))] relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={mapAnim.ref as React.RefObject<HTMLDivElement>}
            className={`text-center transition-all duration-1000 ${mapAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          >
            <div className="w-20 h-20 rounded-full bg-[hsl(var(--royal-blue))]/20 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <MapPin className="w-10 h-10 text-[hsl(var(--electric-cyan))]" />
            </div>
            <p className="text-2xl font-bold text-white mb-2">{content.contact.location}</p>
            <p className="text-white/60">{content.contact.locationDetail}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
