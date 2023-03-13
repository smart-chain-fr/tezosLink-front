import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles"

export default function Confettis() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 0
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: ["circle", "square", "polygon"],
                        options: {
                            polygon: {
                                sides: 6
                            }
                        }
                    },
                    opacity: {
                        value: { min: 0, max: 1 },
                        animation: {
                            enable: true,
                            speed: 1,
                            startValue: "max",
                            destroy: "min"
                        }
                    },
                    size: {
                        value: { min: 2, max: 5 }
                    },
                    life: {
                        duration: {
                            sync: true,
                            value: 7
                        },
                        count: 1
                    },
                    move: {
                        enable: true,
                        gravity: {
                            enable: true
                        },
                        drift: {
                            min: -2,
                            max: 2
                        },
                        speed: { min: 10, max: 30 },
                        decay: 0.1,
                        direction: "none",
                        random: false,
                        straight: false,
                        outModes: {
                            default: "destroy",
                            top: "none"
                        }
                    },
                    rotate: {
                        value: {
                            min: 0,
                            max: 360
                        },
                        direction: "random",
                        move: true,
                        animation: {
                            enable: true,
                            speed: 60
                        }
                    },
                    tilt: {
                        direction: "random",
                        enable: true,
                        move: true,
                        value: {
                            min: 0,
                            max: 360
                        },
                        animation: {
                            enable: true,
                            speed: 60
                        }
                    },
                    roll: {
                        darken: {
                            enable: true,
                            value: 25
                        },
                        enable: true,
                        speed: {
                            min: 15,
                            max: 25
                        }
                    },
                    wobble: {
                        distance: 30,
                        enable: true,
                        move: true,
                        speed: {
                            min: -15,
                            max: 15
                        }
                    }
                },
                detectRetina: true,
                emitters: {
                    direction: "none",
                    spawnColor: {
                        value: ["#8D75FF", "#F053BB", "#1B87EC", "#A98FFF"],
                        animation: {
                            h: {
                                enable: true,
                                offset: {
                                    min: -1.4,
                                    max: 1.4
                                },
                                speed: 0.1,
                                sync: false
                            },
                            l: {
                                enable: true,
                                offset: {
                                    min: 20,
                                    max: 80
                                },
                                speed: 0,
                                sync: false
                            }
                        }
                    },
                    life: {
                        count: 1,
                        duration: 0.1,
                        delay: 0.6
                    },
                    rate: {
                        delay: 0.1,
                        quantity: 100
                    },
                    size: {
                        width: 0,
                        height: 0
                    },
                    position: {
                        x: 50,
                        y: 20
                    }
                }
            }
        }
        />
    );
};
