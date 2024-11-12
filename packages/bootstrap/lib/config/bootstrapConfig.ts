import {ConfigProps, GlobalConfig} from "common"

export interface VpcConfig {
    cidrIp: string,
    maxAzs: number,
    vpcName: string,
}

export class BootstrapConfig extends GlobalConfig {

    constructor(props: ConfigProps) {
        super(props);
    }

    getVpcConfig(): VpcConfig {
        return {
            cidrIp: this.getValueByPath('bootstrap.vpc.cidr'),
            vpcName: this.getValueByPath('bootstrap.vpc.vpc_name'),
            maxAzs: this.getValueByPath('bootstrap.vpc.max_azs', 2),
        }
    }

}