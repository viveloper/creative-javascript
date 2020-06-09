class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.playBtn = document.querySelector('.play');
    this.currentKick = './sounds/kick-classic.wav';
    this.currentSnare = './sounds/snare-acoustic01.wav';
    this.currentHihat = './sounds/hihat-acoustic01.wav';
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.selects = document.querySelectorAll('select');
    this.muteBtns = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');
    this.index = 0;
    this.bpm = 150;
    this.playId = null;

    this.playBtn.addEventListener('click', this.start.bind(this));
    this.pads.forEach((pad) => {
      pad.addEventListener('click', this.activePad);
      pad.addEventListener(
        'animationend',
        (e) => (e.target.style.animation = '')
      );
    });
    this.selects.forEach((select) => {
      select.addEventListener('change', this.changeSound.bind(this));
    });
    this.muteBtns.forEach((muteBtn) => {
      muteBtn.addEventListener('click', this.mute.bind(this));
    });
    this.tempoSlider.addEventListener('input', this.changeTempo.bind(this));
    this.tempoSlider.addEventListener('change', this.updateTempo.bind(this));
  }
  activePad() {
    this.classList.toggle('active');
  }
  updateBtn() {
    if (!this.playId) {
      this.playBtn.innerText = 'Play';
    } else {
      this.playBtn.innerText = 'Stop';
    }
  }
  changeSound(e) {
    if (e.target.name === 'kick-select') {
      this.kickAudio.src = e.target.value;
    } else if (e.target.name === 'snare-select') {
      this.snareAudio.src = e.target.value;
    } else if (e.target.name === 'hihat-select') {
      this.hihatAudio.src = e.target.value;
    }
  }
  mute(e) {
    e.target.classList.toggle('active');
    switch (e.target.dataset.track) {
      case '0':
        this.kickAudio.volume = e.target.classList.contains('active') ? 0 : 1;
        break;
      case '1':
        this.snareAudio.volume = e.target.classList.contains('active') ? 0 : 1;
        break;
      case '2':
        this.hihatAudio.volume = e.target.classList.contains('active') ? 0 : 1;
        break;
      default:
        break;
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector('.tempo-number');
    this.bpm = e.target.value;
    tempoText.innerText = this.bpm;
  }
  updateTempo(e) {
    clearInterval(this.playId);
    this.playId = null;
    this.start();
  }
  repeat() {
    const step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((activeBar) => {
      activeBar.style.animation = 'playTrack 0.3s reverse ease-in-out';
      if (activeBar.classList.contains('active')) {
        if (activeBar.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (activeBar.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (activeBar.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.playId) {
      this.playId = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.playId);
      this.playId = null;
    }
    this.updateBtn();
  }
}

const drumKit = new DrumKit();
