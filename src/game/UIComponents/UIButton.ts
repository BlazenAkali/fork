import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";

// This is basic button based on the Phaser textstyle.
// TODO: Refactor the UI Button component into Image-based.
// child classes should take image paramenter to make changes.
export class UIButton extends GameObjects.Sprite {
    constructor(
        scene: Scene, //current scene
        x: number, //position in x axis
        y: number, //position in y axis
        text: string, //name ng button
        callback: () => void //any function
    ) {
        super(scene, x, y, text);
        this.on("pointerdown", callback);
        scene.add.existing(this);
    }
}

export class PlayButton extends GameObjects.Text {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "PLAY", {
            fontFamily: 'Rubik Dirt', fontSize: 48, color: '#d3d3d3',
            stroke: '#000000', strokeThickness: 3
        });

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.setTint(0xdedede);
                this.setStroke('000000', 5)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setTint(0xffffff);
                this.setStroke('000000', 3)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, callback)     
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.setTint(0xffffff);
            });
            scene.add.existing(this);
    }
}

export class AchievementsButton extends GameObjects.Text {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "ACHIEVEMENTS", {
            fontFamily: 'Rubik Dirt', fontSize: 48, color: '#d3d3d3',
            stroke: '#000000', strokeThickness: 3
        });

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.setTint(0xdedede);
                this.setStroke('000000', 5)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setTint(0xffffff);
                this.setStroke('000000', 3)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, callback)
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.setTint(0xffffff);
            });
            scene.add.existing(this);
    }
}

export class CreditsButton extends GameObjects.Text {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "CREDITS", {
            fontFamily: 'Rubik Dirt', fontSize: 48, color: '#d3d3d3',
            stroke: '#000000', strokeThickness: 3,
        });

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.setTint(0xdedede);
                this.setStroke('000000', 5)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setTint(0xffffff);
                this.setStroke('000000', 3)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, callback)     
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.setTint(0xffffff);
            });
            scene.add.existing(this);
    }
}

export class MusicButton extends UIButton {
    musicButton: GameObjects.Image;
    music: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "button", callback);

        this.musicButton = scene.add.image(980, 40, 'musicOn').setScale(0.07).setDepth(100)

        this.musicButton.setInteractive().setDepth(100)
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.setTint(0xdedede);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setTint(0xffffff);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.setTint(0x8afbff);
                EventBus.emit('toggleMusic'); //When clicked the event will start
                this.updateButtonImage(); //calls the function 
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.setTint(0xffffff);
            });
    }
    //function to change the texture
    updateButtonImage(){
        const musicEnabled = this.scene.registry.get('musicEnabled');
        this.musicButton.setTexture( musicEnabled ? 'musicOn' : 'musicOff' );
    }
}

export class BackButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "button", callback);
        scene.add.image(45, 40, 'back').setScale(0.07);
        this.setScale(0.9)

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.setTint(0xdedede);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setTint(0xffffff);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.setTint(0x8afbff);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.setTint(0xffffff);
            });
    }
}

//export class PauseButton extends UIButton {
    //constructor(scene: Scene, x: number, y: number, callback: () => void) {
        //super(scene, x, y, "Pause", callback, { backgroundColor: "#ffff00" });
    //}
//}

export class RestartButton extends GameObjects.Text {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "Restart", {
            fontFamily: 'Rubik Dirt', fontSize: 48, color: '#d3d3d3',
            stroke: '#000000', strokeThickness: 3
        });

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.setTint(0xdedede);
                this.setStroke('000000', 5)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setTint(0xffffff);
                this.setStroke('000000', 3)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, callback)     
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.setTint(0xffffff);
            });
            scene.add.existing(this);
    }
}

export class MainMenuButton extends GameObjects.Text {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "Main Menu", {
            fontFamily: 'Rubik Dirt', fontSize: 48, color: '#d3d3d3',
            stroke: '#000000', strokeThickness: 3
        });

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.setTint(0xdedede);
                this.setStroke('000000', 5)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setTint(0xffffff);
                this.setStroke('000000', 3)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, callback)     
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.setTint(0xffffff);
            });
            scene.add.existing(this);
    }
}

export class LevelSelectButton extends GameObjects.Text {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "<< Level Select", {
            fontFamily: 'Rubik Dirt', fontSize: 24, color: '#d3d3d3',
            stroke: '#000000', strokeThickness: 3
        });

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.setTint(0xdedede);
                this.setStroke('000000', 5)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setTint(0xffffff);
                this.setStroke('000000', 3)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, callback)     
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.setTint(0xffffff);
            });
            scene.add.existing(this);
    }
}

//export class ShootButton extends UIButton {
//    constructor(scene: Scene, x: number, y: number, callback: () => void) {
//        super(scene, x, y, "Shoot", callback, { backgroundColor: "#ff00ff" });
//    }
//}
