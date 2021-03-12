import { TaskFunction, dest, series, src, task, watch } from 'gulp';

import { FSWatcher } from 'node:fs';
import TaskBuilder from './TaskBuilder';

export interface GulpenerOptions {
    name: string;
    inGlobs: string[];
    watchGlobs: string[];
    outFolder: string;
    isProduction: boolean;
    pipes?: [[CallableFunction, any, any?, any?]];
}

export default function gulpener(
    options: GulpenerOptions
): [TaskFunction, TaskFunction] {
    const {
        name,
        inGlobs,
        outFolder,
        watchGlobs,
        pipes = [],
        isProduction = true,
    } = options;

    task(`build:${name}`, () => {
        const taskBuilder = new TaskBuilder(src(inGlobs));

        pipes.forEach((pipe) => {
            taskBuilder.addStream(pipe, isProduction);
        });

        taskBuilder.addStream([dest, outFolder], isProduction);

        return taskBuilder.stream;
    });

    const buildTask = task(`build:${name}`);

    task(`watch:${name}`, () => watch(watchGlobs, buildTask));

    const watchTask = task(`watch:${name}`);

    return [buildTask.unwrap(), watchTask.unwrap()];
}
