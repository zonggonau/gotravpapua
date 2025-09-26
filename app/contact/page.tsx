'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { endpoint, fetcher } from '@/data/api';
import { Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  tourType?: string;
  preferredDate?: string;
}

const contactMethods = [
  {
    icon: 'fas fa-phone',
    title: 'Call Us',
    description: 'Speak directly with our travel experts',
    action: 'Call Now',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: 'fab fa-whatsapp',
    title: 'WhatsApp',
    description: 'Quick response via WhatsApp',
    action: 'Chat Now',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: 'fas fa-envelope',
    title: 'Email Us',
    description: 'Send us detailed inquiries',
    action: 'Send Email',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Visit Office',
    description: 'Meet us at our Papua office',
    action: 'Get Directions',
    color: 'bg-purple-100 text-purple-600',
  },
];

const tourTypes = [
  'General Inquiry',
  'Tour Package',
  'Adventure Tour',
  'Cultural Experience',
  'Custom Itinerary',
  'Group Booking',
];

export default function ContactPage() {
  const { data, error, isLoading } = useSWR(endpoint.settings, fetcher);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    tourType: tourTypes[0],
    preferredDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const settings = data?.data || {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        tourType: tourTypes[0],
        preferredDate: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactMethod = (method: string) => {
    switch (method) {
      case 'Call Now':
        if (settings.telephone) {
          window.open(`tel:${settings.telephone}`);
        }
        break;
      case 'Chat Now':
        if (settings.telephone) {
          window.open(`https://wa.me/${settings.telephone.replace(/\D/g, '')}`);
        }
        break;
      case 'Send Email':
        if (settings.email_address) {
          window.open(`mailto:${settings.email_address}`);
        }
        break;
      case 'Get Directions':
        if (settings.office_address) {
          window.open(`https://maps.google.com?q=${encodeURIComponent(settings.office_address)}`);
        }
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Ready to start your Papua adventure? We&apos;re here to help you plan 
              the perfect trip. Contact us today and let&apos;s make your dream journey a reality.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-clock"></i>
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-users"></i>
                <span>Expert Advice</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-heart"></i>
                <span>Personalized Service</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Would You Like to Connect?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your preferred way to reach us. We&apos;re available through multiple channels 
              to provide you with the best support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${method.icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {method.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactMethod(method.action)}
                      className="group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600"
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="+62 xxx xxx xxxx"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tour Interest
                        </label>
                        <select
                          name="tourType"
                          value={formData.tourType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          {tourTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="What's this about?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Travel Date
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder="Tell us about your travel plans, questions, or special requirements..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      loading={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      <i className="fas fa-paper-plane ml-2"></i>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Office Info */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Visit Our Office
                  </h3>
                  
                  {!isLoading && settings && (
                    <div className="space-y-4">
                      {settings.office_address && (
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-map-marker-alt text-primary-600"></i>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Address</h4>
                            <p className="text-gray-600 mt-1">{settings.office_address}</p>
                          </div>
                        </div>
                      )}
                      
                      {settings.telephone && (
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-phone text-green-600"></i>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Phone</h4>
                            <p className="text-gray-600 mt-1">{settings.telephone}</p>
                          </div>
                        </div>
                      )}
                      
                      {settings.email_address && (
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-envelope text-blue-600"></i>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Email</h4>
                            <p className="text-gray-600 mt-1">{settings.email_address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-primary-700">
                      <i className="fas fa-info-circle mr-2"></i>
                      Emergency support available 24/7 for active tour participants
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Quick Answers
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        How quickly do you respond?
                      </h4>
                      <p className="text-sm text-gray-600">
                        We typically respond within 2-4 hours during business hours.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Can I customize my tour?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Absolutely! We specialize in creating personalized itineraries.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Do you offer group discounts?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Yes, we offer special rates for groups of 6 or more people.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
