import * as cdk from 'aws-cdk-lib';
import {StackProps} from 'aws-cdk-lib';
import {Construct} from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import {SubnetType} from "aws-cdk-lib/aws-ec2";

export interface VpcStackProps extends StackProps {
    vpcName: string;
    maxAzs: number;
    cidrIp: string;
}

export class VpcStack extends cdk.Stack {
    readonly vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props: VpcStackProps) {
        super(scope, id, props);

        this.vpc = new ec2.Vpc(this, 'CommonVpc', {
            ...props,
            ipAddresses: ec2.IpAddresses.cidr(props.cidrIp),
            maxAzs: 2,
            natGateways: 0,
            subnetConfiguration: [
                {
                    cidrMask: 25,
                    name: 'public',
                    subnetType: SubnetType.PUBLIC
                },
                {
                    cidrMask: 25,
                    name: 'privateWithEgress',
                    subnetType: SubnetType.PRIVATE_WITH_EGRESS
                },
            ]
        })

        this.vpc.addGatewayEndpoint("S3", {
            service: ec2.GatewayVpcEndpointAwsService.S3
        })

    }
}
