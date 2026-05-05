import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Is your service really free?",
    answer: "Yes! We partner with service providers who pay us a commission for helping you find the right plan. There is absolutely no cost to you for our consultation or comparison services."
  },
  {
    question: "Which states do you operate in?",
    answer: "We provide expert telecom consulting and comparison services nationwide, with our headquarters in Birmingham, Alabama and a second office in Dallas, Texas."
  },
  {
    question: "How do you help me save money?",
    answer: "We have access to exclusive partner deals and a deep understanding of provider pricing structures. We analyze your needs and find the most cost-effective bundles available in your area."
  },
  {
    question: "Can you help with business services?",
    answer: "Absolutely. We handle both residential and commercial connections, including enterprise-grade internet and multi-line cellular plans."
  },
  {
    question: "How long does the process take?",
    answer: "A typical consultation takes about 15-20 minutes. Once you choose a plan, we handle the connection process with the provider immediately."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = React.useState(null);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 bg-blue-50 rounded-2xl text-blue-600 mb-6">
            <HelpCircle className="w-7 sm:w-8 h-7 sm:h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg sm:text-xl text-gray-600">Everything you need to know about our services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-2xl overflow-hidden transition-all hover:border-blue-200"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors gap-4"
              >
                <span className="font-bold text-gray-900 text-sm sm:text-base">{faq.question}</span>
                {activeIndex === idx ? (
                  <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-600 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
