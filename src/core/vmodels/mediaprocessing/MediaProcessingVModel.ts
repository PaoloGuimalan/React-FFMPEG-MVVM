import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { AuthVModel } from "../auth/AuthVModel";
import { FFmpeg } from '@ffmpeg/ffmpeg';

class MediaProcessingVModel extends AuthVModel implements Transcoder {

    private crossOriginIsolationCheckerWorker;
    private ffmpeg = new FFmpeg();
    private loadffmpeg = async () => {
        if(this.userValidationMiddleware()){
                try {
                await this.ffmpeg.load({
                    coreURL: await toBlobURL(`/ffmpeg/ffmpeg-core.js`, 'text/javascript'),
                    wasmURL: await toBlobURL(`/ffmpeg/ffmpeg-core.wasm`, 'application/wasm'),
                    workerURL: await toBlobURL(
                        `/ffmpeg/ffmpeg-core.worker.js`,
                        'text/javascript',
                    ),
                });
            } catch (error) {
                console.log('FFmpeg load error:', error);
            }
        }
    };

    constructor(){
        super();
        this.crossOriginIsolationCheckerWorker = new Worker('/ffmpeg/app.worker.js');
        this.crossOriginIsolationCheckerWorker.onmessage = (event) => {
            console.log({ crossOriginIsolated: event.data });
        };

        this.loadffmpeg();
    }

    public checkLogs = () => {
        if(this.userValidationMiddleware()){
            this.ffmpeg.on('log', ({ message }) => {
                console.log(message);
                const errorParameters = ['Please consider specifying a lower framerate'];

                if (errorParameters.includes(message)) {
                    console.log("Error Transcoding");
                }
            })

            this.ffmpeg.on('progress', ({ progress }) => {
                if (progress <= 1) {
                    console.log("Transcoding progress: ", progress)
                }
            });
        }
    }

    public processMedia = async (file: File) => {
        if(this.userValidationMiddleware()){
            try{
                const slicedfile = file;
                const blob = new Blob([slicedfile], { type: slicedfile.type });
                const url = URL.createObjectURL(blob);
                await this.ffmpeg.writeFile('input.mp4', await fetchFile(url));
                await this.ffmpeg.exec([
                    '-i',
                    'input.mp4',
                    // explicitly select the first audio stream from the first input file
                    '-map',
                    '0:a:0',
                    '-af',
                    'highpass=f=200, lowpass=f=3000, afftdn=nf=-80:rf=-80',
                    '-b:a',
                    '64k',
                    // handle high frame rate videos
                    '-vsync',
                    'vfr',
                    '-fps_mode',
                    'vfr',
                    // output only audio (no video)
                    '-vn',
                    'output.mp3',
                ]);
                const fileData = await this.ffmpeg.readFile('output.mp3');
                const data = new Uint8Array(fileData as ArrayBuffer);
                const audioBlob = new Blob([data.buffer], { type: 'audio/mp3' });
                const finalBlobUrl = URL.createObjectURL(audioBlob);

                const a = document.createElement("a")

                const newFilename = file.name.split(".")
                newFilename.pop();

                a.download = `${newFilename}.mp3`
                a.href = finalBlobUrl
                a.click()
                setTimeout(() => {
                    URL.revokeObjectURL(a.href)
                    a.remove()
                }, 200)
            } catch(err) {
                console.log(err);
            }
        }
    }
}

export default MediaProcessingVModel;