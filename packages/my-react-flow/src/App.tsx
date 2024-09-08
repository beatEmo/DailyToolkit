import { useEffect, useMemo } from "react";
import { KeyStyle, KeysStyle, GlobalStyles, ButtonStyle } from "./piano";
function App() {
  const keys: Record<string, { frequency: number }> = {
    A: {
      frequency: 196,
    },
    S: {
      frequency: 220,
    },
    D: {
      frequency: 246,
    },
    F: {
      frequency: 261,
    },
    G: {
      frequency: 293,
    },
    H: {
      frequency: 329,
    },
    J: {
      frequency: 349,
    },
    K: {
      frequency: 392,
    },
  };

  const context = useMemo(() => new AudioContext(), []);

  const play = (key: string) => {
    const frequency = keys[key]?.frequency;
    if (!frequency) {
      return;
    }

    // 首先创建三节点并连接
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    const gain = context.createGain();
    const destination = context.destination;
    // 连接节点
    oscillator.connect(gain);
    gain.connect(destination);

    // 然后开始播放 线性的设置音量
    // 先设置音量为0，然后线性增加到1，然后指数降低到0.001，然后停止播放
    oscillator.start(context.currentTime);
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(1, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1);
    oscillator.stop(context.currentTime + 1);

    // 实现按压效果
    const keyElement = document.getElementById(`key-${key}`);
    keyElement?.classList.add("pressed");
    setTimeout(() => {
      keyElement?.classList.remove("pressed");
    }, 200);
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      const key = event.key.toUpperCase();
      play(key);
    });
  }, []);

  const map: Record<number, string> = {
    1: "A",
    2: "S",
    3: "D",
    4: "F",
    5: "G",
    6: "H",
    7: "J",
    8: "K",
  };

  function playSong1() {
    const music = [
      [6, 1000],
      [5, 1000],
      [3, 1000],
      [5, 1000],
      [8, 1000],
      [6, 500],
      [5, 500],
      [6, 1000],
    ];

    let startTime = 0;
    music.forEach((item) => {
      setTimeout(() => {
        play(map[item[0]]);
      }, startTime);
      startTime += item[1];
    });
  }
  function playMusic(music: number[][]) {
    let startTime = 0;
    music.forEach((item) => {
      setTimeout(() => {
        play(map[item[0]]);
      }, startTime * 0.5);
      startTime += item[1];
    });
  }

  function playSong2() {
    const music = [
      [6, 1000],
      [6, 1000],
      [6, 1000],
      [3, 500],
      [6, 500],
      [5, 1000],
      [3, 500],
      [2, 500],
      [3, 1000],
    ];
    playMusic(music);
  }
  function playSong3() {
    const music = [
      [1, 1000],
      [7, 500],
      [6, 500],
      [6, 1000],
      [5, 500],
      [3, 500],
      [3, 1000],
      [3, 1500],
      [2, 500],
      [1, 500],
      [6, 500],
      [1, 1000],
      [2, 500],
      [3, 500],
      [3, 1000],
    ];
    playMusic(music);
  }
  return (
    <>
      <KeysStyle as="section">
        {Object.keys(keys).map((item: any) => {
          return (
            <KeyStyle as="div" key={item}>
              <div onClick={() => play(item)} id={`key-${item}`}>
                <span>{item}</span>
              </div>
            </KeyStyle>
          );
        })}
      </KeysStyle>
      <GlobalStyles />
      <ButtonStyle>
        <button onClick={() => playSong1()}>世上只有妈妈好</button>
        <button onClick={() => playSong2()}>奢香夫人</button>
        <button onClick={() => playSong3()}>偏爱</button>
      </ButtonStyle>
    </>
  );
}

export default App;
