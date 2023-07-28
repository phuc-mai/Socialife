import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import * as yup from "yup";
import { setLogin } from "../../state/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    // .min(4, "Password must be at least 4 characters")
    // .max(30, 'Password must not exceed 30 characters')
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    //   "Password must contain at least one letter, one number, and one special character (@$!%*#?&)"
    // )
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    // .min(4, "Password must be at least 4 characters")
    // .max(30, 'Password must not exceed 30 characters')
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    //   "Password must contain at least one letter, one number, and one special character (@$!%*#?&)"
    // )
    .required("Required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (values, onSubmitProps) => {
    // Create a new FormData object to hold the form data, including the image file
    const formData = new FormData();
    // Loop through the values object and append each value to the FormData object
    for (let value in values) {
      formData.append(value, values[value]);
    }
    // Append the 'picture.name' property as 'picturePath' to the FormData object
    formData.append("picturePath", values.picture.name);

    // Send a POST request to the server API with the form data
    const savedUserResponse = await fetch(
      "http://localhost:3003/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );

    // Parse the response data as JSON
    const savedUser = await savedUserResponse.json();

    // Reset the form using onSubmitProps.resetForm()
    onSubmitProps.resetForm();

    // If the user was successfully saved, set the page type to "login"
    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    // Send a POST request to the server API with the login credentials in the request body
    const loggedInResponse = await fetch("http://localhost:3003/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    // Parse the response data as JSON
    const loggedIn = await loggedInResponse.json();

    // Reset the form using onSubmitProps.resetForm()
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap="30px"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  variant="outlined"
                  sx={{ gridColumn: "span 6" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  sx={{ gridColumn: "span 6" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  label="Location"
                  variant="outlined"
                  sx={{ gridColumn: "span 12" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                />
                <TextField
                  label="Occupation"
                  variant="outlined"
                  sx={{ gridColumn: "span 12" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                />
                <Box
                  gridColumn="span 12"
                  padding="15px"
                  borderRadius="5px"
                  border={`1px solid ${theme.palette.border}`}
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.background.default}`}
                        padding="20px"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Box display="flex" justifyContent="space-between">
                            <Typography>{values.picture.name}</Typography>
                            <EditIcon />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              variant="outlined"
              sx={{ gridColumn: "span 12" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Password"
              variant="outlined"
              sx={{ gridColumn: "span 12" }}
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            {isRegister && (
              <TextField
                label="Confirm Password"
                variant="outlined"
                sx={{ gridColumn: "span 12" }}
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            )}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: theme.palette.logo.normal,
                margin: "30px 0",
                padding: "7px",
                fontSize: "20px",
                "&:hover": { backgroundColor: theme.palette.logo.hover }
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login")
                resetForm()
              }}
              color={theme.palette.logo.normal}
              sx={{
                "&:hover": {
                  color: theme.palette.logo.hover,
                  cursor: "pointer"
                }
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have account? Log In here."
              }
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
