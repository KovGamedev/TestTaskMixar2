class Ship {
  #properties = {
    [Properties.HEALTH_MAX]: 0,
    [Properties.SHIELD_MAX]: 0,
    [Properties.SHIELD_RECOVERY]: 0,
    [Properties.DAMAGE]: 0,
    [Properties.RELOADING]: 0
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

  get damage() {
    return this.#properties[Properties.DAMAGE]
  }

  get reloading() {
    return this.#properties[Properties.RELOADING]
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

  appendWeapon(slotIndex, weapon) {
    if (slotIndex < 0 || this.#weaponSlotsQuantity <= slotIndex) {
      throw new Error(`Invalid weapon slot index: ${slotIndex}`);
    }
    if (this.#weaponSlots[slotIndex])
      this.#removeModule(slotIndex, this.#weaponSlots)
    if (weapon.type !== ModuleType.EMPTY)
      this.#addModule(slotIndex, weapon, this.#weaponSlots)
  }

  appendEquipment(slotIndex, module) {
    if (slotIndex < 0 || this.#moduleSlotsQuantity <= slotIndex) {
      throw new Error(`Invalid module slot index: ${slotIndex}`);
    }

    if (this.#moduleSlots[slotIndex])
      this.#removeModule(slotIndex, this.#moduleSlots)
    if (module.type !== ModuleType.EMPTY)
      this.#addModule(slotIndex, module, this.#moduleSlots)
  }

  #removeModule(slotIndex, moduleSlots) {
    const { type: moduleType, properties: moduleProperties } = moduleSlots[slotIndex]
    for (const propertyKey of Object.keys(moduleProperties)) {
      if (moduleType === ModuleType.SUMMAND) {
        this.#properties[propertyKey] -= moduleProperties[propertyKey]
      }
      else
        this.#properties[propertyKey] /= moduleProperties[propertyKey]
    }
    moduleSlots[slotIndex] = null
    this.#health = this.#properties[Properties.HEALTH_MAX]
    this.#shield = this.#properties[Properties.SHIELD_MAX]
  }

  #addModule(slotIndex, module, moduleSlots) {
    moduleSlots[slotIndex] = module
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