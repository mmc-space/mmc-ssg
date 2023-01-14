import type { Plugin } from "vite";
import { existsSync } from "node:fs";
import { readFile } from "fs/promises";
import { DEFAULT_HTML_PATH } from "../node/constants";

const pluginHtmlTemplate = (): Plugin => ({
  name: "template-html-plugin",
  apply: "serve",
  configureServer(server) {
    return () => {
      server.middlewares.use(async (_req, res, next) => {
        if (!existsSync(DEFAULT_HTML_PATH)) return next();
        const template = await readFile(DEFAULT_HTML_PATH, "utf-8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(template);
      });
    };
  },
});

export default pluginHtmlTemplate;
