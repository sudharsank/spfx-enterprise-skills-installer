const ANSI = {
  reset: "\u001b[0m",
  bold: "\u001b[1m",
  dim: "\u001b[2m",
  cyan: "\u001b[36m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  magenta: "\u001b[35m"
};

function canUseColor() {
  if (process.env.NO_COLOR !== undefined) {
    return false;
  }

  if (process.env.FORCE_COLOR && process.env.FORCE_COLOR !== "0") {
    return true;
  }

  return Boolean(process.stdout.isTTY) && process.env.TERM !== "dumb";
}

export function styleText(text, { color, bold = false, dim = false } = {}) {
  if (!canUseColor()) {
    return text;
  }

  const codes = [];

  if (bold) {
    codes.push(ANSI.bold);
  }

  if (dim) {
    codes.push(ANSI.dim);
  }

  if (color && ANSI[color]) {
    codes.push(ANSI[color]);
  }

  if (codes.length === 0) {
    return text;
  }

  return `${codes.join("")}${text}${ANSI.reset}`;
}

export function colorize(text, color) {
  if (!ANSI[color]) {
    return text;
  }

  return styleText(text, { color });
}

export function emphasize(text) {
  return styleText(text, { bold: true });
}

export function mute(text) {
  return styleText(text, { dim: true });
}
