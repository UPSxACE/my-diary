import { Fragment, ReactNode } from "react";
import arrayN from "./array-n";

interface ElementRepeaterProps {
  nRepeat: number;
  element: Readonly<ReactNode>;
}

export default function ElementRepeater(props: ElementRepeaterProps) {
  return (
    <Fragment>
      {arrayN(props.nRepeat).map((_, index) => {
        return <Fragment key={index}>{props.element}</Fragment>;
      })}
    </Fragment>
  );
}
