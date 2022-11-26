import expressAsyncHandler from "express-async-handler";

const handleGetAll = expressAsyncHandler(async (Model) => {
  const items = await Model.find({}).sort({
    createdAt: -1,
  });

  return items ? items : " Internal server error";
});

const handleCreate = expressAsyncHandler(async (Model, data, res) => {
  if (!Object.keys(data).length)
    return res
      .status(400)
      .json({ status: "Fail", message: "please provide required information" });
  const body = await Model.create(data);

  return res.status(400).json(body);
});

const handleGetSingle = expressAsyncHandler(async (Model, itemId) => {
  return await Model.findById(itemId, {password: 0}, (error, result) => {
    if (error) {
        return null
    }
    return result
}).clone().catch((err) => { console.log(err)})
});

const handleEdit = expressAsyncHandler(
  async (Model, itemId, data, res, responseMessage) => {
    // const { id } = req.params;

    const itemExist = await Model.findById({ _id: itemId });
    if (!itemExist)
      return res.status(404).json({ status: "Fail", message: responseMessage });
    const updatedItem = await Model.findByIdAndUpdate(itemId, data, {
      new: true,
    });

    return res.status(200).json({ status: "Success", updatedItem });
  }
);

const handleDelete = async (Model, id) => {
  return await Model.deleteOne({ _id: id });
};

export {
  handleGetAll,
  handleCreate,
  handleGetSingle,
  handleEdit,
  handleDelete,
};
