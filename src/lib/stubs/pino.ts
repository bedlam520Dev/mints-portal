type LogMethod = (...args: unknown[]) => void;

const levels = {
	values: {
		fatal: 60,
		error: 50,
		warn: 40,
		info: 30,
		debug: 20,
		trace: 10,
		silent: Infinity,
	} satisfies Record<string, number>,
};

type PinoLogger = {
	child: (context?: Record<string, unknown>) => PinoLogger;
	trace: LogMethod;
	debug: LogMethod;
	info: LogMethod;
	warn: LogMethod;
	error: LogMethod;
	fatal: LogMethod;
	level?: string;
};

const createLogger = (): PinoLogger => {
	const noop: LogMethod = () => undefined;
	const logger: PinoLogger = {
		child: () => createLogger(),
		trace: noop,
		debug: noop,
		info: noop,
		warn: noop,
		error: noop,
		fatal: noop,
	};
	return logger;
};

export const pino = () => createLogger();

const stub = Object.assign(pino, { levels });

export default stub;
export { levels };
  
