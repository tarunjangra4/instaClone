import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfileAction,
  getUserProfileAction,
} from "../../redux/User/Action";
import { useToast } from "@chakra-ui/react";
import ChangeProfilePicModal from "./ChangeProfilePicModal";
import { uploadToCloudinary } from "../../Config/Cloudinary";

const NewEditProfile = () => {
  const { user } = useSelector((store) => store);
  const toast = useToast();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);

  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    gender: "",
    website: "",
    private: false,
  });

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  useEffect(() => {
    console.log("req user ", user);
    const newValue = {};

    for (let item in initialValues) {
      if (user.currUser && user.currUser[item]) {
        newValue[item] = user.currUser[item];
      }
    }

    console.log("new value ", newValue);

    formik.setValues(newValue);
  }, [user.currUser]);

  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit: (values) => {
      const data = {
        token,
        body: { ...values, id: user?.currUser?.id },
      };
      dispatch(editUserProfileAction(data));
      toast({
        title: "Profile Updated...",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleProfileImageChange = async (event) => {
    const selectedFile = event.target.files[0];
    const image = await uploadToCloudinary(selectedFile);
    setImageFile(image);
    const data = {
      token,
      body: { userImage: image, id: user?.currUser?.id },
    };
    dispatch(editUserProfileAction(data));
    onClose();
  };

  return (
    <div className="w-full mt-20 lg:mx-32 border rounded-md p-10">
      <div className="flex pb-7">
        <div className="w-[16%]">
          <img
            className="w-8 h-8 rounded-full"
            alt=""
            src={
              imageFile ||
              user?.currUser?.userImage ||
              "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
            }
          />
        </div>
        <div className="text-left">
          <p>{user?.currUser?.username}</p>
          <p
            onClick={onOpen}
            className="font-bold text-blue-800 cursor-pointer"
          >
            Change Profile Photo
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="6">
          <FormControl className="flex" id="name">
            <FormLabel className="w-[16%]">Name</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Name"
                className="w-full"
                type="text"
                {...formik.getFieldProps("name")}
              />
              <FormHelperText className="text-xs">
                {/* Help people discover */}
              </FormHelperText>
              <FormHelperText className="text-xs">
                {/* Help people discover */}
              </FormHelperText>
            </div>
          </FormControl>
          <FormControl className="flex" id="username">
            <FormLabel className="w-[16%]">Username</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Username"
                className="w-full"
                type="text"
                {...formik.getFieldProps("username")}
              />
              {/* <FormHelperText className="text-xs">
                Editing your links is only
              </FormHelperText> */}
            </div>
          </FormControl>
          <FormControl className="flex" id="bio">
            <FormLabel className="w-[16%]">Bio</FormLabel>
            <div className="w-full">
              <Textarea
                placeholder="Bio"
                className="w-full"
                type="text"
                {...formik.getFieldProps("bio")}
              />
            </div>
          </FormControl>
          <div className="py-10">
            <p className="font-bold text-sm">Personal information</p>
            {/* <p className="text-xs">
                Provide your Personal information, even if the
            </p> */}
          </div>
          <FormControl className="flex" id="email">
            <FormLabel className="w-[16%]">Email address</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Email"
                className="w-full"
                type="tel"
                {...formik.getFieldProps("email")}
              />
            </div>
          </FormControl>
          <FormControl className="flex" id="email">
            <FormLabel className="w-[16%]">Phone number</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Phone"
                className="w-full"
                type="tel"
                {...formik.getFieldProps("mobile")}
              />
            </div>
          </FormControl>
          <FormControl className="flex" id="gender">
            <FormLabel className="w-[16%]">Gender</FormLabel>
            <div className="w-full">
              <Input
                placeholder="Gender"
                className="w-full"
                type="text"
                {...formik.getFieldProps("gender")}
              />
            </div>
          </FormControl>
          <div>
            <Button className="blue" type="submit">
              Submit
            </Button>
          </div>
        </Stack>
      </form>
      <ChangeProfilePicModal
        handleProfileImageChange={handleProfileImageChange}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default NewEditProfile;
