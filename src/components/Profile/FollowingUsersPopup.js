import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowingUsersListAction,
  getUserProfileAction,
  unfollowUserAction,
} from "../../redux/User/Action";
import { useNavigate } from "react-router-dom";

export const FollowingUsersPopup = (props) => {
  const { onClose, isOpen } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const unfollowHandler = (userId) => {
    const data = {
      token,
      userId,
    };
    dispatch(unfollowUserAction(data));
  };

  useEffect(() => {
    dispatch(getFollowingUsersListAction(token));
  }, [user?.unfollowUser]);

  const closeModal = () => {
    onClose();
    navigate(-1);
  };

  return (
    <div>
      <Modal
        size={"sm"}
        onClose={closeModal}
        isOpen={isOpen}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Following</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="relative">
            <hr className="absolute top-[-5px] left-[50%] w-[90%] translate-x-[-50%]" />
            {user?.followingUsersListByUsername?.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">{item?.username}</p>
                  <p className="text-sm">{item?.name}</p>
                </div>
                <Button
                  colorScheme="gray"
                  variant="solid"
                  onClick={() => unfollowHandler(item?.id)}
                >
                  Following
                </Button>
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
