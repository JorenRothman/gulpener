export default class TaskBuilder {
    private _stream: NodeJS.ReadWriteStream;

    constructor(src: NodeJS.ReadWriteStream) {
        this._stream = src;
    }

    addStream(
        stream: [CallableFunction, any, any?, any?],
        isProduction: boolean
    ) {
        const [
            streamFunction,
            options,
            productionOptions,
            events = [],
        ] = stream;
        let streamOptions = options;

        if (isProduction) {
            if (
                typeof streamOptions === 'object' &&
                typeof productionOptions === 'object'
            ) {
                streamOptions = { ...streamOptions, ...productionOptions };
            } else if (productionOptions) {
                streamOptions = productionOptions;
            }
        }

        const func = streamFunction(streamOptions);

        events.forEach((event: [string, any]) => {
            const [name, trigger] = event;

            func.on(name, trigger);
        });

        this._stream.pipe(func);
    }

    get stream() {
        return this._stream;
    }
}
