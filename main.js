const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

var app = {
  currentIndex: 0,
  isRandom: false,
  isRepeat: false,
  isPlaying: false,
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  songs: [
    {
      name: "Click Pow Get Down",
      singer: "Raftaar x Fortnite",
      path: "assets/css/y2mate.com - laikd  Laryssa Vachon  Anew Lyrics.mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
    },
    {
      name: "Tu Phir Se Aana",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "assets/css/y2mate.com - laikd  Laryssa Vachon  Anew Lyrics.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path: "assets/css/y2mate.com - laikd  Laryssa Vachon  Anew Lyrics.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
    },
    {
      name: "Mantoiyat",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "assets/css/y2mate.com - laikd  Laryssa Vachon  Anew Lyrics.mp3",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
    },
    {
      name: "Aage Chal",
      singer: "Raftaar",
      path: "assets/css/y2mate.com - laikd  Laryssa Vachon  Anew Lyrics.mp3",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "assets/css/y2mate.com - laikd  Laryssa Vachon  Anew Lyrics.mp3",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg",
    },
    {
      name: "Feeling You",
      singer: "Raftaar x Harjas",
      path: "assets/css/y2mate.com - laikd  Laryssa Vachon  Anew Lyrics.mp3",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
    },
  ],
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  handleEvents: function () {
    // var _this=this;
    //Xử lí cho đĩa quay
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    playBtn.onclick = function () {
      //Khi song bị pause
      if (app.isPlaying) {
        audio.pause();
        player.classList.remove("playing");
        app.isPlaying = false;
        cdThumbAnimate.pause();
      } else {
        audio.play();
        cdThumbAnimate.play();
      }
    };
    audio.onplay = function () {
      app.isPlaying = true;
      player.classList.add("playing");
    };
    //Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        var currentprogress = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = currentprogress;
      }
    };
    //Xử lý khi tua
    progress.onchange = function (e) {
      const seektime = (e.target.value * audio.duration) / 100;
      audio.currentTime = seektime;
    };
    //Xử lý khi next bài tiếp theo
    nextBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.nextSong();
      }
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };
    //Xử lý khi pre bài trước
    prevBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.preSong();
      }
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };
    //Xử lý khi random bài hát ngẫu nhiên
    randomBtn.onclick = function () {
      app.isRandom = !app.isRandom;
      randomBtn.classList.toggle("active", app.isRandom);
    };
    //xử lý khi ended
    audio.onended = function () {
      if (app.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    //xử lý lặp lại bài hát
    repeatBtn.onclick = function () {
      app.isRepeat = !app.isRepeat;
      repeatBtn.classList.toggle("active", app.isRepeat);
    };
    //xử lý click vào song
    playlist.onclick = function (e) {
      var node = e.target.closest(".song:not(.active)");
      if (
        e.target.closest(".song:not(.active)") ||
        e.target.closest(".option")
      ) {
        if (e.target.closest(".song:not(.active)")) {
          app.currentIndex = Number(node.getAttribute("data-index"));
          app.loadCurrentSong();
          app.render();
          audio.play();
        }
      }
    };
  },
  nextSong: function () {
    if (this.isRepeat) {
      this.loadCurrentSong();
    } else {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
    }
  },
  preSong: function () {
    if (this.isRepeat) {
      this.loadCurrentSong();
    } else {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
      }
      this.loadCurrentSong();
    }
  },
  randomSong: function () {
    do {
      var newindex = Math.floor(Math.random() * this.songs.length);
    } while (newindex === this.currentIndex);
    this.currentIndex = newindex;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    $(".song.active").scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  },
  render: function () {
    const htmls = this.songs.map(function (song, index) {
      return `
          <div class="song ${
            index === app.currentIndex ? "active" : ""
          }" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
          </div>
          `;
    });
    $(".playlist").innerHTML = htmls.join("");
  },
  start: function () {
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
  },
};
app.start();
