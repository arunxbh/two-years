import React, { useState, useEffect } from "react";
import { FiMail, FiX, FiInfo } from "react-icons/fi";
import youtubeData from "../content/video_ids.json";

// 972212fd000b41b9bfcf33a1eaa6be23 API key for https://newsapi.org/docs/endpoints/everything, embed later in new button on "all knowing button"

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

    const fetchFunFact = () => {
      fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
        .then((response) => response.json())
        .then((data) => {
          setContent({
            type: "fact",
            text: data.text,
            source: data.source,
            source_url: data.source_url,
          });
        })
        .catch((error) => {
          console.error("Error fetching fun fact:", error);
          setContent({
            type: "error",
            text: "Failed to fetch fun fact.",
          });
        });
    };

    switch (emotion) {
      case "Bored":
        const isActivity = Math.random() < 0.33; // One third chance for each
        const isDrink = Math.random() < 0.5; // Adjust the randomization logic if necessary
        if (isActivity) {
          fetchBoredActivity();
        } else if (isDrink) {
          fetchDrinkRecipe();
        } else {
          fetchJoke();
        }
        break;
      case "Curious":
        const isRiddle = Math.random() < 0.5; // Randomly choose between riddle and fun fact
        if (isRiddle) {
          fetchRiddle();
        } else {
          fetchFunFact();
        }
        break;
      case "Overwhelmed":
        const isAnimal = Math.random() < 0.5; // 50% chance for each
        if (isAnimal) {
          fetchAnimalImage();
        } else {
          fetchAdvice();
        }
        break;
      case "Nostalgic":
        fetchYoutubeVideo();
        break;
      // Add other cases for different emotions and their corresponding API calls
    }
  };

  const fetchAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setContent({
          type: "advice",
          advice: data.slip.advice,
        });
      })
      .catch((error) => {
        console.error("Error fetching advice:", error);
        setContent({
          type: "error",
          text: "Failed to fetch advice.",
        });
      });
  };

  const fetchJoke = () => {
    fetch("https://v2.jokeapi.dev/joke/Any")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error("Joke API returned an error");
        }

        if (data.type === "twopart") {
          setContent({
            type: "joke-twopart",
            setup: data.setup,
            delivery: data.delivery,
          });
        } else {
          // If it's a single-part joke
          setContent({
            type: "joke-single",
            joke: data.joke,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching joke:", error);
        setContent({
          type: "error",
          text: "Failed to fetch joke.",
        });
      });
  };

  const fetchDrinkRecipe = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        const drink = data.drinks[0];
        setContent({
          type: "drink",
          name: drink.strDrink,
          category: drink.strCategory,
          instructions: drink.strInstructions,
          ingredients: Object.keys(drink)
            .filter((key) => key.startsWith("strIngredient") && drink[key])
            .map((ingredient) => drink[ingredient]),
          measures: Object.keys(drink)
            .filter((key) => key.startsWith("strMeasure") && drink[key])
            .map((measure) => drink[measure]),
          image: drink.strDrinkThumb,
        });
      })
      .catch((error) => {
        console.error("Error fetching drink recipe:", error);
        setContent({
          type: "error",
          text: "Failed to fetch drink recipe.",
        });
      });
  };

  const fetchBoredActivity = () => {
    fetch("https://www.boredapi.com/api/activity/")
      .then((response) => response.json())
      .then((data) => {
        setContent({
          type: "activity",
          activity: data.activity,
          participants: data.participants,
          price: data.price,
          link: data.link,
        });
      })
      .catch((error) => {
        console.error("Error fetching activity:", error);
        setContent({
          type: "error",
          text: "Failed to fetch activity.",
        });
      });
  };

  const fetchYoutubeVideo = () => {
    const randomIndex = Math.floor(Math.random() * youtubeData.length);
    const videoId = youtubeData[randomIndex];
    setContent({
      type: "youtube",
      id: videoId,
    });
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

  const fetchFunFact = () => {
    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
      .then((response) => response.json())
      .then((data) => {
        setContent({
          type: "fact",
          text: data.text,
          source: data.source,
          source_url: data.source_url,
        });
      })
      .catch((error) => {
        console.error("Error fetching fun fact:", error);
        setContent({
          type: "error",
          text: "Failed to fetch fun fact.",
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
                <h3>Solve this riddle Miss Smarty Pants B.S. D.D.S!</h3>
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
            {content && content.type === "joke-twopart" && (
              <>
                <h3>Jokersville</h3>
                <p>
                  You're bored? Ok well, we all know I am the funny one in the
                  relationship, so just imagine my voice when reading this joke
                  and try not to laugh too hard!
                </p>
                <p>{content.setup}</p>
                {showAnswer && <p>{content.delivery}</p>}
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="emotionButton"
                >
                  {showAnswer ? "Hide Punchline" : "Show Punchline"}
                </button>
                <p className="disclaimer">
                  If the joke is inappropriate: I sincerely apologize, it is out
                  of my control
                </p>
              </>
            )}

            {content && content.type === "joke-single" && <p>{content.joke}</p>}
            {content && content.type === "advice" && (
              <>
                <h3>Advice Hub:</h3>
                <p>Feeling overwhelmed? Here is some advice:</p>
                <p>{content.advice}</p>
                <p>
                  Remember to take your time and slow down! You have made it
                  this far. You can always call me if you need anything. I love
                  you!
                </p>
              </>
            )}
            {content && content.type === "drink" && (
              <>
                <p>You're bored? </p>
                <p>Well, it's 5pm somewhere!</p>
                <h3>Let's make a {content.name}!</h3>
                <p>This drink is a {content.category}</p>
                <h4>Ingredients and Instructions:</h4>
                <ul>
                  {content.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient} {content.measures[index]}
                    </li>
                  ))}
                  <p>{content.instructions}</p>
                </ul>
                <h4>The finished product should look like this:</h4>
                {content.image && (
                  <img
                    src={content.image}
                    alt={content.name}
                    className="contentImage"
                  />
                )}
              </>
            )}

            {content && content.type === "activity" && (
              <>
                <p>
                  You're bored? Ok first of all, TEXT ME! If I don't answer...
                </p>
                <p>Try this activity: {content.activity}</p>
                <p>
                  You will need {content.participants} participants for this
                  activity.
                </p>
                <p>
                  and it will you{" "}
                  {content.price === 0 ? "nothing" : content.price} dollars!
                </p>
                {content.link && (
                  <p>
                    <a
                      href={content.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Here's a link to find out more
                    </a>
                  </p>
                )}
              </>
            )}
            {content && content.type === "fact" && (
              <>
                <p>{"Here's a fun fact that you may not know!"}</p>
                <p>{content.text}</p>
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
            {content && content.type === "youtube" && (
              <div className="imageText">
                I hope you can still jam out to this song!
                <div className="videoFrame">
                  <iframe
                    src={`https://www.youtube.com/embed/${content.id}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
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
