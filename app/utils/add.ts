if (typeof window === "undefined") {
  import("server-only"); 
}

export function add(a: number, b: number) {
  return a + b;
}
