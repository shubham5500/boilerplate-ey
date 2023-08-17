export class LocalStorageService {
  static set(key, value) {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    } catch (error) {
      console.error(
        `Error setting value in localStorage for key "${key}":`,
        error,
      )
    }
  }

  static get(key, defaultValue = null) {
    try {
      const serializedValue = localStorage.getItem(key)
      return serializedValue ? JSON.parse(serializedValue) : defaultValue
    } catch (error) {
      console.error(
        `Error getting value from localStorage for key "${key}":`,
        error,
      )
      return defaultValue
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(
        `Error removing value from localStorage for key "${key}":`,
        error,
      )
    }
  }

  static clear() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  }
}
