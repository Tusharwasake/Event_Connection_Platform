import React, { useState } from "react";
import "./HelpCenter.css";

const HelpCenter = () => {
  const [faqIndex, setFaqIndex] = useState(null); // For expanding/collapsing FAQs

  const toggleFaq = (index) => {
    setFaqIndex(faqIndex === index ? null : index);
  };

  return (
    <div className="help-center-container">
      {/* Page Title */}
      <header className="help-header">
        <h1>Help Center</h1>
        <p>Your go-to place for questions and support!</p>
      </header>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          {[
            {
              question: "How do I reset my password?",
              answer:
                "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions.",
            },
            {
              question: "How do I change my account email?",
              answer:
                "Go to your account settings, navigate to 'Profile', and update your email address.",
            },
            {
              question: "How do I contact support?",
              answer:
                "You can use the contact form below or email us at support@example.com.",
            },
            {
              question: "What is the refund policy for events?",
              answer:
                "Refund policies are event-specific. Please refer to the event details or contact the event organizer directly.",
            },
          ].map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
              </button>
              {faqIndex === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message submitted! We'll get back to you soon.");
          }}
          className="contact-form"
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default HelpCenter;
