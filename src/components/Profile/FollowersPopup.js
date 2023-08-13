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
  getFollowersListAction,
  getFollowingUsersListAction,
  getUserProfileAction,
  removeFollower,
  unfollowUserAction,
} from "../../redux/User/Action";

export const FollowersPopup = (props) => {
  const { onClose, isOpen } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  const removeFollowerHandler = (userId) => {
    const data = {
      token,
      userId,
    };
    dispatch(removeFollower(data));
  };

  useEffect(() => {
    dispatch(getFollowersListAction(token));
  }, [user?.followUser]);

  return (
    <div>
      <Modal
        size={"sm"}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Followers</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="relative space-y-2">
            <hr className="absolute top-[-5px] left-[50%] w-[90%] translate-x-[-50%]" />
            {user?.followersList?.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">{item?.username}</p>
                  <p className="text-sm">{item?.name}</p>
                </div>
                <Button
                  colorScheme="gray"
                  variant="solid"
                  onClick={() => removeFollowerHandler(item?.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
