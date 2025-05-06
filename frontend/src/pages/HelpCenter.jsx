import React, { useState, useRef } from "react";
import "./HelpCenter.css";

const HelpCenter = () => {
  const [faqIndex, setFaqIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const contactRef = useRef(null);

  // FAQ data
  const faqData = [
    {
      category: "Account Management",
      faqs: [
        {
          question: "How do I reset my password?",
          answer:
            "You can reset your password by clicking on 'Forgot Password' on the login page. You'll receive an email with instructions to set a new password. For security reasons, password reset links expire after 24 hours.",
        },
        {
          question: "How do I change my account email?",
          answer:
            "Go to your account settings, navigate to 'Profile', and update your email address. You'll receive a verification email to confirm the change. Your account will be updated once you verify your new email.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "To delete your account, go to 'Account Settings' and scroll to the bottom to find the 'Delete Account' option. Please note this action is permanent and will remove all your data from our systems.",
        },
      ],
    },
    {
      category: "Events & Registration",
      faqs: [
        {
          question: "How do I register for an event?",
          answer:
            "To register for an event, navigate to the event page and click the 'Register' or 'RSVP' button. Follow the prompts to complete your registration. You'll receive a confirmation email with details.",
        },
        {
          question: "What is the refund policy for events?",
          answer:
            "Refund policies are event-specific and set by the event organizer. You can find the refund policy on the event details page under 'Terms & Conditions'. For specific questions, contact the event organizer directly.",
        },
        {
          question: "How can I create my own event?",
          answer:
            "To create an event, click on 'Create Event' in the navigation menu. Fill out the event details form with information like title, date, location, and description. You can also add custom registration options.",
        },
      ],
    },
    {
      category: "Technical Support",
      faqs: [
        {
          question: "The website isn't loading properly. What should I do?",
          answer:
            "First, try refreshing the page or clearing your browser cache. If problems persist, try using a different browser or device. You can also check our system status page to see if there are any known issues.",
        },
        {
          question: "How do I contact support?",
          answer:
            "You can reach our support team through the contact form on this page or by emailing support@linkup.com. Our support hours are Monday-Friday, 9am-5pm EST.",
        },
        {
          question: "Is there a mobile app available?",
          answer:
            "Yes! Our mobile app is available for both iOS and Android devices. Search for 'LinkUp Events' in the App Store or Google Play Store to download.",
        },
      ],
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqData
        .map((category) => ({
          ...category,
          faqs: category.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.faqs.length > 0)
    : faqData;

  const toggleFaq = (index) => {
    setFaqIndex(faqIndex === index ? null : index);
  };

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log("Form submitted:", formData);
    setFormSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="help-center-container">
      {/* Hero Section */}
      <header className="help-header">
        <div className="header-content">
          <h1>How can we help you?</h1>
          <p>
            Find answers to frequently asked questions or contact our support
            team
          </p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="help-buttons">
            <button className="browse-faq-btn">Browse FAQs</button>
            <button className="contact-btn" onClick={scrollToContact}>
              Contact Support
            </button>
          </div>
        </div>
      </header>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          {searchQuery && (
            <p className="search-results">
              {filteredFaqs.reduce(
                (total, category) => total + category.faqs.length,
                0
              )}{" "}
              results for "{searchQuery}"
            </p>
          )}
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="no-results">
            <p>No results found for "{searchQuery}"</p>
            <button onClick={() => setSearchQuery("")} className="reset-search">
              Clear search
            </button>
          </div>
        ) : (
          filteredFaqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h3>{category.category}</h3>
              <div className="faq-list">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = `${categoryIndex}-${faqIndex}`;
                  return (
                    <div
                      key={faqIndex}
                      className={`faq-item ${
                        faqIndex === globalIndex ? "active" : ""
                      }`}
                    >
                      <button
                        className="faq-question"
                        onClick={() => toggleFaq(globalIndex)}
                        aria-expanded={faqIndex === globalIndex}
                      >
                        {faq.question}
                        <span className="faq-icon">
                          {faqIndex === globalIndex ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        className={`faq-answer ${
                          faqIndex === globalIndex ? "active" : ""
                        }`}
                      >
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Contact Form Section */}
      <section className="contact-section" ref={contactRef}>
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contact Support</h2>
            <p>
              Can't find what you're looking for? Our support team is here to
              help.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">✉️</div>
                <div className="method-details">
                  <h4>Email Us</h4>
                  <a href="mailto:support@linkup.com">support@linkup.com</a>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">⏱️</div>
                <div className="method-details">
                  <h4>Support Hours</h4>
                  <p>Monday-Friday, 9am-5pm EST</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">💬</div>
                <div className="method-details">
                  <h4>Live Chat</h4>
                  <p>Available during support hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-wrapper">
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>
                  Thank you for reaching out. We'll get back to you as soon as
                  possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing Question">Billing Question</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Report a Bug">Report a Bug</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Please describe your issue or question in detail"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
