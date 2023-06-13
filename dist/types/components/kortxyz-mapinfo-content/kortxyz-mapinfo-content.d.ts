export declare class KortxyzMapinfoContent {
  text: string;
  url: string;
  template: string;
  getValue: (path: any, obj: any) => any;
  parseStringTemplate: (str: any, obj: any) => string;
  updateText(e: any): Promise<void>;
  render(): any;
}
