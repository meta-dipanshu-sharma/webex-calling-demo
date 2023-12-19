/* eslint-disable import/prefer-default-export */
import {
    createClient,
    LOGGER,
    CallType,
} from '@webex/web-calling-sdk';

import webex, {callingClient} from './lib/setup'
import {getMediaStreamAudioTrack} from './lib/media';

let callInfoClient = null;

export const createCallingClient = (discoveryConfig) => {
    return createClient(webex, {logger: {level: LOGGER.INFO}, discovery: discoveryConfig});
};

export const makeCall = async (destination) => {
    const callDestination = {
        type: CallType.URI,
        address: destination,
    };
    let localAudioTrack = await getMediaStreamAudioTrack();

    callInfoClient = callingClient.makeCall(callDestination);

    callInfoClient.dial({localAudioTrack});
    return callInfoClient;
};

/* call.on("callingClient:registered", (deviceInfo) => {
    deviceInfo = deviceInfo;
    console.log("Registration Success");
}); */

/* export const createCallInfoObject = () => {

    const callerInfo: any = call?.getCallerInfo();

    const callInfo: CallInfo = {
        displayName: callerInfo.name,
        userId: callerInfo.id,
        origin: callerInfo.num ? callerInfo.num : '',
        destination: '12345',
        callState: CallStatus.NEW_CALL,
        time: new Date().toString(),
        type: CallType.URI,
        callReference: call as ICall,
        correlationId: call?.getCorrelationId(),
        microphoneState: call?.isMuted() ? MicrophoneStatus.MUTED : MicrophoneStatus.UNMUTED,
    };
} */

export const answerCall = async () => {
    let localAudioTrack = await getMediaStreamAudioTrack();
    callInfoClient.answer({localAudioTrack})
}

export const disconnectCall = (call) => {
    call.end();
};

/* call?.on(EVENT_KEYS.PROGRESS, handleProgress);

call?.on(EVENT_KEYS.CONNECT, handleConnect);

call?.on(EVENT_KEYS.REMOTE_MEDIA, handleRemoteMedia);

call?.on(EVENT_KEYS.DISCONNECT, handleDisconnect); */

export {callInfoClient}