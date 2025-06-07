import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaCheckCircle, FaTimes } from "react-icons/fa";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required')
});

// Toast Component
const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl backdrop-blur-sm border ${
        type === 'success' 
          ? 'bg-green-900/90 border-green-500/50 text-green-100' 
          : 'bg-red-900/90 border-red-500/50 text-red-100'
      }`}>
        <div className="flex items-center gap-2">
          {type === 'success' ? (
            <FaCheckCircle className="text-green-400 text-lg" />
          ) : (
            <FaTimes className="text-red-400 text-lg" />
          )}
          <span className="font-medium">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-gray-300 hover:text-white transition-colors"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>
    </div>
  );
};

// Custom Field Component
const CustomField = ({ icon: Icon, field, form, ...props }) => {
  const hasError = form.errors[field.name] && form.touched[field.name];
  
  return (
    <div className={`flex items-center gap-3 bg-gray-800/60 rounded-md px-4 py-3 border transition-colors ${
      hasError 
        ? 'border-red-500/50' 
        : 'border-gray-700/50 focus-within:border-blue-500/50'
    }`}>
      <Icon className="text-blue-400" />
      <input
        {...field}
        {...props}
        className="bg-transparent outline-none w-full text-white placeholder-gray-400"
      />
    </div>
  );
};

// Custom Textarea Component
const CustomTextarea = ({ icon: Icon, field, form, ...props }) => {
  const hasError = form.errors[field.name] && form.touched[field.name];
  
  return (
    <div className={`flex items-start gap-3 bg-gray-800/60 rounded-md px-4 py-3 border transition-colors ${
      hasError 
        ? 'border-red-500/50' 
        : 'border-gray-700/50 focus-within:border-blue-500/50'
    }`}>
      <Icon className="text-blue-400 mt-1" />
      <textarea
        {...field}
        {...props}
        className="bg-transparent outline-none w-full text-white placeholder-gray-400 resize-none"
        rows={4}
      />
    </div>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: '' });
  const formRef = useRef(null);

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      // Create form element for EmailJS
      const tempForm = document.createElement('form');
      tempForm.style.display = 'none';
      
      // Add form fields
      const nameField = document.createElement('input');
      nameField.name = 'from_name';
      nameField.value = values.name;
      tempForm.appendChild(nameField);
      
      const emailField = document.createElement('input');
      emailField.name = 'from_email';
      emailField.value = values.email;
      tempForm.appendChild(emailField);
      
      const messageField = document.createElement('textarea');
      messageField.name = 'message';
      messageField.value = values.message;
      tempForm.appendChild(messageField);
      
      document.body.appendChild(tempForm);
      
      // Load and use EmailJS
      if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
          window.emailjs.init('tr7fwk2Z2o1CM0Na7');
          sendEmail();
        };
        document.head.appendChild(script);
      } else {
        sendEmail();
      }
      
      function sendEmail() {
        window.emailjs.sendForm(
          'service_7hadfoi',
          'template_6ir5mk8',
          tempForm
        ).then(() => {
          showToast('Message sent successfully!', 'success');
          resetForm();
          document.body.removeChild(tempForm);
          setIsSubmitting(false);
        }).catch((error) => {
          console.error("EmailJS Error:", error);
          showToast('Failed to send message. Please try again later.', 'error');
          document.body.removeChild(tempForm);
          setIsSubmitting(false);
        });
      }
      
    } catch (error) {
      console.error("Error sending email:", error);
      showToast('Failed to send message. Please try again later.', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      <section id="contact" className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
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
        <div className="max-w-xl mx-auto px-4">
          <Formik
            initialValues={{
              name: '',
              email: '',
              message: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="space-y-6">
                {/* Name Field */}
                <div>
                  <Field
                    name="name"
                    component={CustomField}
                    icon={FaUser}
                    placeholder="Your name"
                  />
                  <ErrorMessage name="name" component="p" className="text-red-400 text-sm ml-1 mt-1" />
                </div>

                {/* Email Field */}
                <div>
                  <Field
                    name="email"
                    type="email"
                    component={CustomField}
                    icon={FaEnvelope}
                    placeholder="Your email"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-400 text-sm ml-1 mt-1" />
                </div>

                {/* Message Field */}
                <div>
                  <Field
                    name="message"
                    component={CustomTextarea}
                    icon={FaCommentDots}
                    placeholder="Your message"
                  />
                  <ErrorMessage name="message" component="p" className="text-red-400 text-sm ml-1 mt-1" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25'
                    }`}
                    disabled={isSubmitting || !formik.isValid}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <FaPaperPlane />
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Contact;