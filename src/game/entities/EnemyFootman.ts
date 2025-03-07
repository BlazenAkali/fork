import { Physics, Scene } from "phaser";
import { BaseEnemy } from "./BaseEnemy";
import { EventBus } from "../EventBus";
import CollisionIdentifier from "../logic/CollisionIdentifier";

export class EnemyFootman extends BaseEnemy {
    private health: number;
    private maxHealth: number;
    private damage: number;
    private id: number;

    constructor(
        sprite: Physics.Matter.Sprite,
        obstacles: CollisionIdentifier,
        player: Phaser.GameObjects.Sprite,
        scene: Scene
    ) {
        const instanceID =
            "enemy-footman-" + (sprite.body as MatterJS.BodyType).id;

        super(instanceID, sprite, obstacles, player, scene);

        this.maxHealth = 30;
        this.health = this.maxHealth;
        this.damage = 10;
        this.scene = scene;
        this.player = player;
        const body = sprite.body as MatterJS.BodyType;
        this.id = body.id;
        this.lastPlayerX = player.x;
        this.lastPlayerY = player.y;

        // Event listeners
        EventBus.on("player-hurt", this.onPlayerHurt.bind(this)).on(
            "projectile-hit",
            this.onEnemyHurt.bind(this)
        );
    }

    GetHealth = () => {
        this.health;
    };

    GetMaxHealth = () => {
        this.maxHealth;
    };

    protected handleCollisionWith(
        gameObject: Phaser.GameObjects.GameObject | undefined
    ): void {
        console.log(
            `Enemy ${this.id} collided with: ${gameObject?.name || "unknown"}`
        );
        this.Jump();

        if (gameObject instanceof Physics.Matter.TileBody) {
            this.isTouchingGround = true;
        }

        if (gameObject instanceof Physics.Matter.Sprite) {
            if (gameObject.name === "player") {
                console.log("Player collided with enemy");
                this.stateMachine.setState("attack");
            }
        }

        return;
    }

    protected createAnimation(): void {}

    protected patrolOnEnter() {
        console.log("Enemy patrolling");
    }

    protected attackOnEnter() {
        console.log("Enemy attacking player");
        this.scene.time.delayedCall(1000, () => {
            this.stateMachine.setState("patrol");
        });
    }

    private Jump() {
        const player = this.getPlayer();
        console.log("Jump method called");

        if (player) {
            this.lastPlayerX = player.x;
            this.lastPlayerY = player.y;
        } else {
            console.error(
                "Player object is undefined, using last known position"
            );
        }

        const directionX = this.lastPlayerX - this.sprite.x;
        const directionY = this.lastPlayerY - this.sprite.y;
        const magnitude = Math.sqrt(
            directionX * directionX + directionY * directionY
        );
        const normalizedDirectionX = directionX / magnitude;
        let normalizedDirectionY = directionY / magnitude;

        if (directionY >= 0) {
            normalizedDirectionY = Math.max(normalizedDirectionY, 0.1);
        }

        const speed = 5;
        if (directionY < 0) {
            // Player is above, frog hop
            this.sprite.setVelocity(
                normalizedDirectionX * speed,
                normalizedDirectionY * speed * 2
            );
        } else {
            this.sprite.setVelocity(normalizedDirectionX * speed, 0);
        }

        this.isTouchingGround = false;
    }

    protected enemyHitOnEnter() {
        console.log("New health: ", this.health);
    }

    protected defeatedOnEnter() {
        console.log("Enemy defeated");
        EventBus.emit("enemy-defeated", this.id);
        if (this.sprite) {
            this.sprite.destroy();
        }
    }

    private onPlayerHurt() {
        this.stateMachine.setState("attack");
        EventBus.emit("enemy-hit", this.damage);
        EventBus.off("player-hurt", this.onPlayerHurt);
    }

    private onEnemyHurt(projectileHit: {
        id: number;
        type: string;
        damage: number;
    }) {
        if (projectileHit.type === "enemy-footman") {
            console.log(
                `Enemy ${projectileHit.id} is taking ${projectileHit.damage} damage.`
            );

            if (projectileHit.id === this.id) {
                this.health -= projectileHit.damage;

                // Apply knockback
                this.sprite.setVelocityX(this.sprite.flipX ? 10 : -10);

                if (this.health <= 0) {
                    this.stateMachine.setState("defeated");
                } else {
                    this.stateMachine.setState("enemyHurt");
                }
            }
        }
        EventBus.off("projectile-hit", this.onEnemyHurt);
    }

    private getPlayer(): Phaser.GameObjects.Sprite {
        return this.player;
    }

    // Update player position
    update(deltaTime: number) {
        const player = this.getPlayer();
        if (player) {
            this.lastPlayerX = player.x;
            this.lastPlayerY = player.y;
        }
    }
}

