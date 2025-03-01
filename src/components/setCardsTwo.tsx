import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ImYoutube, ImSoundcloud2 } from 'react-icons/im';
import { FaPlus } from "react-icons/fa6";

import { SetCardResults, SetData } from '@/types/setTypes';
import { useAuth } from "../app/utils/fbAuth";

import Modal from "@/components/modal";

import AOS from 'aos';
import 'aos/dist/aos.css';

import { removeLike, addLike, checkLike } from '@/app/api/likesAPI';

export const SetList: React.FC<SetCardResults> = ({ setResults, style }) => {
    const { user, loading: authLoading } = useAuth(); 
    const [likedSets, setLikedSets] = useState<{ [key: string]: boolean }>({});
    const [loggedInModal, setLoggedInModal] = useState<boolean>(false);
    const [playlistModal, setPlaylistModal] = useState<boolean>(false);

    const [hoverPlaylist, setHoverPlaylist] = useState<{hover: boolean, setId: string}>({
        hover: false, 
        setId: " "
    });

    useEffect(() =>{
    AOS.init({
        duration: 400,  
        easing: 'ease-in-out',  
        once: true,  
        mirror: false,  
    });
    })

    // Fetch likes for each set
    useEffect(() => {
        console.log("Auth Loading:", authLoading);
        console.log("User:", user);

        if (!user || setResults.length === 0) return;  // Ensure user is not null

        const fetchLikes = async () => {     
            const likesData: { [key: string]: boolean } = {}; // Store results

            // Fetch all likes concurrently using Promise.all
            const likePromises = setResults.map(async (set) => {
                const setId = (set.platforms[1]?.id ? `${set.platforms[0].id}@${set.platforms[1].id}` : set.platforms[0].id);
                const isLiked = await checkLike(setId, user.uid); 
                likesData[setId] = Boolean(isLiked);
            });

            await Promise.all(likePromises); // Wait for all promises to resolve
            setLikedSets(likesData); // Update state with fetched likes data
        };

        fetchLikes();
    
    }, [setResults, user]); 

    const handleLikeStatus = async (setId: string, status: boolean) => {
        if(localStorage.getItem("setFinderIsLogged") === "false"){
            setLoggedInModal(true);
            return;
        }

        if(user){
            if(status == true){
                // Updates the current set to true/false 
                // Then triggers the useeffect which will display which sets are liked or not
                setLikedSets((prev) => ({ ...prev, [setId]: false }));
                removeLike(setId, user.uid);
            }else{
                setLikedSets((prev) => ({ ...prev, [setId]: true }));
                console.log("we are liking a set", setId);
                addLike(setId, user.uid);
            }
        }
    };

    const hoveringPlaylist = (status: boolean, setId: string) =>{
        if(status == false){ // mouse leave
            setHoverPlaylist({ hover: status, setId: setId});
            console.log(hoverPlaylist);
        }else{ // mouse enter
            setHoverPlaylist({ hover: status, setId: setId});
            
        }
    }

    return(
        <div className={style}>
            <Modal title="You are not logged in" description="Please login to like a set" isOpen={loggedInModal} onClose={() =>{ setLoggedInModal(false) }}/>
            <Modal title="Your Playlists" description="Add set to your playlist" isOpen={ playlistModal } onClose={() =>{ setPlaylistModal(false) }}>
                <p> Content here </p>
            </Modal>
            {(setResults as SetData[]).length > 0 ? (
                (setResults as SetData[]).map((set: SetData, index: number) => (
                <div
                    key={index}
                    className="setCard bg-secondaryBg rounded-lg shadow-xl p-5 flex flex-col gap-4 justify-between"
                >
                    <div>
                        <img
                            // img not found img if none of the platforms have images
                            src={ set.platforms?.[0]?.thumbnail ?? set.platforms?.[1]?.thumbnail ?? "/assets/imageNotFound.png"}
                            alt="Platform Thumbnail"
                            className="w-full"
                        />
                        <p className="font-bold text-xl mt-5 tracking-wider">{set.title}</p>
                    </div>
                    
                    <div>
                        {set.platforms.map((platform, pIndex) => (
                            <div key={pIndex} className="text-lg hover:underline">
                                <a
                                    href={platform.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3"
                                >
                                    {platform.platform === 'yt' ? (
                                        <ImYoutube className="text-2xl text-red-500 bg-white p-[3px] rounded"/>
                                    ) : (
                                        <ImSoundcloud2 className="text-2xl text-orange-500 bg-white rounded"/>
                                    )}
                                    <p className="tracking-wide font-semibold text-captionColor">Posted: {platform.publishedDate}</p>
                                </a>
                            </div>
                        ))}
                        <div className="flex justify-between mt-6 gap-3 items-center">
                            <button className="flex items-center gap-1 bg-lightGray rounded p-2 px-3"
                                onMouseEnter={() =>{ hoveringPlaylist(true, set.platforms[1]?.id ? `${set.platforms[0].id}@${set.platforms[1].id}` : set.platforms[0].id); }}
                                onMouseLeave={() =>{ hoveringPlaylist(false, set.platforms[1]?.id ? `${set.platforms[0].id}@${set.platforms[1].id}` : set.platforms[0].id); }}
                                onClick={() =>{ /* open up modal for playlist input  */ console.log(hoverPlaylist.setId) }}
                            >
                                <FaPlus className='text-2xl'/>
                                {/* slide in on hover */}
                                { hoverPlaylist.hover ? (
                                    <p className='tracking-wide text-[18px] font-semibold' data-aos="slide-right"
                                    > Add to Playlist </p>
                                ) : (
                                    <div></div>
                                )}
                            </button>

                            {likedSets[(set.platforms[1]?.id ? `${set.platforms[0].id}@${set.platforms[1].id}` : set.platforms[0].id)] ? (
                                <FaHeart
                                    className="text-3xl cursor-pointer text-pink-500"
                                    onClick={() => handleLikeStatus((set.platforms[1]?.id ? `${set.platforms[0].id}@${set.platforms[1].id}` : set.platforms[0].id), true)}
                                />
                                ) : (
                                <FaRegHeart
                                    className="text-3xl cursor-pointer hover:text-pink-500"
                                    onClick={() => handleLikeStatus((set.platforms[1]?.id ? `${set.platforms[0].id}@${set.platforms[1].id}` : set.platforms[0].id), false)}
                                />
                            )}
                        </div>
                    </div>
                </div>
                ))
            ) : (
                <p className="caption">Loading Results...</p>
            )}
        </div>
    )
};
