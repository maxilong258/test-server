interface ClassConstructor {
    new (...args: any[]): any;
}
export declare function Serialize(dto: ClassConstructor): MethodDecorator & ClassDecorator;
export {};
