export async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./browser');

  // https://mswjs.io/docs/api/setup-worker/start
  return await worker.start({
    quiet: true,
    onUnhandledRequest: 'bypass'
  });
}
