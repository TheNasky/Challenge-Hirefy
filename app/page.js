"use client";
import Image from "next/image";
import releases from "./releases.json";
import FilterSelect from "./components/FilterSelect";
import { useState } from "react";

export default function Home() {
   const [changeType, setChangeType] = useState("all");
   const [selectedReleaseIndex, setSelectedReleaseIndex] = useState(0);
   const chosenRelease = releases.releases[selectedReleaseIndex];

   const filteredChanges = chosenRelease.changes.filter((change) => {
      if (changeType === "all") return true;
      return change.type.toLowerCase() === changeType.toLowerCase();
   });

   const sortedChanges = filteredChanges.sort((a, b) => {
      if (changeType === "all") return 0;
      if (changeType === "feat") {
         return a.type === "Feat" ? -1 : 1;
      } else {
         return a.type === "Fix" ? -1 : 1;
      }
   });

   const adjustDate = (dateString) => {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date;
   };

   return (
      <main className="">
         <nav 
            className="text-white font-bold py-9 lg:py-14 px-3 lg:px-12 lg:text-[46px] bg-[linear-gradient(90deg,#0D5287_-14.11%,#187DCA_13.97%,#05AACE_40.69%,#04D2C6_68.1%,#26E4C7_90.02%,#D3FFF5_117.42%)] text-[36px] cursor-pointer"
            onClick={() => window.location.reload()}
         >
            <h1> Release Notes </h1>
         </nav>
         <div className="flex py-10 px-3 lg:px-18 xlg:px-36 justify-between flex-col lg:flex-row sm:px-6">
            <section className="lg:w-8/12 xl:w-8/12 lg:px-12 xlg:px-24 sm:w-full sm:px-0">
               <div className="text-[32px] flex flex-col lg:flex-row justify-between pb-2 mb-8 border-b-2 border-b-[#DEE7F0] lg:text-[44px]">
                  <p className="">Release {chosenRelease.version}</p>
                  <div className="pl-0.5 lg:pl-0"><FilterSelect setChangeType={setChangeType} /></div>
               </div>

               <div className="relative">
                  <div className="absolute left-3.5 top-[18px] lg:top-4 bottom-0 w-1 bg-[#39D3BB]"></div>
                  {sortedChanges.length === 0 ? (
                     <p className="text-center text-[20px] lg:text-[30px] py-8 pl-4">
                        No new {changeType === "feat" ? "Features" : "Fixes"} in the current patch
                     </p>
                  ) : (
                     sortedChanges.map((change, index) => (
                        <div key={index} className="relative pl-16 mb-8">
                           <div className="absolute left-1 top-[18px] lg:top-4 w-[25px] h-[25px] bg-[#39D3BB] rounded-full"></div>
                           <h3 className="pt-3 lg:pt-0 pb-1 lg:pb-0 text-[24px] lg:text-[36px]">{change.title}</h3>
                           <div className="flex items-center">
                              <div
                                 className={`text-[14px] font-bold px-4 py-1 rounded-full ${
                                    change.type === "Feat" ? "bg-[#D3FFF5] text-[#1CB59C]" : "bg-[#FFF8E5] text-[#FFB800]"
                                 } sm:text-[14px]`}
                              >
                                 {change.type}
                              </div>
                              <p className="text-[#7D879C] text-[14px] font-semibold px-2 sm:text-[14px]">
                                 {adjustDate(chosenRelease.date).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                 })}
                              </p>
                           </div>

                           <p className="text-[#7D879C] text-[14px] font-semibold my-4 lg:my-6 sm:text-[14px]">{change.description}</p>
                           {change.content.type === "image" ? (
                              <Image
                                 src={change.content.link}
                                 alt={change.title}
                                 width={500}
                                 height={300}
                                 className="w-full rounded-2xl"
                              />
                           ) : (
                              <ul className="list-disc pl-5">
                                 {change.content.text.map((text, idx) => (
                                    <li className="py-1" key={idx}>{text}</li>
                                 ))}
                              </ul>
                           )}
                           {change.subtext && <p>{change.subtext}</p>}
                        </div>
                     ))
                  )}
               </div>
            </section>
            <section className="lg:w-4/12 xlg:w-4/12 p-4 lg:px-12 xlg:px-24 sm:w-full sm:px-0">
               <h2 className="text-[25px] mb-4 font-bold sm:text-[25px]">All release notes</h2>
               <ul>
                  {releases.releases.map((release, index) => (
                     <li key={index} className="mb-2">
                        <a
                           href="#"
                           className={` line-clamp-1 my-3 font-bold ${index === selectedReleaseIndex ? "text-[#2B3445] border-b-[1px] border-b-[#2B3445]" : "text-[#7D879C] "}`}
                           onClick={() => setSelectedReleaseIndex(index)}
                        >
                           Release {release.version}: {release.title}
                        </a>
                     </li>
                  ))}
               </ul>
            </section>
         </div>
      </main>
   );
}
