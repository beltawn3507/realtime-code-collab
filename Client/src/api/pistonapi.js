import axios from "axios";

const psitonUrl = "https://emkc.org/api/v2/piston";

const pistoninstance = axios.create({
  baseURL: psitonUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default pistoninstance