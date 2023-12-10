"use client";
import React from "react";
import { useSelection } from "@/app/context/store";
import Image from "next/image";

export default function Home() {
  const loomEmbedUrl =
    "https://www.loom.com/embed/e55c1d72997f4fceb7d41b4e19b8b2bf";

  return (
    <main className="flex flex-col items-center rounded-xl mt-5 prose ">
      <h1 className="text-3xl mb-4 prose text-white">About</h1>

      <div className="max-w-prose bg-white bg-opacity-5 p-10 text-white flex flex-col gap-7">
        <p className="text-block ">
          // Lorem ipsum dolor sit amet, consectetur adipisicing elit. //
          Quaerat odio at soluta iusto quos rem incidunt eius, // perspiciatis
          pariatur, neque velit! Magnam tenetur nulla maiores // possimus, et
          natus a illum. Lorem ipsum dolor sit amet, // consectetur adipisicing
          elit. Quaerat odio at soluta iusto quos // rem incidunt eius,
          perspiciatis pariatur, neque velit! Magnam // tenetur nulla maiores
          possimus, et natus a illum. Lorem ipsum // dolor sit amet, consectetur
          adipisicing elit. Quaerat odio at // soluta iusto quos rem incidunt
          eius, perspiciatis pariatur, // neque velit! Magnam tenetur nulla
          maiores possimus, et natus a // illum. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. // Quaerat odio at soluta iusto quos rem
          incidunt eius, // perspiciatis pariatur, neque velit! Magnam tenetur
          nulla maiores // possimus, et natus a illum. //{" "}
        </p>

        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src={loomEmbedUrl}
            title="Loom Video Player"
            frameBorder="0"
            allowFullScreen></iframe>
        </div>
        <div className="image-container">
          <Image src={"/cookies.webp"} height={615} width={560} alt="" />
        </div>

        <p className="">
          // Lorem ipsum dolor sit amet, consectetur adipisicing elit. //
          Quaerat odio at soluta iusto quos rem incidunt eius, // perspiciatis
          pariatur, neque velit! Magnam tenetur nulla maiores // possimus, et
          natus a illum. Lorem ipsum dolor sit amet, // consectetur adipisicing
          elit. Quaerat odio at soluta iusto quos // rem incidunt eius,
          perspiciatis pariatur, neque velit! Magnam // tenetur nulla maiores
          possimus, et natus a illum. Lorem ipsum // dolor sit amet, consectetur
          adipisicing elit. Quaerat odio at // soluta iusto quos rem incidunt
          eius, perspiciatis pariatur, // neque velit! Magnam tenetur nulla
          maiores possimus, et natus a // illum. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. // Quaerat odio at soluta iusto quos rem
          incidunt eius, // perspiciatis pariatur, neque velit! Magnam tenetur
          nulla maiores // possimus, et natus a illum. //{" "}
        </p>
      </div>
    </main>
  );
}

// <div className="bg-white bg-opacity-5 w-full max-w-8xl text-white rounded-xl ">
//         <div className="p-10 flex flex-col ">
//           <h1 className="text-3xl mb-4">About</h1>
//           <div className="flex flex-row gap-8 border-t border-white">
//             <div className="flex flex-row flex-grow gap-5 mt-4">
//               <p className="text-block">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Quaerat odio at soluta iusto quos rem incidunt eius,
//                 perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
//                 possimus, et natus a illum. Lorem ipsum dolor sit amet,
//                 consectetur adipisicing elit. Quaerat odio at soluta iusto quos
//                 rem incidunt eius, perspiciatis pariatur, neque velit! Magnam
//                 tenetur nulla maiores possimus, et natus a illum. Lorem ipsum
//                 dolor sit amet, consectetur adipisicing elit. Quaerat odio at
//                 soluta iusto quos rem incidunt eius, perspiciatis pariatur,
//                 neque velit! Magnam tenetur nulla maiores possimus, et natus a
//                 illum. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Quaerat odio at soluta iusto quos rem incidunt eius,
//                 perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
//                 possimus, et natus a illum.
//               </p>

//               <p className="text-block">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Quaerat odio at soluta iusto quos rem incidunt eius,
//                 perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
//                 possimus, et natus a illum. Lorem ipsum dolor sit amet,
//                 consectetur adipisicing elit. Quaerat odio at soluta iusto quos
//                 rem incidunt eius, perspiciatis pariatur, neque velit! Magnam
//                 tenetur nulla maiores possimus, et natus a illum.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="p-10 flex flex-col  ">
//           <h1 className="text-3xl mb-4">About</h1>
//           <div className="flex flex-row gap-8 border-t border-white">
//             <div className="flex flex-row flex-grow gap-5 mt-4">
//               <p className="text-block">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Quaerat odio at soluta iusto quos rem incidunt eius,
//                 perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
//                 possimus, et natus a illum. Lorem ipsum dolor sit amet,
//                 consectetur adipisicing elit. Quaerat odio at soluta iusto quos
//                 rem incidunt eius, perspiciatis pariatur, neque velit! Magnam
//                 tenetur nulla maiores possimus, et natus a illum. Lorem ipsum
//                 dolor sit amet, consectetur adipisicing elit. Quaerat odio at
//                 soluta iusto quos rem incidunt eius, perspiciatis pariatur,
//                 neque velit! Magnam tenetur nulla maiores possimus, et natus a
//                 illum. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Quaerat odio at soluta iusto quos rem incidunt eius,
//                 perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
//                 possimus, et natus a illum.
//               </p>

//               <p className="text-block">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Quaerat odio at soluta iusto quos rem incidunt eius,
//                 perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
//                 possimus, et natus a illum. Lorem ipsum dolor sit amet,
//                 consectetur adipisicing elit. Quaerat odio at soluta iusto quos
//                 rem incidunt eius, perspiciatis pariatur, neque velit! Magnam
//                 tenetur nulla maiores possimus, et natus a illum.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
