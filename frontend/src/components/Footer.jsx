import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <p className="footer-text">
          © {new Date().getFullYear()}{" "}
          <span className="footer-name">
            Rosesante Douglas Munisi
          </span>
        </p>

        <p className="footer-tagline">
          Create solutions through code.
        </p>

      </div>
    </footer>
  );
};

export default Footer;