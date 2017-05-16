const ew = require('../src')
const expect = require('chai').expect

describe('test', () => {
    it('should return true', () => {
        let tcs = {
            'case1': {a: 1, expected: true},
            'case2': {a: 2, expected: true},
            'case3': {a: 3, expected: true},
        }
        for (let [msg, tc] of Object.entries(tcs)) {
            let actual = ew.test(tc.a)
            expect(actual, msg).to.be.equal(tc.expected)
        }
    })
})