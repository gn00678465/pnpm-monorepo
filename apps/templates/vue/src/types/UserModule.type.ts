import type { App } from 'vue';

type Ctx = { app: App };

export type UserModule = (ctx: Ctx) => void;
