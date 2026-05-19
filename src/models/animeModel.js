const VALID_STATUS = ["watching", "completed", "planned", "paused", "dropped"];

function createAnime(data) {
  const {
    imageUrl,
    title,
    description,
    rating,
    episodes,
    status,
    userId,
  } = data;

  if (!title) throw new Error("TITLE_REQUIRED");

  if (rating != null && (rating < 0 || rating > 10)) {
    throw new Error("INVALID_RATING");
  }

  if (status && !VALID_STATUS.includes(status)) {
    throw new Error("INVALID_STATUS");
  }

  return {
    imageUrl: imageUrl || null,
    title: title.trim(),
    description: description || "",
    rating: rating ?? null,
    episodes: episodes ?? 0,
    status: status || "planned",
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}


function updateAnime(existing, data) {
  const {
    imageUrl,
    title,
    description,
    rating,
    episodes,
    status,
    userId,
  } = data;

  
  if (!title) throw new Error("TITLE_REQUIRED");

  if (rating != null && (rating < 0 || rating > 10)) {
    throw new Error("INVALID_RATING");
  }

  if (status && !VALID_STATUS.includes(status)) {
    throw new Error("INVALID_STATUS");
  }

  return {
    _id: existing._id,
    imageUrl: imageUrl ?? existing.imageUrl,
    title: title.trim(),
    description: description ?? existing.description,
    rating: rating ?? existing.rating,
    episodes: episodes || existing.episodes,
    status: status || existing.status,
    createdAt: existing.createdAt,
    updatedAt: new Date(),
  };
}

function toPublic(anime) {
  return {
    _id: anime._id?.toString(),
    imageUrl: anime.imageUrl,
    title: anime.title,
    description: anime.description,
    rating: anime.rating,
    episodes: anime.episodes,
    status: anime.status,
    createdAt: anime.createdAt,
  };
}

module.exports = { createAnime, updateAnime, toPublic };