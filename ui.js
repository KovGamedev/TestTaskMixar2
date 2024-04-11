function showInfo(elementId, ship) {
  const elementShip = document.getElementById(elementId)
  elementShip.innerHTML =
    `${elementId}<br>
    Health: ${ship.health}/${ship.healthMax}<br>
    Shield: ${ship.shield}/${ship.shieldMax}<br>
    ShieldRecovery: ${ship.shieldRecovery} per second<br>
    WeaponSlots:<br>`
  for (const weaponSlot of ship.weaponSlots) {
    elementShip.innerHTML += `   ${weaponSlot}<br>`
  }
}

function displayModules({ elementId, ship, modules }) {
  const htmlElement = document.getElementById(elementId)
  htmlElement.innerHTML += "Modules: "
  for (let i = 0; i < ship.moduleSlotsQuantity; i++) {
    htmlElement.appendChild(createModule(modules))
  }
}

function createModule(modules) {
  const select = document.createElement("select")

  const emptyOption = document.createElement("option")
  emptyOption.innerHTML = `Empty slot`
  select.appendChild(emptyOption)

  for (const module of modules) {
    const option = document.createElement("option")
    const { properties } = module
    for (const propertyKey of Object.keys(properties)) {
      option.innerHTML += `${propertyKey}: ${properties[propertyKey]}`
    }
    select.appendChild(option)
  }

  return select
}