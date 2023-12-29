import React, { useEffect, useState } from "react";
import { momJokeGenerator } from "../helper";

const MomJoke = () => {
  const [momJoke, setMomJoke] = useState("");

  useEffect(() => {
    const fetchMomJoke = async () => {
      const momJoke = await momJokeGenerator();
      setMomJoke(momJoke);
    };
    fetchMomJoke();
  }, []);

  return (
    <div>
      <h3>{momJoke != null ? momJoke : "Mom joke generator failed :'("}</h3>
    </div>
  );
};

export default MomJoke;
