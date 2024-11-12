import {Config} from "./config";

export class GlobalConfig extends Config {

    getAccountId() {
        return this.getValueByPath("global.account_id");
    }

    getRegion() {
        return this.getValueByPath("global.region");
    }

    getEnvironmentName() {
        return this.getValueByPath("global.environment_name");
    }

}