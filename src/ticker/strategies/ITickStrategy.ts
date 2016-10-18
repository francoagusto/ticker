export  interface ITickStrategy {
    execute(): void;
    cancel(): void;
    isRunning(): boolean;
}
