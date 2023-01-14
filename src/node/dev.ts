import { createServer } from "vite";
import pluginHtmlTemplate from "../plugin/html";

export const createDevServer = (root: string) =>
  createServer({
    root,
    plugins: [pluginHtmlTemplate()],
  });
