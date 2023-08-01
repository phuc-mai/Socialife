import {
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  InputBase,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import {
  ImageOutlined,
  VideoCameraBackOutlined,
  AttachFileOutlined,
  KeyboardVoiceOutlined,
  Edit,
  DeleteOutline,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { setPosts } from "../state/state";

const MyPost = ({ userPicturePath }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNonMobile = useMediaQuery("(min-width: 1000px");
  const [isImage, setIsImage] = useState(null);

  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    // Create a new FormData object to hold the form data, including the image file
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", content);
    if (image) {
      formData.append("picture", image);
      formData.append("postPicturePath", image.name);
    }

    const response = await fetch(`http://localhost:3003/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    // Server returns the updated list of posts
    const posts = await response.json();
    dispatch(setPosts({ posts }));

    // Reset the form to be empty
    setImage(null);
    setContent("");
  };

  return (
    <Box
      sx={{ backgroundColor: theme.palette.background.over }}
      padding="20px"
      borderRadius="15px"
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between" mb="20px" gap="30px">
        <Box width="60px" height="60px">
          <img
            src={`http://localhost:3003/assets/${userPicturePath}`}
            alt="UserImage"
            width="60px"
            height="60px"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </Box>
        <InputBase
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="What's on your mind..."
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: "5px 6%",
            borderRadius: "30px",
            width: "100%",
          }}
        />
      </Box>

      {isImage && (
        <Box
          padding="15px"
          borderRadius="5px"
          border={`1px solid ${theme.palette.border}`}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            
          >
            {({ getRootProps, getInputProps }) => (
              <Box display="flex" gap="20px">
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${theme.palette.background.default}`}
                  padding="20px"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  width="100%"
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Picture Here</p>
                  ) : (
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{image.name}</Typography>
                      <Edit />
                    </Box>
                  )}
                </Box>

                {image && (
                  <IconButton onClick={() => setImage(null)}>
                    <DeleteOutline />
                  </IconButton>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="20px"
      >
        <Box
          display="flex"
          gap="3px"
          onClick={() => setIsImage(!isImage)}
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <ImageOutlined />
          <Typography>Image</Typography>
        </Box>
        <Box
          display="flex"
          gap="3px"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <VideoCameraBackOutlined />
          <Typography>Video</Typography>
        </Box>
        <Box
          display="flex"
          gap="3px"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <AttachFileOutlined />
          <Typography>Attachment</Typography>
        </Box>
        <Box
          display="flex"
          gap="3px"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <KeyboardVoiceOutlined />
          <Typography>Audio</Typography>
        </Box>
        <Button
          onClick={() => handlePost()}
          padding="3px"
          sx={{
            color: "white",
            backgroundColor: theme.palette.logo.normal,
            "&:hover": {
              backgroundColor: theme.palette.logo.hover,
              cursor: "pointer",
            },
            borderRadius: "20px",
          }}
        >
          POST
        </Button>
      </Box>

      <Box></Box>
    </Box>
  );
};

export default MyPost;
