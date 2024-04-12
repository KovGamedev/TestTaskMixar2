function showInfo(elementId, ship) {
  const elementShip = document.getElementById(elementId)
  elementShip.getElementsByClassName("shipId")[0].innerHTML = elementId
  elementShip.getElementsByClassName("HEALTH_MAX")[0].innerHTML = `Health: ${ship.health}/${ship.healthMax}`
  elementShip.getElementsByClassName("SHIELD_MAX")[0].innerHTML = `Shield: ${ship.shield}/${ship.shieldMax}`
  elementShip.getElementsByClassName("SHIELD_RECOVERY")[0].innerHTML = `ShieldRecovery: ${ship.shieldRecovery} per second`
  elementShip.getElementsByClassName("RELOADING")[0].innerHTML = `Reloading: ${100 * ship.reloading}% of base time`
}

function displayModules({ elementId, ship, modules }) {
  const htmlElement = document.getElementById(elementId)
  const label = document.createElement("div")
  label.innerHTML += "Modules: "
  htmlElement.appendChild(label)

  const callback = (event, slotIndex) => {
    const module = JSON.parse(event.target.value)
    ship.appendModule(slotIndex, module)
    showInfo(elementId, ship)
  }

  for (let i = 0; i < ship.moduleSlotsQuantity; i++) {
    htmlElement.appendChild(createModule(modules, (event) => {
      callback(event, i)
    }))
  }

  htmlElement.appendChild(document.createElement("br"))
}

function displayWeapon({ elementId, ship, weapon }) {
  const htmlElement = document.getElementById(elementId)
  const label = document.createElement("div")
  label.innerHTML += "Weapon: "
  htmlElement.appendChild(label)

  const callback = (event, slotIndex) => {
    const oneWeapon = JSON.parse(event.target.value)
    ship.appendWeapon(slotIndex, oneWeapon)
    showInfo(elementId, ship)
  }

  for (let i = 0; i < ship.weaponSlothsQuantity; i++) {
    htmlElement.appendChild(createModule(weapon, (event) => {
      callback(event, i)
    }))
  }

  htmlElement.appendChild(document.createElement("br"))
}

function createModule(modules, callback) {
  const select = document.createElement("select")
  select.onchange = callback

  const emptyOption = document.createElement("option")
  emptyOption.innerHTML = `Empty slot`
  emptyOption.setAttribute("value", JSON.stringify({ type: ModuleType.EMPTY, properties: {} }))
  select.appendChild(emptyOption)

  for (const module of modules) {
    const option = document.createElement("option")
    const { type, properties } = module
    for (const propertyKey of Object.keys(properties)) {
      option.innerHTML += `${propertyKey}: ${properties[propertyKey]} `
      option.setAttribute("value", JSON.stringify({ type, properties }))
    }
    select.appendChild(option)
  }

  return select
}