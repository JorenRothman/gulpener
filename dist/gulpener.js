"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const TaskBuilder_1 = __importDefault(require("./TaskBuilder"));
function gulpener(options) {
    const { name, inGlobs, outFolder, watchGlobs, pipes = [], isProduction = true, } = options;
    gulp_1.task(`build:${name}`, () => {
        const taskBuilder = new TaskBuilder_1.default(gulp_1.src(inGlobs));
        pipes.forEach((pipe) => {
            taskBuilder.addStream(pipe, isProduction);
        });
        taskBuilder.addStream([gulp_1.dest, outFolder], isProduction);
        return taskBuilder.stream;
    });
    const buildTask = gulp_1.task(`build:${name}`);
    gulp_1.task(`watch:${name}`, () => gulp_1.watch(watchGlobs, buildTask));
    const watchTask = gulp_1.task(`watch:${name}`);
    return [buildTask.unwrap(), watchTask.unwrap()];
}
exports.default = gulpener;
