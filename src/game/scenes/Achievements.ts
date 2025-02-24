import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { BackButton } from "../UIComponents/UIButton";

export class Achievements extends Scene {
    constructor() {
        super("Achievements");
    }

    create() {
        this.add.text(100, 100, "Achievements", {
            fontSize: "32px",
            color: "#fff",
        });
        EventBus.emit("current-scene-ready", this);

        new BackButton(this, 50, 50, () => {
            this.changeScene("MainMenu");
        });
    }
    changeScene(scene: string) {
        this.scene.start(scene);
    }
}
