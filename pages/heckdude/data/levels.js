var lvls = {
  0: {
    name: "The first level",
    blocks: [
      {
        x: 40,
        y: 400,
        w: 1000,
      },
      {
        x: 300,
        y: 330,
        // type: "clear",
      },
    ]
  },
  1: {
    name: "The first level",
    bg: {
      img: "sky",
      type: "static",
      camX: true,
      camY: false,
    },
    player: {
      x: 90,
      y: 87,
      w: 1.5,
      h: 1.5,
      speed: {
        move: 140,
        jump: 500,
        fall: 16,
        slow: 80,
        move_max: 10,
        fall_max: 10,
      },
      vel: {
        y: 0,
        x: 0,
      },
    },
    blocks: [
      {
        x: -1200,
        y: -1000,
        w: 1000,
        h: 2000,
        fill: "rgba(0, 0, 0, 0)",
        type: "block"
      },
      {
        x: 800,
        y: -1000,
        w: 1000,
        h: 2000,
        fill: "rgba(0, 0, 0, 0)",
        type: "block"
      },
      {
        x: 45,
        y: 70,
        w: 5,
        h: 80,
        fill: "rgba(180, 180, 180)",
        type: "clear"
      },
      {
        x: 42,
        y: 145,
        w: 11,
        h: 5,
        fill: "rgba(180, 180, 180)",
        type: "clear"
      },
      {
        x: 5,
        y: 70,
        w: 40,
        h: 28,
        fill: "rgba(180, 80, 80)",
        type: "clear"
      },
      {
        x: -400,
        y: 150,
        w: 550,
        h: 60,
        fill: "rgba(30, 30, 30)",
        type: "block"
      },
      {
        x: 200,
        y: 300,
        w: 100,
        h: 60,
        fill: "rgba(30, 30, 30)",
        type: "block"
      },
      {
        x: 280,
        y: 73,
        w: 20,
        h: 250,
        fill: "rgba(30, 30, 30)",
        type: "block"
      },
      {
        x: 90,
        y: 210,
        w: 60,
        h: 150,
        fill: "rgba(30, 30, 30)",
        type: "block"
      },
      {
        x: 209,
        y: 450,
        w: 251,
        h: 30,
        fill: "rgba(30, 30, 30)",
        type: "block"
      },
      {
        x: 400,
        y: 420,
        w: 31,
        h: 30,
        fill: "rgba(150, 30, 30)",
        type: "obstacle"
      },
      {
        x: 430,
        y: 391,
        w: 30,
        h: 59,
        fill: "rgba(150, 30, 30)",
        type: "obstacle"
      },
      {
        x: 459,
        y: 390,
        w: 500,
        h: 90,
        fill: "rgba(30, 30, 30)",
        type: "block"
      },
      {
        x: 299,
        y: 330,
        w: 61,
        h: 30,
        fill: "rgba(30, 30, 30)",
        type: "block"
      },
      {
        x: 300,
        y: 270,
        w: 60,
        h: 60,
        fill: "rgba(150, 150, 10, 0.8)",
        type: "goal"
      }
    ]
  },
};