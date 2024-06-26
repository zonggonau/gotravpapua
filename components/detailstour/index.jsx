'use client'
import { potongParagraf } from "@/data";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from 'react-share'
import Image from "next/image";
import Link from "next/link";

function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function CompDetailTour({ data, category, slug, tour }) {
  const shuffledData = shuffleArray(tour.data).filter(
    (item) => item.slug !== slug
  );
  const limitedData = shuffledData.slice(0, 3);
  const changeSlug = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

   
  return (
    <div className="main-content bg-stone-100">
      <div className="container pt-10 pb-48">
        <div className="row">
          <div className="mx-auto col-lg-8  bg-white shadow-sm">
            <div class=" text-black pt-24 pb-24 pl-24">
              <Link href="/">Home</Link> &gt;
              <Link href={`/${category}`}>{changeSlug}</Link>
              <Link href="#" className="disabled lowercase"></Link> &gt; {data.title}
            </div>
            <div className="pl-24 pr-24">
              <Image
                src={process.env.NEXT_PUBLIC_HOSTNAME + data.picture}
                className="round-circle shadow-lg mb-5 bg-body-tertiary rounded"
                alt={data.description}
                width={1000}
                height={1000}
                loading="lazy"
              />
            </div>

            <div className="pl-24 pr-24">
              <div className="mb-1">
                <h2 className="font-extrabold">{data.title}</h2>
                <div className="font-extrabold" dangerouslySetInnerHTML={{ __html: data.description }}></div>
              </div>
              <div className="mb-48">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.body,
                  }}
                ></div>
              </div>
              <div className="space-x-5 pb-5">
                <FacebookShareButton  hashtag={`${data.description} #GotravPapua #Travel #TravelPapua #HiuPaus`} title={data.title} url={`${process.env.NEXT_PUBLIC_HOST}/${category}/${data.slug}` }>
                  <FacebookIcon size={40} />
                </FacebookShareButton>
                <TwitterShareButton hashtag={`${data.description} #GotravPapua #Travel #TravelPapua #HiuPaus`} title={data.title} url={`${process.env.NEXT_PUBLIC_HOST}/${category}/${data.slug}`}>
                  <TwitterIcon size={40} />
                </TwitterShareButton>
                <WhatsappShareButton hashtag={`${data.description} #GotravPapua #Travel #TravelPapua #HiuPaus`} title={data.title} url={`${process.env.NEXT_PUBLIC_HOST}/${category}/${data.slug}`}>
                  <WhatsappIcon size={40} />
                </WhatsappShareButton>
                <LinkedinShareButton hashtag={`${data.description} #GotravPapua #Travel #TravelPapua #HiuPaus`} title={data.title} url={`${process.env.NEXT_PUBLIC_HOST}/${category}/${data.slug}`}>
                  <LinkedinIcon size={40} />
                </LinkedinShareButton>
              </div>
            </div>
          </div>
          {/* <RightBar /> */}
        </div>
        {/* <div className="row pt-16">
          <div className="mx-auto col-lg-8  bg-white shadow-sm">
            <div className="pt-28">
              <div className="mb-5">
                <h3 className="font-bold mb-3 pl-24 pr-24">{changeSlug}</h3>
                <p className="border"></p>
                <div className="row pt-2 pl-24 pr-24">
                  {limitedData.map((item, index) => (
                    <div className="col-lg-4 col-md-6 mb-24" key={index}>
                      <div className="courses-item border shadow-md">
                        <div className="courses-grid">
                          <div className="img-part">
                            <Link href={`/${category + "/" + item.slug}`}>
                              <Image
                                alt={item.title}
                                loading="lazy"
                                width={500}
                                height={500}
                                src={
                                  process.env.NEXT_PUBLIC_HOSTNAME +
                                  item.picture
                                }
                              />
                            </Link>
                          </div>
                          <div className="content-part p-3">
                            <h5 className="title">
                              <Link href={`${category}/${item.slug}`}>
                                {item.title}
                              </Link>
                            </h5>
                            {potongParagraf(item.description)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div> */}
      </div>
    </div >
  );
}
