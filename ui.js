function showInfo(elementId, ship) {
  const elementShip = document.getElementById(elementId)
  elementShip.getElementsByClassName("shipId")[0].innerHTML = elementId
  elementShip.getElementsByClassName("HEALTH_MAX")[0].innerHTML = `Health: ${ship.health}/${ship.healthMax}`
  elementShip.getElementsByClassName("SHIELD_MAX")[0].innerHTML = `Shield: ${ship.shield}/${ship.shieldMax}`
  elementShip.getElementsByClassName("SHIELD_RECOVERY")[0].innerHTML = `ShieldRecovery: ${ship.shieldRecovery} per second`
}

function displayModules({ elementId, ship, modules }) {
  const htmlElement = document.getElementById(elementId)
  htmlElement.innerHTML += "Modules: "

  const callback = (event, slotIndex) => {
    const module = JSON.parse(event.target.value)
    ship.appendEquipment(slotIndex, module)
    showInfo(elementId, ship)
  }

  for (let i = 0; i < ship.moduleSlotsQuantity; i++) {
    htmlElement.appendChild(createModule(modules, (event) => {
      callback(event, i)
    }))
  }
}

function createModule(modules, callback) {
  const select = document.createElement("select")
  select.onchange = callback

  const emptyOption = document.createElement("option")
  emptyOption.innerHTML = `Empty slot`
  select.appendChild(emptyOption)

  for (const module of modules) {
    const option = document.createElement("option")
    const { type, properties } = module
    for (const propertyKey of Object.keys(properties)) {
      option.innerHTML += `${propertyKey}: ${properties[propertyKey]}`
      option.setAttribute("value", JSON.stringify({ type, properties }))
    }
    select.appendChild(option)
  }

  return select
}