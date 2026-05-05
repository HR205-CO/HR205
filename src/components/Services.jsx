import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Tv, Smartphone, Shield, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const serviceCategories = [
  {
    id: 'internet',
    title: 'High-Speed Internet',
    icon: Wifi,
    description: 'We connect you with the fastest fiber and broadband providers in your area. Whether you need reliable speeds for residential remote work or dedicated business fiber, we find the best infrastructure for your needs.',
    benefits: ['Residential Fiber-optic', 'Dedicated Business Fiber', 'No-contract options', 'Professional installation'],
    image: 'https://image.pollinations.ai/prompt/A%20premium%20website%20hero%20image%20for%20High-Speed%20Internet%20services.%20Modern%20office%20workspace%20with%20computers%2C%20video%20calls%2C%20cloud%20data%20connectivity%2C%20seamless%20productivity.%20Subtle%20visual%20cues%20for%20speed%2C%20bandwidth%2C%20streaming%2C%20smart%20devices%2C%20and%20stable%20connection.%20Elegant%20network%20lines%2C%20light%20trails%2C%20data%20flow%20accents%2C%20abstract%20signal%20overlays.%20Emphasize%20reliability%2C%20speed%2C%20and%20connected%20working.%20Wide%20horizontal%20format%2C%20balanced%20composition%2C%20realistic%2C%20professional.%20No%20logos%2C%20no%20readable%20text%2C%20no%20watermark.?width=1200&height=675&nologo=true'
  },
  {
    id: 'cable',
    title: 'Premium Cable & Streaming',
    icon: Tv,
    description: 'Access the best in entertainment with premium cable packages for your home or business. We help you compare channel lineups, DVR capabilities, and public viewing options for commercial spaces.',
    benefits: ['200+ HD Channels', 'Live Sports packages', 'Commercial TV solutions', 'Smart DVR technology'],
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cellular',
    title: 'Cellular & Mobile Plans',
    icon: Smartphone,
    description: 'Find the perfect mobile plan for individuals, families, or entire business teams. We partner with major networks to offer unlimited data, international roaming, and enterprise-level device management.',
    benefits: ['5G Network access', 'Business team discounts', 'No credit check options', 'Enterprise device deals'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'security',
    title: 'Home & Business Security',
    icon: Shield,
    description: 'Protect what matters most with state-of-the-art security solutions. From residential smart cameras to commercial 24/7 professional monitoring, we help you design a system that fits your specific environment.',
    benefits: ['24/7 Professional monitoring', 'Commercial access control', 'Mobile app control', 'Wireless camera systems'],
    image: 'https://image.pollinations.ai/prompt/A%20premium%20website%20hero%20image%20for%20Home%20Security%20services.%20Modern%20home%20exterior%20with%20smart%20security%20camera%2C%20video%20doorbell%2C%20subtle%20shield%20interface%2C%20warm%20but%20secure%20feel.%20Subtle%20visual%20cues%20for%20monitoring%2C%20connectivity%2C%20protection%2C%20and%20smart%20technology.%20Elegant%20signal%20data%20line%20accents%20and%20abstract%20network%20overlays.%20Wide%20horizontal%20format%2C%20visually%20balanced%2C%20realistic%2C%20professional.%20No%20logos%2C%20no%20readable%20text%2C%20no%20watermark.?width=1200&height=675&nologo=true'
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Residential & <span className="text-brand-navy">Business Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At HR205 LLC Communications, we provide expert consulting for both residential and commercial clients across Texas and Alabama.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {serviceCategories.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-12 p-8 lg:p-12 bg-white rounded-[3rem] shadow-sm border border-gray-100 ${
                idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-navy/5 rounded-2xl text-brand-navy mb-6">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{service.title}</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      {benefit}
                    </div>
                  ))}
                </div>
                <Link
                  to="/schedule"
                  className="inline-flex items-center gap-2 text-brand-navy font-bold hover:gap-4 transition-all"
                >
                  Consult an Expert <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex-1 w-full aspect-video rounded-[2rem] overflow-hidden relative shadow-lg">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 lg:p-20 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">Ready to find the best plan?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Our services are 100% free for customers. We handle the research, you enjoy the savings.
          </p>
          <Link
            to="/schedule"
            className="inline-block bg-blue-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:-translate-y-1"
          >
            Schedule Your Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
