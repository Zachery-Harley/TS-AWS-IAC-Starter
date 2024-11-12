import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {SecureS3} from '@project/common'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here

        // example resource
        // const queue = new sqs.Queue(this, 'CdkQueue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });

        new SecureS3(this, "testBucket", {
            bucketName: "bu-bucket-name"
        });

    }
}
