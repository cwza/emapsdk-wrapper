const { fetch } = require('fetch-ponyfill')()
const FormData = require('form-data')
const xml2json = require('xml2json') 
const Joi = require('joi')
const debug = require('debug')('emapsdk-wrapper:apis')

const cityToId = require('./cityToId.json')
const schema = require('./schema')
const errorType = require('./errorType')

const config = {
    emapsdkUrl: 'http://emap.pcsc.com.tw/EMapSDK.aspx'
}

const objectToFormdata = (object) => {
    return Object.keys(object).reduce((formdata, key) => {
        formdata.append(key, object[key])
        return formdata
    }, new FormData())
}

const searchStoreParamsToFormdata = (searchStoreParams) => {
    let defaultParams = {
        city:'',
        town:'',
        roadname: '',
        ID: '',
        StoreName: '',
        SpecialStore_Kind: '',
        isDining: 'False',
        isParking: 'False',
        isLavatory: 'False',
        isATM: 'False',
        is7WiFi: 'False',
        isIce: 'False',
        isHotDog: 'False',
        isHealthStations: 'False',
        isIceCream: 'False',
        isOpenStore: 'False',
        isFruit: 'False',
        isCityCafe: 'False',
        isUp: 'False',
        isOrganic: 'False',
        isCorn: 'False',
        isMakeUp: 'False',
        isMuji: 'False',
        isMD: 'False',
        isStarBucks: 'False',
        isIbon: 'False',
        isTea: 'False',
        isSweetPotato: 'False',
        address: '',
    }
    searchStoreParams = Object.assign(defaultParams, searchStoreParams)
    return objectToFormdata(searchStoreParams)
}

const postFormdataGetJson = (formdata) => {
    debug('#post to ' + config.emapsdkUrl)
    return fetch(config.emapsdkUrl, {
        method: 'POST',
        body: formdata
    })
    .then(response => {
        debug('http status code: ' + response.status)
        if (!response.ok) throw new errorType.HttpStatusError(response.status, 'HttpStatus error: ' + response.status)
        return response
    })
    .then(response => response.text())
    .then(body => {
        return xml2json.toJson(body, {object: true}) 
    })
}

const getCities = () => {
    return Object.keys(cityToId)
}

const getTowns = (city) => {
    debug('#getTown(' + city + ')')

    // generate formdata
    let cityId = cityToId[city] || ''
    let formdata = new FormData()
    formdata.append('commandId', 'GetTown')
    formdata.append('cityId', cityId)

    // fetch
    return postFormdataGetJson(formdata)
        .then(json => {
            debug('json body: ' + JSON.stringify(json))
            if (!json.iMapSDKOutput || !json.iMapSDKOutput.GeoPosition) return []
            if (! Array.isArray(json.iMapSDKOutput.GeoPosition)) return [json.iMapSDKOutput.GeoPosition]
            return json.iMapSDKOutput.GeoPosition
        })
}

const getRoads = (city, town) => {
    debug('#getRoads(' + city + ', ' + town + ')')
    if (!city) city = ''
    if (!town) town = ''

    // generate form data
    let formdata = new FormData()
    formdata.append('commandId', 'SearchRoad')
    formdata.append('city', city)
    formdata.append('town', town)

    // fetch
    return postFormdataGetJson(formdata)
        .then(json => {
            debug('json body: ' + JSON.stringify(json))
            if (!json.iMapSDKOutput || !json.iMapSDKOutput.RoadName) return []
            if (! Array.isArray(json.iMapSDKOutput.RoadName)) return [json.iMapSDKOutput.RoadName]
            return json.iMapSDKOutput.RoadName
        })
}

const getStores = (searchStoreParams) => {
    debug('#getStore() searchStoreParams: ' + JSON.stringify(searchStoreParams))
    // validate req
    let validation = Joi.validate(searchStoreParams, schema.searchStoreParamsSchema)
    if (validation.error) throw new errorType.ValidationError(validation.error)

    // generate form data
    let formdata = searchStoreParamsToFormdata(searchStoreParams)
    formdata.append('commandId', 'SearchStore')

    // fetch
    return postFormdataGetJson(formdata)
        .then(json => {
            debug('json body: ' + JSON.stringify(json))
            if (!json.iMapSDKOutput || !json.iMapSDKOutput.GeoPosition) return []
            if (! Array.isArray(json.iMapSDKOutput.GeoPosition)) return [json.iMapSDKOutput.GeoPosition]
            return json.iMapSDKOutput.GeoPosition
        })
}


module.exports = {
    getCities, getTowns, getRoads, getStores, config
}