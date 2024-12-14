import dayjs from "dayjs";
import type { NotificationRequestInput } from "expo-notifications";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/constants/AsyncStorageKey";

export type localNotification = { identifier: string } & NotificationRequestInput;
export type localAppointment = {
    identifier: string;
    date: Date;
    doctor: string;
    notifications: localNotification[];
};

// USAGE
// try {
//     localNoti = await scheduleLocalNotification(appointmentDate, "say something");
//     await localStoreAppointment(appointmentDate, selectedDoctorName ,localNoti);
// } catch (err) {
//     clearLocalNotifications(localNoti);
//     Alert.alert("Error", (err as Error).message);
//     return;
// }

// export async function scheduleLocalNotification(scheduleDate: Date, notificationBody: string): Promise<localNotification[]> {
//     const OFFSET = [0, 5, 10];
//     const now = dayjs();
//     let toStoreNoti: localNotification[] = [];
//     for (let offset of OFFSET) {
//         let d = dayjs(scheduleDate).subtract(offset, "minute");
//         //  schedule only notification that has 'date' after 'now'
//         if (d.isBefore(now)) continue;
//         let notiInput: NotificationRequestInput = {
//             content: { title: "Doctor Appointment", body: notificationBody },
//             trigger: { date: d.toDate() },
//         };
//         let id = await Notifications.scheduleNotificationAsync(notiInput);
//         console.log("notification id => " + id);
//         let noti: localNotification = {
//             ...notiInput,
//             identifier: id,
//         };

//         toStoreNoti.push(noti);
//     }
//     return toStoreNoti;
// }

// export async function localStoreAppointment(appointmentDate: Date, doctorName: string, localNotifications: localNotification[]) {
//     const apmnt: localAppointment = {
//         identifier: "A" + new Date().getTime(),
//         date: appointmentDate,
//         doctor: doctorName,
//         notifications: localNotifications,
//     };
//     // **JSON.stringfy will convert date to ISO string**
//     // get current apmtList
//     let currentApmtList: Array<any> = [];
//     let res = await AsyncStorage.getItem(AsyncStorageKey.appointment);
//     if (res !== null) {
//         currentApmtList = JSON.parse(res);
//     }
//     currentApmtList.push(apmnt);
//     // store
//     const serialized = JSON.stringify(currentApmtList);
//     await AsyncStorage.setItem(AsyncStorageKey.appointment, serialized);
//     console.log("store => " + serialized);
// }

// export async function clearLocalNotifications(notificationIdentifiers: localNotification[]) {
//     for (let noti of notificationIdentifiers) {
//         await Notifications.cancelScheduledNotificationAsync(noti.identifier);
//         console.log("cancel => " + noti.identifier);
//     }
// }

// export async function fetchLocalAppointmentList(): Promise<localAppointment[]> {
//     let ret: localAppointment[] = [];
//     let res = await AsyncStorage.getItem(AsyncStorageKey.appointment);
//     // parse json to object
//     if (res !== null) {
//         let apmtList: any[] = JSON.parse(res);
//         // console.log("before" , typeof apmtList[0].date)
//         for (let i = 0; i < apmtList.length; i++) {
//             // convert apmt date
//             apmtList[i] = { ...apmtList[i], date: new Date(apmtList[i].date) };
//             // convert notifications date
//             let rawNotifications = apmtList[i].notifications;
//             for (let noti of rawNotifications) {
//                 noti.trigger = { ...noti.trigger, date: new Date(noti.trigger.date) };
//             }
//         }
//         ret = apmtList;
//         //  console.log("after",  apmtList[0].notifications[0].trigger.date instanceof Date);
//     }
//     return ret;
// }
