import { useState } from "react";

import { Playlist } from "@/types/playlistTypes";
import { createPlaylist } from "@/app/api/playlistAPI";
import { genres } from "@/app/data/setData";

export const NewPlaylistForm: React.FC<{ userId: string }> = ({ userId }) => {
    
    const [newPlaylistVals, setNewPlaylistVals] = useState<Playlist>({
        name: "", description: "", tags: []
    })

    const handleNewPlaylistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
    
        if(type === "checkbox"){
            // Handle checkbox changes (tags)
            setNewPlaylistVals((prevState) => {
                let newTags;
                if(checked){
                    newTags = [...prevState.tags, value];
                }else{
                    newTags = prevState.tags.filter((tag) => tag !== value);
                }
                return{ ...prevState, tags: newTags };
            });
        }else{
            // Handle input changes (name or description)
            setNewPlaylistVals((prevState) => ({
                ...prevState,
                [name]: value, // Update the field (either name or description)
            }));
        }
    };
    
    return(
        <form className="flex flex-col gap-8"
            onSubmit={(e) =>{ 
            e.preventDefault();
                createPlaylist(userId, newPlaylistVals.name, newPlaylistVals.description, newPlaylistVals.tags)
        
        }}>
            <div className="inputContainer">
                <label className="text-left"> Name: </label> 
                <input type="text" className="inputField" required name="name" onChange={handleNewPlaylistChange} placeholder="Top Trap Sets"/>
            </div>
            <div className="inputContainer">
                <label className="text-left"> Description: </label>
                <input type="text" className="inputField" required name="description" onChange={handleNewPlaylistChange} placeholder="My favorite trap sets from 2024"/>
            </div>
            <div className="">
                <label className="text-left"> Tags: </label>
                {genres.map((genre) => (
                    <label key={genre}>
                        <input type="checkbox" value={genre.toLowerCase().replace(/\s+/g, "")} onChange={handleNewPlaylistChange} name="checkbox"/>
                        {genre}
                    </label>
                ))}
            </div>
            <button type="submit"> Create Playlist </button>
        </form>
    )
};