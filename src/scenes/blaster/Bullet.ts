import { Group, Vector3 } from 'three';

export default class Bullet {
  public readonly group: Group;
  private readonly velocity = new Vector3();
  private readonly gunShotAudio = new Audio('/assets/audio/gun-shot.mp3');
  private isDead = false;

  constructor(group: Group) {
    this.group = group;
    setTimeout(() => {
      this.isDead = true;
    }, 1000);
  }

  getShouldRemove() {
    return this.isDead;
  }
  setVelocity(x: number, y: number, z: number) {
    this.velocity.set(x, y, z);
  }
  playGunShotAudio() {
    this.gunShotAudio.play();
  }
  update() {
    this.group.position.x += this.velocity.x;
    this.group.position.y += this.velocity.y;
    this.group.position.z += this.velocity.z;
  }
}
