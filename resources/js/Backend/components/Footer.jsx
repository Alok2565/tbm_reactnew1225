// Footer.js
import React from "react";

function Footer() {
  return (
    <footer
      className="bg-light p-1 py-3 border-top-2"
      style={{ borderTop: "1x solid #eee" }}
    >
      {new Date().getFullYear()} © Designed and Developed by{" "}
      <a href="https://www.nic.in/" target="_blank" rel="noopener noreferrer">
        National Informatics Centre (NIC)
      </a>
      .
    </footer>
  );
}
export default Footer;