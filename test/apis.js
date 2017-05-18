const apis = require('../').apis
const expect = require('chai').expect
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

describe('#api.getTowns()', () => {
    it('should return towns by city', async () => {
        let tcs = {
            '台北市': {a: '台北市'},
            '基隆市': {a: '基隆市'},
            '新北市': {a: '新北市'},
            '桃園市': {a: '桃園市'},
            '新竹市': {a: '新竹市'},
            '新竹縣': {a: '新竹縣'},
            '苗栗縣': {a: '苗栗縣'},
            '台中市': {a: '台中市'},
            '彰化縣': {a: '彰化縣'},
            '南投縣': {a: '南投縣'},
            '雲林縣': {a: '雲林縣'},
            // '嘉義市': {a: '嘉義市'},
            // '嘉義縣': {a: '嘉義縣'},
            // '台南市': {a: '台南市'},
            // '高雄市': {a: '高雄市'},
            // '屏東縣': {a: '屏東縣'},
            // '宜蘭縣': {a: '宜蘭縣'},
            // '花蓮縣': {a: '花蓮縣'},
            // '台東縣': {a: '台東縣'},
            // '澎湖縣': {a: '澎湖縣'},
            // '連江縣': {a: '連江縣'},
            // '金門縣': {a: '金門縣'},
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
    it('should throw HttpStatusError while 404', async () => {
        apis.config.emapsdkUrl = "http://emap.pcsc.com.tw/EMa"
        let tc = {a: '台北市'}
        let error
        try {
            let actual = await apis.getTowns(tc.a)
        } catch(err) {
            error = err
        } finally {
            expect(error).to.be.instanceof(errorType.HttpStatusError)
            expect(error.statusCode).to.be.equal(404)
            apis.config.emapsdkUrl = "http://emap.pcsc.com.tw/EMapSDK.aspx"
        }
    })
})

describe('#api.getRoads()', () => {
    it('should return roads by city and town', async () => {
        let tcs = {
            '台北市信義區': {a: '台北市', b: '信義區'},
            '澎湖縣湖西鄉': {a: '澎湖縣', b: '湖西鄉'},
            '嘉義市西區': {a: '嘉義市', b: '西區'},
            '台東縣達仁鄉': {a: '台東縣', b: '達仁鄉'},
            '新北市三芝區': {a: '新北市', b: '三芝區'},
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
    it('should throw HttpStatusError while 404', async () => {
        apis.config.emapsdkUrl = "http://emap.pcsc.com.tw/EMa"
        let tc = {a: '台北市', b: '信義區'}
        let error
        try {
            let actual = await apis.getRoads(tc.a, tc.b)
        } catch(err) {
            error = err
        } finally {
            expect(error).to.be.instanceof(errorType.HttpStatusError)
            expect(error.statusCode).to.be.equal(404)
            apis.config.emapsdkUrl = "http://emap.pcsc.com.tw/EMapSDK.aspx"
        }
    })
})

describe('#api.getStores()', () => {
    it('should return stores by city and town and road or ID or StoreName', async () => {
        let tcs = {
            '台北市信義區永吉路': {city: '台北市', town: '信義區', roadname: '永吉路'},
            '台北市信義區市府路': {city: '台北市', town: '信義區', roadname: '市府路'},
            '新北市中和區': {city: '新北市', town: '中和區'},
            '中錦': {StoreName: '中錦'},
            '162520': {ID: '162520'},
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
    it('should throw HttpStatusError while 404', async () => {
        apis.config.emapsdkUrl = "http://emap.pcsc.com.tw/EMa"
        let tc = {city: '台北市', town: '信義區', roadname: '永吉路'}
        let error
        try {
            let actual = await apis.getStores(tc)
        } catch(err) {
            error = err
        } finally {
            expect(error).to.be.instanceof(errorType.HttpStatusError)
            expect(error.statusCode).to.be.equal(404)
            apis.config.emapsdkUrl = "http://emap.pcsc.com.tw/EMapSDK.aspx"
        }
    })
})