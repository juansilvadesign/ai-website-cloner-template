import {
  BoxGeometry,
  BufferGeometry,
  Color,
  EllipseCurve,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  Vector2,
} from "three";
import type { ShelfBook } from "../data/books";

const COVER_BOARD_DEPTH = 0.025;
const SURFACE_OFFSET = 0.006;

function addFoilRule(
  parent: Group,
  material: MeshStandardMaterial,
  width: number,
  height: number,
  x: number,
  y: number,
): void {
  const rule = new Mesh(
    new BoxGeometry(width, height, SURFACE_OFFSET),
    material,
  );
  rule.position.set(x, y, 0);
  parent.add(rule);
}

function addFoilEllipse(
  parent: Group,
  material: LineBasicMaterial,
  radiusX: number,
  radiusY: number,
  x: number,
  y: number,
  startAngle = 0,
  endAngle = Math.PI * 2,
): void {
  const curve = new EllipseCurve(
    x,
    y,
    radiusX,
    radiusY,
    startAngle,
    endAngle,
    false,
    0,
  );
  const points: Vector2[] = curve.getPoints(40);
  const geometry = new BufferGeometry().setFromPoints(points);
  parent.add(new Line(geometry, material));
}

function createFoilMotif(
  book: ShelfBook,
  bookIndex: number,
  coverDepth: number,
): Group {
  const motif = new Group();
  motif.name = "Development placeholder foil motif";
  motif.position.set(0, book.height * 0.52, coverDepth + SURFACE_OFFSET * 2);

  const foilColor = new Color(book.foil);
  const lineMaterial = new LineBasicMaterial({
    color: foilColor,
    toneMapped: true,
  });
  const foilMaterial = new MeshStandardMaterial({
    color: foilColor,
    metalness: 0.62,
    roughness: 0.33,
  });

  const usableWidth = book.width * 0.58;
  const usableHeight = book.height * 0.48;
  const variant = bookIndex % 6;

  if (variant === 0) {
    addFoilEllipse(
      motif,
      lineMaterial,
      usableWidth * 0.38,
      usableHeight * 0.42,
      -usableWidth * 0.08,
      usableHeight * 0.04,
    );
    addFoilEllipse(
      motif,
      lineMaterial,
      usableWidth * 0.25,
      usableHeight * 0.28,
      usableWidth * 0.16,
      -usableHeight * 0.1,
    );
    addFoilEllipse(
      motif,
      lineMaterial,
      usableWidth * 0.12,
      usableHeight * 0.14,
      -usableWidth * 0.1,
      -usableHeight * 0.2,
    );
  } else if (variant === 1) {
    addFoilEllipse(
      motif,
      lineMaterial,
      usableWidth * 0.34,
      usableHeight * 0.28,
      -usableWidth * 0.12,
      usableHeight * 0.08,
      -Math.PI * 0.75,
      Math.PI * 0.75,
    );
    addFoilEllipse(
      motif,
      lineMaterial,
      usableWidth * 0.28,
      usableHeight * 0.34,
      usableWidth * 0.18,
      -usableHeight * 0.08,
      Math.PI * 0.25,
      Math.PI * 1.75,
    );
  } else if (variant === 2) {
    addFoilRule(
      motif,
      foilMaterial,
      usableWidth * 0.05,
      usableHeight * 0.86,
      -usableWidth * 0.28,
      0,
    );
    addFoilEllipse(
      motif,
      lineMaterial,
      usableWidth * 0.3,
      usableHeight * 0.34,
      usableWidth * 0.12,
      usableHeight * 0.06,
    );
    addFoilRule(
      motif,
      foilMaterial,
      usableWidth * 0.36,
      usableHeight * 0.035,
      usableWidth * 0.08,
      -usableHeight * 0.3,
    );
  } else if (variant === 3) {
    for (let lineIndex = -2; lineIndex <= 2; lineIndex += 1) {
      addFoilRule(
        motif,
        foilMaterial,
        usableWidth * 0.78,
        usableHeight * 0.026,
        0,
        lineIndex * usableHeight * 0.17,
      );
    }
    addFoilEllipse(
      motif,
      lineMaterial,
      usableWidth * 0.18,
      usableHeight * 0.18,
      usableWidth * 0.2,
      usableHeight * 0.16,
    );
  } else if (variant === 4) {
    for (let frameIndex = 0; frameIndex < 3; frameIndex += 1) {
      const inset = frameIndex * 0.09;
      const frameWidth = usableWidth * (0.72 - inset);
      const frameHeight = usableHeight * (0.74 - inset);
      addFoilRule(
        motif,
        foilMaterial,
        frameWidth,
        usableHeight * 0.022,
        frameIndex * usableWidth * 0.035,
        frameHeight * 0.5,
      );
      addFoilRule(
        motif,
        foilMaterial,
        frameWidth,
        usableHeight * 0.022,
        frameIndex * usableWidth * 0.035,
        -frameHeight * 0.5,
      );
      addFoilRule(
        motif,
        foilMaterial,
        usableWidth * 0.018,
        frameHeight,
        -frameWidth * 0.5 + frameIndex * usableWidth * 0.035,
        0,
      );
      addFoilRule(
        motif,
        foilMaterial,
        usableWidth * 0.018,
        frameHeight,
        frameWidth * 0.5 + frameIndex * usableWidth * 0.035,
        0,
      );
    }
  } else {
    addFoilEllipse(
      motif,
      lineMaterial,
      usableWidth * 0.4,
      usableHeight * 0.18,
      0,
      usableHeight * 0.12,
    );
    addFoilEllipse(
      motif,
      lineMaterial,
      usableWidth * 0.25,
      usableHeight * 0.32,
      0,
      -usableHeight * 0.12,
    );
    addFoilRule(
      motif,
      foilMaterial,
      usableWidth * 0.72,
      usableHeight * 0.024,
      0,
      0,
    );
  }

  return motif;
}

