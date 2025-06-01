import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCommentDots, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      const form = e.currentTarget;
      
      try {
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          form,
          import.meta.env.VITE_EMAILJS_USER_ID
        );

        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } catch (error) {
        console.error("Error sending email:", error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(''), 3000);
      }
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
        </h2>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Let's work together to bring your ideas to life
        </p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        <div className="flex items-center gap-3 bg-gray-800/60 rounded-md px-4 py-3">
          <FaUser className="text-blue-400" />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="bg-transparent outline-none w-full text-white"
          />
        </div>
        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

        <div className="flex items-center gap-3 bg-gray-800/60 rounded-md px-4 py-3">
          <FaEnvelope className="text-blue-400" />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="bg-transparent outline-none w-full text-white"
          />
        </div>
        {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

        <div className="flex items-center gap-3 bg-gray-800/60 rounded-md px-4 py-3">
          <FaPhone className="text-blue-400" />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone"
            className="bg-transparent outline-none w-full text-white"
          />
        </div>
        {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}

        <div className="flex items-start gap-3 bg-gray-800/60 rounded-md px-4 py-3">
          <FaCommentDots className="text-blue-400 mt-1" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            className="bg-transparent outline-none w-full text-white"
            rows={4}
          ></textarea>
        </div>
        {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}

        {/* Centered Send Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-md text-white font-semibold hover:scale-105 transition-transform duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'} <FaPaperPlane />
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="flex items-center justify-center gap-2 text-green-400 mt-4">
            <FaCheckCircle /> Message sent successfully!
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="flex items-center justify-center gap-2 text-red-400 mt-4">
            Error sending message. Please try again later.
          </div>
        )}
      </form>
    </section>
  );
};

export default Contact;