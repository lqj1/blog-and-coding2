var Person = (function () {
  var _gender = '';
  function P(name, gender) {
    this.name = name;
    // this.gender = gender;
    _gender = gender;
  }
  P.prototype.getGender = function () {
    return _gender;
  };
  return P;
})();
var p1 = new Person('lqj', '男');
console.log(p1); // P{name: 'lqj'}
console.log(p1.getGender); // 男
