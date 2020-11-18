var data = {
  player: {
    w: 18,
    h: 63,
    default: {
      x: 80,
      y: 300,
      size: 1.5,
      flip: false,
      speed: {
        jump: 6,
        fall_acel: 13,
        fall_max: 7,
        move_acel: 47,
        move_decel: 47,
        move_max: 5,
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
      fallDeath: true,
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
          240,
          20,
          10,
        ]),
        solid: false,
        visible: true,
        death: true,
        goal: false,
      },
      goal: {
        fill: F.getColor([
          40,
          220,
          20,
        ]),
        solid: false,
        visible: true,
        death: false,
        goal: true,
      },
    },
  },
  timer: {
    unfocused: false,
  },
};