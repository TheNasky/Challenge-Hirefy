"use client";

import { useState } from "react";

export default function FilterSelect({ setChangeType }) {
   return (
      <div className="pt-2 flex items-center">
         <label htmlFor="changeType" className="text-[19px] mr-2 font-semibold">
            Sort By:
         </label>
         <select
            id="changeType"
            className="border rounded-full px-4 py-2 text-[16px] w-[182px] h-[39px] font-semibold"
            onChange={(e) => setChangeType(e.target.value)}
         >
            <option value="all" className=" font-semibold">
               All
            </option>
            <option value="feat" className="font-semibold">
               Feat
            </option>
            <option value="fix" className="font-semibold">
               Fix
            </option>
         </select>
      </div>
   );
}
