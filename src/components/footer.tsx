import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer(){
    return(
        <footer className="bg-gray-900 w-full p-32 mt-40">
            <div className="mx-auto flex gap-32 justify-between mb-24">
                <div className="flex gap-32">
                    <ul className="flex flex-col gap-1">
                        <li className="underline text-xl"> Company </li>
                        <li> About Us </li>
                        <li> Privacy </li>
                    </ul>
                    
                    <ul className="flex flex-col gap-1">
                        <li className="underline text-xl"> Contact </li>
                        <li> SetFinder@gmail.com </li>
                        <li> 999-999-9999 </li>
                    </ul>
                </div>
                

                <ul className="flex flex-col gap-5 justify-evenly text-xl">
                    <a href=""><FaGithub /></a>
                    <a href=""><FaInstagram /></a>
                    <a href=""><FaLinkedin /></a>
                </ul>
            </div>
            <div className="flex justify-between">
                <strong> Copyright @ Pauleena Phan 2025. All Rights Reserved </strong>
                <p> Powered by Netlify </p>
            </div>
        </footer>
    )
}