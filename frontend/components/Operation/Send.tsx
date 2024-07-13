"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Send = () => {

  const [inputs, setInputs] = useState([{ address: '', amount: '' }]);
console.log(inputs)
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { address: '', amount: '' }]);
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };


console.log(window.ethereum,'EEEEE')
  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Choose addresses to send to 
            </h2>
              {inputs.map((input, index) => (
        <div key={index} className="mb-2 flex flex-col gap-2 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
          <input
            type="text"
            name="field1"
            value={input.address}
            onChange={(event) => handleInputChange(index, event)}
            className="px-3 py-2 border rounded-md w-full"
            placeholder="Address"
          />
          <input
            type="text"
            name="amount"
            value={input.amount}
            onChange={(event) => handleInputChange(index, event)}
            className="px-3 py-2 border rounded-md w-full"
            placeholder="Amount"
          />
          <button
            onClick={() => handleRemoveInput(index)}
            className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
          >
            Remove 
          </button>
        </div>
      ))}
        <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
          <div className="flex flex-wrap gap-4 md:gap-10">
            <div className="mb-4 flex items-center">
                    <button
                      onClick={handleAddInput}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default Send;
