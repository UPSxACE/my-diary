import { useEffect, useState } from "react";

type state = 0 | 1 | 2;

export default function useTransitionHelper(
  condition: boolean,
  delay: number
): state {
  const [transition, setTransition] = useState<state>(condition ? 2 : 0);

  useEffect(() => {
    setTransition(1);
    if (condition) {
      setTimeout(() => {
        setTransition(2);
      }, 0);
    } else {
      setTimeout(() => {
        setTransition(0);
      }, delay);
    }
  }, [condition, delay]);

  return transition;
}
