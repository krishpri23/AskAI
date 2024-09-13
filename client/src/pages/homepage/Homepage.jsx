import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Homepage = () => {
  const [typeStatus, setTypeStatus] = useState("human");
  return (
    <div className="homepage">
      <img className="orbital" src="/orbital.png" alt="background" />
      <div className="left">
        <h1> ASK AI</h1>
        <h2> Supercharge your creativity and productivity</h2>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link to="/dashboard"> Get started </Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          {/* animated background */}
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img className="bot" src="/bot.png" alt="robot" />
          <div className="typeAnimation">
            <img
              src={typeStatus === "human" ? "/human1.jpeg" : "bot.png"}
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                " We produce food for Mice",
                2000,
                () => {
                  setTypeStatus("bot");
                },
                " We produce food for Hamsters",
                2000,
                () => {
                  setTypeStatus("human");
                },
                " We produce food for Guinea Pigs",
                2000,
                () => {
                  setTypeStatus("bot");
                },
                "We produce food for Chinchillas",
                2000,
                () => {
                  setTypeStatus("human");
                },
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              omitDeletionAnimation
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <Link className="services" to="/">
          Terms of Service
        </Link>
        <Link className="privacy" to="/">
          {" "}
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
