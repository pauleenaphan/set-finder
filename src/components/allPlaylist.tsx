import { AllOfUserPlaylist } from "@/types/playlistTypes";
import { useAuth } from "../app/utils/fbAuth";
import { getAllUserPlaylist } from "@/app/api/playlistAPI";
import { useState } from "react";
import { Playlist } from "@/types/playlistTypes";
import Modal from "./modal";

export const UsersPlaylists: React.FC<AllOfUserPlaylist> = ({ listOfPlaylist }) =>{
    const { user } = useAuth();
    const [playlistModal, setPlaylistModal] = useState(false);

    return(
        <div>
            {listOfPlaylist.length > 0 ? (
                listOfPlaylist.map((playlist: Playlist, index: number) => (
                    <div key={index} onClick={() =>{ setPlaylistModal(true) }}>
                        <p>{playlist.name}</p> 
                    </div>
                ))
            ) : (
                <p> Loading Playlist... </p>
            )}

        </div>
    )
}