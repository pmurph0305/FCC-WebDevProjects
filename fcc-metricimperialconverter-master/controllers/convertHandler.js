/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    result = input.match(/[\d.\/]+/);
    // US 11: I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6),
    if (result && result[0].includes('/')) {
      let vals = result[0].split('/');
      if (vals.length == 2) {
        return vals[0]/vals[1];   
      } else {
        // US 9: If my number is invalid, returned with will 'invalid number'.
        return 'invalid number'
      }
    } else if (!result) {
      // US 11: if nothing is provided it will default to 1.
      return 1;
    }
    return Number(result[0]);
  };
  
  this.getUnit = function(input) {
    let validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    var result = validUnits.find(unit => unit === input);
    if (!result) {
      // US 8: If my unit of measurement is invalid, returned will be 'invalid unit'.
      result = 'invalid unit';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    // US: 5 -> 7 (Note litres is a capital L)
    // 5. I can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)
    // 6. I can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)
    // 7. I can convert 'mi' to 'km' and vice versa. (1 mi to 1.60934 km)
    var input = ['gal','l','mi','km','lbs','kg'];
    var output = ['L','gal','km','mi','kg','lbs'];
    let inputIndex = input.indexOf(initUnit.toLowerCase());
    var result = output[inputIndex];
    if (!result) {
      return 'invalid unit';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    var input =  ['gal','l','mi','km','lbs','kg'];
    var output = ['gallons', 'litres', 'miles', 'kilometers', 'pounds', 'kilograms'];
    var result = output[input.indexOf(unit.toLowerCase())];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch(initUnit) {
      case 'gal':
        return initNum * galToL;
      case 'L':
        return initNum / galToL;
      case 'lbs':
        return initNum * lbsToKg;
      case 'kg':
        return initNum / lbsToKg;
      case 'mi':
        return initNum * miToKm;
      case 'km':
        return initNum / miToKm;
      default:
        return 0;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // US 12: string spelling out units in format {initNum} {initial_Units} 
    // converts to {returnNum} {return_Units} with the result rounded to 5 decimals.
    // initNum and returnNum are strings, so convert them to numbers, then round to 5 decimal places
    // then covert that to a number, then back to a string to remove trailing 0's...
    return Number(Number(initNum).toFixed(5)).toString() + ' ' + this.spellOutUnit(initUnit) 
    + ' converts to ' + Number(Number(returnNum).toFixed(5)).toString() + ' ' + this.spellOutUnit(returnUnit);
  };
}

module.exports = ConvertHandler;
