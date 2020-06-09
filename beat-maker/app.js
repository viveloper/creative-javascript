class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.playBtn = document.querySelector('.play');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 150;

    this.playBtn.addEventListener('click', this.start.bind(this));
    this.pads.forEach((pad) => {
      pad.addEventListener('click', this.activePad);
    });
  }
  activePad() {
    console.log(this.classList.toggle('active'));
  }
  repeat() {
    const step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    console.log(activeBars);
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}

const drumKit = new DrumKit();

// drumKit.playBtn.addEventListener('click', () => drumKit.start());
