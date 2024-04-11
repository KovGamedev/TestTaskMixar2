class Ship {
  #properties = {
    [Properties.HEALTH_MAX]: 0,
    [Properties.SHIELD_MAX]: 0,
    [Properties.SHIELD_RECOVERY]: 0
  }
  #health
  #shield
  #weaponSlotsQuantity
  #weaponSlots = []
  #moduleSlotsQuantity
  #moduleSlots = []

  constructor(healthMax, shieldMax, shieldRecovery, weaponSlothsQuantity, moduleSlotsQuantity) {
    this.#properties[Properties.HEALTH_MAX] = healthMax
    this.#properties[Properties.SHIELD_MAX] = shieldMax
    this.#properties[Properties.SHIELD_RECOVERY] = shieldRecovery

    this.#health = healthMax
    this.#shield = shieldMax
    this.#weaponSlotsQuantity = weaponSlothsQuantity
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

  get weaponSlothsQuantity() {
    return this.#weaponSlotsQuantity
  }

  get weaponSlots() {
    return this.#weaponSlots
  }

  get moduleSlotsQuantity() {
    return this.#moduleSlotsQuantity
  }

  get moduleSlots() {
    return this.#moduleSlots
  }

  addWeapon(weapon) {

  }

  appendEquipment(slotIndex, module) {
    if (slotIndex < 0 || this.#moduleSlotsQuantity <= slotIndex) {
      throw new Error(`Invalid slot index: ${slotIndex}`);
    }

    if (this.#moduleSlots[slotIndex])
      this.#removeModule(slotIndex)
    this.#addModule(slotIndex, module)
  }

  #removeModule(slotIndex) {
    const { type: moduleType, properties: moduleProperties } = this.#moduleSlots[slotIndex]
    for (const propertyKey of Object.keys(module)) {
      if (moduleType === ModuleType.SUMMAND)
        this.#properties[propertyKey] -= moduleProperties[propertyKey]
      else
        this.#properties[propertyKey] /= moduleProperties[propertyKey]
    }
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
  }
}