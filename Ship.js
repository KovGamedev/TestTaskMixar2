class Ship {
  #healthMax
  #health
  #shieldMax
  #shield
  #shieldRecovery
  #weaponSlotsQuantity
  #weaponSlots
  #equipmentSlotsQuantity
  #equipmentSlots

  constructor(healthMax, shieldMax, shieldRecovery, weaponSlothsQuantity, equipmentSlotsQuantity) {
    this.#healthMax = healthMax
    this.#health = healthMax
    this.#shieldMax = shieldMax
    this.#shield = shieldMax
    this.#shieldRecovery = shieldRecovery
    this.#weaponSlotsQuantity = weaponSlothsQuantity
    this.#equipmentSlotsQuantity = equipmentSlotsQuantity
  }

  get healthMax() {
    return this.#healthMax
  }

  get health() {
    return this.#health
  }

  get shieldMax() {
    return this.#shieldMax
  }

  get shield() {
    return this.#shield
  }

  get shieldRecovery() {
    return this.#shieldRecovery
  }

  get weaponSlothsQuantity() {
    return this.#weaponSlotsQuantity
  }

  get equipmentSlotsQuantity() {
    return this.#equipmentSlotsQuantity
  }

  addWeapon(weapon) {

  }

  addEquipment() {

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
    if (this.#shield < this.#shieldMax) {
      this.#shield += this.#shieldRecovery
      if (this.#shieldMax < this.#shield)
        this.#shield = this.#shieldMax
    }
  }
}