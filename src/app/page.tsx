"use client"

import AOS from 'aos';
import 'aos/dist/aos.css';

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

import { IoIosSearch } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { CiHeadphones } from "react-icons/ci";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

import "../app/styles/home.css";

// First page that user sees 
export default function Home() {
  // const router = useRouter();
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

  useEffect(() =>{
    AOS.init({
      duration: 800,  // Default duration for all animations
      easing: 'ease-in-out',  // Default easing for all animations
      once: true,  
      mirror: false,  
    });
  })

  return (
    <main className="flex flex-col gap-48 mb-60">
      <section id="about" className="w-2/3 mx-auto mb-[10%]">
        <div data-aos="fade-in" data-aos-duration="1000">
          <h1 className="text-6xl text-center leading-tight"> <span className="purpleHighlight">Discover</span> and <span className="purpleHighlight">Save</span> Your Favorite Live DJ Sets All in <span className="purpleHighlight">One Place</span> </h1>
          <p className="caption text-center w-2/3 mx-auto"> 
            Easily find live DJ sets from across the web and save them all in one place.
            Organize your favorites and access them anytime. 
          </p>
        </div>
        
        <Link className="ctaBtn block mx-auto w-fit" href="/explore" data-aos="fade-in" data-aos-duration="1000"> Start Exploring </Link>
      </section>

      <section id="usage" className="w-2/3 mx-auto">
        <h2 className="text-4xl"> Easy to Use: </h2>
        <div className="flex justify-between gap-10 w-full">
          <span className="flex flex-col gap-5 bg-secondaryBg p-8 rounded-md w-1/3" data-aos="fade up" data-aos-duration="1000">
            <div className="flex justify-between">
              <div>
                <p className="pb-1"> 01 </p>
                <strong className="text-2xl tracking-wider"> Search </strong>
              </div>
              <IoIosSearch className="text-5xl text-primaryPurple bg-lightGray p-3 rounded-md gap-5"/>
            </div>
            <p className="caption"> Find a set that you want to relive or missed out on </p>
          </span>
          <span className="flex flex-col gap-5 bg-secondaryBg p-8 rounded-md w-1/3" data-aos="fade up" data-aos-duration="1000">
            <div className="flex justify-between">
              <div>
                <p className="pb-1"> 02 </p>
                <strong className="text-2xl tracking-wider"> Save </strong>
              </div>
              <IoHeartOutline className="text-5xl text-primaryPurple bg-lightGray p-3 rounded-md gap-5"/>
            </div>
            <p className="caption"> Like a set to instantly save it to your library for easy access </p>
          </span>
          <span className="flex flex-col gap-5 bg-secondaryBg p-8 rounded-md w-1/3" data-aos="fade up" data-aos-duration="1000">
            <div className="flex justify-between">
              <div>
                <p className="pb-1"> 03 </p>
                <strong className="text-2xl tracking-wider"> Listen </strong>
              </div>
              <CiHeadphones className="text-5xl text-primaryPurple bg-lightGray p-3 rounded-md gap-5"/>
            </div>
            <p className="caption"> Pick a set and listen on the platform where it was uploaded </p>
          </span>
        </div>
      </section>
        
        <section id="features" className="w-2/3 mx-auto flex justify-between items-center gap-20"> 
          <span className="w-1/2">
            <h3 className="text-4xl"> Make New Discoveries </h3>
            <p className="caption"> 
              Easily browse the latest DJ sets. Keeping up with current trending sets and
              finding new relases every week. 
            </p>
            <Link href="/explore" className="underline text-lg tracking-wide hover:opacity-80"> Explore Trending Sets </Link>
          </span>
          <Image src="/assets/raveImg1.jpg" alt="svdden death set" 
            className="rounded-lg" width={500} height={500}></Image>
        </section>

        <section className="w-2/3 mx-auto flex justify-between items-center gap-20">
          <Image src="/assets/raveImg2.jpg" alt="Hard Summer Stage"
            className="rounded-lg" width={500} height={500}></Image>
          <span className="w-1/2">
            <h4 className="text-4xl"> Find Sets Across Multiple Platforms </h4>
            <p className="caption py-2"> 
              Search and acess different dj sets from various platforms like 
              youtube and soundcloud.
            </p>
            <Link href="/explore" className="ctaBtn"> Find Sets </Link> 
          </span>
        </section>

        <section className="bg-secondaryBg">
          <div className="w-2/3 mx-auto py-20 flex flex-col items-center" data-aos="fade-up" data-aos-duration="1000">
            <h5 className="text-4xl"> Why <span className="purpleHighlight"> SetFinder? </span></h5>
            <p className="caption"> 
              Dj sets are scattered across different platforms. Setfinder makes it 
              easy to find, saave, and access them all from one convenient library.
            </p>
            <Link href="/explore" className="ctaBtn"> Get Started </Link>
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
