// Copyright 2004-present Facebook. All Rights Reserved.

const util = require('./test');

test('adds 1 + 2 to equal 3', () => {
    expect(util.sum(1, 2)).toBe(3);
});

test('getUnUsedKeys', () => {
    expect(util.getUnUsedKeys(9, [2, 3, 4])).toEqual([0, 1, 5, 6, 7, 8, 9]);
});

test('Sequence', () => {
    let sequence1 = new util.Sequence();
    let sequence2 = new util.Sequence();
    expect(sequence1.next()).toBe(1);
    expect(sequence1.next()).toBe(2);
    expect(sequence2.next()).toBe(3);
    expect(sequence2.next()).toBe(4);
});
test('sumByQuarter', () => {
    let items = [{
        month: 1, //[1-12],
        date: 1, //[1-31],
        transationId: "1",
        salePrice: 17
    }, {
        month: 2, //[1-12],
        date: 3, //[1-31],
        transationId: "1",
        salePrice: 13
    }, {
        month: 3, //[1-12],
        date: 2, //[1-31],
        transationId: "1",
        salePrice: 10
    }, {
        month: 4, //[1-12],
        date: 2, //[1-31],
        transationId: "1",
        salePrice: 10
    }]
    let res = [{"quarter": 1, "totalPrices": 40, "transactionNums": 3}, {
        "quarter": 2,
        "totalPrices": 10,
        "transactionNums": 1
    }]
    expect(util.sumByQuarter(items)).toEqual(res);
    expect(util.averageByQuarter(items)).toEqual([
        {
            "quarter": 1,
            "averagePrices": 13.33,
            "transactionNums": 3
        },
        {
            "quarter": 2,
            "averagePrices": 10.00,
            "transactionNums": 1
        }
    ]);
});

test('sortExtensionsByName', () => {
    let extensions = [
        {firstName: '', lastName: '5', ext: '9', extType: 'FaxUser'},
        {firstName: '2', lastName: '6', ext: '8', extType: 'DigitalUser'},
        {firstName: '', lastName: '7', ext: '4', extType: 'AO'}
    ];
    let res1 = [
        {
            "ext": "9",
            "extType": "FaxUser",
            "firstName": "",
            "lastName": "5"
        },
        {
            "ext": "4",
            "extType": "AO",
            "firstName": "",
            "lastName": "7"
        },
        {
            "ext": "8",
            "extType": "DigitalUser",
            "firstName": "2",
            "lastName": "6"
        }
    ];
    let res2 = [
        {
            "ext": "8",
            "extType": "DigitalUser",
            "firstName": "2",
            "lastName": "6"
        },
        {
            "ext": "9",
            "extType": "FaxUser",
            "firstName": "",
            "lastName": "5"
        },
        {
            "ext": "4",
            "extType": "AO",
            "firstName": "",
            "lastName": "7"
        }
    ]
    expect(util.sortExtensionsByName(extensions)).toEqual(res1);
    expect(util.sortExtensionsByExtType(extensions)).toEqual(res2);
});