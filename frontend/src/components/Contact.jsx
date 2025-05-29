import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoIosSend } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const contactRef = useRef(null);

  useEffect(() => {
    if (contactRef.current) {
      gsap.fromTo(
        contactRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1, 
          ease: "power3.out", 
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

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
    setFormData(prevState => ({ ...prevState, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setSubmitStatus('Message sent successfully!');
          setFormData({ name: '', email: '', phone: '', message: '' });
          setErrors({});
        } else {
          setSubmitStatus(data.error || 'Failed to send message. Please try again.');
        }
      } catch (error) {
        setSubmitStatus('Error sending message. Please try again later.');
      }
    }
  };

  return (
    <section id="contact" ref={contactRef} className="py-24">
      <div className="max-w-md mx-auto p-8 bg-neutral-900 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Contact <span className="text-neutral-500">Me</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-neutral-800 text-white ${errors.name ? 'border-2 border-red-500' : 'border border-neutral-700'}`}
              placeholder="Your Name"
              maxLength="30"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-neutral-800 text-white ${errors.email ? 'border-2 border-red-500' : 'border border-neutral-700'}`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-white mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-neutral-800 text-white ${errors.phone ? 'border-2 border-red-500' : 'border border-neutral-700'}`}
              placeholder="0600000000"
              maxLength={10}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              maxLength={200}
              className={`w-full p-3 rounded-lg bg-neutral-800 text-white ${errors.message ? 'border-2 border-red-500' : 'border border-neutral-700'}`}
              placeholder="Your Message"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
          >
            Send Message <IoIosSend className="ml-2" />
          </button>
          {submitStatus && (
            <p className={`text-center mt-2 ${submitStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {submitStatus}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;