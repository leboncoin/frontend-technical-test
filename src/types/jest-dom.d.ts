// Registers the @testing-library/jest-dom matcher types (toBeInTheDocument,
// toHaveValue, …) on Jest's expect for the whole project, so individual
// specs do not need to import the module for typing (the runtime import
// lives in jest/setupFilesAfterEnv.js).
import '@testing-library/jest-dom'
