export const getMediaStreamAudioTrack = () => {
    // Constraints for audio-only stream
    const constraints = {audio: true, video: false};

    // Request the user's permission to access the microphone
    return navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            return audioTrack;
        })
};

export let remoteMediaStream;

export const setRemoteMediaStream = (stream) => {
    remoteMediaStream = stream;
}
export const getRemoteMediaStream = () => {
    return remoteMediaStream;
}