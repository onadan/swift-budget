// @ts-nocheck
"use client";

// Import necessary dependencies and components
import WidthWrapper from "@/components/width-wrapper";
import ExpensesContext from "@/contexts/expense-context";
import { useContext, useState, useRef } from "react";
import { Expense } from "../types";
import Link from "next/link";
import domtoimage from "dom-to-image";

// Define the Theme type
type Theme = {
  id: number;
  name: string;
  color: string;
};

// Define the themes array
const themes: Theme[] = [
  { id: 1, name: "black", color: "#000000" },
  { id: 2, name: "green", color: "#00ff7f" },
  { id: 3, name: "pink", color: "#ff6666" },
  { id: 4, name: "blue", color: "#5165ff" },
];

// Define the Page component
const Page: React.FC = () => {
  // Access context methods and data
  
// eslint-disable-next-line no-console
  const { expenses, totalPrice } = useContext(ExpensesContext);
  // State for selected theme, title, loading, and confetti
  const [selectedTheme, setSelectedTheme] = useState<string>("#5165ff");
  const [title, setTitle] = useState<string>("My Budget");
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [isConfettiActive, setConfettiActive] = useState<boolean>(false);

  // Function to handle download button click
  const handleClick = () => {
    setLoading(true);
    // Capture the content of the div and download it as an image
    domtoimage
      .toPng(containerRef.current!)
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.href = dataUrl!;
        link.download = "budget_card.png";
        link.click();
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.error("Error capturing image:", error);
        alert("An error occurred!");
      });
  };

  // Function to determine theme background color
  const themeBackground = (): string => {
    switch (selectedTheme) {
      case "#000000":
        return "bg-[#000000]";
      case "#00ff7f":
        return "bg-[#00ff7f]";
      case "#ff6666":
        return "bg-[#ff6666]";
      case "#5165ff":
        return "bg-[#5165ff]";
      default:
        return "bg-[#5165ff]";
    }
  };

  // Function to determine theme text color
  const themeText = (): string => {
    switch (selectedTheme) {
      case "#000000":
        return "text-[#000000]";
      case "#00ff7f":
        return "text-[#00ff7f]";
      case "#ff6666":
        return "text-[#ff6666]";
      case "#5165ff":
        return "text-[#5165ff]";
      default:
        return "text-[#5165ff]";
    }
  };

  return (
    <>
      <WidthWrapper customStyle={"max-w-[400px]"}>
        <div className="flex flex-col gap-5 justify-center items-center my-10 w-full">
          <Link
            href="/"
            className="self-start mb-2 text-sm text-neutral-500 font-semibold"
          >
            &lt; Go Home
          </Link>
          {/* theme */}

          <div className="flex flex-col w-full">
            <h5 className="text-xs text-neutral-500">Select Theme</h5>
            <div className="w-full flex flex-wrap gap-2">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.color)}
                  className={`border w-16 h-16 rounded-full p-1 cursor-pointer hover:border-main                
                ${selectedTheme === theme.color && "border-4 border-main"}
               `}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      backgroundColor: theme.color,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          {/* ********* */}

          <div className="w-full">
            <label htmlFor="title" className="text-xs text-neutral-500">
              Card Title
            </label>
            <input
              type="text"
              id="title"
              className="h-10 border rounded px-4 focus:border-main outline-none w-full"
              placeholder="Budget Card Title*"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <h1 className="text-neutral-400 font-semibold mt-10">PREVIEW</h1>

          <div
            ref={containerRef}
            className="max-w-[400px] w-full rounded-2xl border overflow-hidden bg-white"
          >
            <div
              className={
                themeBackground() +
                " w-full py-2 min-h-20 rounded-t-2xl flex justify-center items-center"
              }
            >
              <h1 className="text-white text-2xl font-bold text-center">
                {title !== "" ? title : "My Budget"}
              </h1>
            </div>

            <div className="flex-1 my-10 px-4">
              <ol className="mb-2">
                {expenses.map((expense: Expense, idx: number) => (
                  <li key={idx} className="grid grid-cols-[20px_1fr_1fr] pb-1">
                    <p className="text-neutral-500 justify-self-end self-center pr-1 text-sm">
                      {idx + 1}.
                    </p>
                    <p className=" text-black">{expense.name}</p>
                    <p
                      className={
                        themeText() + " justify-self-end  font-semibold"
                      }
                    >
                      {Number(expense.price).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="border-dashed border-t-2 border-neutral-500"></div>

              <div className="grid grid-cols-[20px_1fr_1fr] font-bold mt-2">
                <p className="col-start-2">Total</p>
                <p className={themeText() + " justify-self-end "}>
                  {Number(totalPrice()).toLocaleString()}
                </p>
                {/* <p>{expenses.}</p> */}
              </div>
            </div>
            <div className="w-full flex justify-center pb-5">
              <p className="text-xs text-neutral-500 ">
                Made with{" "}
                <span className={themeText()}>swiftbudget.vercel.app</span>
              </p>
            </div>
          </div>
          <div className="">
            <button
              onClick={handleClick}
              className={
                themeBackground() +
                " mt-5 rounded-full h-12 shadow-[2px_2px_1px_black] transition duration-300 hover:shadow-[4px_4px_1px_black] text-white sm:w-max text-sm px-4 font-medium"
              }
            >
              {loading ? "Downloading..." : "Download Card"}
            </button>
          </div>
        </div>
      </WidthWrapper>
    </>
  );
};

export default Page;
