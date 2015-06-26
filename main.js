#!/usr/local/bin/node

Immutable = require('immutable');
List = Immutable.List;

// result = List([1,2,3,4,5]).map(function(x){ return x * 2 });
// console.log(result);

// result = _.reduce(function(acc, item){ 
// 	return acc + "->" + item 
// }, ['reduce','all','the','things']);
// console.log(result);

// r = List(['reduce','all','the','words']).reduce(function(acc, item){ 
// 	return acc + "->" + item 
// });
// console.log(r);

// var people = [{
// 	firstName: 'Brad',
// 	lastName: 'Urani'
// },
// {
// 	firstName: 'Andre',
// 	lastName: '3000'
// }];

// var names = _.map(function(person){
// 	return person.lastName + ", " + person.firstName;
// }, people);

// console.log(names);

// var people = [{
// 	firstName: 'Brad',
// 	lastName: 'Urani'
// },{
// 	firstName: 'Andre',
// 	lastName: '3000'
// }];
// r = List(people).map(function(person){
// 	return person.lastName + ", " + person.firstName;
// });
// console.log(r);
//("Urani, Brad" "3000, Andre")

// var f = _.mapcat(function(num) { 
// 	return ['left', 'right', 'up', 'down']
// }, [1,2,3]);
// console.log(f);

// var salesTaxFunc = function(total){
// 	console.log() //do I test for this?
// 	return total * 1.06;
// }

// var calcTotal = function(total){
// 	return salesTaxFunc(total);
// }

// var Person = function(){
// 	var pentUpRage = 0;
// 	this.stealCookies = function(){
// 		pentUpRage++;
// 		return 'Hey, give those back!'
// 	};
// }

// function salesTaxFunction(state){
// 	switch(state) {
// 		case 'mo': 
// 			return function(total){ return total * .06; }
// 		case 'il':
// 			return function(total){ return total * .07; }
// 	}
// }

// console.log(salesTaxFunction('mo'));


// function isPrime(num) {
// 	return num > 2 && !!!_.some(function(n){ return num % n === 0; }, _.range(2, num))
// }

// console.log(_.filter(function(n){
// 	return isPrime(n);
// }, _.range(2, 50)));
 
//  var f = _.take(1000, _.filter(function(n){ return isPrime(n); }, _.range(1, 100000)));
//  console.log(f);

// var primes = [];
// var i = 0;
// while(primes.length < 1000) {
// 	if(isPrime(i)) {
// 		primes.push(i);
// 	}
// 	i++;
// }
// // console.log(primes);
// r = Immutable.Range(2, 50).filter(function(n){
//                 					return console.log(n);
// 								});
// console.log(r);

var primes = Immutable.Seq(Immutable.Range(1, 1000)).filter(function(n){ 
return console.log(n); 
}).take(10);

console.log(primes);




