var ids = [];

function uniq(chars){
    return chars.filter((item,index) => chars.indexOf(item) === index);
}

console.log(ids.length)

var numbers = [];

while(numbers.length < 900){
    var r = Math.floor(Math.random() * ids.length) + 1;
    if(numbers.indexOf(r) === -1) numbers.push(r);
    numbers = uniq(numbers);
}
numbers.forEach(function(number){
    ids.splice(number, 1);
})

console.log(ids.length);
console.log(ids);