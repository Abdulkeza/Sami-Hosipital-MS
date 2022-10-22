import expressAsyncHandler from "express-async-handler";

const handleGetAll = expressAsyncHandler(async (Model) => {
    const items = await Model.find({}).sort({
        createdAt: -1
    });
    return items;
});

const handleCreate = expressAsyncHandler (async (Model, data, res, responseMessage) => {
    if(!Object.keys(data).length) return res.status(400).json({status: "Fail", message: responseMessage})
    const newItem = await Model.create({data});

    return  res.status(400).json({status: "Success", newItem});

});

const handleGetSingle = expressAsyncHandler (async (Model, itemId, res, responseMessage) => {
//  const { id } = req.params;    //???????????????????????????????????????????????????????????????
 const item = await Model.findById(itemId);
 if(!item) return res.status(404).json({status: "Fail", message: responseMessage });

 return res.status(200).json({status: "Success", item});
});

const handleEdit = expressAsyncHandler(async (Model, itemId, data, res, responseMessage) => {
    // const { id } = req.params;

    const itemExist = await Model.findById({_id: itemId});
    if(!itemExist) return res.status(404).json({status: "Fail", message: responseMessage });
    const updatedItem = await Model.findByIdAndUpdate(itemId, data, {new: true});

    return res.status(200).json({status: "Success", updatedItem});

});

const handleDelete = (async (Model, itemId, responseMessage) => {
    const itemExist = await Model.findById({_id: itemId});
   if(!itemExist) return res.status(404).json({status: "Fail", message: responseMessage });
    return await Model.deleteOne({_id: itemId});
});

export {
    handleGetAll,
    handleCreate,
    handleGetSingle,
    handleEdit,
    handleDelete
};