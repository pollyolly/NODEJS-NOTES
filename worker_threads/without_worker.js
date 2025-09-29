console.time("timer");
let sum = 0;
for (let i = 0; i< 1000000000; i++) {
    sum += i;
}
console.timeEnd("timer");
//Output:
/*
timer: 956.517ms
*/
