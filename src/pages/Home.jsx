import React from "react";
import { MdLightbulbOutline, MdOutlineNoteAdd } from "react-icons/md";
import HomeCommon from "../components/common/HomeCommon";


function App() {
  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
  
{/*------------- Note Input Box */}
<div className="flex justify-center">
  <div className="w-full max-w-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow p-4 flex items-center space-x-3">
    <MdOutlineNoteAdd className="text-2xl text-gray-500 dark:text-gray-300" />
    <input
      type="text"
      placeholder="Take a note..."
      className="flex-grow outline-none bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
    />
  </div>
</div>

      {/* Notes Grid */}
      <div className="flex flex-wrap gap-[20px] justify-center">

      <HomeCommon />
      <HomeCommon />
      <HomeCommon />
      <HomeCommon />
      </div>
    </div>
  );
}

export default App;
