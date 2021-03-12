/// <reference types="node" />
export default class TaskBuilder {
    private _stream;
    constructor(src: NodeJS.ReadWriteStream);
    addStream(stream: [CallableFunction, any, any?, any?], isProduction: boolean): void;
    get stream(): NodeJS.ReadWriteStream;
}
