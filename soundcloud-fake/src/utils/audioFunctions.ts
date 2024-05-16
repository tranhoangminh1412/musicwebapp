export default class AudioFunctions {
  public fileURL: string = "";
  public audio: HTMLAudioElement;

  public constructor(fileURL: string) {
    this.fileURL = fileURL;
    this.audio = new Audio(fileURL);
    this.audio.preload = "metadata";
    // this.audio.autoplay = true;
  }

  public getfileURL() {
    return this.fileURL;
  }

  public play() {
    this.audio.play();
  }

  public pause() {
    this.audio.pause();
  }

  public traverse(seconds: number) {
    this.audio.currentTime = seconds;
    this.audio.play()
  }

  public getCurrentTime() {
    return this.audio.currentTime;
  }

  public getDuration() {
    return this.audio.duration;
  }

  public loop() {
    if (this.audio.loop) {
      this.audio.loop = false;      
    } else {
      this.audio.loop = true;
    }
  }
}

export function formattedTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60); // Calculate minutes
  const remainingSeconds = seconds % 60; // Calculate remaining seconds

  // Use string interpolation to format the result
  const formattedTime = `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}
