import { useEffect } from "react";
import api from "./services/api";

const App = () => {
  useEffect(() => {
    api.get("/portfolio/profile/")
      .then((response) => {
        console.log("Profile data:", response.data);
      })
      .catch((error) => {
        console.error("API connection error:", error);
      });
  }, []);

  return (
    <div>
      <h1>Portfolio</h1>
    </div>
  );
};

export default App;