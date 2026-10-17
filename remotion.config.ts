import {Config} from '@remotion/cli/config';
import {existsSync} from 'node:fs';
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Use the installed Chromium in this cloud; elsewhere Remotion downloads its browser.
if (existsSync('/usr/bin/chromium')) Config.setBrowserExecutable('/usr/bin/chromium');
