import React, { useState, useEffect } from "react";
import { FiMail, FiX } from "react-icons/fi";

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timePassed, setTimePassed] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState(""); // State to track the selected emotion

  useEffect(() => {
    const calculateTimePassed = () => {
      const startDate = new Date("February 27, 2022 00:00:00 EST");
      const now = new Date();

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (months < 0) {
        years--;
        months += 12;
      }

      if (days < 0) {
        months--;
        let previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }

      if (hours < 0) {
        days--;
        hours += 24;
      }
      if (minutes < 0) {
        hours--;
        minutes += 60;
      }
      if (seconds < 0) {
        minutes--;
        seconds += 60;
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setTimePassed(
        `We have been together for ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
      );
    };

    const timer = setInterval(calculateTimePassed, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion); // Optionally use the emotion state for other purposes

    const buttons = document.querySelectorAll(".emotionButton");
    buttons.forEach((button) => {
      if (button.textContent === emotion) {
        button.classList.add("animate");
        setTimeout(() => {
          button.classList.remove("animate"); // Remove the class after the animation
        }, 500); // Match the duration of the CSS animation
      }
    });
  };

  return (
    <div className="homeBackground">
      <div className="emotionContainer">
        <div className="emotionText">Hi Jessica! How are you feeling?</div>
        <div className="emotionButtons">
          {[
            "Happy",
            "Sad",
            "Tired",
            "Stressed",
            "Lonely",
            "Hungry",
            "Annoyed",
            "Mad",
            "Overwhelmed",
          ].map((emotion) => (
            <button
              key={emotion}
              className={`emotionButton ${
                selectedEmotion === emotion ? "selected" : ""
              }`}
              onClick={() => handleEmotionClick(emotion)}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>
      <button className="mailIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FiMail size={24} />
      </button>
      <div className="timer">{timePassed}</div>
      {isMenuOpen && (
        <div className="parchmentMenu">
          <button className="closeButton" onClick={() => setIsMenuOpen(false)}>
            <FiX size={24} />
          </button>

          <div className="letterContent">
            <p>To Jessica,</p>
            <p>
              Happy 2 Year Anniversary!
              <br />
            </p>
            <p>
              Love,
              <br />
              Arunabh
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
