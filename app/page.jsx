import React from 'react'
import { createClient } from './lib/supabase/server';
import NavbarComponent from './components/navbar/NavbarComponent';
import VideoSlider from './components/hero/HeroComponent';
import CheckoutGood from './components/checkouts/CheckoutGood';
import WhyChooseUs from './components/why us/WhyChooseUs';
import IndustryUpdates from './components/industry updates/IndustryUpdates';
import CoreServices from './components/core services/CoreServices';
import AboutHero from './components/abouthero/AboutHero';
import WhereToBuy from './components/wheretobuy/WhereToBuy';
import Footer from './components/footer/Footer';

export default async function page() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  return (
    <div>
        <NavbarComponent />
        <VideoSlider />
        <CheckoutGood categories={categories || []} />
        <WhyChooseUs />
        <IndustryUpdates />
        <CoreServices />
        <AboutHero />
        <WhereToBuy />
        <Footer />
    </div>
  )
}
