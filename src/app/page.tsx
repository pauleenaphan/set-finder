"use client"

import Image from "next/image";

import Link from "next/link";

import { useState } from "react";

import { FaClipboardList, FaHeart, FaMusic } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

import "../app/styles/home.css";

// First page that user sees 
export default function Home() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    { question: "How does SetFinder Work?", answer: "Search for a set, like and favorite that set, find it in your library and listen anytime." },
    { question: "Is this platform 100% free to use?", answer: "Yes, SetFinder is free to use!" },
    { question: "Where do the sets come from?", answer: "Sets are fetched using SoundCloud and YouTube API." },
    { question: "Why isn't the search working?", answer: "SetFinder relies on APIs from platforms like YouTube and SoundCloud to fetch live EDM sets. These services have rate limits, meaning we can only make a certain number of searches within a specific time. If the search isn’t working, we may have hit our API limit. Try again later, or consider supporting us to help improve the platform’s stability!" },
    { question: "How can I support SetFinder?", answer: "You can support by buying the creator a Ko-fi!" },
  ];

  return (
    <main className="flex flex-col gap-60 mb-60">
        <section className="mt-[3%]">
          <div className="flex gap-1 items-center justify-center overflow-x-hidden mb-10">
            <div className="coloredBead bg-yellow-400"></div>
            <div className="coloredBead bg-pink-400"></div>
            <div className="coloredBead bg-red-400"></div>
            <div className="coloredBead bg-purple-400"></div>
            <div className="coloredBead bg-blue-400"></div>
            <div className="coloredBead bg-pink-400 "></div>
            <div className="coloredBead bg-green-400"></div>
            <div className="coloredBead bg-blue-400 "></div>
            <div className="text-5xl"> - </div>
            <div className="kandiTitle flex items-center">
              <div className="kandiLetterContainer flex">
                <div className="letterBead text-neonPink "> S </div>
                <div className="letterBead text-neonBlue"> E </div>
                <div className="letterBead text-neonGreen"> T </div>
              </div>
              {/* <div className="text-5xl"> - </div> */}
              <div className="kandiLetterContainer flex">
                <div className="letterBead text-neonOrange"> F </div>
                <div className="letterBead text-neonBlue"> I </div>
                <div className="letterBead text-neonPurple"> N </div>
                <div className="letterBead text-neonPink"> D </div>
                <div className="letterBead text-neonGreen"> E </div>
                <div className="letterBead text-neonOrange"> R </div>
              </div>
            </div>
            <div className="text-5xl"> - </div>
            <div className="coloredBead bg-yellow-400"></div>
            <div className="coloredBead bg-pink-400"></div>
            <div className="coloredBead bg-red-400"></div>
            <div className="coloredBead bg-pink-400"></div>
            <div className="coloredBead bg-blue-400"></div>
            <div className="coloredBead bg-pink-400 "></div>
            <div className="coloredBead bg-green-400"></div>
            <div className="coloredBead bg-blue-400 "></div>
          </div>
          <div className="flex gap-5 justify-center items-center  flex-col">
            <p className="caption text-3xl text-gray-300 w-1/2 text-center mb-8"> 
              Missed a set? Come find it! A dedicated platform for 
              discovering live EDM sets from YouTube and SoundCloud—all in one place.
            </p>
            <Link href="/explore" className="ctaBtn"> Discover Sets </Link>
          </div>
        </section>

      <section id="about" className="bg-gray-900 py-20">
        <div className="w-2/3 mx-auto">
          <div className="text-center">
              <p className="text-gray-300"> ABOUT US </p>
              <h1 className="text-center text-5xl my-8 tracking-wide text-neonBlue"> All Your EDM Live Sets in One Place </h1>
          </div>
          <p className="caption text-2xl text-gray-300"> 
            Set Finder is a dedicated platform for discovering live EDM sets. We know how 
            frustrating it can be to track down sets scattered across different platforms. 
            With Set Finder, you can keep all your favorite sets in one place, making it easier 
            than ever to relive the music you love. Missed Lost Lands 2024 because your wallet 
            said no? No worries—find the set and experience the moment through the eyes of 
            someone who was there.
          </p>
        </div>
      </section>
        
        <section id="features" className="w-2/3 mx-auto "> 
          <div className="text-center">
            <p className="text-gray-300"> OUR FEATURES </p>
            <h2 className="text-center text-5xl my-8 tracking-wide text-neonBlue"> Explore, Save, and Share Your Favorite Sets </h2>
          </div>
            <div className="featureContainer flex gap-10">
              <article className="homeCard">
                <p className="text-2xl font-bold"> All in One Platform </p>
                <FaClipboardList className="featureIcon text-8xl"/>
                <p className="text-lg"> Search for uploaded sets from youtube and soundcloud all in one place </p>
              </article>
              <article className="homeCard">
                <p className="text-2xl font-bold"> Like & Save Sets </p>
                <FaHeart className="featureIcon text-8xl"/>
                <p className="text-lg"> Keep track of the sets you enjoy the most by liking and creating playlist </p>
              </article>
              <article className="homeCard">
                <p className="text-2xl font-bold"> Discover New Sets </p>
                <FaMusic className="featureIcon text-8xl"/>
                <p className="text-lg"> Explore new and trending EDM sets and expand your collection </p>
              </article>
            </div>
        </section>

        <section id="faq" className="bg-gray-900 py-20">
          <h3 className="text-5xl font-bold w-2/3 mx-auto text-neonBlue"> FAQ </h3>
          <ul className="mt-4 w-2/3 mx-auto">
            {faqs.map((faq, index) => (
              <li key={index} className="border-b py-4">
                <button 
                  onClick={() => toggleQuestion(index)} 
                  className="text-xl flex w-full justify-between"
                >
                  {faq.question}
                  {openQuestion === index ? (
                    <MdKeyboardArrowDown size={24} />
                  ) : (
                    <MdKeyboardArrowRight size={24} />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openQuestion === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="p-2 text-gray-300">{faq.answer}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center w-2/3 mx-auto">
          <p className="text-gray-300"> Get Started </p>
          <h4 className="text-5xl my-8 tracking-wide text-neonBlue"> All Your Favorite Sets, One Platform. Start Now! </h4>
          <button className="ctaBtn"> Explore Sets </button>
        </section>
    </main>
  );
}
