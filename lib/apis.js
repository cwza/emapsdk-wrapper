const { fetch } = require('fetch-ponyfill')()
const debug = require('debug')('emapsdk-wrapper:apis')
const cityToId = require('./cityToId.json')
const errorType = require('./errorType')

let FormData
let x2js
if (typeof module !== 'undefined' && module.exports) {
    FormData = require('form-data')
    x2js = new (require('x2js'))()
} else {
    require('x2js')
    x2js = new X2JS()
}

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
        debug('xml body: ' + body)
        if(!body) return {}
        return x2js.xml2js(body)
    })
}

/*
 * Get Cities Of Taiwan
 * @return {Array.<string>} - array of strings
*/
const getCities = () => {
    return Object.keys(cityToId)
}

/*
 * Get Towns Of Taiwan By City name
 * @param {string} city - city name
 * @return {Promise<[object]>} - A Promise to Object
*/
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

/*
 * Get Roads Of Taiwan By City Name And Town Name
 * @param {string} city - city name
 * @param {string} town - town name
 * @return {Promise<[object]>} - A Promise to Object of array
*/
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

/*
 * Get Stores Of Taiwan By SearchStoreParams
 * @param searchStoreParams - params of search store
 * @return {Promise<[object]>} - A Promise to Object of array
*/
const getStores = (searchStoreParams) => {
    debug('#getStore() searchStoreParams: ' + JSON.stringify(searchStoreParams))
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