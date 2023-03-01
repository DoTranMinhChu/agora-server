
import { RefreshTokenUserRepository } from "./common/refreshTokenUser.repository";
import { SampleRepository } from "./common/sample.repository";
import { SubSampleRepository } from "./common/subSample.repository";
import { UserRepository } from "./common/user.repository";

const userRepository = new UserRepository();
const sampleRepository = new SampleRepository();
const subSampleRepository = new SubSampleRepository();
const refreshTokenUserRepository = new RefreshTokenUserRepository();

export {
    userRepository,
    sampleRepository,
    subSampleRepository,
    refreshTokenUserRepository
}