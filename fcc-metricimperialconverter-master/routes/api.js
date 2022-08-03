/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();


  // US 3: I can GET /api/convert with a single parameter containing an accepted number and unit and have it converted.
  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var splitIndex = input.search(/[A-Za-z]/);
      var unit = input.slice(splitIndex, input.length);
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(unit);
      if (initNum == 'invalid number' || initUnit == 'invalid unit') {
        // US 8: If my unit of measurement is invalid, returned will be 'invalid unit'.
        // US 9: If my number is invalid, returned with will 'invalid number'.
        // US 10: If both are invalid, return will be 'invalid number and unit'.
        res.json({
          string: initNum === 'invalid number' ? 'invalid number' + (initUnit === 'invalid unit' ? ' and unit' : '') : 'invalid unit'
        })
      } else {
        var returnNum = convertHandler.convert(initNum, initUnit);
        var returnUnit = convertHandler.getReturnUnit(initUnit);
        var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit); 
        // US 12: My return will consist of the initNum, initUnit, returnNum, returnUnit, 
        // and string spelling out units in format {initNum} {initial_Units} 
        // converts to {returnNum} {return_Units} with the result 
        // rounded to 5 decimals.
        res.json({
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: toString
        })
      }
    });
    
};
