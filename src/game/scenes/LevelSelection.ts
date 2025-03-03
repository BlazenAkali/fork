import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import { LevelSelectButton } from "../UIComponents/LevelSelectorButton";
import { BackButton, MusicButton } from "../UIComponents/UIButton";

// Import all levels dynamically
//const levels = require(`../levels/${}`);

export class LevelSelection extends Scene {
    background: GameObjects.Image;
    levelImages: GameObjects.Image[] = []; // Array of level pictures
    tileSprite: GameObjects.TileSprite;
    scrollSpeed: number;

    constructor() {
        super("LevelSelection");
    }

    create() {
        //autoscroll backgound
        //this.tileSprite = this.add.tileSprite(0, 0, 2048, 1536, "background");
        //this.tileSprite.setTilePosition(0, 0);
        //this.tileSprite.setScrollFactor(1);
        //this.scrollSpeed = 0.3;

        new BackButton(this, 45, 40, () => {
            this.changeScene("MainMenu");
        });

        new MusicButton(this, 980, 40, () => {});

        new LevelSelectButton(this, 512, 400, () => {
            this.changeScene("Level1");
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene(scene: string) {
        this.scene.start(scene);
    }
}


