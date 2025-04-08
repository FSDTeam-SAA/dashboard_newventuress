"use client";
import React from "react";
import NewsLetterHedder from "./_components/NewsLetterHedder";
import NewsLetterContainer from "./_components/NewsLetterContainer";
import NewsLetterDataButton from "./_components/NewsLetterDataButton";

const Page = () => {
  const [activeTab, setActiveTab] = React.useState("subscribers");
  return (
    <div>
      <NewsLetterHedder activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "subscribers" && <NewsLetterContainer />}
      {activeTab === "newsletters" && <NewsLetterDataButton />}
    </div>
  );
};

export default Page;
