import { GameObjects, Scene } from "phaser";

// This is basic button based on the Phaser textstyle.
// TODO: Refactor the UI Button component into Image-based.
// child classes should take image paramenter to make changes.
export class UIButton extends GameObjects.Sprite {
    constructor(
        scene: Scene,
        x: number,
        y: number,
        text: string,
        callback: () => void
    ) {
        super(scene, x, y, text)
        this.setOrigin(0.5).setInteractive();

        this.on("pointerdown", callback);
        this.setScale(0.5);

        scene.add.existing(this);
    }
}

export class PlayButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "play", callback)
    }
}

export class InventoryButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "inventory", callback)
    }
}

export class AchievementsButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "achieve", callback)
    }
}

export class SettingsButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "settings", callback)
    }
}

export class SettingButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "setting", callback)
    }
}

export class BackButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "back", callback)
    }
}

/*export class PauseButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "Pause", callback, { backgroundColor: "#ffff00" });
    }
}

export class RestartButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "Restart", callback, { backgroundColor: "#ff0000" });
    }
}

export class ShootButton extends UIButton {
    constructor(scene: Scene, x: number, y: number, callback: () => void) {
        super(scene, x, y, "Shoot", callback, { backgroundColor: "#ff00ff" });
    }
}*/