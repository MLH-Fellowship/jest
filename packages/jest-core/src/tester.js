const {eventEmitter} = require('./ReporterMachine');
async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
eventEmitter.on('on-run-start', async reporter => {
  await wait(1000);
  console.log(`Caught reporter ${reporter} 🎉`);
});
