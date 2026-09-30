const fs = require('node:fs');
const vm = require('node:vm');
const script = fs.readFileSync(__dirname + '/testimonial_parser_source.js', 'utf8');
const context = vm.createContext({
  document: {getElementById: () => ({textContent: ''})},
  window: {addEventListener: () => {}},
  Date, console,
});
vm.runInContext(script, context, {timeout: 1000, filename: 'testimonial_parser_source.js'});
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const parsed = vm.runInContext('parseJsonRegistration', context)(input)
      || vm.runInContext('chooseRecord', context)(input);
    process.stdout.write(JSON.stringify(parsed));
  } catch(error) {
    process.stderr.write(String(error));
    process.exitCode = 1;
  }
});
