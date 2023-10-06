const getTourPackage = (url) => fetch(url).then((res) => res.json());
const getSliders = (url) => fetch(url).then((res) => res.json());
const getAdventures = (url) => fetch(url).then((res) => res.json());

async function getDataTourDestination() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + "tour-destinations"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataTourPackages() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-packages");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataAdventures() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-adventures");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataEvents() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-events");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataSlider() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "sliders");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataDetails(category, slug) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + category + "/" + slug + "/detail"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getSettings() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "settings");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export {
  getDataTourDestination,
  getDataTourPackages,
  getDataAdventures,
  getDataEvents,
  getDataDetails,
  getDataSlider,
  getSettings,
  getTourPackage,
  getSliders,
  getAdventures,
};
