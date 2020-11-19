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
        drop_acel: 5,
        drop_max: 70,
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
    camMove: 3.5,
    default: {
      img: "sky",
      type: "static",
      fallDeath: true,
      cam: {
        x: true,
        y: false,
        z: false,
        type: "dynamic",
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
          35,
        ]),
        solid: true,
        visible: true,
        death: false,
        goal: false,
      },
      display: {
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
      clear: {
        fill: F.getColor([
          0,
          0,
          0,
          0,
        ]),
        solid: true,
        visible: false,
        death: false,
        goal: false,
      },
      death: {
        fill: F.getColor([
          160,
          40,
          30,
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