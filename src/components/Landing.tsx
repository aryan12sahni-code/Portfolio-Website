import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        {/*
          Keep the 3D character outside .landing-container so desktop
          GSAP opacity/transform on the container does not hide or break it.
        */}
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hey there —</h2>
            <h1 className="landing-brand">
              {firstName.toUpperCase()}
              {lastName && (
                <>
                  <br />
                  <span>{lastName.toUpperCase()}</span>
                </>
              )}
            </h1>
          </div>
          <div className="landing-info">
            <h3>I am</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">
                Industrial AI · Nürnberg
              </div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
