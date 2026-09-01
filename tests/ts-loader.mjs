import { access } from "node:fs/promises";

export async function resolve(specifier, context, nextResolve) {
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && !specifier.match(/\.[a-z]+$/i)) {
    const candidate = new URL(`${specifier}.ts`, context.parentURL);
    try {
      await access(candidate);
      return nextResolve(candidate.href, context);
    } catch {
      // Deja que el resolvedor normal produzca el error útil.
    }
  }
  return nextResolve(specifier, context);
}
