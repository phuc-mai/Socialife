import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const FriendList = ({ userId }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const getFriends = async() => {
    const response = await fetch(`http://localhost:3003/${userId}/friends`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
  }
  return <div>FriendList</div>;
};

export default FriendList;
