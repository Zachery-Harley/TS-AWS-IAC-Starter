#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {VpcStack} from '../lib/vpc.stack';
import {BootstrapConfig} from "../lib/config/bootstrapConfig";
import {getEnvironment} from 'common';

const app = new cdk.App();
const environment = getEnvironment(app);

const config = new BootstrapConfig({configName: environment});

new VpcStack(app, 'BootstrapStack', {
    stackName: 'BootstrapStack',
    ...config.getVpcConfig(),
    env: {
        region: config.getRegion(),
        account: config.getAccountId()
    },
});