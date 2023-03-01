const path = require("path");
const directoryName = path.basename(__dirname);

module.exports = {
  apps: [{
    name: directoryName,
    script: './build/index.js',
    node_args: '-r ts-node/register -r tsconfig-paths/register',
    watch: true,
    restart_delay: 10000,
    wait_ready: true
  }],

};