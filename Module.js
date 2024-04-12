const ModuleType = Object.freeze({
  EMPTY: `EMPTY`,
  SUMMAND: `SUMMAND`,
  MULTIPLIER: `MULTIPLIER`
})

class Module {
  #properties = {}
  #type

  constructor(type = ModuleType.SUMMAND, properties = {}) {
    this.#type = type
    for (const property of Object.keys(properties)) {
      this.#properties[property] = properties[property] || 0
    }
  }

  get type() {
    return this.#type
  }

  get properties() {
    return { ...this.#properties }
  }
}