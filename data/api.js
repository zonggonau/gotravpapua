async function getDataTourDestination() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + "tour-destinations",
    { cache: "force-cache", next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataTourPackages() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-packages", {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataAdventures() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + "tour-adventures",
    { cache: "force-cache", next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataEvents() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-events", {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataSlider() {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_API + "tour-events", {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataDetails(category, slug) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + category + "/" + slug + "/detail",
    { cache: "force-cache", next: { revalidate: 3600 } }
  );

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
};
