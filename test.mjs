import "dayjs/locale/th.js";
import axios from "axios";

// let unixNow = dayjs().unix() * 1000 // convert to millisec;
// send this to server and when converting back from server just use dayjs(datafromserver) no need to use utc plugin

async function test() {
    try {
        const response = await axios.post("http://192.168.1.114:8080/mobile/auth/login", {
            hn: "test3s",
            fiasrstName: "fn3",
            lastName: "ln3",
            deviceName: "node",
            expoToken: "dummy-expo-token",
        });
        console.log(response.data);
    } catch (err) {
        console.log(JSON.stringify(err.response.data));
    }
}

test();
