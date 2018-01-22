const Bill = function(name, category, value, date, bees){
  this.name = name;
  this.category = category;
  this.value = value;
  this.date = date;
  this.bees = [];
  this.bees.push(bees);
}

module.exports = Bill;