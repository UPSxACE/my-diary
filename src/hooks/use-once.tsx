import { useState } from "react";

export default function useOnce() {
  const [isDone, setIsDone] = useState(false);

  function done() {
    setIsDone(true);
  }

  return {
    isDone,
    done,
  };
}
