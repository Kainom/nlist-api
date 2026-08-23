
const { ObjectId } = require("mongodb");
const repo = require("../repositories/animeRepository");
const { createAnime, updateAnime, toPublic } = require("../models/animeModel");

// id inválido faria new ObjectId() estourar e virar 500
const assertId = (id) => {
  if (!ObjectId.isValid(id)) throw new Error("INVALID_ID");
};

exports.create = async (data) => {
  const anime = createAnime(data);

  const result = await repo.create(anime);

  return {
    ...toPublic(anime),
    id: result.insertedId.toString(),
  };
};

exports.getAll = async (userId, { page = 1, limit = 8 }) => {
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
  assertId(id);

  const anime = await repo.findById(id, userId);

  if (!anime) throw new Error("NOT_FOUND");

  return toPublic(anime);
};

exports.update = async (id, userId, data) => {
  assertId(id);

  const existing = await repo.findById(id, userId);
  if (!existing) throw new Error("NOT_FOUND");

  const updated = updateAnime(existing, data);

  await repo.update(id, userId, updated);

  return toPublic(updated);
};

exports.remove = async (id, userId) => {
  assertId(id);

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