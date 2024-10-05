import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { A, D, DIRECTIONS, S, W } from './utils';
export class CharacterControls {
  model: THREE.Group;
  mixer: THREE.AnimationMixer;
  animationsMap: Map<string, THREE.AnimationAction> = new Map();
  orbitControl: OrbitControls;
  camera: THREE.Camera;

  toggleRun = true;
  currentAction: string;

  walkDirection = new THREE.Vector3();
  rotateAngle = new THREE.Vector3(0, 1, 0);
  rotateQuarternion: THREE.Quaternion = new THREE.Quaternion();
  cameraTarget = new THREE.Vector3();

  fadeDuration = 0.2;
  runVelocity = 5;
  walkVelocity = 2;

  constructor(
    model: THREE.Group,
    mixer: THREE.AnimationMixer,
    animationsMap: Map<string, THREE.AnimationAction>,
    orbitControl: OrbitControls,
    camera: THREE.Camera,
    currentAction: string,
  ) {
    this.model = model;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.orbitControl = orbitControl;
    this.camera = camera;
    this.currentAction = currentAction;
    this.animationsMap.forEach((v, k) => {
      if (k === currentAction) {
        v.play();
      }
    });
  }

  public switchRunToggle() {
    this.toggleRun = !this.toggleRun;
  }

  public update(delta: number, keysPressed: any) {
    const directionPressed = DIRECTIONS.some(
      (key) => keysPressed[key] === true,
    );
    let play = '';

    if (directionPressed && this.toggleRun) {
      play = 'Run';
    } else if (directionPressed) {
      play = 'Walk';
    } else {
      play = 'Idle';
    }

    if (this.currentAction !== play) {
      const toPlay = this.animationsMap.get(play);
      const current = this.animationsMap.get(this.currentAction);
      current?.fadeOut(this.fadeDuration);
      toPlay?.reset().fadeIn(this.fadeDuration).play();

      this.currentAction = play;
    }

    this.mixer.update(delta);

    if (this.currentAction === 'Run' || this.currentAction === 'Walk') {
      const angleYCameraDirection = Math.atan2(
        this.camera.position.x - this.model.position.x,
        this.camera.position.z - this.model.position.z,
      );
      const directionOffSet = this.directionOffSet(keysPressed);

      // rotate model
      this.rotateQuarternion.setFromAxisAngle(
        this.rotateAngle,
        angleYCameraDirection + directionOffSet,
      );
      this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);
    }
  }
  private directionOffSet(keysPressed: any) {
    let directionOffSet = 0;
    if (keysPressed[W]) {
      if (keysPressed[A]) {
        directionOffSet = Math.PI / 4; // w+a
      } else if (keysPressed[D]) {
        directionOffSet = -Math.PI / 4; // w+d
      }
    } else if (keysPressed[S]) {
      if (keysPressed[A]) {
        directionOffSet = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (keysPressed[D]) {
        directionOffSet = -Math.PI / 4 - Math.PI / 2; // s+d
      } else {
        directionOffSet = Math.PI; // s
      }
    } else if (keysPressed[A]) {
      directionOffSet = Math.PI / 2; // a
    } else if (keysPressed[D]) {
      directionOffSet = -Math.PI / 2; // d
    }
    return directionOffSet;
  }
}
