// var number=[2,3,4,9,5,6];
// console.log(number.sort(function sapxep(a,b) {
// 	return b-a;
// }))
var employ=[
{name: "Tom",age: 18},
{name:"marie",age: 20},
{name:"Long",age: 19}
];
console.log(employ);
var employ2=employ.sort(function sapxep(a,b) {
	return b.age-a.age;
})
console.log(employ2);