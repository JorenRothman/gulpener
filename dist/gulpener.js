"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const TaskBuilder_1 = __importDefault(require("./TaskBuilder"));
function gulpener(options) {
    const { name, watchName = '', inGlobs, outFolder, watchGlobs, pipes = [], isProduction = true, } = options;
    gulp_1.task(`${name}`, () => {
        const taskBuilder = new TaskBuilder_1.default(gulp_1.src(inGlobs));
        pipes.forEach((pipe) => {
            taskBuilder.addStream(pipe, isProduction);
        });
        taskBuilder.addStream([gulp_1.dest, outFolder], isProduction);
        return taskBuilder.stream;
    });
    const normalTask = gulp_1.task(`build:${name}`);
    if (watchName) {
        gulp_1.task(`${watchName}`, () => gulp_1.watch(watchGlobs, normalTask));
        const watchTask = gulp_1.task(`watch:${name}`);
        return [normalTask.unwrap(), watchTask.unwrap()];
    }
    return [normalTask.unwrap()];
}
exports.default = gulpener;
