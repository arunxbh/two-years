import React, { useState, useEffect } from "react";
import { FiMail, FiX, FiInfo } from "react-icons/fi";
import { Bs8Circle } from "react-icons/bs";

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timePassed, setTimePassed] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState(""); // State to track the selected emotion
  const [content, setContent] = useState(null); // This will hold the API response content
  const [frameVisible, setFrameVisible] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

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
    setIsMenuOpen(false);
    setSelectedEmotion(emotion);
    setShowAnswer(false); // Hide the answer when a new emotion is clicked
    setContent(null); // Clear previous content
    setFrameVisible(true); // Show the frame

    switch (emotion) {
      case "Curious":
        fetchRiddle();
        break;
      case "Overwhelmed":
        fetchAnimalImage(); // Call the new function to fetch a random animal image
        break;
      // Add other cases for different emotions and their corresponding API calls
    }
  };

  const fetchRiddle = () => {
    fetch("https://riddles-api.vercel.app/random")
      .then((response) => response.json())
      .then((data) => {
        setContent({
          type: "riddle",
          text: data.riddle,
          answer: data.answer,
        });
      })
      .catch((error) => {
        console.error("Error fetching riddle:", error);
        setContent({
          type: "error",
          text: "Failed to fetch riddle.",
        });
      });
  };

  const fetchAnimalImage = () => {
    // Array of API URLs
    const apiUrls = [
      "https://dog.ceo/api/breeds/image/random", // Dog API
      "https://cataas.com/cat?json=true", // Cat API (adjusted to return JSON)
    ];

    // Select a random API URL
    const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];

    fetch(randomApiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Depending on the API, the image URL is in a different field
        let imageUrl;
        if (randomApiUrl.includes("dog.ceo")) {
          imageUrl = data.message; // For dog API
        } else if (randomApiUrl.includes("cataas.com")) {
          imageUrl = `https://cataas.com/cat/${data._id}`;
        }

        setContent({
          type: "image",
          url: imageUrl, // Set the correct image URL
        });
      })
      .catch((error) => {
        console.error("Error fetching animal image:", error);
        setContent({
          type: "error",
          text: "Failed to fetch animal image.",
        });
      });
  };

  const closeFrame = () => {
    setFrameVisible(false);
  };

  const toggleAnswerVisibility = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="homeBackground">
      <button className="infoIcon" onClick={() => setIsInfoOpen(!isInfoOpen)}>
        <FiInfo size={24} />
      </button>

      {isInfoOpen && (
        <div className="infoFrame">
          <button
            className="closeFrameButton"
            onClick={() => setIsInfoOpen(false)}
          >
            <FiX size={24} />
          </button>
          <div className="infoContent">
            <p>I love you Jessica! Happy anniversary :)</p>
            <p>If anything ever breaks, send an email to: aas363@cornell.edu</p>
            <p>
              All rights reserved by Arunabh Sarkar <br />
              Copyright © 2024
            </p>
          </div>
        </div>
      )}
      <div className="emotionContainer">
        <div className="emotionText">Hi Jessica! How are you feeling?</div>
        <div className="emotionButtons">
          {["Bored", "Curious", "Nostalgic", "Overwhelmed"].map((emotion) => (
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
      {frameVisible && (
        <div className="contentFrame">
          <button onClick={closeFrame} className="closeFrameButton">
            <FiX size={24} />
          </button>
          <div className="content">
            {/* Render different content based on the content state */}
            {content && content.type === "riddle" && (
              <>
                <p>{content.text}</p>
                {showAnswer && <p>{content.answer}</p>}
                <button
                  onClick={toggleAnswerVisibility}
                  className="emotionButton"
                >
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
              </>
            )}
            {content && content.type === "image" && (
              <div className="imageContainer">
                <div className="imageText">Here's a cutie picta :)</div>
                <img
                  src={content.url}
                  alt="A cute animal"
                  className="contentImage"
                />
              </div>
            )}
            {content && content.type === "reading" && <p>{content.text}</p>}
          </div>
        </div>
      )}

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
