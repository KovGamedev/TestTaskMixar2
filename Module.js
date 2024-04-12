const ModuleType = Object.freeze({
  EMPTY: `EMPTY`,
  SUMMAND: `SUMMAND`,
  MULTIPLIER: `MULTIPLIER`
})

class Module {
  _properties = {}
  _type

  constructor(type = ModuleType.SUMMAND, properties = {}) {
    this._type = type
    for (const property of Object.keys(properties)) {
      this._properties[property] = properties[property] || 0
    }
  }

  get type() {
    return this._type
  }

  get properties() {
    return { ...this._properties }
  }
}