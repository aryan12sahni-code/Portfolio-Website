import { config } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <a
          href={`mailto:${config.contact.email}`}
          className="cta-btn cta-btn-play"
          data-cursor="disable"
        >
          Talk With Me →
        </a>

        <a
          href={`mailto:${config.contact.email}?subject=Hiring%20Aryan%20Sahni`}
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          Hire Me →
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
