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
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataTourPackages() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-packages", {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataAdventures() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + "tour-adventures",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataEvents() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-events", {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataSlider() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "sliders", {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataDetails(category, slug) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + category + "/" + slug + "/detail",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getSettings() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "settings", {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getAnotherTour(category) {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + category, {
    next: { revalidate: 3600 }
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
