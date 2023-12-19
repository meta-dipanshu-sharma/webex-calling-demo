import {useRef} from "react";
import {EVENT_KEYS} from "@webex/web-calling-sdk";
import {useCallProgress, useCallConnect, useCallDisconnect, useRemoteMedia} from "./hooks/CallHandling.hooks";
import {getRemoteMediaStream} from "./lib/media";

const CallingContainer = (callInfoClient) => {
    const remoteAudioRef = useRef < HTMLAudioElement > (null);

    const remoteMediaStream = getRemoteMediaStream();

    // Updating remoteAudioRef current with correct remote media stream received for the call
    if (
        remoteMediaStream &&
        remoteAudioRef !== null &&
        remoteAudioRef.current !== null &&
        remoteAudioRef.current.srcObject !== remoteMediaStream
    ) {
        console.log("Remote media coming from other side", remoteMediaStream);
        //remoteAudioRef.current.srcObject = remoteMediaStream;
    }
    const handleProgress = useCallProgress(remoteAudioRef);
    const handleConnect = useCallConnect();
    const handleRemoteMedia = useRemoteMedia();
    const handleDisconnect = useCallDisconnect();

    callInfoClient.on(EVENT_KEYS.PROGRESS, handleProgress);

    callInfoClient.on(EVENT_KEYS.CONNECT, handleConnect);

    callInfoClient.on(EVENT_KEYS.REMOTE_MEDIA, handleRemoteMedia);

    callInfoClient.on(EVENT_KEYS.DISCONNECT, handleDisconnect);
}

export default CallingContainer;
