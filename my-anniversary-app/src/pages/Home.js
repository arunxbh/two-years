import React, { useState, useEffect } from "react";
import { FiMail, FiX, FiInfo } from "react-icons/fi";
import youtubeData from "../content/video_ids.json";
import cuteData from "../content/cute_vids.json";
//swapped for aesthetics
import arunabh from "../content/avatar-jessica.png";
import jessica from "../content/avatar-arunabh.png";

// 972212fd000b41b9bfcf33a1eaa6be23 API key for https://newsapi.org/docs/endpoints/everything, embed later in new button on "all knowing button"

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timePassed, setTimePassed] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState(""); // State to track the selected emotion
  const [content, setContent] = useState(null); // This will hold the API response content
  const [frameVisible, setFrameVisible] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEightBallFrameVisible, setIsEightBallFrameVisible] = useState(false);
  const [eightBallAnswer, setEightBallAnswer] = useState("");
  const [userQuestion, setUserQuestion] = useState("");

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
        const isCuteVideo = Math.random() < 0.33;
        if (isAnimal) {
          fetchAnimalImage();
        } else if (isCuteVideo) {
          fetchCuteVideo();
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

  const MagicAnswers = [
    { id: 0, text: "It is certain.", type: "affirmative" },
    { id: 1, text: "It is decidedly so.", type: "affirmative" },
    { id: 2, text: "Without a doubt.", type: "affirmative" },
    { id: 3, text: "Yes – definitely.", type: "affirmative" },
    { id: 4, text: "You may rely on it.", type: "affirmative" },
    { id: 5, text: "As I see it, yes.", type: "affirmative" },
    { id: 6, text: "Most likely.", type: "affirmative" },
    { id: 7, text: "Outlook good.", type: "affirmative" },
    { id: 8, text: "Yes.", type: "affirmative" },
    { id: 9, text: "Signs point to yes.", type: "affirmative" },
    { id: 10, text: "Reply hazy, try again.", type: "neutral" },
    { id: 11, text: "Ask again later.", type: "neutral" },
    { id: 12, text: "Better not tell you now.", type: "neutral" },
    { id: 13, text: "Cannot predict now.", type: "neutral" },
    { id: 14, text: "Concentrate and ask again.", type: "neutral" },
    { id: 15, text: "Don't count on it.", type: "negative" },
    { id: 16, text: "My reply is no.", type: "negative" },
    { id: 17, text: "My sources say no.", type: "negative" },
    { id: 18, text: "Outlook not so good.", type: "negative" },
    { id: 19, text: "Very doubtful.", type: "negative" },
  ];

  const submitEightBallQuestion = () => {
    // Select a random answer from the MagicAnswers array
    const randomIndex = Math.floor(Math.random() * MagicAnswers.length);
    const randomAnswer = MagicAnswers[randomIndex].text;

    // Set the eightBallAnswer state to the selected answer
    setEightBallAnswer(randomAnswer);
  };

  const handlePasswordCheck = (event) => {
    event.preventDefault(); // Prevent form from submitting and refreshing the page
    if (passwordInput.trim() === "5559") {
      setIsPasswordProtected(false);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect");
      setPasswordInput(""); // Clear password input if incorrect
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

  const fetchCuteVideo = () => {
    const randomIndex = Math.floor(Math.random() * youtubeData.length);
    const videoId = cuteData[randomIndex];
    setContent({
      type: "cutie",
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
      <div className="avatarsContainer">
        <img src={jessica} alt="Avatar 1" className="avatar" />
        <img src={arunabh} alt="Avatar 2" className="avatar" />
      </div>
      {isInfoOpen && (
        <div className="infoFrame">
          <button
            className="closeFrameButton"
            onClick={() => setIsInfoOpen(false)}
          >
            <FiX size={24} />
          </button>
          <div className="infoContent">
            <p>To use this website:</p>
            <p>
              - The four buttons on the main page all do differnt things, to
              refresh or get new results, click the button again!
              <br />- The lightbulb button on the bottom right will give you a
              bunch of articles about any topic you want to learn about! Just
              type in a keyword and you will get as much information as one
              could ever desire.
              <br />- The 8-ball button on the bottom right corner is for
              whenever you are feeling indecisive! Click it to get a second
              opinion
              <br />- I have written a private letter to you, to view: click the
              mail icon in the bottom right corner and use the same passcode you
              use to unlock your phone!
            </p>
            <p>
              <br />I love you Jessica! Happy anniversary :)
            </p>
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

            {content && content.type === "joke-single" && (
              <>
                <h3>Jokersville</h3>
                <p>
                  You're bored? Ok well, we all know I am the funny one in the
                  relationship, so just imagine my voice when reading this joke
                  and try not to laugh too hard!
                </p>
                <p>{content.joke}</p>
                <p className="disclaimer">
                  If the joke is inappropriate: I sincerely apologize, it is out
                  of my control
                </p>
              </>
            )}
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
                <h3>Try this activity: {content.activity}</h3>
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
                <h3>{"Here's a fun fact that you may not know!"}</h3>
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
            {content && content.type === "cutie" && (
              <div className="imageText">
                I hope you enjoy this cutie video!
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
      {isEightBallFrameVisible && (
        <div className="parchmentMenu">
          <button
            onClick={() => setIsEightBallFrameVisible(false)}
            className="closeButton"
          >
            <FiX size={24} />
          </button>
          <div className="content">
            <h1>Ask the Eight Ball:</h1>
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Type your question"
              className="passwordInput"
            />
            <button
              onClick={submitEightBallQuestion}
              className="submitPasswordButton"
            >
              What should I do?
            </button>
            {eightBallAnswer && (
              <h3>
                Reading:
                <br />
                <br />
                {eightBallAnswer}
              </h3>
            )}
          </div>
        </div>
      )}

      <button className="mailIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FiMail size={24} />
      </button>
      <button
        className="eightBallIcon"
        onClick={() => setIsEightBallFrameVisible(!isMenuOpen)}
      >
        8
      </button>

      <div className="timer">{timePassed}</div>
      {isMenuOpen && (
        <div className="parchmentMenu">
          <button className="closeButton" onClick={() => setIsMenuOpen(false)}>
            <FiX size={24} />
          </button>
          {isPasswordProtected ? (
            <>
              <form onSubmit={handlePasswordCheck}>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password"
                  className="passwordInput"
                />
                <button type="submit" className="submitPasswordButton">
                  Submit
                </button>
              </form>
              {passwordError && (
                <p className="passwordError">{passwordError}</p>
              )}
            </>
          ) : (
            <div className="letterContent">
              <p></p>
              <br />
              <br />
              <p>
                <p>To Jessica,</p>
                <br /> As I sit down to write this letter, my mind is flooded
                with memories of our journey together. Each moment we've shared
                is a precious thread in the tapestry of our story, a story that
                began with a shy hello and blossomed into a life shared in love.
                <br />
                <br /> I remember the laughter that filled the air on our first
                date, a sound so sweet it still echoes in my heart. Those early
                days were like a dance, each step bringing us closer, each twirl
                revealing more of who we are.
                <br />
                <br /> With every challenge we faced, we found strength in each
                other. Our love, a beacon of hope, guided us through storms and
                led us to clearer skies. Your resilience inspires me, your
                kindness lifts me, and your love sustains me.
                <br />
                <br /> The way you smile, the way you care, the way you give so
                selflessly, it all makes me fall in love with you more every
                day. You are my rock, my comfort, and my endless joy.
                <br />
                <br /> The quiet moments we share, simple and unassuming, have
                become my sanctuary. Whether it's a whispered word or a silent
                embrace, these are the times when I feel our souls speak the
                same language.
                <br />
                <br />
                Our love is a canvas painted with vibrant colors of joy, deep
                hues of passion, and gentle strokes of understanding. Each day
                adds another brushstroke, another memory, another reason to love
                you.
                <br />
                <br /> On this special day, I want to promise you again, my
                heart, my loyalty, and my life. You are my past, my present, and
                my future. There's nothing we can't face together.
                <br />
                <br /> As I write the closing lines of this letter, know that it
                is not an end, but a continuation. Our journey is still
                unfolding, and I look forward to every step, every challenge,
                and every triumph with you by my side.
                <br />
              </p>
              <br />
              <p>
                Love,
                <br />
                Arunabh
              </p>{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
