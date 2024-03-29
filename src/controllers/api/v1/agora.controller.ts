import { BaseController, Request, Response } from "@/controllers/base/base.controller";
import { agoraService } from "@/services";
import { AgoraService } from "@/services/common/agora.service";
import { RtcRole } from "agora-access-token";

export class agoraController extends BaseController {
    constructor() {
        super()
        this.service = agoraService
        this.path = 'agora'
        // http://localhost:5000/api/v1/agora/rtc/channel123/publisher/userAccount/uuid123
        // http://localhost:5000/api/v1/agora/rtc/channel123/audience/userAccount/uuid123
        this.router.get('/rtc/:channel/:role/:tokentype/:uid', this.route(this.generateRTCToken));

        // http://localhost:5000/api/v1/agora/rtm/uuid123
        this.router.get('/rtm/:uid', this.route(this.generateRTMToken));

        // http://localhost:5000/api/v1/agora/rte/channel123/publisher/userAccount/uuid123
        // http://localhost:5000/api/v1/agora/rte/channel123/audience/userAccount/uuid123
        this.router.get('/rte/:channel/:role/:tokentype/:uid', this.route(this.generateRTEToken));

        this.router.post('/register-chat', this.route(this.registerChat));
        this.router.get('/chat-user-uuid/:username', this.route(this.getChatUserUuid));
        this.router.get('/rtm-token/:username', this.route(this.getTokenUserName));
    }
    service: AgoraService
    async generateRTCToken(req: Request, res: Response) {
        const { channel, tokentype, uid } = req.params
        let role: number = RtcRole.SUBSCRIBER
        if (req.params["role"] === 'publisher') {
            role = RtcRole.PUBLISHER;
        } else if (req.params["role"] === 'audience') {
            role = RtcRole.SUBSCRIBER
        }
        let result = {}
        if (channel && tokentype && uid) {
            result = this.service.generateRTCToken(channel, role, tokentype, uid);
        }
        this.onSuccess(res, result);
    }
    async generateRTMToken(req: Request, res: Response) {
        const { uid } = req.params
        let result = {}
        if (uid) {
            result = this.service.generateRTMToken(uid);
        }
        this.onSuccess(res, result);
    }
    async generateRTEToken(req: Request, res: Response) {
        const { channel, tokentype, uid } = req.params
        let role: number = RtcRole.SUBSCRIBER
        if (req.params["role"] === 'publisher') {
            role = RtcRole.PUBLISHER;
        } else if (req.params["role"] === 'audience') {
            role = RtcRole.SUBSCRIBER
        }
        let result = {}
        if (channel && tokentype && uid) {
            result = this.service.generateRTEToken(channel, role, tokentype, uid);
        }
        this.onSuccess(res, result);
    }

    async registerChat(req: Request, res: Response) {
        const { username, password } = req.body
        const result = await this.service.registerChatUser(username, password);
        this.onSuccess(res, result);
    }

    async getChatUserUuid(req: Request, res: Response) {
        const { username } = req.params
        const result = await this.service.getChatUserUuid(`${username}`);
        this.onSuccess(res, result);
    }
    async getTokenUserName(req: Request, res: Response) {
        const { username } = req.params
        const result = await this.service.getTokenUserName(`${username}`);
        this.onSuccess(res, result);
    }
}