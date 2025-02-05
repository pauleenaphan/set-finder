import Image from "next/image";

import Link from "next/link";

import { FaClipboardList, FaHeart, FaMusic } from "react-icons/fa";

import "../app/styles/home.css";

// First page that user sees 
export default function Home() {
  return (
    <main className="flex flex-col gap-60 mb-60">
        <section className="mt-32">
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
            <div className="letterBead text-neonPink "> S </div>
            <div className="letterBead text-neonBlue"> E </div>
            <div className="letterBead text-neonGreen"> T </div>
            <div className="text-5xl"> - </div>
            <div className="letterBead text-neonOrange"> F </div>
            <div className="letterBead text-neonBlue"> I </div>
            <div className="letterBead text-neonPurple"> N </div>
            <div className="letterBead text-neonPink"> D </div>
            <div className="letterBead text-neonGreen"> E </div>
            <div className="letterBead text-neonOrange"> R </div>
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
          <div className="flex gap-5 justify-center items-center">
            <p className="text-3xl"> Missed a set? Come find it! </p>
            <Link href="/explore"
              className="ctaBtn"
            > Discover Sets </Link>
          </div>
        </section>

        <section className="w-2/3 mx-auto">
          <h1 className="text-center text-5xl mb-8 tracking-wider text-neonBlue"> ABOUT US </h1>
          <p className="text-2xl"> 
            Set Finder is a dedicated platform for discovering live EDM sets. We know how 
            frustrating it can be to track down sets scattered across different platforms. 
            With Set Finder, you can keep all your favorite sets in one place, making it easier 
            than ever to relive the music you love. Missed Lost Lands 2024 because your wallet 
            said no? No worries—find the set and experience the moment through the eyes of 
            someone who was there.
          </p>
        </section>

        <section className="w-2/3 mx-auto"> 
          <h2 className="text-center text-5xl mb-8 tracking-wider text-neonBlue"> FEATURES </h2>
          <div className="flex gap-10">
            <article className="homeCard">
              <p className="text-2xl font-bold"> Create Playlist </p>
              <FaClipboardList className="text-8xl"/>
              <p className="text-lg"> Save all of your sets into one playlist </p>
            </article>
            <article className="homeCard">
              <p className="text-2xl font-bold"> Like & Save Sets </p>
              <FaHeart className="text-8xl"/>
              <p className="text-lg"> Keep track of the sets you enjoy the most </p>
            </article>
            <article className="homeCard">
              <p className="text-2xl font-bold"> Discover New Sets </p>
              <FaMusic className="text-8xl"/>
              <p className="text-lg"> Explore new EDM sets and expand your collection </p>
            </article>
          </div>
        </section>
    </main>
  );
}
