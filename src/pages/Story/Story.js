import React, { useEffect } from "react";
import StoryViewer from "../../components/StoryComponents/StoryViewer";
import { useDispatch, useSelector } from "react-redux";
import { getStoryByUserId } from "../../redux/Story/Action";
import { useParams } from "react-router-dom";

// const story = [
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2023/05/31/19/04/clouds-8032075_1280.jpg",
//   },
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2023/05/27/08/59/eastern-grey-kangaroo-8021096_1280.jpg",
//   },
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2023/05/29/20/55/mountains-8027230_1280.jpg",
//   },
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2023/05/26/19/16/grass-8020116_1280.jpg",
//   },
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2023/06/01/18/56/flowers-8034139_1280.jpg",
//   },
//   {
//     image:
//       "https://cdn.pixabay.com/photo/2023/05/19/05/33/boats-8003723_1280.jpg",
//   },
// ];

const Story = () => {
  const dispatch = useDispatch();
  const { story } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const { userId } = useParams();

  useEffect(() => {
    const data = { token, userId };
    if (userId) {
      console.log("if ", userId);
      userId && dispatch(getStoryByUserId(data));
    }
  }, [userId]);

  console.log("picard story", story);

  return (
    <div>
      <StoryViewer stories={story?.userStories} />
      {/* <StoryViewer stories={story} /> */}
    </div>
  );
};

export default Story;
