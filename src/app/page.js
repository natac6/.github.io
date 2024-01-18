"use client";
import { useState, useEffect } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { format } from "date-fns";

export default function Home() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");

  useEffect(() => {
    // The function for fetching the definition based on the entered word
    async function getDefinition() {
      const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "44feb9e80dmshae47c899d4ae15fp1335ebjsnd48a24f3e34f",
          "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.list);
        setWords(result.list);
      } catch (error) {
        console.error(error);
      }
    }

    // Call the function only when the 'word' dependency changes
    if (word) {
      getDefinition();
    }
  }, [word]); // Now the useEffect has 'word' as a dependency

  return (
    <div className="px-8">
      <h1 className="text-neutral-950 font-bold text-4xl lg:text-5xl my-12 lg:my-16 text-center">
        Natasha's Urban Dictionary
      </h1>

      <section className="max-w-4xl mx-auto">
        <form>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Search for a word"
            required
            className="py-4 px-8 w-full border-2 border-neutral-400 
            rounded-full bg-neutral-100 text-neutarl-800 placeholder-neutral-700 
            lg:text-xl focus:border-neutral-700 focus:ring-4 focus:ring-neutral-700 
            outline-none"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </form>
        <div className="grid-cols-1 gap-8 mt-16">
          {words &&
            words.map((word) => (
              <article key={word.defid}>
                <h2 className="font-bold text-3xl lg:text-4xl mb-8">
                  {word.word}
                </h2>
                <p className="text-neutral-700 mb-4">
                  <em className="font-bold">Defined:</em> {word.definition}
                </p>
                <p className="mb-4">{word.example}</p>
                <ul className="flex gap-4">
                  <li className="flex items-center gap-1 text-emerald-400">
                    <AiFillDislike /> {word.thumbs_up}
                  </li>
                  <li className="flex items-center gap-1 text-rose-400">
                    <AiFillDislike /> {word.thumbs_down}
                  </li>
                </ul>
                <p className="mb-4">
                  By {word.author} on{" "}
                  <em>{format(new Date(word.written_on), "PPPP")}</em>{" "}
                </p>
                <a
                  href={word.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Read more
                </a>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}
