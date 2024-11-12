import * as s3 from 'aws-cdk-lib/aws-s3'
import {BucketEncryption, BucketProps} from 'aws-cdk-lib/aws-s3'
import {Construct} from 'constructs';

export class SecureS3 extends Construct {
    readonly bucket: s3.Bucket;

    constructor(scope: Construct, id: string, props?: BucketProps) {
        super(scope, id);

        this.bucket = new s3.Bucket(this, id, {
            ...props,
            encryption: BucketEncryption.S3_MANAGED,
            enforceSSL: true,
            publicReadAccess: false,
        });
    }
}