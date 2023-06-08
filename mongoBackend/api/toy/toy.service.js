const { ObjectId } = require('mongodb')

const utilService = require('../../services/util.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg,
}


/////// take care of filter parameters/////////////////////////////////////////
async function query(filsort = { title: '' ,sortBy:{type:'title', desc:1}}) {
    // const x = _buildCriteria(filsort)
    // console.log(x)
    try {
        const criteria = _buildCriteria(filsort)
        const { sortBy } = filsort
        const collection = await dbService.getCollection('toy')

        var toys = await collection.find(criteria).sort({[sortBy.type]:+sortBy.desc}).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

function _buildCriteria(filsort) {

    const { filterBy } = filsort
    console.log('filter byyyyyyyyyyyyyyyy', filterBy)
    const criteria = {}

    if (filterBy.title) {
        criteria.title = { $regex: filterBy.title, $options: 'i' }
    }
    if (filterBy.maxPrice) {
        criteria.price = { $lte: +filterBy.maxPrice }
    }
    if (filterBy.inStock === 'inStock') {
        criteria.inStock = true
    }
    if (filterBy.inStock === 'notInStock') {
        criteria.inStock = false
    }

    console.log('criteriaaaaaaaaaaaaaaaaa', criteria)
    return criteria
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            title: toy.title,
            price: toy.price,
            labels: toy.labels,
            inStock: toy.inStock,
            image: toy.image
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne(
            { _id: ObjectId(toyId) },
            { $push: { msgs: msg } }
        )
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toy._id}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne(
            { _id: ObjectId(toyId) },
            { $pull: { msgs: { id: msgId } } }
        )
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toy._id}`, err)
        throw err
    }
}

