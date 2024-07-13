
import Send from "@/components/Operation/Send";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sending token",
  // other metadata
};

const SendPage = () => {
  return (
    <>
      <Send />
    </>
  );
};

export default SendPage;
