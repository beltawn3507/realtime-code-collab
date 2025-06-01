import React from "react";
import illlustration from "../assets/images/illustration.svg"
import Form from "../components/Form/Form";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
  <div className="flex flex-1 w-full flex-col items-center justify-evenly sm:flex-row sm:pt-0">
    {/* Illustration block */}
    <div className="flex w-full animate-up-down justify-center sm:w-1/2 sm:pl-4">
      <img
        src={illlustration}
        alt="illustrations"
        className="animate-[up-down_2s_ease-in-out_infinite] mx-auto w-[250px] sm:w-[400px]"
      />
    </div>

    {/* Form block */}
    <div className="flex w-full items-center justify-center sm:w-1/2">
      <Form />
    </div>
  </div>
</div>

  );
};

export default HomePage;
