import { config } from '@/configs';
import { RtcTokenBuilder, RtmTokenBuilder, RtmRole } from 'agora-access-token';
const APP_ID = config.agora.app_id;
const APP_CERTIFICATE = config.agora.app_certificate;
export class AgoraService {
    constructor() { }
    /*
        RTC stands for Real-Time Communication, which refers to the technology that allows 
        real-time communication over the internet between two or more users. 
        It includes voice and video calling, instant messaging, file sharing, and screen sharing.
    */
    generateRTCToken(channelName: string, role: number, tokentype: string, uid: string) {



        // get the expire time
        let expireTime = 3600;
        // calculate privilege expire time
        const currentTime = Math.floor(Date.now() / 1000);
        const privilegeExpireTime = currentTime + expireTime;
        // build the token
        let token;
        if (tokentype === 'userAccount') {
            token = RtcTokenBuilder.buildTokenWithAccount(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
        } else if (tokentype === 'uid') {
            token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, +uid, role, privilegeExpireTime);
        }
        // return the token
        return { 'rtcToken': token };
    }

    /*
        RTM stands for Real-Time Messaging, which is a feature of RTC that allows users to exchange 
        real-time messages in addition to voice and video calling. 
        RTM is used to build instant messaging and chat applications.
    */
    generateRTMToken(uid: string) {
        // get role
        let role = RtmRole.Rtm_User;
        // get the expire time
        let expireTime = 3600;
        // calculate privilege expire time
        const currentTime = Math.floor(Date.now() / 1000);
        const privilegeExpireTime = currentTime + expireTime;
        // build the token
        console.log(APP_ID, APP_CERTIFICATE, uid, role, privilegeExpireTime)
        const token = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, uid, role, privilegeExpireTime);
        // return the token
        return { 'rtmToken': token };
    }

    /*
    RTE stands for Real-Time Engagement, which is a broader term that encompasses both RTC and RTM. 
    RTE refers to any technology that enables real-time communication, collaboration, 
    and engagement between users over the internet.
    */
    generateRTEToken(channelName: string, role: number, tokentype: string, uid: string) {
        // get the expire time
        let expireTime = 3600;
        // calculate privilege expire time
        const currentTime = Math.floor(Date.now() / 1000);
        const privilegeExpireTime = currentTime + expireTime;
        // build the token
        let rtcToken = ''
        if (tokentype === 'userAccount') {
            rtcToken = RtcTokenBuilder.buildTokenWithAccount(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
        } else if (tokentype === 'uid') {
            rtcToken = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, +uid, role, privilegeExpireTime);
        }
        const rtmToken = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, uid, role, privilegeExpireTime);
        // return the token
        return { 'rtcToken': rtcToken, 'rtmToken': rtmToken };
    }
}