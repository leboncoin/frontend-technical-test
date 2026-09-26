/**
 * Test helpers for stubbing the global fetch used by src/api.
 *
 * Routes map a full URL to a payload, a `{ status, body }` response, a
 * function returning either (evaluated per request), or a promise (for
 * deferred/stale-response scenarios). Unknown URLs throw so a misconfigured
 * test fails loudly instead of silently returning undefined.
 */
export type StubResponse =
  | unknown
  | { status: number; body?: unknown }
  | ((
      url: string,
      init?: RequestInit
    ) => unknown | { status: number; body?: unknown } | Promise<unknown>)

type ResolvedStub = { status: number; body: unknown }

function isStubWithStatus(value: unknown): value is { status: number; body?: unknown } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    typeof (value as { status: unknown }).status === 'number'
  )
}

export function installFetchStub(routes: Record<string, StubResponse>): jest.Mock {
  const mock = jest.fn(
    async (
      input: RequestInfo | URL,
      init?: RequestInit
    ): Promise<Partial<Response>> => {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url

      const route = routes[url]
      if (route === undefined) {
        throw new Error(`No fetch stub registered for ${url}`)
      }

      const evaluated =
        typeof route === 'function' ? await route(url, init) : await route
      const resolved: ResolvedStub = isStubWithStatus(evaluated)
        ? { status: evaluated.status, body: evaluated.body ?? {} }
        : { status: 200, body: evaluated }

      return {
        ok: resolved.status >= 200 && resolved.status < 300,
        status: resolved.status,
        json: async () => resolved.body,
      }
    }
  )

  global.fetch = mock as unknown as typeof fetch
  return mock
}

/** Creates a controllable promise for simulating slow/late API responses. */
export function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

/** Reads the JSON body of a captured fetch call. */
export function postedBody(call: Parameters<typeof fetch>[1]): unknown {
  return JSON.parse(String(call?.body))
}
