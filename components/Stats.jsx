'use client'

import React from 'react';

const Stats = () => {

  return (
    <>
    <p id='stats' className='font-semibold laptop:mt-12 text-center laptop:text-4xl mobile:text-2xl pb-12 mobile:pt-24 laptop:pt-0'>Stats at a glance</p>
    <div
        className="mobile:mb-24 text-gray-100 body-font laptop:mb-36 shadow-xl border-primary border-2 laptop:mx-24 mobile:max-w-screen mobile:mx-6 rounded-2xl"
      >
        <section className="container px-5 mx-auto bg-h-100px p-6">
          <div className="flex flex-wrap m-4 text-center text-black">
            <div className="p-4 sm:w-1/4 w-1/2">
              <p className="title-font font-bold laptop:text-4xl mobile:text-3xl text-black">12+</p>
              <p className="leading-relaxed laptop:text-2xl text-black">Companies associated</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <p className="title-font font-bold laptop:text-4xl mobile:text-3xl text-black">100+</p>
              <p className="leading-relaxed laptop:text-2xl text-black">Conversions</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <p className="title-font font-bold laptop:text-4xl mobile:text-3xl text-black">35%+</p>
              <p className="leading-tight laptop:text-2xl text-black">Sales boost guarantee</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <p className="title-font font-bold laptop:text-4xl mobile:text-3xl text-black">24x7</p>
              <p className="leading-tight laptop:text-2xl text-black">Tech support</p>
            </div>
          </div>
        </section>
      </div>
    </>
      

  );
};

export default Stats;