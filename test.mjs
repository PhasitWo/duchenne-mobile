import dayjs from "dayjs";

let now = dayjs()
let x = []
for (let i = 0; i < 7; i++) {
    x.push(dayjs().add(i, 'day'))
}
x.forEach((v) => console.log(v.format("ddd D")));