const CLUI = require('clui');
const chalk = require('chalk');
const cliSelect = require('cli-select');
const comm = require('../../comm');
const store = require('../../store');
const findAllModules = require('../../utils/modules/getAllModules');
const removeModules = require('../../utils/modules/removeModules');

module.exports = async argv => {
  console.clear();
  const {
    noPrompt,
    snipe,
    verbose,
  } = argv;

  const searchPaths = store.getPaths();
  const ignoreKeywords = store.getIgnoreKeywords();
  const excludePaths = store.getExcludedPaths();

  if (!searchPaths) {
    comm.error('No configuration saved, add search paths first.');
    return;
  }

  if (searchPaths && searchPaths.length === 0) {
    comm.warning('No search paths, add search paths first.');
    return;
  }

  const lookingSpinner = new CLUI.Spinner('Looking for modules', ['|', '/', '-', '\\']);
  const removingSpinner = new CLUI.Spinner('Removing modules', ['|', '/', '-', '\\']);
  
  try {
    if (!noPrompt) { lookingSpinner.start(); }
    const allModules = await findAllModules(searchPaths, ignoreKeywords, excludePaths, !!verbose && !noPrompt);
    if (!noPrompt) { lookingSpinner.stop(); }
    if (allModules.length > 0) {
      if (!snipe) {
        if (!noPrompt) {
          const areYouSure = await comm.ask(`Found ${allModules.length} modules. Remove them? (Y/N)`)
          if (areYouSure.toLowerCase() !== 'y') {
            return;
          }
        }
        const start = new Date().getTime();
        if (!noPrompt) removingSpinner.start();

        await removeModules(allModules);

        if (!noPrompt) removingSpinner.stop();
        const end = new Date().getTime();
        if (!noPrompt) {
          comm.success(`${allModules.length} deleted. [${((end - start) / 1000).toFixed(2)}s]`);
        }
      } else {
        if (typeof snipe === 'string') {
          const nestedModules = await findAllModules([snipe], ignoreKeywords, excludePaths, !!verbose && !noPrompt);
          if (nestedModules && nestedModules.length > 0) {
            if (!noPrompt) {
              const areYouSure = await comm.ask(`Found ${nestedModules.length} modules. Remove them? (Y/N)`);
              if (areYouSure.toLowerCase() !== 'y') {
                return;
              }
            }
            const start = new Date().getTime();
            if (!noPrompt) removingSpinner.start();

            await removeModules(nestedModules);

            if (!noPrompt) removingSpinner.stop();
            const end = new Date().getTime();

            if (!noPrompt) {
              comm.success(`${nestedModules.length} deleted. [${((end - start) / 1000).toFixed(2)}s]`)
            }
          } else {
            if (!noPrompt) {
              comm.error('No modules found');
            }
          }
        } else if (snipe === true) {
          // Display options
          const selection = await cliSelect({
            values: allModules,
            selected: '✔️',
            unSelected: '⭕️',
            indentation: 2,
            cleanup: true,
            outputStream: process.stdout,
            inputStream: process.stdin,
            valueRenderer: (value, selected) => {
              if (selected) {
                return chalk.underline(chalk.green(value));
              }

              return value;
            }
          });

          if (selection.value) {
            const start = new Date().getTime();
            if (!noPrompt) removingSpinner.start();
  
            await removeModules([selection.value]);

            if (!noPrompt) removingSpinner.stop();
            const end = new Date().getTime();

            if (!noPrompt) {
              comm.success(`${nestedModules.length} deleted. [${((end - start) / 1000).toFixed(2)}s]`)
            }
          } else {
            process.exit();
          }

        }
      }
    } else {
      if (!noPrompt) {
        comm.success('No modules found.', false);
      }
    }  
  } catch (err) {
    if (verbose) {
      console.error(err);
    }
    lookingSpinner.stop();
    process.exit();
  }
  
}