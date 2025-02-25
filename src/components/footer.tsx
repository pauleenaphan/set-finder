import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import Link from "next/link";

import { IoMdMail } from "react-icons/io";

import "../app/styles/footer.css";

export function Footer(){
    return(
        <footer className="bg-secondaryBg w-full p-32 mt-40 font-medium tracking-wide">
            <div className="mx-auto flex gap-32 justify-between mb-24 flex-wrap">
                <div className="linkHeadList flex gap-32 flex-wrap">
                    <ul className="flex flex-col gap-1">
                        <li className="underline text-xl font-semibold"> Company </li>
                        <Link href="/#about"> About Us </Link>
                        <Link href="/#usage"> Usage </Link>
                        <Link href="/#features"> Features </Link>
                        <Link href="/#faq"> FAQ </Link>
                        <a href="https://ko-fi.com/pauleenaphan" target="_blank"> Support </a>
                        {/* <li> Privacy </li> */}
                    </ul>
                    
                    <ul className="flex flex-col gap-1">
                        <li className="underline text-xl font-semibold"> Contact </li>
                        <div className="flex items-center gap-1">
                            <IoMdMail />
                            <li> EdmSetFinder@gmail.com </li>
                        </div>
                        
                    </ul>
                </div>
                

                <ul className="footerSocials flex flex-col gap-5 justify-evenly text-xl">
                    <a href="" target="_blank"><FaGithub /></a>
                    <a href="" target="_blank"><FaInstagram /></a>
                    <a href="" target="_blank"><FaLinkedin /></a>
                </ul>
            </div>
            <div className="flex justify-between flex-wrap gap-10">
                <p> Copyright @ Pauleena Phan 2025. All Rights Reserved </p>
                <p> Powered by Netlify </p>
            </div>
        </footer>
    )
}