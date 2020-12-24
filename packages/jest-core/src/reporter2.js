const {eventEmitter} = require('./ReporterMachine');
async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
eventEmitter.on('on-run-start', async reporter => {
  await wait(1000);
  console.log(`--->Found reporter ${reporter} 🎉`);
});

eventEmitter.on('on-run-start', async reporter => {
  await wait(1000);
  console.log(`--->Found2 reporter ${reporter} 🎉`);
});
