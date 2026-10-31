import { FaEnvelope, FaLinkedinIn, FaPhone } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import "./styles/SocialIcons.css";
import { useEffect } from "react";
import { config } from "../config";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const latest = elem.getBoundingClientRect();
        const x = e.clientX - latest.left;
        const y = e.clientY - latest.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = latest.width / 2;
          mouseY = latest.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href={`mailto:${config.contact.email}`} data-cursor="disable">
            <FaEnvelope />
          </a>
        </span>
        <span>
          <a href={`tel:${config.contact.phone.replace(/\s/g, "")}`} data-cursor="disable">
            <FaPhone />
          </a>
        </span>
        <span>
          <a href={`mailto:${config.contact.email}`} data-cursor="disable">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="#contact" data-cursor="disable">
            <HiOutlineLocationMarker />
          </a>
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
