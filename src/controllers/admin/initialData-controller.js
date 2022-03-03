const CategoryModel = require('../../models/category-model');
const ProductsModel = require('../../models/product-model');


function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id),
        })
    }
    return categoryList;
}


async function initialData(req,res){
    const categories = await CategoryModel.find({}).exec();
    const products = await ProductsModel.find({})
        .select('_id name price quantity slug description productPictures category')
        .populate({path:'category', select:'_id name'})
        .exec();
    res.status(200).json({
        categories: createCategories(categories),
        products
    })
}

module.exports = initialData