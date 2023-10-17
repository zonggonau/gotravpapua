import {
  Adventure,
  Contact,
  Destinations,
  Event,
  TourPackages,
} from "@/components";
const dataCarouselHero = [
  {
    id: 1,
    title: "Embrace the wonder of birdwatching",
    imageUrl: "assets/images/slider/5.png",
    desc: "Ea et quis aliquip officia amet proident dolore eu consequat. Ipsum laboris proident sit esse velit tempor ipsum proident in officia exercitation non dolor. Enim exercitation officia dolore voluptate voluptate. Velit Lorem anim veniam do dolore ea exercitation est consequat proident eu fugiat ea. Consequat sunt mollit veniam elit irure consectetur deserunt ad fugiat duis ad irure labore. Dolor aliquip dolor aliqua ex reprehenderit magna ullamco consequat officia ut.",
    link: "#",
  },
  {
    id: 2,
    title: "Experience the enchanting underwater world through snorkeling",
    imageUrl: "assets/images/slider/1.png",
    desc: "Ea et quis aliquip officia amet proident dolore eu consequat. Ipsum laboris proident sit esse velit tempor ipsum proident in officia exercitation non dolor. Enim exercitation officia dolore voluptate voluptate. Velit Lorem anim veniam do dolore ea exercitation est consequat proident eu fugiat ea. Consequat sunt mollit veniam elit irure consectetur deserunt ad fugiat duis ad irure labore. Dolor aliquip dolor aliqua ex reprehenderit magna ullamco consequat officia ut.",
    link: "#",
  },
  {
    id: 3,
    title: "Delve into the rich and captivating world of Papuan culture",
    imageUrl: "assets/images/slider/2.png",
    desc: "Ea et quis aliquip officia amet proident dolore eu consequat. Ipsum laboris proident sit esse velit tempor ipsum proident in officia exercitation non dolor. Enim exercitation officia dolore voluptate voluptate. Velit Lorem anim veniam do dolore ea exercitation est consequat proident eu fugiat ea. Consequat sunt mollit veniam elit irure consectetur deserunt ad fugiat duis ad irure labore. Dolor aliquip dolor aliqua ex reprehenderit magna ullamco consequat officia ut.",
    link: "#",
  },
  {
    id: 4,
    title:
      "Embark on an exhilarating journey through nature's wonders with hiking",
    imageUrl: "assets/images/slider/3.png",
    desc: "Ea et quis aliquip officia amet proident dolore eu consequat. Ipsum laboris proident sit esse velit tempor ipsum proident in officia exercitation non dolor. Enim exercitation officia dolore voluptate voluptate. Velit Lorem anim veniam do dolore ea exercitation est consequat proident eu fugiat ea. Consequat sunt mollit veniam elit irure consectetur deserunt ad fugiat duis ad irure labore. Dolor aliquip dolor aliqua ex reprehenderit magna ullamco consequat officia ut.",
    link: "#",
  },
  {
    id: 5,
    title: "Dive into the exhilarating world of surfing",
    imageUrl: "assets/images/slider/4.png",
    desc: "Ea et quis aliquip officia amet proident dolore eu consequat. Ipsum laboris proident sit esse velit tempor ipsum proident in officia exercitation non dolor. Enim exercitation officia dolore voluptate voluptate. Velit Lorem anim veniam do dolore ea exercitation est consequat proident eu fugiat ea. Consequat sunt mollit veniam elit irure consectetur deserunt ad fugiat duis ad irure labore. Dolor aliquip dolor aliqua ex reprehenderit magna ullamco consequat officia ut.",
    link: "#",
  },
  {
    id: 6,
    title: "Roar into the realm of adventure with motorcycling",
    imageUrl: "assets/images/slider/6.png",
    desc: "Ea et quis aliquip officia amet proident dolore eu consequat. Ipsum laboris proident sit esse velit tempor ipsum proident in officia exercitation non dolor. Enim exercitation officia dolore voluptate voluptate. Velit Lorem anim veniam do dolore ea exercitation est consequat proident eu fugiat ea. Consequat sunt mollit veniam elit irure consectetur deserunt ad fugiat duis ad irure labore. Dolor aliquip dolor aliqua ex reprehenderit magna ullamco consequat officia ut.",
    link: "#",
  },
];

const Categories = [
  {
    id: 0,
    title: "Tour Packages",
    slug: "/tour-packages",
    name: "Tour Packages",
  },
  {
    id: 1,
    title: "Destination",
    slug: "/destination",
    name: "Destination",
  },
  {
    id: 2,
    title: "Adventures",
    slug: "/adventures",
    name: "Adventures",
  },
  {
    id: 3,
    title: "Events",
    slug: "/events",
    name: "Events",
  },
  {
    id: 4,
    title: "Contact",
    slug: "/contact",
    name: "Contact",
  },
];

const potongParagraf = (data) => {
  let jumlahHuruf = 100;
  let potongKalimat = data.slice(0, jumlahHuruf);
  return <p>{potongKalimat}</p>;
};

export { dataCarouselHero, Categories, potongParagraf };
