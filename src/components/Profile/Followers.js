import React from "react";
import { FollowersPopup } from "./FollowersPopup";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Followers = ({ followersList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleOpenFollowingUsersModal = () => {
    navigate(`/followers`);
    onOpen();
  };

  return (
    <>
      <p onClick={handleOpenFollowingUsersModal} className="cursor-pointer">
        <span className="font-semibold mr-1">{followersList?.length || 0}</span>
        <span className="text-sm font-medium">Followers</span>
      </p>
      <FollowersPopup onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default Followers;
