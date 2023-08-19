import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Progressbar from "./Progressbar";
import { useNavigate } from "react-router-dom";

const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: content;
`;

const StoryViewer = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  const handleNextStory = () => {
    if (currentStoryIndex < stories?.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else if (currentStoryIndex === stories?.length - 1) {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextStory();
      if (activeIndex >= stories?.length - 1) {
        // break the story viewer loop
        clearInterval(interval);
        navigate("/");
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [currentStoryIndex]);

  return (
    <div className="relative w-full">
      <StoryViewerContainer>
        <StoryImage src={stories?.[currentStoryIndex]?.image} />
        <div className="absolute top-0 flex w-full">
          {stories?.map((item, index) => (
            <Progressbar
              duration={2000}
              index={index}
              key={index}
              activeIndex={currentStoryIndex}
              // activeIndex={activeIndex}
            />
          ))}
        </div>
      </StoryViewerContainer>
    </div>
  );
};

export default StoryViewer;
