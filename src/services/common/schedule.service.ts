import { ECronExpression } from '@/enums/cronExpression.enum';
import { CronJob } from 'cron';
import moment from 'moment';

export class ScheduleService {


    public run() {
        this.scheduleTask();
    }



    private scheduleTask() {
        return new CronJob(ECronExpression.EVERY_MINUTE, async () => {
            console.log(moment().format())
        }, null, true, 'Asia/Ho_Chi_Minh').start();
    }
}

