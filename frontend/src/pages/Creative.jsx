import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { motion } from "framer-motion";

import api from "../services/api";
import "./Creative.css";

const Creative = () => {
  const [works, setWorks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    api
      .get("/creative/")
      .then((response) => {
        setWorks(response.data);
      })
      .catch((error) => {
        console.error("Error loading creative works:", error);
      });
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(works.map((work) => work.category)),
    ];

    return ["All", ...uniqueCategories];
  }, [works]);

  const filteredWorks = works.filter((work) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      work.title.toLowerCase().includes(search) ||
      work.description.toLowerCase().includes(search) ||
      work.category.toLowerCase().includes(search) ||
      (work.tools || "").toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      work.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalWorks = works.length;

  const photographyCount = works.filter(
    (work) => work.category === "Photography"
  ).length;

  const designCount = works.filter(
    (work) =>
      work.category === "Graphic Design" ||
      work.category === "UI/UX Design"
  ).length;

  const multimediaCount = works.filter(
    (work) => work.category === "Multimedia"
  ).length;

  return (
    <main className="creative-page">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="creative-hero">
        <div className="creative-page-container">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="creative-label">
              CREATIVE PORTFOLIO
            </p>

            <h1>
              Design, Media &{" "}
              <span>Creative Work</span>
            </h1>

            <p className="creative-intro">
              A collection of photography, design, UI/UX,
              and multimedia work that reflects my creative
              side beyond software development.
            </p>
          </motion.div>

        </div>
      </section>


      {/* =========================
          CREATIVE STATISTICS
      ========================== */}
      <section className="creative-stats-section">
        <div className="creative-page-container">

          <div className="creative-stats">

            <div className="creative-stat-card">
              <span className="creative-stat-number">
                {totalWorks}
              </span>

              <span className="creative-stat-label">
                Total Works
              </span>
            </div>

            <div className="creative-stat-card">
              <span className="creative-stat-number">
                {photographyCount}
              </span>

              <span className="creative-stat-label">
                Photography
              </span>
            </div>

            <div className="creative-stat-card">
              <span className="creative-stat-number">
                {designCount}
              </span>

              <span className="creative-stat-label">
                Design
              </span>
            </div>

            <div className="creative-stat-card">
              <span className="creative-stat-number">
                {multimediaCount}
              </span>

              <span className="creative-stat-label">
                Multimedia
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FILTER SECTION
      ========================== */}
      <section className="creative-filter-section">
        <div className="creative-page-container">

          <div className="creative-filters">

            <div className="creative-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search creative work..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

            <div className="creative-category-filter">

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

          </div>

        </div>
      </section>


      {/* =========================
          CREATIVE WORKS
      ========================== */}
      <section className="creative-gallery-section">
        <div className="creative-page-container">

          <div className="creative-results-header">

            <div>
              <p className="creative-label">
                MY CREATIVE WORK
              </p>

              <h2>
                Explore My <span>Work</span>
              </h2>
            </div>

            <p className="creative-result-count">
              {filteredWorks.length}{" "}
              {filteredWorks.length === 1
                ? "work"
                : "works"}
            </p>

          </div>


          {filteredWorks.length > 0 ? (
            <div className="creative-gallery">

              {filteredWorks.map((work) => (
                <motion.article
                  key={work.id}
                  className="creative-work-card"
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
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                >

                  {/* Image */}
                  {work.image ? (
                    <div className="creative-work-image">
                      <img
                        src={`http://127.0.0.1:8000${work.image}`}
                        alt={work.title}
                      />
                    </div>
                  ) : (
                    <div className="creative-work-placeholder">
                      <span>
                        {work.category}
                      </span>
                    </div>
                  )}


                  {/* Content */}
                  <div className="creative-work-content">

                    <div className="creative-work-category">
                      {work.category}
                    </div>

                    <h3>
                      {work.title}
                    </h3>

                    <p>
                      {work.description}
                    </p>


                    {/* Tools */}
                    {work.tools && (
                      <div className="creative-work-tools">

                        {work.tools
                          .split(",")
                          .map((tool, index) => (
                            <span key={index}>
                              {tool.trim()}
                            </span>
                          ))}

                      </div>
                    )}


                    {/* Link */}
                    {work.project_url && (
                      <div className="creative-work-link">

                        <a
                          href={work.project_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Work
                          <ArrowUpRight size={16} />
                        </a>

                      </div>
                    )}

                  </div>

                </motion.article>
              ))}

            </div>
          ) : (
            <div className="creative-no-results">

              <h3>
                No creative work found
              </h3>

              <p>
                Try changing your search or category filter.
              </p>

            </div>
          )}

        </div>
      </section>

    </main>
  );
};

export default Creative;