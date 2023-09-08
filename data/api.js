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

async function getDataDetailsPackages(slug) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_API + "tour-packages/" + slug + "/detail"
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
  getDataDetailsPackages,
};
