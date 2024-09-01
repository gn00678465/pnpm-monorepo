import type { App } from 'vue'
import type { Router } from 'vue-router/auto'

interface Ctx { app: App, router: Router }

export type UserModule = (ctx: Ctx) => void
