import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Moon,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";

import api from "../services/api";
import "./Home.css";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [creativeWorks, setCreativeWorks] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    api
      .get("/portfolio/profile/")
      .then((response) => {
        if (response.data.length > 0) {
          setProfile(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error loading profile:", error);
      });

    api
      .get("/portfolio/skills/")
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error loading skills:", error);
      });

    api
      .get("/projects/")
      .then((response) => {
        const featured = response.data.filter(
          (project) => project.featured
        );

        setProjects(featured.slice(0, 3));
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
      });

    api
      .get("/creative/")
      .then((response) => {
        const featured = response.data.filter(
          (work) => work.featured
        );

        setCreativeWorks(featured.slice(0, 3));
      })
      .catch((error) => {
        console.error("Error loading creative works:", error);
      });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode
      ? "dark"
      : "light";

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  if (!profile) {
    return (
      <div className="home-loading">
        <div className="loading-orb"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  const visibleSkills = skills.slice(0, 6);

  return (
    <main className="home">

      {/* =========================
          ANIMATED BACKGROUND
      ========================== */}

      <div className="home-background">
        <div className="home-grid"></div>

        <motion.div
          className="glow glow-one"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="glow glow-two"
          animate={{
            x: [0, -35, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
       </div> 

        <div className="floating-particles">
            {[...Array(18)].map((_, index) => (
                <span
                key={index}
                style={{
                    "--x": `${(index * 37) % 100}%`,
                    "--y": `${(index * 83) % 100}%`,
                    "--duration": `${6 + index * 0.4}s`,
                }}
                ></span>
            ))}
        </div>

      {/* =========================
          HERO
      ========================== */}

      <section className="home-hero">

        <div className="hero-content">

          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >

            <div className="hero-status">
              <span></span>
              Available for creative opportunities
            </div>

            <p className="hero-intro">
              HELLO, I'M
            </p>

            <h1>
              {profile.name}
            </h1>

            <h2>
              {profile.title}
            </h2>

            <p className="hero-description">
              I create practical digital solutions through code,
              combining software development, AI innovation,
              data, and creative technology.
            </p>

            <div className="hero-actions">

              <a
                href="/projects"
                className="hero-button primary"
              >
                Explore My Work
                <ArrowUpRight size={17} />
              </a>

              <a
                href="/contact"
                className="hero-button secondary"
              >
                Let's Connect
                <ArrowRight size={17} />
              </a>

            </div>

            <div className="hero-socials">

              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <ArrowUpRight size={14} />
                </a>
              )}

              {profile.linkedin_url && (
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

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >

            {profile.profile_image && (
              <div className="profile-frame">

                <div className="profile-ring"></div>

                <img
                  src={`http://127.0.0.1:8000${profile.profile_image}`}
                  alt={profile.name}
                />

                <motion.div
                  className="hero-floating-card"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Code2 size={18} />

                  <div>
                    <strong>Building with purpose</strong>
                    <small>Create solutions through code.</small>
                  </div>
                </motion.div>

              </div>
            )}

          </motion.div>

        </div>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}

          <span>
            {darkMode ? "Light" : "Dark"}
          </span>
        </button>

      </section>

      {/* =========================
          SKILLS
      ========================== */}

      <section className="skills-section">

        <div className="home-section-container">

          <div className="section-top">

            <div>
              <span className="section-label">
                EXPERTISE
              </span>

              <h2>
                What I <span>Work With</span>
              </h2>
            </div>

            <p>
              Technologies and skills I use to build
              practical digital solutions.
            </p>

          </div>

          <div className="skills-grid">

            {visibleSkills.map((skill, index) => (

              <motion.div
                key={skill.id}
                className="skill-card"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -6,
                }}
              >

                <div className="skill-icon">
                  <Code2 size={18} />
                </div>

                <div className="skill-info">

                  <div className="skill-heading">
                    <h3>{skill.name}</h3>

                    <span>
                      {skill.proficiency}%
                    </span>
                  </div>

                  <div className="skill-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${skill.proficiency}%`,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1,
                      }}
                    />
                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* =========================
          PROJECTS
      ========================== */}

      <section className="projects-section">

        <div className="home-section-container">

          <div className="section-top">

            <div>
              <span className="section-label">
                SELECTED WORK
              </span>

              <h2>
                Featured <span>Projects</span>
              </h2>
            </div>

            <a
              href="/projects"
              className="section-link"
            >
              View all projects
              <ArrowUpRight size={16} />
            </a>

          </div>

          {projects.length > 0 ? (

            <div className="projects-grid">

              {projects.map((project, index) => (

                <motion.article
                  key={project.id}
                  className="project-card"
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                >

                  {project.image ? (
                    <div className="project-image">

                      <img
                        src={`http://127.0.0.1:8000${project.image}`}
                        alt={project.name}
                      />

                      <span className="project-category">
                        {project.category}
                      </span>

                    </div>
                  ) : (
                    <div className="project-image project-placeholder">
                      <Code2 size={30} />
                    </div>
                  )}

                  <div className="project-content">

                    <div className="project-top">

                      <span className="project-status">
                        <i></i>
                        {project.status}
                      </span>

                    </div>

                    <h3>
                      {project.name}
                    </h3>

                    <p>
                      {project.description}
                    </p>

                    <div className="project-technologies">

                      {project.technologies
                        .split(",")
                        .slice(0, 3)
                        .map((technology, index) => (
                          <span key={index}>
                            {technology.trim()}
                          </span>
                        ))}

                    </div>

                    <div className="project-footer">

                      <span>
                        View project
                      </span>

                      <ArrowUpRight size={17} />

                    </div>

                  </div>

                </motion.article>

              ))}

            </div>

          ) : (
            <p className="empty-message">
              No featured projects available yet.
            </p>
          )}

        </div>

      </section>

      {/* =========================
          CREATIVE WORK
      ========================== */}

      <section className="creative-section">

        <div className="home-section-container">

          <div className="section-top">

            <div>
              <span className="section-label">
                CREATIVE SIDE
              </span>

              <h2>
                Design & <span>Creativity</span>
              </h2>
            </div>

            <a
              href="/creative"
              className="section-link"
            >
              Explore creative work
              <ArrowUpRight size={16} />
            </a>

          </div>

          {creativeWorks.length > 0 ? (

            <div className="creative-grid">

              {creativeWorks.map((work, index) => (

                <motion.article
                  key={work.id}
                  className="creative-card"
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                >

                  {work.image && (
                    <div className="creative-image">

                      <img
                        src={`http://127.0.0.1:8000${work.image}`}
                        alt={work.title}
                      />

                      <div className="creative-overlay">
                        <ArrowUpRight size={20} />
                      </div>

                    </div>
                  )}

                  <div className="creative-content">

                    <span>
                      {work.category}
                    </span>

                    <h3>
                      {work.title}
                    </h3>

                    <p>
                      {work.description}
                    </p>

                  </div>

                </motion.article>

              ))}

            </div>

          ) : (
            <p className="empty-message">
              No featured creative works available yet.
            </p>
          )}

        </div>

      </section>

      {/* =========================
          FINAL CTA
      ========================== */}

      <section className="home-cta">

        <div className="cta-content">

          <span className="section-label">
            HAVE AN IDEA?
          </span>

          <h2>
            Let's create something
            <span> meaningful.</span>
          </h2>

          <p>
            I'm interested in building practical digital
            solutions that turn ideas into real experiences.
          </p>

          <a
            href="/contact"
            className="hero-button primary"
          >
            Start a Conversation
            <ArrowUpRight size={17} />
          </a>

        </div>

      </section>

    </main>
  );
};

export default Home;