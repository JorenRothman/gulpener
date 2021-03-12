import { TaskFunction, dest, series, src, task, watch } from 'gulp';

import { FSWatcher } from 'node:fs';
import TaskBuilder from './TaskBuilder';

export interface GulpenerOptions {
    name: string;
    watchName: string;
    inGlobs: string[];
    watchGlobs: string[];
    outFolder: string;
    isProduction: boolean;
    pipes?: [[CallableFunction, any, any?, any?]];
}

export default function gulpener(
    options: GulpenerOptions
): [TaskFunction, TaskFunction?] {
    const {
        name,
        watchName = '',
        inGlobs,
        outFolder,
        watchGlobs,
        pipes = [],
        isProduction = true,
    } = options;

    task(`${name}`, () => {
        const taskBuilder = new TaskBuilder(src(inGlobs));

        pipes.forEach((pipe) => {
            taskBuilder.addStream(pipe, isProduction);
        });

        taskBuilder.addStream([dest, outFolder], isProduction);

        return taskBuilder.stream;
    });

    const normalTask = task(`build:${name}`);

    if (watchName) {
        task(`${watchName}`, () => watch(watchGlobs, normalTask));

        const watchTask = task(`watch:${name}`);

        return [normalTask.unwrap(), watchTask.unwrap()];
    }

    return [normalTask.unwrap()];
}
