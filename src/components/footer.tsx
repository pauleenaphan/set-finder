import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import Link from "next/link";

import { IoMdMail } from "react-icons/io";

export function Footer(){
    return(
        <footer className="bg-gray-900 w-full p-32 mt-40">
            <div className="mx-auto flex gap-32 justify-between mb-24">
                <div className="flex gap-32">
                    <ul className="flex flex-col gap-1">
                        <li className="underline text-xl"> Company </li>
                        <Link href="/#about"> About Us </Link>
                        <Link href="/#features"> Features </Link>
                        <Link href="/#faq"> FAQ </Link>
                        <a href="https://ko-fi.com/pauleenaphan" target="_blank"> Support </a>
                        {/* <li> Privacy </li> */}
                    </ul>
                    
                    <ul className="flex flex-col gap-1">
                        <li className="underline text-xl"> Contact </li>
                        <div className="flex items-center gap-1">
                            <IoMdMail />
                            <li> EdmSetFinder@gmail.com </li>
                        </div>
                        
                    </ul>
                </div>
                

                <ul className="flex flex-col gap-5 justify-evenly text-xl">
                    <a href="" target="_blank"><FaGithub /></a>
                    <a href="" target="_blank"><FaInstagram /></a>
                    <a href="" target="_blank"><FaLinkedin /></a>
                </ul>
            </div>
            <div className="flex justify-between">
                <p> Copyright @ Pauleena Phan 2025. All Rights Reserved </p>
                <p> Powered by Netlify </p>
            </div>
        </footer>
    )
}