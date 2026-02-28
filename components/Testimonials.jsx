import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image'

const Testimonials = () => {

  return (
    <>
    <section className='laptop:mb-[150px] laptop:mt-24 mobile:mt-16 laptop:mx-24  mobile:mx-4'>
      <h2 className='laptop:hidden text-center mobile:block font-semibold text-3xl'>Testimonials</h2>
      <div className='grid laptop:grid-cols-4 gap-6 mt-5 p-6'>
        <div className='relative bg-white text-black shadow-2xl p-6 rounded-lg laptop:col-span-2'>
          <Image src='/comma.svg' alt='' width={32} height={32} className='absolute top-0 right-6 z-0' />
          <div className='flex justiify-start space-x-4 relative z-10'>
            <Image src='/avnit.png' alt='' width={32} height={32} className='h-12 w-12 rounded-full border-2 border-pruple-400'/>
            <div>
              <h2 className='font-bold text-xl'>Avnit Khade</h2>
              <h3 className='text-lg opacity-50'>★★★★</h3>
            </div>
          </div>
          <p className='realtive z-10 mt-4 font-bold text-xl leading-tight'>
          Marketing Head, Sammy bakers
          </p>
          <p className='mt-4 laptop:text-2xl opacity-70 '>
          No more pixelation or awkward cropping! AspectAI AI-powered resizing ensures my brand videos always look professional on any platform.
          </p>
        </div>
        <div className='relative bg-white text-black p-8 rounded-lg shadow-2xl'>
          <div className='flex justiify-start space-x-4 relative z-10'>
            <Image src='/anmol.jpg' alt='' width={32} height={32} className='h-12 w-12 rounded-full border-2 border-pruple-400'/>
            <div>
              <h2 className='font-bold text-xl'>Anmol Dureja</h2>
              <h3 className='text-md opacity-50'>★★★★</h3>
            </div>
          </div>
          <p className='realtive z-10 mt-4 font-bold text-xl leading-tight'>
          Founder & CEO, BharatSave
          </p>
          <p className='mt-4 laptop:text-2xl opacity-70 '>
          SmartTags nailed it! The AI-generated hashtags helped my video go viral on Instagram. More engagement, less effort. Love it!
          </p>
        </div>
        <div className='relative bg-white text-black p-8 rounded-lg laptop:row-span-2 shadow-2xl'>
          <div className='flex justiify-start space-x-4 relative z-10'>
            <Image src='/manasvi.svg' alt='' width={32} height={32} className='h-12 w-12 rounded-full border-2 border-pruple-400'/>
            <div>
              <h2 className='font-bold text-xl'>Manasvi Patil</h2>
              <h3 className='text-lg opacity-96'>★★★★★</h3>
            </div>
          </div>
          <p className='realtive z-10 mt-4 font-bold text-xl leading-tight'>
          Co-founder, MiniatureArtz
          </p>
          <p className='mt-4 laptop:text-4xl opacity-70 '>
          AspectAI streamlined our social media workflow. We resize, optimize, and tag videos effortlessly—engagement has skyrocketed!
          </p>
        </div>
        <div className='relative text-black p-8 rounded-lg laptop:col-span-2 mobile:hidden laptop:block '>
            <marquee scrollamount="15">
            <p className='text-9xl opacity-50'>Testimonials</p> 
            </marquee>
          </div>           
       
        <div className='relative bg-white text-black p-8 rounded-lg laptop:row-span-2 laptop:row-start-2 laptop:col-start-1 shadow-2xl'>
          <div className='flex justiify-start space-x-4 relative z-10'>
            <Image src='/mohit.svg' alt='' width={32} height={32} className='h-12 w-12 rounded-full border-2 border-pruple-400'/>
            <div>
              <h2 className='font-bold text-xl'>Mohit Laddha</h2>
              <h3 className='text-lg opacity-50'>★★★★</h3>
            </div>
          </div>
          <p className='realtive z-10 mt-4 font-bold text-xl leading-tight'>
          Founder, Boxyman
          </p>
          <p className='mt-4 laptop:text-2xl opacity-70 '>
          AspectAI saved me hours of editing! One click, and my videos are perfectly resized for Instagram, TikTok, and YouTube. Absolute game-changer!
          </p>
        </div>
        </div>
    </section>
    </>
  );
};

export default Testimonials;