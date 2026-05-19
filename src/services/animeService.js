
const repo = require("../repositories/animeRepository");
const { createAnime, updateAnime, toPublic } = require("../models/animeModel");

exports.create = async (data) => {
  const anime = createAnime(data);

  const result = await repo.create(anime);

  return {
    ...toPublic(anime),
    id: result.insertedId.toString(),
  };
};

exports.getAll = async (userId, { page = 1, limit = 10 }) => {
  const { data, total } = await repo.findAllByUser(userId, {
    page,
    limit,
  });

  return {
    data: data.map(toPublic),
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

exports.getById = async (id, userId) => {
  const anime = await repo.findById(id, userId);

  if (!anime) throw new Error("NOT_FOUND");

  return toPublic(anime);
};

exports.update = async (id, userId, data) => {
  const existing = await repo.findById(id, userId);
  if (!existing) throw new Error("NOT_FOUND");

  const updated = updateAnime(existing, data);

  await repo.update(id, userId, updated);

  return toPublic(updated);
};

exports.remove = async (id, userId) => {
  const result = await repo.delete(id, userId);

  if (result.deletedCount === 0) {
    throw new Error("NOT_FOUND");
  }

};

exports.search = async (userId, query) => {
  if (!query || !query.trim()) {
    return [];
  }

  const result = await repo.search(
    userId,
    query.trim()
  );

  return result.map(toPublic);
};