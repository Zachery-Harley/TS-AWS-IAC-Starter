import {parse as yamlParse} from 'yaml';
import {readFileSync} from 'fs';
import _ from 'lodash';

export interface ConfigProps {
    configName?: string;
    subDeployment?: string;
}

export class Config {
    readonly props: ConfigProps;
    readonly configYaml;

    constructor(props: ConfigProps) {
        this.props = props;
        this.configYaml = yamlParse(this.getConfiguration(props));
    }

    getValueByPath(path: string, defaultValue?: any): any {
        const value = _.get(this.configYaml, path, defaultValue);

        if (value === undefined) {
            throw new Error(`Config [${this.props.configName}] has no value for [${path}]`)
        }

        return value;
    }

    private getConfiguration(props: ConfigProps): string {
        if (props.configName) {
            return readFileSync(`../../config/${props.configName}.yaml`, 'utf8')
        }

        throw new Error(`Configuration [${props.configName}] not found`);
    }

}