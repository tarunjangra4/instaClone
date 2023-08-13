import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfileAction,
  getUserProfileAction,
} from "../../redux/User/Action";
import ChangeProfilePic from "./ChangeProfilePicModal";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters.")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return value === this.resolve(Yup.ref("password"));
    }),
});

const EditProfile = () => {
  const { user } = useSelector((store) => store);

  const initialValues = {
    email: user?.currUser?.email,
    username: user?.currUser?.username,
    name: user?.currUser?.name,
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, []);

  const handleSubmit = (values, actions) => {
    const data = {
      body: { ...values, id: user?.currUser?.id },
      token,
    };
    dispatch(editUserProfileAction(data));
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (user?.updatedUser?.username) {
      toast({
        title: `Profile updated. ${user?.updatedUser?.username}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [user?.updatedUser]);

  return (
    <div className="py-32 w-[500px]">
      <div className="border">
        <Box
          p={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <img src="https://i.imgur.com/zqpwkLQ.png" alt="" className="mb-5" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form className="space-y-5">
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="email"
                        placeholder="Mobile Number or Email"
                      ></Input>
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="username"
                        placeholder="Username"
                      ></Input>
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="name"
                        placeholder="Full Name"
                      ></Input>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="password"
                        placeholder="password"
                      ></Input>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="confirmPassword">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.confirmPassword &&
                        form.touched.confirmPassword
                      }
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="confirmPassword"
                        placeholder="Confirm Password"
                      ></Input>
                      <FormErrorMessage>
                        {form.errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  className="w-full"
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                  isLoading={formikProps.isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
      {/* <ChangeProfilePic */}
    </div>
  );
};

export default EditProfile;
