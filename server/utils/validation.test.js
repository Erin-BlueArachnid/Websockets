const expect = require('expect');
const {isRealString} = require('./validation');

describe('validations', function () {
    it('should reject non string', function () {
        var result = isRealString(98);
        expect(result).toBe(false);
    });
    it('should reject string with only spaces', function () {
        var result = isRealString("        ");
        expect(result).toBe(false);
    });
    it('should allow string with non-space character', function () {
        var result = isRealString("Erin");
        expect(result).toBe(true);
    });
});
