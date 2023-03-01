
import { ErrorService } from "./errorService";


// Crud
import { ICrudExecOption, ICrudOptionMongo, BaseMongoService } from "./base/baseMongo.service";
import { SampleService } from "./api/v1/sample.service";
import { BaseSequelizeService, ICrudOptionSequelize } from "./base/baseSequelize.service";
import { UserService } from "./api/v1/user.service";
import { TokenService } from "./common/token.service";
import { ScheduleService } from "./common/schedule.service";
import { ImageService } from "./api/image.service";
import { UtilService } from "./common/utilService";
import { FileService } from "./api/file.service";
import { SubSampleService } from "./api/v1/subSample.service";
import { BcryptService } from "./common/bcrypt.service";
import { LoginService } from "./common/login.service";
import { AuthService } from "./api/v1/auth.service";
import { FirebaseService } from "./common/firebase.service";
import { AgoraService } from "./common/agora.service";

const fileService = new FileService();
const imageService = new ImageService();
const scheduleService = new ScheduleService();
const tokenService = new TokenService();
const utilService = new UtilService();
const loginService = new LoginService()
const bcryptService = new BcryptService();
const errorService = new ErrorService();
const firebaseService = new FirebaseService();
const sampleService = new SampleService();
const userService = new UserService();
const subSampleService = new SubSampleService();
const authService = new AuthService();
const agoraService = new AgoraService();

export {
  BaseMongoService,
  BaseSequelizeService,
  ICrudExecOption,
  ICrudOptionMongo,
  ICrudOptionSequelize,
  scheduleService,
  errorService,
  utilService,
  tokenService,
  bcryptService,
  imageService,
  fileService,
  loginService,
  firebaseService,
  // CRUD
  sampleService,
  userService,
  subSampleService,
  authService,
  agoraService


};
