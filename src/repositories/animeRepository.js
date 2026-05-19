
const { ObjectId } = require("mongodb");
const dbPromise = require("../config/database");

async function col() {
  const client = await dbPromise;
  return client.db().collection("animes");
}

exports.create = async (anime) => {
  return (await col()).insertOne(anime);
};

exports.findAllByUser = async (userId, { page, limit }) => {
  const collection = await col();

  const skip = (page - 1) * limit;

  const data = await collection
    .find({ userId })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await collection.countDocuments({ userId });

  return { data, total };
};

exports.findById = async (id, userId) => {
  return (await col()).findOne({
    _id: new ObjectId(id),
    userId,
  });
};

exports.update = async (id, userId, updateData) => {
  return (await col()).updateOne(
    { _id: new ObjectId(id), userId },
    { $set: updateData }
  );
};

exports.delete = async (id, userId) => {
  return (await col()).deleteOne({
    _id: new ObjectId(id),
    userId,
  });
};

exports.search = async (userId, query) => {
  const collection = await col();

  return collection
    .find({
      userId,
      title: {
        $regex: query,
        $options: "i"
      }
    })
    .limit(8)
    .toArray();
};
