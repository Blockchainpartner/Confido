
import { Metadata } from "next";
import dynamic from 'next/dynamic'

const Send = dynamic(() => import('@/components/Operation/Send'), { ssr: false });
export const metadata: Metadata = {
  title: "Sending token",
};

const SendPage = () => {
  return (
    <>
      <Send />
    </>
  );
};

export default SendPage;
