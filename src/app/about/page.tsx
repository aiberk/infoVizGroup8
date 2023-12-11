"use client";
import React from "react";
import { useSelection } from "@/app/context/store";
import Image from "next/image";

export default function Home() {
  const loomEmbedUrl =
    "https://www.loom.com/embed/2bf77e0c3a824b1e90dbd4b495dcb0ba?sid=388e3ca3-0f9c-47d1-997b-527c49d9254f";

  const yaleLink =
    "https://climatecommunication.yale.edu/publications/climate-change-in-the-american-mind-december-2020/";

  const Effrosynidis =
    "https://www.sciencedirect.com/science/article/abs/pii/S0957417422008624";

  const Munzner = "https://www.cs.ubc.ca/~tmm/vadbook/";
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

        <div className="flex flex-col gap-5">
          {" "}
          <span className="underline -mb-4">Visualization explanations:</span>
          <p className="text-block prose">
            This webpage includes a world map selector with a search feature to
            view a selection of statistics of any particular country, as well as
            a holistic map perspective that displays attributes such as
            sentiment, stance, and aggressiveness for all countries
            simultaneously. The first view allows you to filter for specific
            countries and attributes, simply by using the dropdowns. The second
            view allows you to uncover more overall trends, again by selecting
            any attribute with the dropdown. Both views allow you to dynamically
            view the data over time with a time slider.
          </p>
          <p className="text-block prose">
            In our first view, zooming in on a country reveals two plots
            capturing monthly data, both utilizing positional encoding: a line
            chart documenting recorded temperatures and a circle chart
            visualizing the chosen attribute over time. We maximize readability
            by separating out these visualizations &#40;as well as the time
            scale&#41;, and doubly encoding the attribute with color.
          </p>
          <p className="text-block prose">
            In our second view, we clearly encode geolocation data with spatial
            position, and encode the chosen attribute on a monochromatic scale
            &#40;not color, since these variables are quantitative, but each
            attribute uses a different hue&#41;. Again, we separate out the time
            scale to allow the user to brush across specific periods.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {" "}
          <span className="underline -mb-4">Data Analysis:</span>
          <p className="text-block prose">
            The climate change twitter dataset is a collection of 14 million
            anonymized tweets gathered from 2006-2018{" "}
            <a href={Effrosynidis} target="_blank" className="underline">
              &#40;Effrosynidis et al., 2022&#41;
            </a>
            . The tweets were obtained by combining existing datasets that used
            Twitter&apos;s API &#40;no longer free&#41;, identified using
            keywords such as “global warming”, “climate change”, “climate
            crisis”, etc. The authors obtained the actual text of the tweets by
            using a hydrator, and performed several natural language processing
            &#40;NLP&#41; tasks on the resulting data.
          </p>
          <p className="text-block prose">
            We focus on several key attributes resulting from this analysis:
            geolocation, sentiment, aggressiveness, and stance. Geolocation of a
            user&apos;s tweet who has sharing permission is represented by an x
            and y coordinate, and can be assigned to a particular country.
            Sentiment &#40;positive or negative&#41;, aggressiveness
            &#40;aggressive or not&#41;, and stance &#40;believer vs. neutral
            vs. denier&#41; were automatically calculated via NLP and machine
            learning techniques
          </p>
          <p className="text-block prose">
            Preprocessing on our end was done within a{" "}
            <a
              className="underline mr-1"
              target="_blank"
              href="https://colab.research.google.com/drive/1disNlsk8e5nGG_7kSzYNK6LGR_JHI0VO?usp=drive_link">
              Google Collab Notebook
            </a>
            with the pandas Python library, where only geolocated tweets were
            subsampled from the original dataset, and coordinates were mapped to
            countries. The sampled data was then converted into a
            month-separated json file for efficient dictionary lookup. This is
            the data that runs the current visualization.
          </p>
          <a
            className="underline"
            target="_blank"
            href="https://colab.research.google.com/drive/1disNlsk8e5nGG_7kSzYNK6LGR_JHI0VO?usp=drive_link">
            Google Collab Link
          </a>
        </div>

        <div className="flex flex-col gap-5">
          {" "}
          <span className="underline -mb-4">Task Analysis:</span>
          <p className="text-block prose">
            We focus on the following three tasks{" "}
            <a href={Munzner} className="underline" target="_blank">
              &#40;Munzner 2014&#41;
            </a>
            , which can be investigated through our visualization
          </p>
          <p className="text-block prose">
            <span className=" font-bold">
              Are there regional patterns in climate change opinion? In
              particular, across which continents, hemispheres, and latitude
              lines?
            </span>{" "}
            This task involves <span className=" font-bold">discovering</span>{" "}
            patterns by browsing over the geographical and temporal search
            space, while <span className=" font-bold">comparing</span> various
            regions to one another.
          </p>
          <p className="text-block prose">
            <span className=" font-bold">
              What is the distribution of climate change sentiment across the
              globe? Are there more believers or deniers overall? Are tweets
              generally passive, or more aggressive?
            </span>{" "}
            This task involves <span className=" font-bold">summarizing</span>{" "}
            data across all regions, while also
            <span className=" font-bold">browsing</span> over individual time
            slices.
          </p>
          <p className="text-block prose">
            <span className=" font-bold">
              How has climate change opinion changed over time?
            </span>{" "}
            This task again involves discovering patterns by{" "}
            <span className=" font-bold">browsing</span> over monthly period
            data, while <span className=" font-bold">comparing</span> various
            regions to one another.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {" "}
          <span className="underline -mb-4">Design Process:</span>
          <div className="image-container">
            <Image src={"/sketch1.webp"} height={615} width={560} alt="" />
          </div>
          <div className="image-container">
            <Image src={"/sketch2.webp"} height={615} width={560} alt="" />
          </div>
          <div className="image-container">
            <Image src={"/sketch3.webp"} height={615} width={560} alt="" />
          </div>
          <p className="text-block prose">
            We drafted our initial sketches of the visualization with the above
            tasks in mind. From the beginning, we envisioned a world map with
            data points divided over countries, where individual attributes of
            the data could be selected. We realized this high-level summary was
            difficult to interpret on its own, so we brainstormed ways to zoom
            in and highlight the properties of individual countries
            &#40;Schneiderman 1996&#41;, settling on the current iteration of
            our first visualization, including dropdown selection and alternate
            perspectives across different time slices.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {" "}
          <span className="underline -mb-4">Conclusion</span>
          <p className="text-block prose">
            Overall, this visualization accomplishes our main goals and succeeds
            at enabling our main list of tasks. It enables a key set of data
            analysis tasks through a filtering of tweet data across content and
            across time. Following the ICE-T visualization value paradigm{" "}
            <a>&#40;Wall et al. 2018&#41;</a>, we: optimize user tasks by
            allowing them to pinpoint selections with efficient menu
            interactions, allow the user to extract a multitude of patterns from
            multiple separate views, and provide a high-level data overview with
            map aggregation. Future work should involve the last heuristic -
            confidence - by allowing the user to review particular instances of
            data, for example by including a viewer for particular tweets.
          </p>
          <p className="text-block prose">
            Until this work is implemented, we acknowledge that while
            interesting trends can indeed be quickly identified using this
            visualization, the techniques involved in the original paper are not
            perfect, and some measures, having been automatically calculated,
            may not be completely accurate. We encourage readers to explore this
            visualization deeply to start thinking about regional biases, but
            also to exercise reasonable caution when drawing conclusions.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {" "}
          <span className="underline -mb-4">Acknowledgements</span>
          <p className="text-block prose">React, D3, Python &#40;pandas&#41;</p>
          <p className="text-block prose">
            Cleveland, W. S., & McGill, R. &#40;1984&#41;. Graphical perception:
            Theory, experimentation, and application to the development of
            graphical methods. Journal of the American statistical association,
            79&#40;387&#41;, 531-554. Effrosynidis, D., Karasakalidis, A. I.,
            Sylaios, G., & Arampatzis, A. &#40;2022&#41;. The climate change
            Twitter dataset. Expert Systems with Applications, 204, 117541.
          </p>
          <p className="text-block prose">
            Leiserowitz, A., Maibach, E., Rosenthal, S., Kotcher, J., Bergquist,
            P., Ballew, M., Goldberg, M., Gustafson, A., & Wang, X.
            &#40;2020&#41;. Climate Change in the American Mind: April 2020.
            Yale University and George Mason University. New Haven, CT: Yale
            Program on Climate Change Communication.
          </p>
          <p className="text-block prose">
            Shneiderman, B. &#40;1996, September&#41;. The eyes have it: A task
            by data type taxonomy for information visualizations. In Proceedings
            1996 IEEE symposium on visual languages &#40;pp. 336-343&#41;. IEEE.
          </p>
          <p className="text-block prose">
            Wall, E., Agnihotri, M., Matzen, L., Divis, K., Haass, M., Endert,
            A., & Stasko, J. &#40;2018&#41;. A heuristic approach to
            value-driven evaluation of visualizations. IEEE transactions on
            visualization and computer graphics, 25&#40;1&#41;, 491-500.
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
      </div>
    </main>
  );
}
