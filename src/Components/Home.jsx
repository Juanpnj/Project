import React from "react";
import TOF from "../Photo/steps-of-the-strategic-planning-process.png";

function Home() {
  return (
    <div className="relative h-screen bg-slate-100">
      <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${TOF})`,
        filter: 'blur(10px)',
        opacity: '0.5',
      }}
    ></div>
      <div className="absolute inset-0 hidden items-center justify-center my-auto lg:flex">
        <div className="text-center bg-transparent">
          <h1 className="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
            To-Do List
          </h1>
          <p>Make Your Plans More Organized With To-Do List</p>
          <div className="mt-4">
            <div>
              <a
                href="./do-task"
                className="bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-900 font-bold py-2 px-4 mr-4 rounded"
              >
                Get Started
              </a>
              <a href="./Fitur" className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-400 active:text-purple-700">Learn more <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center my-auto sm:my-auto lg:hidden">
        <div className="text-center bg-transparent">
          <h1 className="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
            To-Do List
          </h1>
          <p>Make Your Plans More Organized With To-Do List</p>
          <div className="mt-4">
            <div>
              <a
                href="./do-task"
                className="bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-900 font-bold py-2 px-4 mr-4 rounded"
              >
                Get Started
              </a>
              <a
                href="./fitur"
                className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500 active:text-purple-700"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
