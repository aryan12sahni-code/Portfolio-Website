import "./styles/About.css";
import { config } from "../config";

const About = () => {
  const paragraphs = config.about.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{config.about.title}</h3>
        {paragraphs.map((text, index) => (
          <p className="para" key={index}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default About;
