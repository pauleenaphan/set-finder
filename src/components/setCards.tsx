import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ImYoutube, ImSoundcloud2 } from 'react-icons/im';
import { SetData, UserLikesParam, SetListProps } from '@/types/setTypes';

import "../app/styles/setCards.css";

const SetList: React.FC<SetListProps> = ({ status, setResults, likedSets, handleLikeStatus, style }) => {
  return (
    <div className={`my-6 ${style}`}>
      {status === 'searchResults' ? (
        // TypeScript now understands that setResults is SetData[] when status is "searchResults"
        (setResults as SetData[]).length > 0 ? (
          (setResults as SetData[]).map((set: SetData, index: number) => (
            <div
              key={index}
              className="setCard bg-secondaryBg rounded-lg shadow-xl rounded-lg w-[32%] flex flex-col gap-5 p-5 justify-between"
            >
              <div>
                <img
                  src={set.platforms[0].thumbnail ? set.platforms[0].thumbnail : set.platforms[1].thumbnail}
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
                <div className="flex justify-end">
                  {likedSets[set.platforms[0].id] ? (
                    <FaHeart
                      className="text-3xl cursor-pointer text-pink-500"
                      onClick={() => handleLikeStatus(set.platforms[0].id, true)}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-3xl cursor-pointer hover:text-pink-500"
                      onClick={() => handleLikeStatus(set.platforms[0].id, false)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading Results...</p>
        )
      ) : (
        // When status is not 'searchResults', it's UserLikesParam[]
        (setResults as UserLikesParam[]).length > 0 ? (
          (setResults as UserLikesParam[]).map((set: UserLikesParam, index: number) => (
            <div
              key={index}
              className="setCard bg-secondaryBg rounded-lg shadow-xl w-[32%] flex flex-col gap-5 p-5 justify-between"
            >
              <div>
                <img
                  src={set.thumbnail}
                  alt="Platform Thumbnail"
                  className="w-full"
                />
                <p className="font-bold text-xl mt-5 tracking-wider">{set.title}</p>
              </div>
              
              <div>
                <div className="text-lg hover:underline">
                  <a
                    href={set.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    {set.platform === 'yt' ? (
                      <ImYoutube className="text-3xl text-red-500 p-[3px] bg-white rounded"/>
                    ) : (
                      <ImSoundcloud2 className="text-2xl text-orange-500 bg-white rounded"/>
                    )}
                    <p className="tracking-wide font-semibold text-captionColor">Posted: {set.publishedDate}</p>
                  </a>
                </div>
                <div className="flex justify-end">
                  {likedSets[set.id] ? (
                    <FaHeart
                      className="text-3xl cursor-pointer text-pink-500"
                      onClick={() => handleLikeStatus(set.id, true)}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-3xl cursor-pointer hover:text-pink-500"
                      onClick={() => handleLikeStatus(set.id, false)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading Results...</p>
        )
      )}
    </div>
  );
};

export default SetList;
