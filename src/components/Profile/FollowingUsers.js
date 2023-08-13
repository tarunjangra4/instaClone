import React from "react";
import { FollowingUsersPopup } from "./FollowingUsersPopup";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FollowingUsers = ({ followingUsersList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleOpenFollowingUsersModal = () => {
    navigate(`/following`);
    onOpen();
  };

  return (
    <>
      <p onClick={handleOpenFollowingUsersModal} className="cursor-pointer">
        <span className="font-semibold mr-1">
          {followingUsersList?.length || 0}
        </span>
        <span className="text-sm font-medium">Following</span>
      </p>
      <FollowingUsersPopup onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default FollowingUsers;
