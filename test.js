let sequence = {
    index: 0
};

let createArray = function (num) {
    let arr = [];
    for (let i = 0; i <= num; i++) {
        arr.push(i);
    }
    return arr;
}

module.exports = {

    // Copyright 2004-present Facebook. All Rights Reserved.
    sum(a, b) {
        return a + b;
    },

    /**
     extensions is an Array and each item has such format:
     {firstName: 'xxx', lastName: 'xxx', ext: 'xxx', extType: 'xxx'}
     lastName, ext can be empty, extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO".
     **/
    sortBy(a, b, attr, isAsc, orderList) {
        let maxVal = isAsc ? 1 : -1;
        let minVal = isAsc ? -1 : 1;
        if (orderList && orderList.length > 0) {
            let indexA = orderList.indexOf(a[attr]);
            let indexB = orderList.indexOf(b[attr]);
            if (indexA === -1 || indexB === -1) {
                console.log('your attr not in orderList')
            }
            if (indexA > indexB) return maxVal;
            if (indexA < indexB) return minVal;
            return 0;
        }
        if (a[attr] > b[attr]) return maxVal;
        if (a[attr] < b[attr]) return minVal;
        return 0;
    },

    sortByMultiAtrrs(a, b, attrs, isAsc) {
        let resArr = [];
        let attrLength = attrs.length;
        for (let i = 0; i < attrLength; i++) { //依次分类
            let val = this.sortBy(a, b, attrs[i], isAsc);
            resArr.push(val);
            if (val != 0) break;//有结果了跳出
        }
        for (let j = 0; j < resArr.length; j++) {
            if (resArr[j] != 0) return resArr[j]; //返回结果
        }
        return 0;
    },
    /**
     Question 1: sort extensions by "firstName" + "lastName" + "ext" ASC
     **/
    sortExtensionsByName(extensions) {
        let multiAttr = ['firstName', 'lastName', 'ext'];
        extensions.sort(((a, b) => {
            return this.sortByMultiAtrrs(a, b, multiAttr, true);
        }));
        return extensions;
    },

    /**
     Question 2: sort extensions by extType follow these orders ASC
     DigitalUser < VitrualUser < FaxUser < AO < Dept.
     **/
    sortExtensionsByExtType(extensions) {
        let extTypeList = ['DigitalUser', 'VitrualUser', 'FaxUser', 'AO', 'Dept'];
        //extensions.sort(this.sortBy('extType', true, extTypeList))
        extensions.sort(((a, b) => {
            return this.sortBy(a, b, 'extType', true, extTypeList)
        }));
        return extensions;
    },


    /**
     saleItems is an Array has each item has such format:
     {
	month: n, //[1-12],
	date: n, //[1-31],
	transationId: "xxx",
	salePrice: number
  }
     **/

    /**
     Question 3: write a function to calculate and return a list of total sales (sum) for each quarter, expected result like:
     [
     {quarter: 1, totalPrices: xxx, transactionNums: n},
     {....}
     ]
     **/

    sumByQuarter(saleItems) {
        let tempArr = []
        saleItems.forEach(item => {
            let quarter = Math.floor((item.month + 2) / 3);
            let currentQuarter = tempArr.find(tempItem => quarter == tempItem.quarter);
            if (currentQuarter) {
                currentQuarter.quarter = quarter
                currentQuarter.totalPrices = Number(currentQuarter.totalPrices) + item.salePrice;
                currentQuarter.transactionNums = Number(currentQuarter.transactionNums) + 1;
            } else {
                currentQuarter = {
                    quarter: quarter,
                    totalPrices: item.salePrice,
                    transactionNums: 1
                };
                tempArr.push(currentQuarter)
            }
        })
        return tempArr;
    },

    /**
     Question 4: write a function to calculate and return a list of average sales for each quarter, expected result like:
     [
     {quarter: 1, averagePrices: xxx, transactionNums: n},
     {....}
     ]
     **/

    averageByQuarter(saleItems) {
        let result = this.sumByQuarter(saleItems).map((item) => {
            return {
                quarter: item.quarter,
                averagePrices: Number((item.totalPrices / item.transactionNums).toFixed(2)),
                transactionNums: item.transactionNums
            }
        })
        return result;
    },


    /**
     Question 5: please create a tool to generate Sequence
     Expected to be used like:
     var sequence1 = new Sequence();
     sequence1.next() --> return 1;
     sequence1.next() --> return 2;

     in another module:
     var sequence2 = new Sequence();
     sequence2.next() --> 3;
     sequence2.next() --> 4;
     **/
    Sequence: class Sequence {
        constructor() {
            this.sequenceInit = sequence;
        }

        next() {
            return ++this.sequenceInit.index;
        }
    },

    /**
     Question 6:
     AllKeys: 0-9;
     usedKeys: an array to store all used keys like [2,3,4];
     We want to get an array which contains all the unused keys,in this example it would be: [0,1,5,6,7,8,9]
     **/

    getUnUsedKeys(allKeys, usedKeys) {
        allKeys = createArray(allKeys);
        return allKeys.filter(item => usedKeys.indexOf(item) === -1);
    }
}




