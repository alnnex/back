const express = require("express");
const connectDB = require("./config/db");
const programRoutes = require("./routes/programRoutes");
const userRoutes = require("./routes/userRoutes");
const inquiriesRoutes = require("./routes/inquiriesRoutes");

const professorRoutes = require("./routes/professorRoutes");
const fileRoutes = require("./routes/fileRoutes");
var cors = require("cors");
const newsEventsRoutes = require("./routes/newsEventsRoutes");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/professor", professorRoutes);
app.use("/api/newsEvents", newsEventsRoutes);
app.use("/api/inquiries", inquiriesRoutes);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, console.log(PORT));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

// io.on("connection", (socket) => {
//   console.log("connected to socket.io");

//   socket.on("setup", (userData) => {
//     if (userData) {
//       socket.join(userData._id);
//       console.log(userData._id);
//       socket.emit("connected");
//     }
//   });

//   socket.on("join room", (room) => {
//     socket.join(room);
//     console.log("User joined room" + " " + room);
//   });

  // socket.on("new inquiry", (inquiry) => {

  //   if (!chat.users) return console.log("chat.user not defined");

  //   chat.users.forEach((user) => {
  //     if (user._id == newMessageRecieved.sender._id) return;

  //     socket.in(user._id).emit("message recieved", newMessageRecieved);
  //   });
  // });

//   socket.off("setup", () => {
//     socket.leave(userData._id);
//     console.log("USER DISCONNECTED");
//   });
// });
module.exports = app;
