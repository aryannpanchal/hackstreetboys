'use client'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import HeaderMobile from '@/components/HeaderMobile'
import Testimonials from './../../components/Testimonials';
import Footer from './../../components/Footer';
import OfferSection from './../../components/OfferSection';
import Indicator from './../../components/Indicator';
import Pricing from './../../components/Pricing';
import Stats from './../../components/Stats';
import FAQ from './../../components/FAQ';

const landingPage = () => {



    return(
        <div>
              {/* Navbar */}
              <Indicator />
              <Header />
              <HeaderMobile />
              <Hero />
              <Stats />
              <Testimonials />
              <OfferSection />
              <Pricing />
              <FAQ />
              <Footer />


        
        </div>
    )
  }


export default landingPage;