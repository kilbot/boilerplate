// Source: https://github.com/sindresorhus/electron-is-dev
// TODO: how to include non-electron dependencies?

import electron from 'electron';

const app = electron.app || electron.remote.app;

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

export const isDev = isEnvSet ? getFromEnv : !app.isPackaged;
