
import { config } from "@/configs";
import * as admin from "firebase-admin";
import { errorService } from "..";


export class FirebaseService {
    private title = config.firebase.title;
    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(
                    config.firebase as admin.ServiceAccount
                ),
                // databaseURL: config.firebaseDbURL,
            });
        }


    }

    get messaging() {
        return admin.messaging();
    }
    async verifyIdToken(token: string) {
        try {
            const result = await admin.auth().verifyIdToken(token);
            return result
        } catch (err) {
            throw errorService.auth.badToken()
        }
    }
    async createUser(params: { email: string; password: string }) {
        try {
            return await admin.auth().createUser({
                email: params.email,
                password: params.password,
            });
        } catch (err) {
            throw err;
        }
    }
    async getUserByEmail(params: { email: string }) {
        try {
            return await admin.auth().getUserByEmail(params.email);
        } catch (err) {
            throw err;
        }
    }
    async getUserByPhone(params: { phone: string }) {
        try {
            return await admin.auth().getUserByPhoneNumber(params.phone);
        } catch (err) {
            throw err;
        }
    }

    async sendNotificationForeground(
        user_id: string,
        message: string,
        action: string,
        entity_id: string = "",
        _options: any = {
            priority: "high",
            timeToLive: 2419200, // 28 days
        }
    ) {
        const topic = "/topics/" + user_id;
        console.log("My Topic: ", topic);
        const payloadForeground: any = {
            data: {
                message,
                action,
                entity_id,
                // click_action: ".MainActivity",
            },
            topic,
        };
        try {
            admin.messaging().send(payloadForeground);
        } catch (error) {
            console.log("send notification failed", error);
        }
    }
    async sendNotification(
        user_id: string,
        message: string,
        action: string,
        entity_id: string = "",
        _options: any = {
            priority: "high",
            timeToLive: 2419200, // 28 days
        }
    ) {
        const topic = "/topics/" + user_id;
        console.log("My Topic: ", topic);
        const payloadForeground: any = {
            data: {
                message,
                action,
                entity_id,
                // click_action: ".MainActivity",
            },
            topic,
        };
        const payloadBackground: any = {
            apns: {
                headers: {
                    "apns-priority": "10",
                    "apns-expiration": "1604750400", // 11/07/2020, unixTimestamp
                },
                payload: {
                    aps: {
                        alert: {
                            title: this.title,
                            body: message,
                        },

                        category: action + "," + entity_id,
                        sound: "default",
                    },
                    message,
                    action,
                    entity_id,
                },
            },
            android: {
                ttl: 2419200, // 28 days
                notification: {
                    title: this.title,
                    body: message,
                    sound: "default",
                    // click_action: ".MainActivity",
                },
                data: {
                    message,
                    action,
                    entity_id,
                },
                priority: "high",
            },
            topic
        };
        try {
            admin.messaging().send(payloadBackground);

            admin.messaging().send(payloadForeground);
        } catch (error) {
            console.log("send notification failed", error);
        }
    }

    async sendNotificationV2(
        user_ids: string[],
        title: string,
        message: string,
        action: string
    ) {
        if (!user_ids || user_ids.length === 0) {
            return;
        }
        let condition = `'${user_ids[0]}' in topics`;
        user_ids.forEach((id: any, index: number) => {
            if (index > 0) {
                condition += `|| '${id}' in topics`;
            }
        });
        const payloadForeground: any = {
            data: {
                action,
            },
            android: {
                priority: "high",
                notification: {
                    title,
                    body: message,
                    sound: "default",
                },
            },

            // Add APNS (Apple) config
            apns: {
                payload: {
                    aps: {
                        contentAvailable: true,
                        alert: {
                            title,
                            body: message,
                        },
                        category: "0",
                        sound: "default",
                    },
                },
                headers: {
                    "apns-priority": "10",
                    "apns-expiration": "1604750400", // 11/07/2020, unixTimestamp
                },
            },
            condition,
        };
        // const payloadBackground: any = {
        //     apns: {
        //         headers: {
        //             "apns-priority": "10",
        //             "apns-expiration": "1604750400", // 11/07/2020, unixTimestamp
        //         },
        //         payload: {
        //             aps: {
        //                 alert: {
        //                     title,
        //                     body: message,
        //                 },
        //                 category: action,
        //                 sound: "default",
        //             },
        //             message,
        //             action,
        //         },
        //     },
        //     android: {
        //         ttl: 2419200, // 28 days
        //         notification: {
        //             title,
        //             body: message,
        //             sound: "default",
        //         },
        //         data: {
        //             message,
        //             action,
        //             title,
        //         },
        //         priority: "high",
        //     },
        //     condition,
        // };
        try {
            // admin.messaging().send(payloadBackground);
            admin.messaging().send(payloadForeground);
            console.log("send notification success");
        } catch (error) {
            console.log("send notification failed", error);
        }
    }
    async callForeground(
        user_id: string,
        message: string,
        action: string,
        entity_id: string = "",
        _options: any = {
            priority: "high",
            timeToLive: 2419200, // 28 days
        }
    ) {
        const topic = "/topics/" + user_id;
        console.log("My Topic: ", topic);
        const payloadForeground = {
            data: {
                message,
                action,
                entity_id,
            },
            topic,
        };
        try {
            return await admin.messaging().send(payloadForeground);
        } catch (error) {
            return error;
        }
    }

}