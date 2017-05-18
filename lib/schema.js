const Joi = require('joi')

// response schema

const townGeoSchema = Joi.object().keys({
    TownID: Joi.string().required(),
    TownName: Joi.string().required(),
    X: Joi.string().required(),
    Y: Joi.string().required(),
}).required()

const roadNameSchema = Joi.object().keys({
    rd_name_1: Joi.string().required(),
    section_1: Joi.alternatives().try(Joi.string(), Joi.object({}))
}).required()

const storeGeoSchema = Joi.object().keys({
    POIID: Joi.string().required(),
    POIName: Joi.string().required(),
    X: Joi.string().required(),
    Y: Joi.string().required(),
    Telno: Joi.alternatives().try(Joi.string(), Joi.object({})),
    FaxNo: Joi.alternatives().try(Joi.string(), Joi.object({})),
    Address: Joi.alternatives().try(Joi.string(), Joi.object({})),
    isDining: Joi.any().allow('Y', 'N'),
    isParking: Joi.any().allow('Y', 'N'),
    isLavatory: Joi.any().allow('Y', 'N'),
    isATM: Joi.any().allow('Y', 'N'),
    is7WiFi: Joi.any().allow('Y', 'N'),
    isIce: Joi.any().allow('Y', 'N'),
    isHotDog: Joi.any().allow('Y', 'N'),
    isHealthStations: Joi.any().allow('Y', 'N'),
    isIceCream: Joi.any().allow('Y', 'N'),
    isOpenStore: Joi.any().allow('Y', 'N'),
    isFruit: Joi.any().allow('Y', 'N'),
    isCityCafe: Joi.any().allow('Y', 'N'),
    isUnionPay: Joi.any().allow('Y', 'N'),
    isOrganic: Joi.any().allow('Y', 'N'),
    isCorn: Joi.any().allow('Y', 'N'),
    isMakeup: Joi.any().allow('Y', 'N'),
    isMuji: Joi.any().allow('Y', 'N'),
    isMisterDonuts: Joi.any().allow('Y', 'N'),
    isStarBucks: Joi.any().allow('Y', 'N'),
    isIbon: Joi.any().allow('Y', 'N'),
    isTea: Joi.any().allow('Y', 'N'),
    isSweetPotato: Joi.any().allow('Y', 'N'),
    SpecialStore_Kind: Joi.alternatives().try(Joi.string(), Joi.object({})),
    Store_URL: Joi.alternatives().try(Joi.string(), Joi.object({})),
}).required()

// request schema

const searchStoreParamsSchema = Joi.object().keys({
    city: Joi.string(),
    town: Joi.string(),
    roadname: Joi.string(),
    ID: Joi.string(),
    StoreName: Joi.string(),
    SpecialStore_Kind: Joi.string(),
    isDining: Joi.any().allow('True', 'False'),
    isParking: Joi.any().allow('True', 'False'),
    isLavatory: Joi.any().allow('True', 'False'),
    isATM: Joi.any().allow('True', 'False'),
    is7WiFi: Joi.any().allow('True', 'False'),
    isIce: Joi.any().allow('True', 'False'),
    isHotDog: Joi.any().allow('True', 'False'),
    isHealthStations: Joi.any().allow('True', 'False'),
    isIceCream: Joi.any().allow('True', 'False'),
    isOpenStore: Joi.any().allow('True', 'False'),
    isFruit: Joi.any().allow('True', 'False'),
    isCityCafe: Joi.any().allow('True', 'False'),
    isUp: Joi.any().allow('True', 'False'),
    isOrganic: Joi.any().allow('True', 'False'),
    isCorn: Joi.any().allow('True', 'False'),
    isMakeUp: Joi.any().allow('True', 'False'),
    isMuji: Joi.any().allow('True', 'False'),
    isMD: Joi.any().allow('True', 'False'),
    isStarBucks: Joi.any().allow('True', 'False'),
    isIbon: Joi.any().allow('True', 'False'),
    isTea: Joi.any().allow('True', 'False'),
    isSweetPotato: Joi.any().allow('True', 'False'),
    address: Joi.string(),
})

module.exports = {
    townGeoSchema, roadNameSchema, storeGeoSchema, searchStoreParamsSchema
}