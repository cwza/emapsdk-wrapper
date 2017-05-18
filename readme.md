# Emapsdk wrapper for meepshop 

## Install
``` sh
yarn add https://github.com/meepshop/emapsdk-wrapper.git
```

## Usage of apis
``` js
const ew = require('emapsdk-wrapper').apis

const cities = ew.getCities()
console.log('cities: ', cities)
// [ '台北市', '基隆市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '台中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '台南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '連江縣', '金門縣' ]

ew.getTowns('台北市')
    .then(towns => {
        console.log('towns: ', towns)
        /*
        { TownID: '01', TownName: '松山區', X: '121577218', Y: '25049837' },
        { TownID: '02', TownName: '信義區', X: '121567161', Y: '25033147' },
        { TownID: '03', TownName: '大安區', X: '121534593', Y: '25026482' },
        { TownID: '04', TownName: '中山區', X: '121533655', Y: '25064427' },
        { TownID: '05', TownName: '中正區', X: '121518245', Y: '25032251' },
        { TownID: '06', TownName: '大同區', X: '121515830', Y: '25066142' },
        { TownID: '07', TownName: '萬華區', X: '121499745', Y: '25034807' },
        { TownID: '08', TownName: '文山區', X: '121570280', Y: '24989800' },
        { TownID: '09', TownName: '南港區', X: '121607043', Y: '25054684' },
        { TownID: '10', TownName: '內湖區', X: '121589471', Y: '25069353' },
        { TownID: '11', TownName: '士林區', X: '121525380', Y: '25090430' },
        { TownID: '12', TownName: '北投區', X: '121503066', Y: '25132054' } 
        */
    })

ew.getRoads('台北市', '信義區')
    .then(roads => {
        console.log('roads: ', roads)
        /*
        [
            { rd_name_1: '市府路', section_1: {} },
            { rd_name_1: '永吉路', section_1: {} },
            { rd_name_1: '光復南路', section_1: {} },
            { rd_name_1: '吳興街', section_1: {} },
            { rd_name_1: '和平東路', section_1: '三段' },
            { rd_name_1: '忠孝東路', section_1: '五段' },
            { rd_name_1: '忠孝東路', section_1: '四段' },
            { rd_name_1: '東興路', section_1: {} },
            { rd_name_1: '林口街', section_1: {} },
            { rd_name_1: '松山路', section_1: {} },
            { rd_name_1: '松仁路', section_1: {} },
            { rd_name_1: '松信路', section_1: {} },
            { rd_name_1: '松高路', section_1: {} },
            { rd_name_1: '松隆路', section_1: {} },
            { rd_name_1: '松勤街', section_1: {} },
        ]
        */
    })

ew.getStores({city: '台北市', town: '信義區', roadname: '永吉路'})
    .then(stores => {
        console.log('stores: ', stores)
        /*
        [
            {
                POIID:'135241',
                POIName:'永信',
                X:'121568836',
                Y:'25043534',
                Telno:'(02)27469874',
                FaxNo:'(02)37652331',
                Address:'台北市信義區永吉路30巷103號',
                isDining:'Y',
                isParking:'N',
                isLavatory:'Y',
                isATM:'Y',
                is7WiFi:'Y',
                isIce:'N',
                isHotDog:'N',
                isHealthStations:'N',
                isIceCream:'N',
                isOpenStore:'N',
                isFruit:'Y',
                isCityCafe:'Y',
                isUnionPay:'N',
                isOrganic:'N',
                isCorn:'N',
                isMakeup:'N',
                isMuji:'Y',
                isMisterDonuts:'N',
                isStarBucks:'N',
                isIbon:'Y',
                isTea:'N',
                isSweetPotato:'N',
                SpecialStore_Kind:{

                },
                Store_URL:{

                }
            },
            {
                POIID:'965714',
                POIName:'信吉',
                X:'121574050',
                Y:'25043477',
                Telno:'(02)27569832',
                FaxNo:'(02)27568202',
                Address:'台北市信義區永吉路278巷58弄2號',
                isDining:'Y',
                isParking:'N',
                isLavatory:'N',
                isATM:'Y',
                is7WiFi:'Y',
                isIce:'Y',
                isHotDog:'N',
                isHealthStations:'N',
                isIceCream:'N',
                isOpenStore:'N',
                isFruit:'N',
                isCityCafe:'N',
                isUnionPay:'N',
                isOrganic:'N',
                isCorn:'N',
                isMakeup:'N',
                isMuji:'N',
                isMisterDonuts:'N',
                isStarBucks:'N',
                isIbon:'Y',
                isTea:'N',
                isSweetPotato:'N',
                SpecialStore_Kind:{

                },
                Store_URL:{

                }
            },
        ]
        */
    })
```

## Usage of mock
All usage is the same of apis, but this mock is only work at 台北市信義區永吉路, Others will return empty array. It will always return the same value which is pre-defined in this module.
This mock is useful if you do not want to really fetch the data from emapsdk.

``` js
const ew = require('emapsdk-wrapper').mock

const cities = ew.getCities()

console.log('cities: ', cities)

ew.getTowns('台北市')
    .then(towns => {
        console.log('towns: ', towns)
    })

ew.getRoads('台北市', '信義區')
    .then(roads => {
        console.log('roads: ', roads)
    })

ew.getStores({city: '台北市', town: '信義區', roadname: '永吉路'})
    .then(stores => {
        console.log('stores: ', stores)
    })
```

## Input Params and Returns Type
Please see [schema](lib/schema.js) for more information.  
* townGeoSchema for getTowns(city) return value
* roadNameSchema for getRoads(city, town) return value
* storeGeoSchema for getStores(searchStoreParams) return value
* searchStoreParamsSchema for getStores(searchStoreParams) input params

## ErrorType
[errorType](lib/errorType.js)
``` js
const ew = require('emapsdk-wrapper').mock
const ewErrorType = require('emapsdk-wrapper').errorType
ew.getStores({city: '台北市', town: '信義區', roadname: '永吉路'})
    .then(stores => {
        console.log('stores: ', stores)
    })
    .catch(err => {
        if err instanceof errorType.ValidationError
            Console.log(err)
        if err instanceof errorType.HttpStatusError
            Console.log(err.statusCode, err)
        else
            Console.log(err)
    })
```