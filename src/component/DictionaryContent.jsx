import React, { useEffect, useRef, useState } from "react";
import iconPlay from "../assets/images/icon-play.svg";
import iconNewWindow from "../assets/images/icon-new-window.svg";
import { Link } from "react-router-dom";
import { fetchData } from "../Fetcher";
import NotFound from "./NotFound";

const DictionaryContent = ({ searchWord }) => {
  const [wordObject, setWordObject] = useState();
  const [audioUrl, setAudioUrl] = useState();

  useEffect(() => {
    const fetchDataAndInitialize = async () => {
      try {
        const json = await fetchData(searchWord);
        if (json) {
          setWordObject(json[0]);
          setAudioUrl(
            json[0].phonetics.filter((url) => url.audio != "")[0]
              ? json[0].phonetics.filter((url) => url.audio != "")[0].audio
              : ""
          );
        } else {
          console.log("Word not found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataAndInitialize();
  }, [searchWord]);

  const audioRef = useRef(null);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <main>
      {wordObject ? (
        <div className="">
          <div className="dictionary-word__container flex">
            <div className="dictionary-word max-width">
              <h1 className="max-widt">{wordObject.word}</h1>
              <p className="clr-purple">{wordObject.phonetic}</p>
            </div>

            <img
              src={iconPlay}
              alt="Play Audio"
              onClick={handlePlayAudio}
              className="iconPlay"
            />

            <audio key={audioUrl} ref={audioRef} controls className="hidden">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {wordObject.meanings.map((meaning, index) => (
            <div key={index}>
              <div className="partOfSpeech headingM space-block-400 flex">
                <span>{meaning.partOfSpeech}</span>{" "}
                <div className="horizontal-border" />
              </div>

              <p className="clr-neutral-400 space-block-300">Meaning</p>
              <ul>
                {meaning.definitions.map((definition, index) => (
                  <li key={index}>
                    {definition.definition}
                    {definition.example && (
                      <p className="clr-neutral-400">{`"${definition.example}"`}</p>
                    )}
                  </li>
                ))}
              </ul>
              {meaning.synonyms.length > 0 && (
                <p className="space-block-400">
                  <span>Synonyms</span>{" "}
                  <span className="synonym clr-purple">
                    {meaning.synonyms.join(", ")}
                  </span>
                </p>
              )}
            </div>
          ))}

          <div className="source space-block-400">
            <span className="clr-neutral-400 ">Source</span>
            <Link to={wordObject.sourceUrls[0]}>
              <div className="source-link flex">
                <span>{wordObject.sourceUrls[0]}</span>{" "}
                <img src={iconNewWindow} alt="" />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </main>
  );
};

export default DictionaryContent;
