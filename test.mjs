import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import "dayjs/locale/th.js"

async function test() {
    let res = await fetch("http://192.168.1.114:8080/");
    console.log(await res.json())
}
test()
// let now = dayjs()
// let x = []
// for (let i = 0; i < 7; i++) {
//     x.push(dayjs().add(i, 'day'))
// }
// x.forEach((v) => console.log(v.format("ddd D")));

// [
//     {
//         date: "2024-11-14T11:55:00.000Z",
//         doctor: "Dr.Earth Bindai",
//         identifier: "A1731574557484",
//         notifications: [[Object], [Object], [Object]],
//     },
//     {
//         date: "2024-11-14T11:56:00.000Z",
//         doctor: "Dr.Earth Bindai",
//         identifier: "A1731574567003",
//         notifications: [[Object], [Object], [Object]],
//     },
// ];
// dayjs.extend(localizedFormat)
// let now = dayjs()
// console.log(now.locale("th").format("MMMM"))