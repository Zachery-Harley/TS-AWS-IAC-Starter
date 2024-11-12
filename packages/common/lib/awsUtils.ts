import * as cdk from 'aws-cdk-lib'


export function getEnvironment(app: cdk.App) {
    const environment = app.node.tryGetContext('env');
    if (!environment) {
        throw new Error('No environment defined. -c env=<envName>')
    }
    return environment;
}