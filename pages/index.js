// titles, metatags
import Head from 'next/head';

import ImageSlider from '../components/ImageSlider'
import ImageSliderData from '../components/ImageSliderData'

export default function Home({}) {
  return (
    // all elements must be within this opening div
    <div>
      <Head>
        <title>highorlo | Home</title>
        <meta name='keywords' content='judging, competitions, ratings' />
      </Head>
      <ImageSlider slides={ImageSliderData}/>
    <h1>This is the home page :)</h1>
    </div>
  )
}


