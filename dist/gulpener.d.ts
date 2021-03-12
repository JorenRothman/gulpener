import { TaskFunction } from 'gulp';
export interface GulpenerOptions {
    name: string;
    watchName: string;
    inGlobs: string[];
    watchGlobs: string[];
    outFolder: string;
    isProduction: boolean;
    pipes?: [[CallableFunction, any, any?, any?]];
}
export default function gulpener(options: GulpenerOptions): [TaskFunction, TaskFunction?];
