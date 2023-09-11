const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const { register } = require("./controllers/auth.js");
const { createPost } = require("./controllers/posts.js");
const { verifyToken } = require("./middleware/auth.js");
const User = require("./models/User.js");
const Post = require("./models/Post.js");
// const { users, posts } = require("./data/index.js");

/* CONFIGURATIONS */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
  ],
  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes); 
app.use("/users", userRoutes); 
app.use("/posts", postRoutes); 

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // option ensures that Mongoose uses the new MongoDB connection string parser.
    useUnifiedTopology: true, // option enables the use of the MongoDB driver's new connection management engine.
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
