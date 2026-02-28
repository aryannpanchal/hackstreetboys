import React from "react";
import Accordion from "./Accordian";

const FAQ = () => {
  return (
    <div>
      <section className='mb-24 laptop:mx-24 laptop:pt-[50px]  mobile:mx-4'>
        <div className='text-center text-4xl font-semibold mb-5' id="faq-section">
          <h4>Frequently Asked Questions</h4>
        </div>
        <div className="p-4 bg-white rounded-lg text-black border border-1 shadow text-md">
          <Accordion
            title={<h5 className='font-bold laptop:text-lg'>Why choose AspectAI?</h5>}
            answer={<p className='pt-2 text-black laptop:text-md opacity-95'>AspectAI is the ultimate AI-powered solution for resizing and converting videos for any platform. With our advanced technology, you can ensure your content is always perfectly optimized for YouTube, Instagram, TikTok, and other platforms. Our system intelligently adjusts aspect ratios, re-crops frames, and re-formats videos while preserving high quality. Say goodbye to time-consuming manual edits and embrace an effortless, automated process.</p>}
            className='lg:text-left gap-14 '
            id='accordian'
          />
          <hr />
          <Accordion
            title={<h5 className='font-bold laptop:text-lg'>How does AspectAI optimize videos?</h5>}
            answer={<p className='pt-2 text-black laptop:text-md opacity-95'>AspectAI uses advanced AI algorithms to analyze the content of your video and intelligently adjust its aspect ratio, re-crop frames, and reformat it for various platforms. Our system ensures that the quality of your videos is maintained, no matter what platform youre posting on. Whether youre preparing content for YouTube, Instagram, TikTok, or more, AspectAI ensures your videos look their best, every time.</p>}
            className='lg:text-left'
          />
          <hr />
          <Accordion
            title={<h5 className='font-bold laptop:text-lg'>What platforms does AspectAI support?</h5>}
            answer={<p className='pt-2 text-black laptop:text-md opacity-95'>AspectAI supports all major video platforms, including YouTube, Instagram, TikTok, Facebook, and more. Our intelligent video resizing and format conversion ensure that your content is perfectly tailored to each platforms requirements. Whether you are sharing videos on social media, marketing, or business presentations, AspectAI adapts to meet your needs effortlessly.</p>}
            className='lg:text-left svg'
          />
          <hr />
          <Accordion
            title={<h5 className='font-bold laptop:text-lg'>How easy is it to use AspectAI?</h5>}
            answer={<p className='pt-2 text-black laptop:text-md opacity-95'>AspectAI is incredibly user-friendly. With just a few clicks, you can upload your video, and our AI-powered system will automatically handle the resizing and format conversion for you. There is no need for manual edits or technical know-how, and the process is quick, efficient, and seamless, so you can focus on creating content, not spending time on video formatting.</p>}
            className='lg:text-left'
          />
          <hr />
          <Accordion
            title={<h5 className='font-bold laptop:text-lg'>Does AspectAI maintain video quality?</h5>}
            answer={<p className='pt-2 text-black laptop:text-md opacity-95'>Absolutely! One of AspectAIs standout features is its ability to maintain the high quality of your videos even after reformatting or resizing. Our AI-powered technology ensures that your videos resolution, frame rate, and overall quality are preserved, giving you a polished final result suitable for any platform, without sacrificing visual integrity.</p>}
            className='lg:text-left'
          />       

        </div>
      </section>
    </div>
  );
};

export default FAQ;
