const {Machine, interpret} = require('xstate');

const onRunStartAction = () => {
  console.log('It works');
};

const confirm = () => {
  console.log('Inside wait');
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
        on: {
          A_START: 'afterOnRunStart',
        },
      },
      afterOnRunStart: {
        entry: 'confirm',
      },
      // onTestStart,
      // onTestComplete,
      // onRunComplete,
    },
  },
  {
    actions: {onRunStartAction, confirm},
  },
);

module.exports = {reporterMachine};
