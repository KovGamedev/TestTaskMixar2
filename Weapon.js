const WeaponType = Object.freeze({
  EMPTY: `EMPTY`,
  SUMMAND: `SUMMAND`
})

class Weapon extends Module {
  constructor(properties = {}) {
    super(ModuleType.SUMMAND, properties)
  }
}