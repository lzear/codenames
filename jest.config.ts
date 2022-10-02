// @ts-ignore
const config = {
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  coverageReporters: ['text', 'text-summary', 'html', 'lcov'],
}

export default config
