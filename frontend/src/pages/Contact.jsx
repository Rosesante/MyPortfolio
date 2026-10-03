import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

import api from "../services/api";
import "./Contact.css";

const Contact = () => {
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api
      .get("/portfolio/profile/")
      .then((response) => {
        setProfile(response.data[0] || null);
      })
      .catch((error) => {
        console.error("Error loading contact information:", error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      await api.post("/contact/", formData);

      setStatus({
        type: "success",
        message:
          "Your message has been sent successfully. I will get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);

      setStatus({
        type: "error",
        message:
          "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">

      {/* =========================
          HERO
      ========================== */}
      <section className="contact-hero">
        <div className="contact-container">

          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="contact-label">
              GET IN TOUCH
            </p>

            <h1>
              Let's Build Something{" "}
              <span>Together</span>
            </h1>

            <p>
              Have a project idea, collaboration opportunity,
              or simply want to connect? Feel free to send me
              a message.
            </p>
          </motion.div>

        </div>
      </section>


      {/* =========================
          CONTACT CONTENT
      ========================== */}
      <section className="contact-section">
        <div className="contact-container">

          <div className="contact-grid">

            {/* =========================
                CONTACT INFORMATION
            ========================== */}
            <motion.div
              className="contact-information"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >

              <p className="contact-label">
                CONTACT INFORMATION
              </p>

              <h2>
                Let's Start a <span>Conversation</span>
              </h2>

              <p className="contact-description">
                Whether you have a question, an idea for a
                project, or an opportunity to collaborate,
                I would be happy to hear from you.
              </p>


              <div className="contact-details">

                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="contact-detail"
                  >
                    <div className="contact-detail-icon">
                      <Mail size={19} />
                    </div>

                    <div>
                      <span>Email</span>
                      <strong>{profile.email}</strong>
                    </div>
                  </a>
                )}


                {profile?.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="contact-detail"
                  >
                    <div className="contact-detail-icon">
                      <Phone size={19} />
                    </div>

                    <div>
                      <span>Phone</span>
                      <strong>{profile.phone}</strong>
                    </div>
                  </a>
                )}


                {profile?.location && (
                  <div className="contact-detail">
                    <div className="contact-detail-icon">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>{profile.location}</strong>
                    </div>
                  </div>
                )}

              </div>


              {/* SOCIAL LINKS */}
              <div className="contact-social-links">

                {profile?.github_url && (
                    <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noreferrer"
                    >
                    GitHub
                    <ArrowUpRight size={14} />
                    </a>
                )}

                {profile?.linkedin_url && (
                    <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    >
                    LinkedIn
                    <ArrowUpRight size={14} />
                    </a>
                )}

              </div>
            </motion.div>


            {/* =========================
                CONTACT FORM
            ========================== */}
            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >

              <div className="contact-form-header">
                <p className="contact-label">
                  SEND A MESSAGE
                </p>

                <h2>
                  Tell Me About Your <span>Idea</span>
                </h2>
              </div>


              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >

                <div className="contact-form-row">

                  <div className="contact-field">
                    <label htmlFor="name">
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  <div className="contact-field">
                    <label htmlFor="email">
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>


                <div className="contact-field">
                  <label htmlFor="subject">
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="What would you like to discuss?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="contact-field">
                  <label htmlFor="message">
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="7"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>


                {/* STATUS MESSAGE */}
                {status.message && (
                  <div
                    className={`contact-status ${status.type}`}
                  >
                    {status.message}
                  </div>
                )}


                <button
                  type="submit"
                  className="contact-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Sending..."
                    : "Send Message"}

                  <Send size={17} />
                </button>

              </form>

            </motion.div>

          </div>

        </div>
      </section>

    </main>
  );
};

export default Contact;