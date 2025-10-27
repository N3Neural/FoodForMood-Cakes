import React from "react";
import ScrollTop from "../../utils/Scrolltop";

export default function Testimonials() {
  return (
    <div className=" font-Poppins ">
    <ScrollTop />
      <div className="flex xl:p-10 xl:justify-start xl:items-start flex-col p-5">
        <div className="flex flex-col justify-start items-center xl:flex-row-reverse">
          <div className="flex flex-col gap-5 xl:w-1/2">
            <h1 className="text-sm  border-l-2 border-zinc-300 px-3">
            </h1>
            <h1 className="text-[2.4em] xl:text-[3em] font-semibold  px-3 leading-none">
              Why FOOD FOR MOOD CAKES?
            </h1>
            <p className="text-sm xl:font-Poppins">
              Welcome to Food for Mood Cakes, where celebrations meet luxury and emotions turn into unforgettable experiences.
Founded by Manthan Desai, an MBA in Finance with a rich background across multiple industries, Food for Mood Cakes was born from a simple yet profound vision — to redefine the way people celebrate special moments. Manthan’s passion for creating joy and elegance in every occasion led to building a one-stop premium destination for all things celebration — luxury cakes, exquisite flowers, and elegant decorations.
At Food for Mood Cakes, we believe that every celebration deserves more than just a cake — it deserves a feeling. Whether it’s a birthday, anniversary, wedding, or any milestone, we craft an experience filled with taste, beauty, and emotions.
Our luxury cakes are freshly baked to perfection after every order, using the finest ingredients to ensure unmatched quality and flavor. We complement them with real, handpicked premium flowers and bespoke decorations, designed to make your celebration truly memorable.
We are here to change the way you celebrate — making every occasion a seamless blend of luxury, love, and happiness — all under one roof.
Food for Mood Cakes – Where celebrations bloom, and emotions are beautifully baked.


            </p>
            <div className="relative flex justify-between xl:justify-start xl:gap-36 items-center">
              <div>
                <img
                  src="Mask group.png"
                  alt=""
                  className=" h-[50px] absolute left-0 top-0"
                />
                <img
                  src="Mask group-1.png"
                  alt=""
                  className=" absolute left-8 h-[50px] top-0"
                />
                <img
                  src="Mask group-2.png"
                  alt=""
                  className="absolute left-16 h-[50px] top-0"
                />
              </div>
              <div>
                <h1 className="text-sm ">Customer Feedback</h1>
                <h1 className="text-xs"> ⭐4.5 (18.6k Reviews)</h1>
              </div>
            </div>
          </div>
          <div>
            <img src="/Group 18.png" alt="" className="pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
