
function Persion () {
  this.name = 'wolf';
}

var persion = new Persion()


Persion.prototype.sayName = function () {
  console.log(this.name);
}


persion.sayName()


console.log(persion.constructor);
