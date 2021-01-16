export interface Rive {
  Alignment: AlignmentFactory;
  CanvasRenderer: typeof CanvasRenderer;
  LinearAnimation: typeof LinearAnimation
  LinearAnimationInstance: typeof LinearAnimationInstance
  renderFactory: CanvasRenderFactory
  // Enum
  BlendMode: typeof BlendMode;
  FillRule: typeof FillRule;
  Fit: typeof Fit;
  RenderPaintStyle: typeof RenderPaintStyle
  StrokeCap: typeof StrokeCap
  StrokeJoin: typeof StrokeJoin
  load(buffer: Uint8Array): File;
}



//////////////
// RENDERER //
//////////////
export declare class RendererWrapper {
	save(): void;
	restore(): void;
	transform(tranform: Mat2D): void;
  drawPath(path: RenderPath, paint: RenderPaint): void;
	clipPath(path: RenderPath): void;
};

export declare class RenderPathWrapper {
	reset(): void;
	addPath(path: CommandPath, transform: Mat2D): void;
	fillRule(value: FillRule ): void;
	moveTo(x: number, y: number): void
	lineTo(x: number, y: number): void
	cubicTo(ox: number, oy: number, ix: number, iy: number, x: number, y: number): void;
	close(): void;
};


export declare class RenderPaintWrapper {
	color(value: number): void;
	thickness(value: number): void;
	join(value: StrokeJoin): void;
	cap(value: StrokeCap ): void;
	blendMode(value: BlendMode): void;

	style(value: RenderPaintStyle): void;
	linearGradient(sx: number, sy: number, ex: number, ey: number): void;
	radialGradient(sx: number, sy: number, ex: number, ey: number): void;
	addStop(color: number, stop: number): void;
	completeGradient(): void;
};

export declare class Renderer extends RendererWrapper {
  align(fit: Fit, alignment: Alignment, frame: AABB, content: AABB): void
}

export declare class CommandPath {}

export declare class RenderPath extends RenderPathWrapper {}

export declare class RenderPaint extends RenderPaintWrapper {}


/////////////////////
// CANVAS RENDERER //
/////////////////////

export declare class CanvasRenderer extends Renderer {
  constructor(ctx: CanvasRenderingContext2D);
}


export declare class CanvasRenderPaint extends RenderPaint {
  draw(ctx: CanvasRenderingContext2D, path): void;
}

export declare class CanvasRenderPath extends RenderPath {}


export interface CanvasRenderFactory {
  makeRenderPaint():CanvasRenderPaint
  makeRenderPath(): CanvasRenderPath
}




//////////
// File //
//////////

export declare class File {
  defaultArtboard(): Artboard;
  artboard(name: string): Artboard;
}

export declare class Artboard {
  bounds: AABB;
  /** Get an animation */
  animation(name: string): LinearAnimation;
  /** advance the artboard to a time in sec */
  advance(sec: number): any;
  /** Draw frame on the canvas */
  draw(renderer: CanvasRenderer);
  /** Get the animation at index */
  animationAt(index: number): LinearAnimation;
  /** Get the amount of animations in the artboard */
  animationCount(): number;
  bone(name: string): Bone;
  node(name: string): Node;
  rootBone(name: string): RootBone;
  transformComponent(name: string): TransformComponent
}

export declare class Bone extends TransformComponent {
  length: number;
}
export declare class RootBone extends Bone {
  x: number;
  y: number;
}

export declare class Node extends TransformComponent {
  x: number;
  y: number;
}
export declare class TransformComponent {
  rotation: number;
  scaleX: number;
  scaleY: number;
}


///////////////
// Animation //
///////////////

export declare class LinearAnimation {
  duration: number;
  fps: number;
  workStart: number;
  workEnd: number;
  loopValue: number;
  speed: number;
  apply(artboard: Artboard, time: number, mix: number): void;
}

export declare class LinearAnimationInstance {
  /** Time of the animation from 0 to 1 */
  time: number;
  constructor(animation: LinearAnimation);
  /** increment the animation to a time in sec */
  advance(sec: number): any;
  /**
   * apply animation on the artboard
   * @param artboard the Artboard on which apply the frame
   * @param mix 0-1 the strengh of the animaiton in the animation mix
   */
  apply(artboard: Artboard, mix: number): any;
}



///////////
// ENUMS //
///////////

export enum Fit {
  fill,
  contain,
  cover,
  fitWidth,
  fitHeight,
  none,
  scaleDown,
}

export enum RenderPaintStyle {
  fill,
  stroke
}

export enum FillRule {
  nonZero,
  evenOdd,
}

export enum StrokeCap {
  butt,
  round,
  square,
}
export enum StrokeJoin {
  miter,
  round,
  bevel,
}

export enum BlendMode {
  srcOver = 3,
  screen = 14,
  overlay = 15,
  darken = 16,
  lighten = 17,
  colorDodge = 18,
  colorBurn = 19,
  hardLight = 20,
  softLight = 21,
  difference = 22,
  exclusion = 23,
  multiply = 24,
  hue = 25,
  saturation = 26,
  color = 27,
  luminosity = 28,
}

///////////
// UTILS //
///////////
export declare class Alignment {
  x: number;
  y: number;
}

export declare class AlignmentFactory {
  get topLeft(): Alignment
  get topCenter(): Alignment
  get topRight(): Alignment
  get centerLeft(): Alignment
  get center(): Alignment
  get centerRight(): Alignment
  get bottomLeft(): Alignment
  get bottomCenter(): Alignment
  get bottomRight(): Alignment
}

/** Frame */
export interface AABB {
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
}


export class Mat2D {
  xx: number;
  xy: number;
  yx: number;
  yy: number;
  tx: number;
  ty: number;
}
