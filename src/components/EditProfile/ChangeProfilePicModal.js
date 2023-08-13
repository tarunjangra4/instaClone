import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const ChangeProfilePicModal = ({
  isOpen,
  onOpen,
  onClose,
  handleProfileImageChange,
}) => {
  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Modal Title</ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center">
              <label
                for="profileImage"
                className="w-full font-bold py-3 text-blue-600 text-center cursor-pointer text-xs"
              >
                Upload Photo
              </label>
              <input
                onChange={handleProfileImageChange}
                type="file"
                id="profileImage"
                name="profileImage"
              />
            </div>
            <hr />
            <p className="font-bold py-3 text-red-600 text-center">
              Remove Photo
            </p>
            <p className="py-3 text-center">Cancel</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ChangeProfilePicModal;