/**
 * DEVELOPMENT PLACEHOLDER ONLY.
 *
 * This factory is used exclusively when a catalog item has no `modelUrl`
 * because Mint OAuth is currently blocked. Assigning a synchronized local GLB
 * path to `ShelfBook.modelUrl` bypasses this factory entirely.
 */
export function createDevelopmentPlaceholderHardcover(
  book: ShelfBook,
  bookIndex: number,
): Group {
  const canonical = new Group();
  canonical.name = `Development placeholder: ${book.id}`;
  canonical.userData.developmentPlaceholder = true;
  canonical.userData.replacementPoint = `shelfBooks[${bookIndex}].modelUrl`;

  const coverFacing = new Group();
  coverFacing.name = "Cover-facing source orientation";
  coverFacing.rotation.y = Math.PI * 0.5;
  canonical.add(coverFacing);

  const clothMaterial = new MeshStandardMaterial({
    color: book.cloth,
    metalness: 0.02,
    roughness: 0.76,
  });
  const pageMaterial = new MeshStandardMaterial({
    color: 0xe8dfce,
    metalness: 0,
    roughness: 0.92,
  });
  const darkPageMaterial = new MeshStandardMaterial({
    color: 0xcfc2ab,
    metalness: 0,
    roughness: 0.86,
  });
  const foilMaterial = new MeshStandardMaterial({
    color: book.foil,
    metalness: 0.58,
    roughness: 0.34,
  });

  const coverDepth = Math.min(COVER_BOARD_DEPTH, book.thickness * 0.09);
  const pageDepth = Math.max(book.thickness - coverDepth * 2, 0.04);

  const pageBlock = new Mesh(
    new BoxGeometry(book.width * 0.94, book.height * 0.91, pageDepth),
    pageMaterial,
  );
  pageBlock.name = "Page block";
  pageBlock.position.y = book.height * 0.485;
  pageBlock.castShadow = true;
  pageBlock.receiveShadow = true;
  coverFacing.add(pageBlock);

  const pageHead = new Mesh(
    new BoxGeometry(book.width * 0.9, 0.012, pageDepth + 0.004),
    darkPageMaterial,
  );
  pageHead.name = "Page head";
  pageHead.position.set(0, book.height * 0.942, 0);
  coverFacing.add(pageHead);

  const frontCover = new Mesh(
    new BoxGeometry(book.width, book.height, coverDepth),
    clothMaterial,
  );
  frontCover.name = "Front cover";
  frontCover.position.set(
    0,
    book.height * 0.5,
    book.thickness * 0.5 - coverDepth * 0.5,
  );
  frontCover.castShadow = true;
  frontCover.receiveShadow = true;
  coverFacing.add(frontCover);

  const backCover = new Mesh(
    new BoxGeometry(book.width, book.height, coverDepth),
    clothMaterial,
  );
  backCover.name = "Back cover";
  backCover.position.set(
    0,
    book.height * 0.5,
    -book.thickness * 0.5 + coverDepth * 0.5,
  );
  backCover.castShadow = true;
  backCover.receiveShadow = true;
  coverFacing.add(backCover);

  const spine = new Mesh(
    new BoxGeometry(coverDepth * 1.35, book.height, book.thickness),
    clothMaterial,
  );
  spine.name = "Cloth spine";
  spine.position.set(
    -book.width * 0.5 + coverDepth * 0.5,
    book.height * 0.5,
    0,
  );
  spine.castShadow = true;
  spine.receiveShadow = true;
  coverFacing.add(spine);

  const hingeOffset = book.width * 0.5 - coverDepth * 2.2;
  for (const zDirection of [-1, 1]) {
    const hinge = new Mesh(
      new BoxGeometry(coverDepth * 0.62, book.height * 0.97, coverDepth * 0.38),
      clothMaterial,
    );
    hinge.name = "Cover hinge";
    hinge.position.set(
      -hingeOffset,
      book.height * 0.5,
      zDirection * (book.thickness * 0.5 + coverDepth * 0.14),
    );
    coverFacing.add(hinge);
  }

  const border = new Group();
  border.name = "Foil cover border";
  border.position.z = book.thickness * 0.5 + SURFACE_OFFSET;
  const borderInsetX = book.width * 0.065;
  const borderInsetY = book.height * 0.055;
  addFoilRule(
    border,
    foilMaterial,
    book.width - borderInsetX * 2,
    SURFACE_OFFSET,
    0,
    borderInsetY,
  );
  addFoilRule(
    border,
    foilMaterial,
    book.width - borderInsetX * 2,
    SURFACE_OFFSET,
    0,
    book.height - borderInsetY,
  );
  addFoilRule(
    border,
    foilMaterial,
    SURFACE_OFFSET,
    book.height - borderInsetY * 2,
    -book.width * 0.5 + borderInsetX,
    book.height * 0.5,
  );
  addFoilRule(
    border,
    foilMaterial,
    SURFACE_OFFSET,
    book.height - borderInsetY * 2,
    book.width * 0.5 - borderInsetX,
    book.height * 0.5,
  );
  coverFacing.add(border);

  const motif = createFoilMotif(
    book,
    bookIndex,
    book.thickness * 0.5,
  );
  coverFacing.add(motif);

  const spineMark = new Mesh(
    new BoxGeometry(
      SURFACE_OFFSET,
      book.height * 0.46,
      Math.max(book.thickness * 0.08, SURFACE_OFFSET),
    ),
    foilMaterial,
  );
  spineMark.name = "Foil spine mark";
  spineMark.position.set(
    -book.width * 0.5 - SURFACE_OFFSET,
    book.height * 0.52,
    0,
  );
  coverFacing.add(spineMark);

  return canonical;
}
