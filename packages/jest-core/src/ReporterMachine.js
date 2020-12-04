const {Machine, interpret} = require('xstate');

const onRunStartAction = () => {
  console.log('It works');
};

const reporterMachine = Machine(
  {
    id: 'jestMachine',
    initial: 'idle',
    states: {
      idle: {
        on: {
          START: 'onRunStart',
        },
      },
      onRunStart: {
        entry: 'onRunStartAction',
      },
      // onTestStart,
      // onTestComplete,
      // onRunComplete,
    },
  },
  {
    actions: {onRunStartAction},
  },
);

const reporterService = interpret(reporterMachine).onTransition(state =>
  console.log(state.value),
);

reporterService.start();

module.exports = reporterService;
