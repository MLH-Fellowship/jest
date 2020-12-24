const Emittery = require('emittery');
const {Machine} = require('xstate');

const insideORS = () => {
  console.log('Inside ORS');
};

const insideARS = () => {
  console.log('Inside ARS');
};

const inIdle = () => {
  console.log('Inside IDLE');
};

const eventEmitter = new Emittery.Typed();
exports.eventEmitter = eventEmitter;

require('./TestScheduler'); // require('./reporter2');

const emitStateToReporters = async (state, reporters) => {
  for (const reporter of reporters) {
    console.log(' ✅ Requiring reporter ', reporter);

    require(reporter);
  }

  for (const reporter of reporters) {
    await emitStateToReporter(state, reporter);
  }
};

const emitStateToReporter = async (state, reporter) => {
  console.log(`🚀 Emitting! to ${reporter}`);
  await eventEmitter.emit(state, reporter);
};

// const setUpListeners = async aggregatedResults => {
//   await emitStateToReporter('after-on-run-start', aggregatedResults);
// };

const createReporterMachine = ({reporters, aggregatedResults}) =>
  Machine(
    {
      context: {
        aggregatedResults,
        reporters,
      },
      id: 'jestMachine',
      initial: 'idle',
      states: {
        afterOnRunStart: {
          entry: ['insideARS'],
          invoke: {
            src: context => async callback => {
              await emitStateToReporter(
                'after-on-run-start',
                context.aggregatedResults,
              );
              callback('DONE');
            },
          },
          on: {
            DONE: 'idle',
          },
        },
        idle: {
          entry: 'inIdle',
          on: {
            ON_RUN_START: 'onRunStart',
          },
        },
        onRunStart: {
          entry: 'insideORS',
          invoke: {
            id: 'run-reporters',
            src: context => async callback => {
              await emitStateToReporters('on-run-start', context.reporters);
              callback('DONE');
            },
          },
          on: {
            DONE: 'afterOnRunStart',
          },
        }, // onTestStart,
        // onTestComplete,
        // onRunComplete,
      },
    },
    {
      actions: {
        emitStateToReporter,
        emitStateToReporters,
        inIdle,
        insideARS,
        insideORS,
      },
    },
  );

exports.createReporterMachine = createReporterMachine;
