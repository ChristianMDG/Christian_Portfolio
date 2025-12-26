import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_first_name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const EMAILJS_CONFIG = {
    SERVICE_ID: "service_1riq4va", 
    TEMPLATE_ID: "template_4961plf", 
    PUBLIC_KEY: "A4aWT1Mu5D-dOHMMg"
  };
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
       EMAILJS_CONFIG.PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setIsLoading(false);
          setIsSent(true);
          setFormData({
            user_name: "",
            user_first_name: "",
            user_email: "",
            subject: "",
            message: "",
          });

          // Reset success message after 5 seconds
          setTimeout(() => {
            setIsSent(false);
          }, 5000);
        },
        (error) => {
          console.log("Failed to send email:", error.text);
          setIsLoading(false);
        
        }
      );
  };

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex pt-10 justify-center items-center mb-16">
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
          <h1 className="firacode-semibold sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-color)]">
            <span className="text-gray-600">|</span>Contact
            <span className="text-gray-600">|</span>
          </h1>
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
        </div>

        {/* Contact Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Let's Work Together
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  I'm always open to discussing new projects, creative
                  opportunities and innovative collaborations.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300">
                  <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-400">christianravelojaona186@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300">
                  <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Phone</h3>
                    <p className="text-gray-400">+261 38 65 746 67</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300">
                  <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <p className="text-gray-400">Antananarivo, Madagascar</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {["LinkedIn", "GitHub", "Twitter"].map((social) => (
                  <button
                    key={social}
                    className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all duration-300"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              {/* Success Message */}
              {isSent && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-600 rounded-lg text-green-400 text-center">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="user_first_name"
                      value={formData.user_first_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary-color)] transition-colors duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary-color)] transition-colors duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary-color)] transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary-color)] transition-colors duration-300"
                    placeholder="Subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary-color)] transition-colors duration-300 resize-none"
                    placeholder="Describe your project or request..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    isLoading
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-[var(--primary-color)] text-black hover:bg-[var(--primary-color-hover)]"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
