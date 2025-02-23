"use client"

import Link from "next/link";

import { useState } from "react";

import { FaClipboardList, FaHeart, FaMusic } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { CiHeadphones } from "react-icons/ci";
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
    <main className="flex flex-col gap-64 mb-60">
      <section className="w-2/3 mx-auto">
        <h1 className="text-5xl text-center leading-tight"> <span className="purpleHighlight">Discover</span> and <span className="purpleHighlight">Save</span> Your Favorite Live DJ Sets All in <span className="purpleHighlight">One Place</span> </h1>
        <p className="caption text-center w-2/3 mx-auto"> 
          Easily find live DJ sets from across the web and save them all in one place.
          Organize your favorites and access them anytime. 
        </p>
        <button className="ctaBtn block mx-auto"> Start Exploring </button>
      </section>

      <section id="usage" className="w-2/3 mx-auto">
        <h2 className="text-4xl"> Easy to Use: </h2>
        <div className="flex justify-between gap-10 w-full">
          <span className="flex flex-col gap-5 bg-secondaryBg p-8 rounded-md w-1/3">
            <div className="flex justify-between">
              <div>
                <p className="pb-1"> 01 </p>
                <strong className="text-2xl"> Search </strong>
              </div>
              <IoIosSearch className="text-5xl text-primaryPurple bg-lightGray p-3 rounded-md gap-5"/>
            </div>
            <p className="caption"> Find a set that you want to relive or missed out on </p>
          </span>
          <span className="flex flex-col gap-5 bg-secondaryBg p-8 rounded-md w-1/3">
            <div className="flex justify-between">
              <div>
                <p className="pb-1"> 02 </p>
                <strong className="text-2xl"> Save </strong>
              </div>
              <IoHeartOutline className="text-5xl text-primaryPurple bg-lightGray p-3 rounded-md gap-5"/>
            </div>
            <p className="caption"> Like a set to instantly save it to your library for easy access </p>
          </span>
          <span className="flex flex-col gap-5 bg-secondaryBg p-8 rounded-md w-1/3">
            <div className="flex justify-between">
              <div>
                <p className="pb-1"> 03 </p>
                <strong className="text-2xl"> Listen </strong>
              </div>
              <CiHeadphones className="text-5xl text-primaryPurple bg-lightGray p-3 rounded-md gap-5"/>
            </div>
            <p className="caption"> Pick a set and listen on the platform where it was uploaded </p>
          </span>
        </div>
      </section>
        
        <section className="w-2/3 mx-auto flex justify-between"> 
          <span className="w-1/2">
            <h3 className="text-4xl"> Make New Discoveries </h3>
            <p className="caption"> 
              Easily browse the latest DJ sets. Keeping up with what's trending and
              finding new relases every week. 
            </p>
            <a href="" className="underline text-lg tracking-wide hover:opacity-80"> Explore Trending Sets </a>
          </span>
          <img src="" alt="rave"></img>
        </section>

        <section className="w-2/3 mx-auto flex justify-between">
          <img src="" alt="rave"></img>
          <span className="w-1/2">
            <h4 className="text-4xl"> Find Sets Across Multiple Platforms </h4>
            <p className="caption"> 
              Search and acess different dj sets from various platforms like 
              youtube and soundcloud.
            </p>
            <button className="ctaBtn"> Find Sets </button> 
          </span>
        </section>

        <section className="bg-secondaryBg">
          <div className="w-2/3 mx-auto py-20 flex flex-col items-center">
            <h5 className="text-4xl"> Why <span className="purpleHighlight"> SetFinder? </span></h5>
            <p className="caption"> 
              Dj sets are scattered across different platforms. Setfinder makes it 
              easy to find, saave, and access them all from one convenient library.
            </p>
            <button className="ctaBtn"> Get Started </button>
          </div>
          
        </section>

        <section id="faq" className="py-20 w-2/3 mx-auto">
          <h6 className="text-4xl"> FAQ </h6>
          <ul>
            {faqs.map((faq, index) => (
              <li key={index} className="border-b py-4">
                <button 
                  onClick={() => toggleQuestion(index)} 
                  className="text-xl flex w-full justify-between text-left font-semibold tracking-wide"
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
                  <p className="text-captionColor font-semibold p-2 tracking-wider">{faq.answer}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
    </main>
  );
}
