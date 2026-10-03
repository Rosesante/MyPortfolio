import { useEffect, useState } from "react";
import { ArrowDownToLine, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

import api from "../services/api";
import "./About.css";

const About = () => {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileResponse,
          educationResponse,
          experienceResponse,
          skillsResponse,
        ] = await Promise.all([
          api.get("/portfolio/profile/"),
          api.get("/portfolio/education/"),
          api.get("/portfolio/experience/"),
          api.get("/portfolio/skills/"),
        ]);

        setProfile(profileResponse.data[0] || null);
        setEducation(educationResponse.data);
        setExperience(experienceResponse.data);
        setSkills(skillsResponse.data);
      } catch (error) {
        console.error("Error loading About page:", error);
      }
    };

    fetchData();
  }, []);

  if (!profile) {
    return (
      <div className="about-loading">
        <p>Loading profile...</p>
      </div>
    );
  }

  const groupedSkills = skills.reduce((groups, skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = [];
    }

    groups[skill.category].push(skill);

    return groups;
  }, {});

  return (
    <main className="about-page">

      {/* =========================
          HERO
      ========================== */}
      <section className="about-hero">
        <div className="about-container">

          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-label">
              ABOUT ME
            </p>

            <h1>
              Building Ideas Into{" "}
              <span>Digital Solutions</span>
            </h1>

            <p>
              Get to know my background, experience, education,
              and the skills I use to create practical solutions
              through technology.
            </p>
          </motion.div>

        </div>
      </section>


      {/* =========================
          PROFILE
      ========================== */}
      <section className="about-profile-section">
        <div className="about-container">

          <div className="about-profile">

            <motion.div
              className="about-profile-image-wrapper"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {profile.profile_image ? (
                <img
                  src={`http://127.0.0.1:8000${profile.profile_image}`}
                  alt={profile.name}
                  className="about-profile-image"
                />
              ) : (
                <div className="about-profile-placeholder">
                  {profile.name?.charAt(0)}
                </div>
              )}
            </motion.div>


            <motion.div
              className="about-profile-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="about-label">
                WHO I AM
              </p>

              <h2>
                {profile.name}
              </h2>

              <h3>
                {profile.title}
              </h3>

              <p className="about-bio">
                {profile.bio}
              </p>

              <div className="about-contact-info">

                {profile.email && (
                  <div>
                    <strong>Email</strong>
                    <span>{profile.email}</span>
                  </div>
                )}

                {profile.phone && (
                  <div>
                    <strong>Phone</strong>
                    <span>{profile.phone}</span>
                  </div>
                )}

                {profile.location && (
                  <div>
                    <strong>Location</strong>
                    <span>{profile.location}</span>
                  </div>
                )}

              </div>


              {profile.cv && (
                <a
                  href={`http://127.0.0.1:8000${profile.cv}`}
                  target="_blank"
                  rel="noreferrer"
                  className="about-cv-button"
                >
                  Download CV
                  <ArrowDownToLine size={17} />
                </a>
              )}

            </motion.div>

          </div>

        </div>
      </section>


      {/* =========================
          EDUCATION
      ========================== */}
      <section className="about-section about-education-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">
              EDUCATION
            </p>

            <h2>
              Academic <span>Background</span>
            </h2>
          </div>


          <div className="about-timeline">

            {education.map((item) => (
              <motion.div
                key={item.id}
                className="about-timeline-item"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >

                <div className="about-timeline-icon">
                  <GraduationCap size={20} />
                </div>

                <div className="about-timeline-content">

                  <span className="about-timeline-date">
                    {item.start_year}{" "}
                    -{" "}
                    {item.current
                      ? "Present"
                      : item.end_year || ""}
                  </span>

                  <h3>
                    {item.program}
                  </h3>

                  <h4>
                    {item.institution}
                  </h4>

                  {item.level && (
                    <p className="about-timeline-level">
                      {item.level}
                    </p>
                  )}

                  {item.description && (
                    <p>
                      {item.description}
                    </p>
                  )}

                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </section>


      {/* =========================
          EXPERIENCE
      ========================== */}
      <section className="about-section about-experience-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">
              EXPERIENCE
            </p>

            <h2>
              Professional <span>Experience</span>
            </h2>
          </div>


          <div className="about-timeline">

            {experience.map((item) => (
              <motion.div
                key={item.id}
                className="about-timeline-item"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >

                <div className="about-timeline-icon">
                  <BriefcaseBusiness size={19} />
                </div>

                <div className="about-timeline-content">

                  <span className="about-timeline-date">
                    {item.start_date}{" "}
                    -{" "}
                    {item.current
                      ? "Present"
                      : item.end_date || ""}
                  </span>

                  <h3>
                    {item.position}
                  </h3>

                  <h4>
                    {item.organization}
                  </h4>

                  <p>
                    {item.description}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </section>


      {/* =========================
          SKILLS
      ========================== */}
      <section className="about-section about-skills-section">
        <div className="about-container">

          <div className="about-section-heading">
            <p className="about-label">
              EXPERTISE
            </p>

            <h2>
              Skills & <span>Capabilities</span>
            </h2>
          </div>


          <div className="about-skills-grid">

            {Object.entries(groupedSkills).map(
              ([category, categorySkills]) => (
                <motion.div
                  key={category}
                  className="about-skill-category"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >

                  <h3>
                    {category}
                  </h3>

                  <div className="about-skill-list">

                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="about-skill-item"
                      >

                        <div className="about-skill-top">
                          <span>
                            {skill.name}
                          </span>

                          <span>
                            {skill.proficiency}%
                          </span>
                        </div>

                        <div className="about-skill-bar">
                          <div
                            className="about-skill-progress"
                            style={{
                              width: `${skill.proficiency}%`,
                            }}
                          />
                        </div>

                        {skill.description && (
                          <p>
                            {skill.description}
                          </p>
                        )}

                      </div>
                    ))}

                  </div>

                </motion.div>
              )
            )}

          </div>

        </div>
      </section>

    </main>
  );
};

export default About;