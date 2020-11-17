var data = {
  player: {
    w: 18,
    h: 63,
    default: {
      x: 80,
      y: 300,
      w: 1.5,
      h: 1.5,
      flip: false,
      speed: {
        jump: 580,
        fall: 20,
        move: 70,
        slow: 80,
        move_max: 10,
        fall_max: 10,
      },
      vel: {
        y: 0,
        x: 0,
      },
    },
  },
  bg: {
    default: {
      img: "sky",
      type: "static",
      cam: {
        x: true,
        y: false,
        z: false,
      },
    },
  },
  blocks: {
    lineWidth: 2,
    types: {
      solid: {
        fill: F.getColor([
          30,
          30,
          45,
        ]),
        solid: true,
        visible: true,
        death: false,
        goal: false,
      },
      clear: {
        fill: F.getColor([
          200,
          200,
          200,
          0.5,
        ]),
        solid: false,
        visible: true,
        death: false,
        goal: false,
      },
      death: {
        fill: F.getColor([
          40,
          220,
          20,
        ]),
        solid: false,
        visible: true,
        death: true,
        goal: false,
      },
      goal: {
        fill: F.getColor([
          240,
          240,
          10,
        ]),
        solid: false,
        visible: true,
        death: false,
        goal: true,
      },
    },
  },
};