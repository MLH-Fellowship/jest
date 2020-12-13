const Emittery = require('emittery');
const {Machine} = require('xstate');

const insideORS = () => {
  console.log('Inside ORS');
};

const insideARS = () => {
  console.log('Inside ARS');
};

export const eventEmitter = new Emittery.Typed();
require('./tester');

const emitStateToReporters = async reporters => {
  for (const reporter of reporters) {
    await emitStateToReporter(reporter);
  }
};

const emitStateToReporter = async reporter => {
  console.log(`Emitted! to ${reporter}`);
  await eventEmitter.emit('on-run-start', reporter);
};

export const createReporterMachine = reporters =>
  Machine(
    {
      context: {
        reporters,
      },
      id: 'jestMachine',
      initial: 'idle',
      states: {
        afterOnRunStart: {
          entry: 'insideARS',
        },
        idle: {
          on: {
            ON_RUN_START: 'onRunStart',
          },
        },
        onRunStart: {
          entry: 'insideORS',
          invoke: {
            id: 'run-reporters',
            src: context => async callback => {
              await emitStateToReporters(context.reporters);
              callback('DONE');
            },
          },
          on: {
            DONE: 'afterOnRunStart',
          },
        },

        // onTestStart,
        // onTestComplete,
        // onRunComplete,
      },
    },
    {
      actions: {emitStateToReporters, insideARS, insideORS},
    },
  );
