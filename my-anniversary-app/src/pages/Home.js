import React, { useState, useEffect } from "react";
import { FiMail, FiX, FiInfo } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa6";
import youtubeData from "../content/video_ids.json";
import cuteData from "../content/cute_vids.json";
import finVid from "../content/financial_literacy_vids.json";
import mango from "../content/mangobutt.json";
import usnews from "../content/us_news.json";
import worldnews from "../content/world_news.json";
import arunabh from "../content/avatar-jessica.png";
import jessica from "../content/avatar-arunabh.png";
import memories from "../content/jess-pics.json";

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
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const [eightBallAnswer, setEightBallAnswer] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  const selectRandomMemory = () => {
    const randomIndex = Math.floor(Math.random() * memories.length);
    return memories[randomIndex];
  };

  const handleShowRandomMemory = () => {
    const randomMemory = selectRandomMemory();
    setContent({
      type: "memory",
      text: randomMemory.caption,
      imageUrl: randomMemory.link,
    });
  };

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
        const isActivity = Math.random() < 0.25; // One third chance for each
        const isDrink = Math.random() < 0.33; // Adjust the randomization logic if necessary
        const isJoke = Math.random() < 0.5;
        if (isActivity) {
          fetchBoredActivity();
        } else if (isDrink) {
          fetchDrinkRecipe();
        } else if (isJoke) {
          fetchJoke();
        } else {
          fetchMangoVideo();
        }
        break;
      case "Curious":
        const isRiddle = Math.random() < 0.2; // Randomly choose between riddle and fun fact
        const isFunFact = Math.random() < 0.25;
        const isUSNews = Math.random() < 0.33;
        const isWorldNews = Math.random() < 0.5;
        if (isRiddle) {
          fetchRiddle();
        } else if (isFunFact) {
          fetchFunFact();
        } else if (isUSNews) {
          fetchUSNewsVideo();
        } else if (isWorldNews) {
          fetchWorldNewsVideo();
        } else {
          fetchFinVideo();
        }
        break;
      case "Overwhelmed":
        const isAnimal = Math.random() < 0.33; // 50% chance for each
        const isCuteVideo = Math.random() < 0.5;
        if (isAnimal) {
          fetchAnimalImage();
        } else if (isCuteVideo) {
          fetchCuteVideo();
        } else {
          fetchAdvice();
        }
        break;
      case "Nostalgic":
        const isVideo = Math.random() < 0.45; // 45% chance for music, slightly biased
        if (isVideo) {
          fetchYoutubeVideo();
        } else {
          handleShowRandomMemory();
        }
        break;
      default:
        break;
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

  const fetchYoutubeVideo = () => {
    const randomIndex = Math.floor(Math.random() * youtubeData.length);
    const videoId = youtubeData[randomIndex];
    setContent({
      type: "youtube",
      id: videoId,
    });
  };

  const fetchCuteVideo = () => {
    const randomIndex = Math.floor(Math.random() * cuteData.length);
    const videoId = cuteData[randomIndex];
    setContent({
      type: "cutie",
      id: videoId,
    });
  };

  const fetchFinVideo = () => {
    const randomIndex = Math.floor(Math.random() * finVid.length);
    const videoId = finVid[randomIndex];
    setContent({
      type: "fin",
      id: videoId,
    });
  };

  const fetchMangoVideo = () => {
    const randomIndex = Math.floor(Math.random() * mango.length);
    const videoId = mango[randomIndex];
    setContent({
      type: "mango",
      id: videoId,
    });
  };

  const fetchUSNewsVideo = () => {
    const randomIndex = Math.floor(Math.random() * usnews.length);
    const videoId = usnews[randomIndex];
    setContent({
      type: "usnews",
      id: videoId,
    });
  };

  const fetchWorldNewsVideo = () => {
    const randomIndex = Math.floor(Math.random() * worldnews.length);
    const videoId = worldnews[randomIndex];
    setContent({
      type: "worldnews",
      id: videoId,
    });
  };

  const submitEightBallQuestion = () => {
    // Select a random answer from the MagicAnswers array
    const randomIndex = Math.floor(Math.random() * MagicAnswers.length);
    const randomAnswer = MagicAnswers[randomIndex].text;
    setEightBallAnswer(randomAnswer);

    setUserQuestion("");
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

    const apiUrl = "https://dog.ceo/api/breeds/image/random";

    // Select a random API URL
    const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let imageUrl;
        imageUrl = data.message;

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
            <p>
              For best results, please view in full screen on a laptop or iPad.
              Site display is not compatible with most smartphones <br />
            </p>
            <p>To use this website:</p>
            <p>
              - The four buttons on the main page all do differnt things, to
              refresh or get new results, click the button again!
              <br />- The book button on the bottom right will open a Zoom-style
              study session for you!
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
                  and it will cost you{" "}
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
            {content && content.type === "memory" && (
              <div className="imageContainer">
                <div className="imageText">Remember this? :)</div>
                <img
                  alt={content.text}
                  src={content.imageUrl}
                  className="memoryImage"
                ></img>
                <p>{content.text}</p>
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
            {content && content.type === "fin" && (
              <div className="imageText">
                Here's a video about finances!
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
            {content && content.type === "mango" && (
              <div className="imageText">
                Bored? Enjoy this MissMangoButt video :)
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
            {content && content.type === "usnews" && (
              <div className="imageText">
                Here's a video about US News!
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
            {content && content.type === "worldnews" && (
              <div className="imageText">
                Here's a video about World News!
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
            onClick={() => {
              setIsEightBallFrameVisible(false);
              setEightBallAnswer("");
            }}
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
      {isZoomVisible && (
        <div className="zoom">
          <button
            onClick={() => {
              setIsZoomVisible(false);
            }}
            className="closeButton"
          >
            <FiX size={24} />
          </button>
          <div className="content">
            <div className="videoChatOne">
              <iframe
                src={`https://www.youtube.com/embed/mWY81fGPDh0?autoplay=1&mute=1&loop=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="videoChatTwo">
              <iframe
                src={`https://www.youtube.com/embed/ms-Tr0GbVAY?autoplay=1&mute=1&loop=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="videoChatThree">
              <iframe
                src={`https://www.youtube.com/embed/HFUrbHUzDik?autoplay=1&mute=1&loop=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="videoChatFour">
              <iframe
                src={`https://www.youtube.com/embed/J4JUJyR5l8U?autoplay=1&mute=1&loop=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {isMuted && (
              <audio
                id="background-audio"
                src="my-anniversary-app/src/content/music/lofi.mp3"
                loop
              >
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      )}
      <button
        className="zoomIcon"
        onClick={() => setIsZoomVisible(!isZoomVisible)}
      >
        <FaBookOpen size={24} />
      </button>
      <button className="mailIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FiMail size={24} />
      </button>
      <button
        className="eightBallIcon"
        onClick={() => setIsEightBallFrameVisible(!isEightBallFrameVisible)}
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
                <br />
                <br />
                <br />
                <br />
                <p>Dear Jessica,</p>
                <br /> It has been two years since you said yes to being my
                girlfriend in Cascadilla Hall at a few minutes past midnight on
                the 27th of February. Everyday since then, has been an adventure
                and I am so grateful to have shared it with you. You are without
                a doubt the kindest, sweetest, most caring, and thoughtful
                person I have ever met. I am so grateful to be able to say I am
                your boyfriend.
                <br />
                <br /> When we first met (virtually) before coming to Cornell, I
                had a feeling we were going to be close. After our first
                conversation, I had an unexplained spark of joy; I didn’t know
                why I felt so good to be talking to you but I knew that I didn’t
                want that feeling to fade away. The following two months we
                texted day after day and I learned more and more about you,
                little did I know I was only just getting to know the girl I
                would fall in love with.
                <br />
                <br /> I have loved every moment spent with you. From the late
                nights we spent in Upson as sophomores, to the early mornings
                waking up to your face in the Phi Delt house, to the evenings
                spent in dining halls having dinner together every day as
                seniors, I have cherished and will continue to cherish all the
                quality time I get to spend with you.
                <br />
                <br /> As I look back at these two years together, I can’t help
                but think of all the things we have conquered together. We have
                met with and overcome so many things and I know that if there is
                anyone I want to fight these battles with now and in the future,
                it is you my love. You are the best partner in crime anyone
                could ask for. Together, it feels like we are undefeatable in
                the face of any adversary.
                <br />
                <br /> To celebrate and commemorate our two year anniversary, I
                started working on this little project towards the middle of
                winter break. I wanted to make a website that would celebrate us
                and that you could use for funzies whenever you were bored or
                wanted something to do! I hope you enjoy it :)
                <br />
                <br /> I am excited for all that the future holds and I am
                excited for all the surprises, challenges, and accomplishments
                we will take on together. I love you so much Jessica! MWAAAAAAAH
                <br />
              </p>
              <br />
              <p>
                With all my love,
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
