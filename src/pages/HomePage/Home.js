import React from "react";
import StoryComponent from "../../components/Story/StoryComponent";
import HomeRight from "../../components/HomeRight/HomeRight";
import PostCard from "../../components/Posts/PostCard";
import CreatePostModal from "../../components/Posts/CreatePostModal";

const Home = () => {
  return (
    <div>
      <div className="flex mt-10">
        <div className="w-[60%] pl-44">
          <div className="story flex gap-3 border p-4 overflow-auto">
            {[1, 2, 1, 1, 1, 1].map((item, index) => (
              <StoryComponent />
            ))}
          </div>
          <div className="space-y-10 w-full mt-10">
            {[1, 1, 1, 1].map((item, index) => (
              <PostCard />
            ))}
          </div>
        </div>
        <div className="w-full h-full px-10">
          <HomeRight />
        </div>
      </div>
      <CreatePostModal />
    </div>
  );
};

export default Home;
