const expect = require('chai').expect
const apis = require('../').mock
const Joi = require('joi')
const schema = require('../lib/schema')
const errorType = require('../').errorType

describe('#api.getCities()', () => {
    it('should return cities of Taiwan', () => {
        let expected = [ '台北市', '基隆市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '台中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '台南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '連江縣', '金門縣' ]
        let actual = apis.getCities()
        expect(actual).deep.equal(expected)
    })
})

describe('#mock.getTowns()', () => {
    it('should return towns by city', async () => {
        let tcs = {
            '台北市': {a: '台北市'},
        }
        for (let [msg, tc] of Object.entries(tcs)) {
            let actual = await apis.getTowns(tc.a)
            expect(actual, msg).to.not.empty
            actual.forEach((townGeo) => {
                let result = Joi.validate(townGeo, schema.townGeoSchema)
                expect(result.error, msg).to.be.null
                
            })
        }
    })
    it('should return empty while city is not defined', async () => {
        let tcs = {
            'xxx': {a: 'xxx'},
            '': {a: ''},
        }
        for (let [msg, tc] of Object.entries(tcs)) {
            let actual = await apis.getTowns(tc.a)
            expect(actual, msg).to.be.empty
        }
    })
})

describe('#mock.getRoads()', () => {
    it('should return roads by city and town', async () => {
        let tcs = {
            '台北市信義區': {a: '台北市', b: '信義區'},
        }
        for (let [msg, tc] of Object.entries(tcs)) {
            let actual = await apis.getRoads(tc.a, tc.b)
            expect(actual, msg).to.not.empty
            actual.forEach((roadName) => {
                let result = Joi.validate(roadName, schema.roadNameSchema)
                expect(result.error, msg).to.be.null
                
            })
        }
    })
    it('should return empty while city or town is not exist', async () => {
        let tcs = {
            '台北市xxx': {a: '台北市', b: 'xxx'},
            'xxx信義區': {a: 'xxx', b: '信義區'},
            '': {a: '', b: ''},
        }
        for (let [msg, tc] of Object.entries(tcs)) {
            let actual = await apis.getRoads(tc.a, tc.b)
            expect(actual, msg).to.be.empty
        }
    })
})

describe('#mock.getStores()', () => {
    it('should return stores by city and town and road or ID or StoreName', async () => {
        let tcs = {
            '台北市信義區永吉路': {city: '台北市', town: '信義區', roadname: '永吉路'},
            '永信': {StoreName: '永信'},
            '135241': {ID: '135241'},
        }
        for (let [msg, tc] of Object.entries(tcs)) {
            let actual = await apis.getStores(tc)
            expect(actual, msg).to.not.empty
            actual.forEach((storeGeo) => {
                let result = Joi.validate(storeGeo, schema.storeGeoSchema)
                expect(result.error, msg).to.be.null
                
            })
        }

    })
    it('should return empty while city, town, road, StoreName, ID is not exist', async () => {
        let tcs = {
            '新北市': {city: '新北市'},
            '中和區': {town: '中和區'},
            '市府路': {roadname: '市府路'},
            '': {},
            '新北市市府路': {city: '新北市', roadname: '市府路'},
            'xxxqqqsss': {city: 'xxx', town: 'qqq', roadname: '市府路'},
            '99999999': {ID: '99999999'},
            'xxxxx': {StoreName: 'xxxxx'},
        }
        for (let [msg, tc] of Object.entries(tcs)) {
            let actual = await apis.getStores(tc)
            expect(actual, msg).to.be.empty
        }
    })
    it('should throw ValidationError while searchStoreParams is invalid', async () => {
        let tcs = {
            'city: 123': {city: 123},
        }
        for (let [msg, tc] of Object.entries(tcs)) {
            let error
            try {
                let actual = await apis.getStores(tc)
            } catch(err) {
                error = err
            } finally {
                expect(error, msg).to.be.instanceOf(errorType.ValidationError)
            }
        }

    })
})