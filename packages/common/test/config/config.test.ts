import * as fs from "fs";
import {readFileSync} from "fs";
import {Config} from "../../lib/config/config";

jest.mock("fs")

describe('getFile function', () => {
    it('should read the file when configName is provided', () => {
        const props = {configName: "configName"};
        const spy = jest.spyOn(fs, 'readFileSync').mockReturnValue(`
        root:
            key: value
            int: 1
            phone: '0770123456'
            boolean: false
        `);

        const uut = new Config(props);
        expect(uut.getValueByPath('root')).toStrictEqual({
            'key': 'value',
            'int': 1,
            'boolean': false,
            'phone': '0770123456'
        });
        expect(uut.getValueByPath('root.key')).toBe('value');
        expect(uut.getValueByPath('root.int') as number).toBe(1);
        expect(uut.getValueByPath('root.boolean') as boolean).toBe(false);
        expect(uut.getValueByPath('root.boolean') as boolean).toBe(false);
        expect(uut.getValueByPath('root.phone')).toBe('0770123456');

        expect(spy).toHaveBeenCalledWith('../../config/configName.yaml', 'utf8');
    });

    it('should get default value when given if path does not resolve to value', () => {
        const props = {configName: "configName"};
        jest.spyOn(fs, 'readFileSync').mockReturnValue(`
        root:
            key: value
        `);

        const uut = new Config(props);
        expect(uut.getValueByPath('root.missingKey', 'defaultString')).toBe('defaultString');
        expect(uut.getValueByPath('root.missingKey', 1)).toBe(1);
        expect(uut.getValueByPath('root.missingKey', false)).toBe(false);
    });

    it('should throw an error when the config path is missing', () => {
        const props = {configName: "configName"};
        jest.spyOn(fs, 'readFileSync').mockReturnValue('');

        const uut = new Config(props);
        expect(() => uut.getValueByPath('path.that.is.not.real'))
            .toThrowError('Config [configName] has no value for [path.that.is.not.real]');
    })

    it('should throw an error when configName cannot be found', () => {
        const props = {};
        expect(() => new Config(props)).toThrowError('Configuration [undefined] not found');
    })

    afterEach(() => {
        jest.resetAllMocks();
    })
})