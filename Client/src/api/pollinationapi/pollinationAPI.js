import axios from "axios";

const polliantionurl = "https://text.pollinations.ai";

const pollinationinstance = axios.create({
  baseURL: polliantionurl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default pollinationinstance