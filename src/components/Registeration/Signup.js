import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SignupAction } from "../../redux/Auth/action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters.")
    .required("Required"),
});

const Signup = () => {
  const initialValues = {
    email: "",
    username: "",
    name: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  //   const token = localStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    if (auth?.signup?.username) {
      navigate("/login");
      toast({
        title: `Account created. ${auth.signup?.username}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [auth.signup]);

  const handleSubmit = (values, actions) => {
    dispatch(SignupAction(values));
    actions.setSubmitting(false);
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div>
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
                        placeholder="Password"
                      ></Input>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <p className="text-center text-sm">
                  People who use our service may have uploaded your contact
                  information to Instagram. Learn more
                </p>
                <p className="text-center text-sm">
                  By signing up, you agree to our Terms, Privacy Policy and
                  Cookies Policy.
                </p>
                <Button
                  className="w-full"
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                  isLoading={formikProps.isSubmitting}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
      <div className="border w-full border-slate-300 mt-5">
        <p className="text-center py-2 text-sm">
          If You Have Account Already{" "}
          <span
            onClick={handleNavigate}
            className="ml-2 text-blue-700 cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
