import { IOption } from '@app/interfaces';

type IOptionParams = Partial<IOption> & Pick<IOption, 'value' | 'label'>;

export class FormOption implements IOption {
    private _label: string;
    public displayName: string;
    public visible: boolean;
    public disabled: boolean;
    public className: string;
    public value: any;

    constructor(params: IOptionParams) {
        this._label = params.label;
        this.displayName = params.displayName ?? null;
        this.visible = params.visible ?? true;
        this.disabled = params.disabled ?? false;
        this.className = params.className ?? null;
        this.value = params.value;
    }

    public get label(): string {
        return this._label;
    }
}

export const optionsFromEnum = (e: { [key: string]: string }) => {
  return Object.keys(e).map(k => new FormOption({ displayName: k, value: k, label: k }));
};


export const optionsFromArray = (arr) => {
  return arr.map(item => new FormOption({ displayName: item[0], value: item[1], label: item[0] }));
};

export const optionsFromCountryCodes = (codes) => {
  return Object.values(codes).map((item: any) => new FormOption({ displayName: item.name, value: item.code, label: item.name }));
};

