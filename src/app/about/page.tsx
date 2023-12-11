"use client";
import React from "react";
import { useSelection } from "@/app/context/store";
import Image from "next/image";

export default function Home() {
  const loomEmbedUrl =
    "https://www.loom.com/embed/2bf77e0c3a824b1e90dbd4b495dcb0ba?sid=388e3ca3-0f9c-47d1-997b-527c49d9254f";

  const yaleLink =
    "https://climatecommunication.yale.edu/publications/climate-change-in-the-american-mind-december-2020/";

  return (
    <main className="flex flex-col items-center rounded-xl mt-5 prose ">
      <h1 className="text-3xl mb-4 prose text-white">
        The World Tweets about Climate Change
      </h1>

      <div className="max-w-prose bg-white bg-opacity-5 p-10 text-white flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          {" "}
          <span className="underline -mb-4">Motivation</span>
          <p className="text-block prose">
            Climate change is a global issue that is disproportionately being
            caused by certain countries while disproportionately impacting
            others. Taking immediate action to avoid climate disaster and
            humanitarian catastrophe is listed as the 13th UN Sustainable
            Development goal.
          </p>
          <p className="text-block prose">
            To effectively combat rising temperatures, it is important to
            understand opinions on this issue on a worldwide scale, specifically
            the overall sentiment and stance of certain countries and their
            change of opinion over time. Though the main avenue of investigation
            so far has been through the administration of general surveys with
            yes/no questions{" "}
            <a className="underline" href={yaleLink} target="_blank">
              see the Yale Climate Change Opinion project &ndash; Leiserowitz
              &#40;2020&#41;
            </a>
            , there is less work in qualitatively analyzing textual content,
            which should in theory provide more nuanced information.
          </p>
          <p className="text-block prose">
            Our aim is for everyone, regardless of background, to explore and
            understand what factors influence their own country&apos;s opinion
            on climate change, and to be aware of any biases or modern trends
            currently exist. The visualization on this webpage reflects one of
            the best attempts so far at using natural language data from social
            media to tackle this problem!
          </p>
        </div>

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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat odio
          at soluta iusto quos rem incidunt eius, perspiciatis pariatur, neque
          velit! Magnam tenetur nulla maiores possimus, et natus a illum. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Quaerat odio at
          soluta iusto quos rem incidunt eius, perspiciatis pariatur, neque
          velit! Magnam tenetur nulla maiores possimus, et natus a illum. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Quaerat odio at
          soluta iusto quos rem incidunt eius, perspiciatis pariatur, neque
          velit! Magnam tenetur nulla maiores possimus, et natus a illum. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Quaerat odio at
          soluta iusto quos rem incidunt eius, perspiciatis pariatur, neque
          velit! Magnam tenetur nulla maiores possimus, et natus a illum.{" "}
        </p>
      </div>
    </main>
  );
}
