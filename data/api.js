const TOKEN = "";
const HOST = process.env.NEXT_PUBLIC_HOST_API;
const endpoint = {
  slider: HOST + "sliders",
  tourpackages: HOST + "tour-packages",
  tourdestinations: HOST + "tour-destinations",
  touradventures: HOST + "tour-adventures",
  tourevents: HOST + "tour-events",
  settings: HOST + "settings",
};
const fetcher = (url) => fetch(url).then((res) => res.json());

async function getDataTourDestination() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + "tour-destinations",
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataTourPackages() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-packages", {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataAdventures() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + "tour-adventures",
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataEvents() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-events", {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataSlider() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "sliders", {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataDetails(category, slug) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + category + "/" + slug + "/detail",
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getSettings() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "settings", {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getAnotherTour(category) {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + category, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export {
  fetcher,
  HOST,
  endpoint,
  getDataAdventures,
  getDataDetails,
  getDataEvents,
  getDataSlider,
  getDataTourDestination,
  getDataTourPackages,
  getSettings,
  getAnotherTour,
};
