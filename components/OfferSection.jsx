import React from 'react';

const OfferSection = () => {
  const features = [
    {
      title: 'AI-Powered Smart Cropping & Reframing',
      desc: 'Unlike generic tools that simply resize videos, AspectAI intelligently detects the main subject and automatically adjusts framing to keep key elements in focus—perfect for maintaining engagement across platforms.',
    },
    {
      title: 'One-Click Multi-Platform Optimization',
      desc: 'With just a single click, AspectAI resizes and reformats videos for YouTube, Instagram, TikTok, Facebook, and more—eliminating the manual effort of adjusting aspect ratios and dimensions separately for each platform.',
    },
    {
      title: 'Quality Retention & Enhancement',
      desc: 'Many resizing tools reduce video quality, but AspectAI uses AI-driven upscaling and optimization to maintain sharpness, colors, and details, ensuring professional-looking output.',
    },
    {
      title: 'Automatic Format Adaptation',
      desc: 'It doesn’t just resize—it converts video formats, ensuring compatibility with different platforms, whether it’s MP4, MOV, WebM, or vertical vs. horizontal layouts.',
    },
    {
      title: 'Time-Saving Automation for Creators & Businesses',
      desc: 'For content creators and businesses managing multiple social platforms, AspectAI eliminates hours of manual editing, helping them publish content faster and more efficiently.',
    },
    {
      title: 'Enterprise plans',
      desc: 'Collaboration with your enterprise marketing team! We will tailor the deliverables smartly to suit your needs.',
    },
  ];

  return (
    <section id='services' className="bg-white laptop:mb-30 mobile:mb-24 laptop:mx-24  mobile:mx-4">
      <div className=" px-4 text-betterblack md:px-8 laptop:mt-28 mobile:mt-16">
        <div className="max-w-screen-xl space-y-3 pt-3 text-center ">
          <p className="text-black font-semibold laptop:text-4xl mobile:text-3xl text-center">
            What makes AspectAI better?
          </p>
        </div>
        <div className="mt-12 ">
          <ul className="grid gap-y-8 gap-x-12 mobile:grid-cols-1 laptop:grid-cols-3 ">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="space-y-6 p-4 rounded-md neumorphic-card shadow-lg"
              >
                <h4 className="text-blue-900 mobile:text-xl laptop:text-2xl">
                  {item.title}
                </h4>
                <p className="text-black laptop:text-sm mobile:text-lg">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;