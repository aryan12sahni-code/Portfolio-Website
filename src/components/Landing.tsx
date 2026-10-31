import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <p className="landing-eyebrow">{config.social.location}</p>
            <h1 className="landing-brand">
              ARYAN
              <span>SAHNI</span>
            </h1>
            <p className="landing-role">{config.developer.title}</p>
          </div>
          <div className="landing-info">
            <h3>Now shipping</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Ops → Industrial AI</div>
            </h2>
            <h2>
              <div className="landing-h2-info">
                Data, dashboards &amp; systems that stick
              </div>
            </h2>
          </div>
          <div className="mobile-photo">
            <img
              src="/images/avatar-as.svg"
              alt={config.developer.fullName}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
