interface Transcoder {
    checkLogs: () => void;
    processMedia: (file: File) => void;
}