import { User } from "./user.model";

export class LoginResultModel {
    isSuccess: boolean = false;
    errorMessage: string = "";
    StackTrace: string = "";
    userDetail: User;
}
