import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import "./CreatePostModal.css";
import { GoLocation } from "react-icons/go";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../redux/Post/Action";
import { uploadToCloudinary } from "../../Config/Cloudinary";

const CreatePostModal = ({ onClose, isOpen }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const token = localStorage.getItem("token");

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropedFile = e.dataTransfer.file[0];
    if (
      dropedFile.type.startsWith("image/") ||
      dropedFile.type.startsWith("video/")
    ) {
      setFile(dropedFile);
    }
  };

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      const url = await uploadToCloudinary(file);
      setImageUrl(url);

      setFile(file);
    } else {
      setFile(null);
      alert("Please select an image or video.");
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleCreatePost = () => {
    const data = {
      token,
      data: {
        caption,
        location,
        image: imageUrl,
      },
    };
    dispatch(createPostAction(data));
    onClose();
  };

  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <div className="flex items-center justify-between py-1 px-10">
            <p>Create New Post</p>
            <Button
              className=""
              variant={"ghost"}
              size={"sm"}
              colorScheme="blue"
              onClick={handleCreatePost}
            >
              Share
            </Button>
          </div>
          <hr />
          <ModalBody>
            <div className="h-[70vh] flex justify-between pb-5">
              <div className="w-[50%]">
                {!file && (
                  <div
                    className="drag-drop h-full"
                    onDrop={(e) => handleDrop(e)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <div>
                      <FaPhotoVideo className="text-4xl" />
                      <p>Drag Photos or videos here</p>
                    </div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Select from Device
                    </label>
                    <input
                      type="file"
                      className="fileInput"
                      id="file-upload"
                      accept="image/*, video/*"
                      onChange={handleOnChange}
                    />
                  </div>
                )}
                {file && (
                  <img
                    className="max-h-full"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                )}
              </div>
              <div className="w-[1px] border h-full"></div>
              <div className="w-[50%]">
                <div className="flex items-center px-2">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://cdn.pixabay.com/photo/2023/05/23/15/26/bengal-cat-8012976_1280.jpg"
                    alt=""
                  />
                  <p className="font-semibold ml-4">username</p>
                </div>
                <div className="px-2">
                  <textarea
                    className="captionInput"
                    placeholder="Write a caption"
                    name="caption"
                    rows="8"
                    onChange={handleCaptionChange}
                  ></textarea>
                </div>
                <div className="flex justify-between px-2">
                  <GrEmoji />
                  <p className="opacity-50">{caption.length} /2,200</p>
                </div>
                <hr />
                <div className="p-2 flex justify-between items-center">
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    className="locationInput"
                    type="text"
                    name="location"
                    placeholder="Add location"
                  />
                  <GoLocation />
                </div>
                <hr />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
