import { Alert } from "@mantine/core";
import { IoInformationCircleOutline } from "react-icons/io5";

interface ErrorAlertProps {
  visible: boolean;
  title: string;
  outline?: boolean;
}

export default function ErrorAlert(props: ErrorAlertProps) {
  const { visible, title, outline } = props;

  if (!visible) {
    return null;
  }

  return (
    <Alert
      variant={outline ? "outline" : "light"}
      color="red.9"
      title={title}
      icon={<IoInformationCircleOutline className="text-xl" />}
    />
  );
}
