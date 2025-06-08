import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, MessageSquare, Send, CheckCircle, X } from 'lucide-react';

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
const Toast = ({ message, type, isVisible, onClose, darkMode }) => {
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
          ? darkMode
            ? 'bg-green-900/90 border-green-500/50 text-green-100' 
            : 'bg-green-100/90 border-green-500/50 text-green-900'
          : darkMode
            ? 'bg-red-900/90 border-red-500/50 text-red-100'
            : 'bg-red-100/90 border-red-500/50 text-red-900'
      }`}>
        <div className="flex items-center gap-2">
          {type === 'success' ? (
            <CheckCircle className={darkMode ? "text-green-400" : "text-green-600"} size={18} />
          ) : (
            <X className={darkMode ? "text-red-400" : "text-red-600"} size={18} />
          )}
          <span className="font-medium">{message}</span>
        </div>
        <button
          onClick={onClose}
          className={`ml-2 transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

// Custom Field Component
const CustomField = ({ icon: Icon, field, form, darkMode, ...props }) => {
  const hasError = form.errors[field.name] && form.touched[field.name];
  
  return (
    <div className={`flex items-center gap-3 rounded-md px-4 py-3 border transition-colors ${
      darkMode 
        ? 'bg-gray-800/60 border-gray-700/50 focus-within:border-blue-500/50' 
        : 'bg-gray-100/60 border-gray-300/50 focus-within:border-blue-400/50'
    } ${
      hasError 
        ? darkMode 
          ? 'border-red-500/50' 
          : 'border-red-400/50'
        : ''
    }`}>
      <Icon className={darkMode ? "text-blue-400" : "text-blue-500"} size={20} />
      <input
        {...field}
        {...props}
        className={`bg-transparent outline-none w-full ${
          darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
        }`}
      />
    </div>
  );
};

// Custom Textarea Component
const CustomTextarea = ({ icon: Icon, field, form, darkMode, ...props }) => {
  const hasError = form.errors[field.name] && form.touched[field.name];
  
  return (
    <div className={`flex items-start gap-3 rounded-md px-4 py-3 border transition-colors ${
      darkMode 
        ? 'bg-gray-800/60 border-gray-700/50 focus-within:border-blue-500/50' 
        : 'bg-gray-100/60 border-gray-300/50 focus-within:border-blue-400/50'
    } ${
      hasError 
        ? darkMode 
          ? 'border-red-500/50' 
          : 'border-red-400/50'
        : ''
    }`}>
      <Icon className={`${darkMode ? "text-blue-400" : "text-blue-500"} mt-1`} size={20} />
      <textarea
        {...field}
        {...props}
        className={`bg-transparent outline-none w-full resize-none ${
          darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
        }`}
        rows={4}
      />
    </div>
  );
};

const Contact = ({ darkMode }) => {
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
        darkMode={darkMode}
      />
      
      <section id="contact" className={`relative py-24 min-h-screen ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Contact <span className={`bg-clip-text text-transparent ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`}>Me</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`w-16 h-0.5 bg-gradient-to-r from-transparent ${
              darkMode ? 'to-blue-500' : 'to-blue-400'
            }`}></div>
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              darkMode ? 'bg-blue-500' : 'bg-blue-400'
            }`}></div>
            <div className={`w-16 h-0.5 bg-gradient-to-l from-transparent ${
              darkMode ? 'to-purple-500' : 'to-purple-400'
            }`}></div>
          </div>
          <p className={`text-lg max-w-2xl mx-auto ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
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
                    icon={User}
                    placeholder="Your name"
                    darkMode={darkMode}
                  />
                  <ErrorMessage name="name" component="p" className={`text-sm ml-1 mt-1 ${
                    darkMode ? 'text-red-400' : 'text-red-500'
                  }`} />
                </div>

                {/* Email Field */}
                <div>
                  <Field
                    name="email"
                    type="email"
                    component={CustomField}
                    icon={Mail}
                    placeholder="Your email"
                    darkMode={darkMode}
                  />
                  <ErrorMessage name="email" component="p" className={`text-sm ml-1 mt-1 ${
                    darkMode ? 'text-red-400' : 'text-red-500'
                  }`} />
                </div>

                {/* Message Field */}
                <div>
                  <Field
                    name="message"
                    component={CustomTextarea}
                    icon={MessageSquare}
                    placeholder="Your message"
                    darkMode={darkMode}
                  />
                  <ErrorMessage name="message" component="p" className={`text-sm ml-1 mt-1 ${
                    darkMode ? 'text-red-400' : 'text-red-500'
                  }`} />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isSubmitting 
                        ? darkMode
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : `text-white hover:scale-105 hover:shadow-xl ${
                            darkMode
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-blue-500/25'
                              : 'bg-gradient-to-r from-blue-400 to-purple-500 hover:shadow-blue-400/25'
                          }`
                    }`}
                    disabled={isSubmitting || !formik.isValid}
                  >
                    {isSubmitting ? (
                      <>
                        <div className={`w-4 h-4 border-2 rounded-full animate-spin ${
                          darkMode ? 'border-white/30 border-t-white' : 'border-gray-600/30 border-t-gray-600'
                        }`}></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
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