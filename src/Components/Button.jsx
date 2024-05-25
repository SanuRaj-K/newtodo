import React from "react";

function Button({text}) {
  return (
    <div className="">
      <div>
        {" "}
        <button className=" bg-[#597EF7]  text-white px-4 py-2 rounded-md">
         {text}
        </button>
      </div>
    </div>
  );
}

export default Button;
