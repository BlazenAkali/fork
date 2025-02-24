import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Level1 as MainGame } from "./levels/level1";
import { MainMenu } from "./scenes/MainMenu";
import { Inventory } from "./scenes/Inventory";
import { Achievements } from "./scenes/Achievements";
import { GameSettings } from "./scenes/GameSettings";
import { LevelSelection } from "./scenes/LevelSelection";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { gameConfig } from "./config/gameConfig";
import { Settings } from "./scenes/Settings";

// TODO: Replace MainGame to LevelSelection
// Always add new scenes here!
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: gameConfig.screenWidth,
    height: gameConfig.screenHeight,
    parent: "game-container",
    backgroundColor: "#028af8",
    scene: [
        Boot,
        Preloader,
        MainMenu,
        LevelSelection,
        MainGame,
        GameOver,
        Inventory,
        Achievements,
        GameSettings,
        Settings,
    ],
    physics: {
        default: "matter",
        matter: {
            debug: true,
        },
    },
    scale: gameConfig.scale,
};

// TODO: Remove the optional initial scene from the initialization
const StartGame = (parent: string) => {
    return new Game({ ...config, parent, scene: MainGame });
};

export default StartGame;

