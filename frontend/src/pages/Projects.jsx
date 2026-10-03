import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { motion } from "framer-motion";

import api from "../services/api";
import "../pages/Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    api
      .get("/projects/")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
      });
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(projects.map((project) => project.category)),
    ];

    return ["All", ...uniqueCategories];
  }, [projects]);

  const statuses = useMemo(() => {
    const uniqueStatuses = [
      ...new Set(projects.map((project) => project.status)),
    ];

    return ["All", ...uniqueStatuses];
  }, [projects]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.technologies
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      project.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All" ||
      project.status === selectedStatus;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const developmentProjects = projects.filter(
    (project) => project.status === "In Development"
  ).length;

  const plannedProjects = projects.filter(
    (project) => project.status === "Planned"
  ).length;

  if (projects.length === 0) {
    return (
      <main className="projects-page">
        <section className="projects-hero">
          <div className="projects-page-container">
            <p className="projects-label">
              MY WORK
            </p>

            <h1>
              Projects & <span>Development</span>
            </h1>

            <p className="projects-intro">
              Explore the software, AI, IoT, and digital
              solutions I am building and developing.
            </p>

            <div className="projects-loading">
              Loading projects...
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="projects-page">

      {/* =========================
          PAGE HERO
      ========================== */}
      <section className="projects-hero">
        <div className="projects-page-container">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="projects-label">
              MY WORK
            </p>

            <h1>
              Projects & <span>Development</span>
            </h1>

            <p className="projects-intro">
              Explore the software, AI, IoT, and digital
              solutions I am building and developing.
            </p>
          </motion.div>

        </div>
      </section>


      {/* =========================
          PROJECT STATISTICS
      ========================== */}
      <section className="projects-stats-section">
        <div className="projects-page-container">

          <div className="projects-stats">

            <div className="project-stat-card">
              <span className="project-stat-number">
                {totalProjects}
              </span>

              <span className="project-stat-label">
                Total Projects
              </span>
            </div>

            <div className="project-stat-card">
              <span className="project-stat-number">
                {completedProjects}
              </span>

              <span className="project-stat-label">
                Completed
              </span>
            </div>

            <div className="project-stat-card">
              <span className="project-stat-number">
                {developmentProjects}
              </span>

              <span className="project-stat-label">
                In Development
              </span>
            </div>

            <div className="project-stat-card">
              <span className="project-stat-number">
                {plannedProjects}
              </span>

              <span className="project-stat-label">
                Planned
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FILTERS
      ========================== */}
      <section className="projects-filter-section">
        <div className="projects-page-container">

          <div className="projects-filters">

            {/* Search */}
            <div className="projects-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

            {/* Category */}
            <div className="projects-filter">
              <label>
                Category
              </label>

              <select
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="projects-filter">
              <label>
                Status
              </label>

              <select
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(event.target.value)
                }
              >
                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          PROJECTS
      ========================== */}
      <section className="all-projects-section">
        <div className="projects-page-container">

          <div className="projects-results-header">
            <div>
              <p className="projects-label">
                PROJECTS
              </p>

              <h2>
                Building <span>Solutions</span>
              </h2>
            </div>

            <p className="projects-result-count">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}
            </p>
          </div>


          {filteredProjects.length > 0 ? (
            <div className="all-projects-grid">

              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  className="all-project-card"
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
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                >

                  {/* Image */}
                  {project.image ? (
                    <div className="all-project-image">
                      <img
                        src={`http://127.0.0.1:8000${project.image}`}
                        alt={project.name}
                      />
                    </div>
                  ) : (
                    <div className="all-project-image all-project-placeholder">
                      <span>
                        {project.category}
                      </span>
                    </div>
                  )}


                  <div className="all-project-content">

                    {/* Meta */}
                    <div className="all-project-meta">

                      <span className="all-project-category">
                        {project.category}
                      </span>

                      <span
                        className={`project-status status-${project.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {project.status}
                      </span>

                    </div>


                    {/* Title */}
                    <h3>
                      {project.name}
                    </h3>


                    {/* Description */}
                    <p className="all-project-description">
                      {project.description}
                    </p>


                    {/* Progress */}
                    <div className="project-progress-section">

                      <div className="project-progress-header">
                        <span>
                          Progress
                        </span>

                        <strong>
                          {project.progress}%
                        </strong>
                      </div>

                      <div className="project-progress">
                        <div
                          className="project-progress-bar"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        ></div>
                      </div>

                    </div>


                    {/* Technologies */}
                    <div className="all-project-technologies">

                      {project.technologies
                        .split(",")
                        .map((technology, index) => (
                          <span key={index}>
                            {technology.trim()}
                          </span>
                        ))}

                    </div>


                    {/* Links */}
                    <div className="all-project-links">

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                          <ArrowUpRight size={16} />
                        </a>
                      )}

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                          <ArrowUpRight size={16} />
                        </a>
                      )}

                    </div>

                  </div>

                </motion.article>
              ))}

            </div>
          ) : (
            <div className="projects-no-results">
              <h3>
                No projects found
              </h3>

              <p>
                Try changing your search or filters.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
};

export default Projects;