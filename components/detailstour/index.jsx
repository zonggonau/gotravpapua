"use client";
import Image from "next/image";
import React from "react";

export default function CompDetailTour() {
  return (
    <div class="main-content">
      <div class="rs-breadcrumbs breadcrumbs-overlay">
        <div class="breadcrumbs-img">
          <Image
            src={`${process.env.NEXT_PUBLIC_HOST}assets/images/breadcrumbs/9.png`}
            alt="Breadcrumbs Image"
            width={500}
            height={500}
          />
        </div>
        <div class="breadcrumbs-text white-color">
          <h1
            class="page-title white-color wow fadeInUp"
            data-wow-delay="300ms"
            data-wow-duration="2000ms"
          >
            Events-Detail
          </h1>
          <div
            class="sec-title mb-40 md-mb-20 wow fadeInUp"
            data-wow-delay="300ms"
            data-wow-duration="2000ms"
          >
            <div class="desc text-center col-md-6 mx-auto">
              Discover the untouched beauty of Papua with our Papuan Paradise
              Expedition, Coastal Retreat, Wildlife Safari, Cultural Immersion,
              Diving Expedition, Highlands Adventure, River Expedition, and many
              more
            </div>
            <ul class="my-3 white-color">
              <li>
                <a class="active" href="index.html">
                  Home
                </a>
              </li>
              <li>Destinations</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="rs-services home12-style">
        <div id="tour-packages" class=" pt-100 pb-100 md-pt-70 md-pb-70">
          <div class="container py-5">
            <div class="row">
              <div class="mb-5">
                <h1>Baliem Valley Festival</h1>
                <ul class="blog-meta">
                  <li>
                    <small class="border p-2 px-3">
                      <i class="fa-solid fa-calendar-check-o"></i> 8 Aug 2023 -
                      10 Aug 2023
                    </small>
                  </li>
                </ul>
              </div>
              <div class="col">
                <Image
                  src={`${process.env.NEXT_PUBLIC_HOST}assets/images/events-detail/1.jpg`}
                  class="round-circle shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                  width={500}
                  height={500}
                />
              </div>
              <div class="col">
                <Image
                  src={`${process.env.NEXT_PUBLIC_HOST}assets/images/events-detail/2.jpg`}
                  class="round-circle shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                  width={500}
                  height={500}
                />
              </div>
              <div class="col">
                <Image
                  src={`${process.env.NEXT_PUBLIC_HOST}assets/images/events-detail/3.jpg`}
                  class="round-circle shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                  width={500}
                  height={500}
                />
              </div>
              <div class="mt-3">
                <p class="text-center border-black">
                  We denounce with righteous indige nation and dislike men who
                  are so beguiled and demo realized by the charms of pleasure of
                  the moment, so blinded by desire, that they cannot foresee the
                  pain and trouble that are bound to ensue; and equal blame
                  belongs to those who fail in their duty through weakness of
                  will, which is the same as saying through shrinking from toil
                  and pain. These cases are perfectly simple and easy to
                  distinguish. In a free hour, when our power of choice is
                  untrammelled and when nothing prevents our being able to do
                  what we like best, every pleasure is to be welcomed and every
                  pain avoided. Interactively procrastinate high-payoff content
                  without backward-compatible data. Quickly cultivate optimal
                  processes and tactical architectures. Completely iterate
                  covalent strategic theme areas via accurate e-markets.
                  Globally incubate standards compliant channels before scalable
                  benefits. Leverage agile frameworks to provide a robust
                  synopsis for high level overviews. Iterative approaches to
                  corporate strategy foster collaborative thinking to further
                  the overall value proposition. Organically grow the holistic
                  world view of disruptive innovation via workplace diversity
                  and empowerment. Bring to the table win-win survival
                  strategies to ensure proactive domination. At the end of the
                  day, going forward, a new normal that has evolved from
                  generation X is on the runway heading towards a streamlined
                  cloud solution. User generated content in real-time will have
                  multiple touchpoints for offshoring. Phosfluorescently engage
                  worldwide methodologies with web-enabled technology.
                  Interactively coordinate proactive e-commerce via
                  process-centric “outside the box” thinking. Completely pursue
                  scalable customer service through sustainable potentialities.
                  Collaboratively administrate turnkey channels whereas virtual
                  e-tailers. Objectively seize scalable metrics whereas
                  proactive e-services. Seamlessly empower fully researched
                  growth strategies and interoperable internal or “organic”
                  sources. Proactively fabricate one-to-one materials via
                  effective e-business. Completely synergize scalable e-commerce
                  rather than high standards in e-services. Assertively iterate
                  resource maximizing products after leading-edge intellectual
                  capital. Capitalize on low hanging fruit to identify a
                  ballpark value added activity to beta test. Override the
                  digital divide with additional clickthroughs from DevOps.
                  Nanotechnology immersion along the information highway will
                  close the loop on focusing solely on the bottom line.
                  Interactively procrastinate high-payoff content without
                  backward-compatible data. Quickly cultivate optimal processes
                  and tactical architectures. Completely iterate covalent
                  strategic theme areas via accurate e-markets. Globally
                  incubate standards compliant channels before scalable
                  benefits. Quickly disseminate superior deliverables whereas
                  web-enabled applications. Quickly drive clicks-and-mortar
                  catalysts for change before vertical architectures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
