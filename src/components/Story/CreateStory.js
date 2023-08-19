import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { uploadToCloudinary } from "../../Config/Cloudinary";
import { FaPhotoVideo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BiPlus } from "react-icons/bi";
import { createStory } from "../../redux/Story/Action";

const CreateStory = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, post } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

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

  const handleCreateStory = () => {
    const data = {
      token,
      data: {
        image: imageUrl,
      },
    };
    dispatch(createStory(data));
    onClose();
  };

  return (
    <div className="mr-2">
      <div
        onClick={onOpen}
        className="relative flex items-center cursor-pointer w-full h-16"
      >
        <img className="w-full h-full" src={user?.currUser?.userImage} alt="" />
        <BiPlus className="text-3xl absolute left-[50%] translate-x-[-50%] z-10" />
      </div>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="relative">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="text-lg font-semibold">Create Story</div>
            <Button
              className="w-16 absolute top-2 right-2"
              onClick={handleCreateStory}
            >
              Add
            </Button>
          </div>
          <ModalBody>
            <div className="h-[50vh] flex items-center">
              <div className="w-full">
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
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateStory;
