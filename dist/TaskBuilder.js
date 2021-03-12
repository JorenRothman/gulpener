"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskBuilder {
    constructor(src) {
        this._stream = src;
    }
    addStream(stream, isProduction) {
        const [streamFunction, options, productionOptions, events = [],] = stream;
        let streamOptions = options;
        if (isProduction) {
            if (typeof streamOptions === 'object' &&
                typeof productionOptions === 'object') {
                streamOptions = Object.assign(Object.assign({}, streamOptions), productionOptions);
            }
            else if (productionOptions) {
                streamOptions = productionOptions;
            }
        }
        const func = streamFunction(streamOptions);
        events.forEach((event) => {
            const [name, trigger] = event;
            func.on(name, trigger);
        });
        this._stream.pipe(func);
    }
    get stream() {
        return this._stream;
    }
}
exports.default = TaskBuilder;
