/* global Webex */

import {createCallingClient} from '../callingSdk'

console.log('Authentication#initWebex()');

const webexConfig = {
    config: {
        logger: {
            level: 'debug', // set the desired log level
        },
        meetings: {
            reconnection: {
                enabled: true,
            },
            enableRtx: true,
        },
    },
    credentials: {
        access_token: "YzYwMTIxOGMtZjlhZi00NzIyLTkwMTUtMmRjYWIyOTE5ODNkN2Q0OTM3OGUtZGRk_P0A1_b657fcf3-6b06-46a4-ab0e-f23fceb7a447",
    }
};

const webex = window.webex = Webex.init(webexConfig);

let callingClient;

webex.once('ready', () => {
    console.log('Authentication#initWebex() :: Webex Ready');
    console.log('Triggering register');
    callingClient = createCallingClient()
    console.log("starting00----------",webex.internal.device.userId);
    console.log("starting1----",webex.internal.device.clientDeviceUri);

    callingClient.register();

    callingClient.on('callingClient:registered', (deviceInfo) => {
        console.log("hey----------",deviceInfo);
    });
});

export default webex;
export {callingClient};
