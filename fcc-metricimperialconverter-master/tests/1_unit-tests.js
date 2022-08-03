/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

// US 13: All 16 unit tests are complete and passing.
suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      let result = convertHandler.getNum(input)
      assert.equal(result, 32, result + " does not equal 32.");
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '1.01L';
      let result = convertHandler.getNum(input);
      assert.equal(result,1.01, result + " does not equal 1.01.");
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '3/5L';
      let result = convertHandler.getNum(input);
      assert.equal(result, (3/5), result + " does not equal" + (3/5));
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '1.1/11';
      let result = convertHandler.getNum(input);
      assert.equal(result, (1.1/11), result + "does not equal" + (3/5));
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '1/2/3/4';
      let result = convertHandler.getNum(input);
      assert.equal(result, "invalid number", result + " is not equal to 'invalid number'");
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = '';
      let result = convertHandler.getNum(input);
      assert.equal(result, 1, result + " does not equal 1.");
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        let result = convertHandler.getUnit(ele);
        assert.equal(result, ele, result + " does not equal " + ele);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = 'something invalid';
      let result = convertHandler.getUnit(input);
      assert.equal(result, 'invalid unit', result + " does not equal 'invalid unit'");
      done();
    });  
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL'];
      var expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs', 'L'];
      input.forEach(function(ele, i) {
        var result = convertHandler.getReturnUnit(ele);
        assert.equal(result, expect[i], result + " does not equal " + expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['L', 'gal', 'l', 'km', 'mi', 'lbs', 'kg', 'GAL'];
      var expect =['litres', 'gallons', 'litres', 'kilometers', 'miles', 'pounds', 'kilograms', 'gallons'];
      input.forEach(function(ele, i) {
        var result = convertHandler.spellOutUnit(ele);
        assert.equal(result, expect[i], result + " does not equal " + expect[i]);
      })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      var result = convertHandler.convert(input[0],input[1])
      assert.approximately(result, expected, 0.1, result + " does not equal " + expected + " +- 0.1"); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [2, 'L'];
      var expected = 0.528344;
      var result = convertHandler.convert(input[0],input[1])
      assert.approximately(result, expected, 0.1, result + " does not equal " + expected + " +- 0.1");
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [3, 'mi'];
      var expected = 4.82803;
      var result = convertHandler.convert(input[0],input[1])
      assert.approximately(result, expected, 0.1, result + " does not equal " + expected + " +- 0.1");
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [10, 'km'];
      var expected = 6.21371;
      var result = convertHandler.convert(input[0],input[1])
      assert.approximately(result, expected, 0.1, result + " does not equal " + expected + " +- 0.1");
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [17, 'lbs'];
      var expected = 7.71107;
      var result = convertHandler.convert(input[0],input[1])
      assert.approximately(result, expected, 0.1, result + " does not equal " + expected + " +- 0.1");
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [32, 'kg'];
      var expected = 70.5479;
      var result = convertHandler.convert(input[0],input[1])
      assert.approximately(result, expected, 0.1, result + " does not equal " + expected + " +- 0.1");
      done();
    });
  });
});