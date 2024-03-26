import { useState } from "react";

export default function useTimeout(duration: number) {
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  function timeout(callback: () => void) {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    setCurrentTimeout(setTimeout(callback, duration));
  }

  return timeout;
}
