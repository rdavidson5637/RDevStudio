import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      // The real server-only/index.js throws unconditionally outside a
      // bundler that honours the "react-server" export condition (which
      // Next.js does and plain Node/Vitest doesn't). Point it at the
      // package's own no-op build so server-only modules stay importable
      // in tests without weakening the guard Next.js actually enforces.
      "server-only": "server-only/empty.js",
    },
  },
  test: {
    environment: "node",
  },
});
