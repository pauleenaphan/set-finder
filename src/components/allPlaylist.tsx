import { AllOfUserPlaylist } from "@/types/playlistTypes";
import { useAuth } from "../app/utils/fbAuth";
import { getAllUserPlaylist } from "@/app/api/playlistAPI";
import { useState } from "react";
import { Playlist } from "@/types/playlistTypes";
import { SetData } from "@/types/setTypes";
import Modal from "./modal";

export const UsersPlaylists: React.FC<AllOfUserPlaylist> = ({ listOfPlaylist }) =>{
    const { user } = useAuth();
    const [playlistModal, setPlaylistModal] = useState(false);
    const [currPlaylist, setCurrPlaylist] = useState<Playlist>();

    return(
        <div>
            <Modal title={currPlaylist?.name} description={currPlaylist?.description} isOpen={ playlistModal } 
                onClose={() =>{ setPlaylistModal(false) }}
            >
                <p> Created: {currPlaylist?.dateCreated} </p>
                <section>
                    {currPlaylist?.tags.map((tag: string, index: number) =>(
                        <div key={index}>
                            <p> {tag} </p>
                        </div>
                    ))}
                </section>
                <section>
                    {currPlaylist?.listOfSets?.map((set: SetData, index: number) =>(
                        <div key={index}>
                            
                        </div>
                    ))}
                </section>

            </Modal>
            <section>
                {listOfPlaylist.length > 0 ? (
                    listOfPlaylist.map((playlist: Playlist, index: number) => (
                        <div key={index} onClick={() =>{ 
                                setPlaylistModal(true);
                                setCurrPlaylist(playlist);
                            }}>
                            <p>{playlist.name}</p> 
                        </div>
                    ))
                ) : (
                    <p> Loading Playlist... </p>
                )}
            </section>
            

        </div>
    )
}