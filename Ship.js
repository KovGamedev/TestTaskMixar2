class Ship {
  #properties = {
    [Properties.HEALTH_MAX]: 0,
    [Properties.SHIELD_MAX]: 0,
    [Properties.SHIELD_RECOVERY]: 0,
    [Properties.RELOADING]: 1
  }
  #health
  #shield
  #weaponSlotsQuantity
  #weaponSlots = []
  #moduleSlotsQuantity
  #moduleSlots = []
  #damage = 0
  #weaponList = []

  constructor(healthMax, shieldMax, shieldRecovery, weaponSlothsQuantity, moduleSlotsQuantity) {
    this.#properties[Properties.HEALTH_MAX] = healthMax
    this.#properties[Properties.SHIELD_MAX] = shieldMax
    this.#properties[Properties.SHIELD_RECOVERY] = shieldRecovery

    this.#health = healthMax
    this.#shield = shieldMax
    this.#weaponSlotsQuantity = weaponSlothsQuantity
    this.#weaponSlots = Array(this.#weaponSlotsQuantity).fill(null)
    this.#moduleSlotsQuantity = moduleSlotsQuantity
  }

  get properties() {
    return { ...this.#properties }
  }

  get healthMax() {
    return this.#properties[Properties.HEALTH_MAX]
  }

  get health() {
    return this.#health
  }

  get shieldMax() {
    return this.#properties[Properties.SHIELD_MAX]
  }

  get shield() {
    return this.#shield
  }

  get shieldRecovery() {
    return this.#properties[Properties.SHIELD_RECOVERY]
  }

  get reloading() {
    return this.#properties[Properties.RELOADING]
  }

  get weaponSlothsQuantity() {
    return this.#weaponSlotsQuantity
  }

  get weaponSlots() {
    return [ ...this.#weaponSlots ]
  }

  get moduleSlotsQuantity() {
    return this.#moduleSlotsQuantity
  }

  get moduleSlots() {
    return [ ...this.#moduleSlots ]
  }

  get damage() {
    return this.#damage
  }

  appendWeapon(slotIndex, weapon) {
    if (slotIndex < 0 || this.#weaponSlotsQuantity <= slotIndex) {
      throw new Error(`Invalid weapon slot index: ${slotIndex}`);
    }

    this.#weaponSlots[slotIndex] = weapon.type === WeaponType.EMPTY ? null : weapon
  }

  appendModule(slotIndex, module) {
    if (slotIndex < 0 || this.#moduleSlotsQuantity <= slotIndex) {
      throw new Error(`Invalid module slot index: ${slotIndex}`);
    }

    if (this.#moduleSlots[slotIndex])
      this.#removeModule(slotIndex)
    if (module.type !== ModuleType.EMPTY)
      this.#addModule(slotIndex, module)
  }

  #removeModule(slotIndex) {
    const { type: moduleType, properties: moduleProperties } = this.#moduleSlots[slotIndex]
    for (const propertyKey of Object.keys(moduleProperties)) {
      if (moduleType === ModuleType.SUMMAND) {
        this.#properties[propertyKey] -= moduleProperties[propertyKey]
      }
      else
        this.#properties[propertyKey] /= moduleProperties[propertyKey]
    }
    this.#moduleSlots[slotIndex] = null
    this.#health = this.#properties[Properties.HEALTH_MAX]
    this.#shield = this.#properties[Properties.SHIELD_MAX]
  }

  #addModule(slotIndex, module) {
    this.#moduleSlots[slotIndex] = module
    const { type: moduleType, properties: moduleProperties } = module
    for (const propertyKey of Object.keys(moduleProperties)) {
      if (moduleType === ModuleType.SUMMAND)
        this.#properties[propertyKey] += moduleProperties[propertyKey]
      else
        this.#properties[propertyKey] *= moduleProperties[propertyKey]
    }
    this.#health = this.#properties[Properties.HEALTH_MAX]
    this.#shield = this.#properties[Properties.SHIELD_MAX]
  }

  startBattle() {
    for (const weaponSlot of this.#weaponSlots) {
      if (!weaponSlot)
        continue

      const { properties } = weaponSlot
      this.#weaponList.push({
        timerCurrent: properties[Properties.RELOADING],
        timerMax: properties[Properties.RELOADING],
        damage: properties[Properties.DAMAGE]
      })
    }
  }

  takeDamage(damage) {
    if (damage < this.#shield) {
      this.#shield -= damage
    } else if (this.#shield <= damage) {
      const delta = this.#shield - damage
      if (delta <= 0) {
        this.#shield = 0
        this.#health += delta
      } else {
        this.#shield -= delta
      }
    } else {
      this.#health -= damage
    }
  }

  updatePerSecond() {
    if (this.#shield < this.shieldMax) {
      this.#shield += this.shieldRecovery
      if (this.shieldMax < this.#shield)
        this.#shield = this.shieldMax
    }

    this.#damage = 0
    for (const weapon of this.#weaponList) {
      if (--weapon.timerCurrent === 0) {
        this.#damage += weapon.damage
        weapon.timerCurrent = weapon.timerMax
      }
    }
  }
}