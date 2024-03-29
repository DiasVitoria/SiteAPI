/*ROLAGEM AO CLICAR NO MENU*/

var MenuItems = document.querySelectorAll('#scrollingMenu a[href^="#"]')

MenuItems.forEach(item => {
  item.addEventListener('click', rolarAoClicar)
})

function rolarAoClicar(event) {
  event.preventDefault()
  var to = pegandoohref(event.target)

  smoothScrollTo(0, to - 15, 500)
}

function pegandoohref(element) {
  var id = element.getAttribute('href')
  return document.querySelector(id).offsetTop
}

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset
  const startY = window.scrollY || window.pageYOffset
  const distanceX = endX - startX
  const distanceY = endY - startY
  const startTime = new Date().getTime()

  duration = typeof duration !== 'undefined' ? duration : 400

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
  }

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime
    const newX = easeInOutQuart(time, startX, distanceX, duration)
    const newY = easeInOutQuart(time, startY, distanceY, duration)
    if (time >= duration) {
      clearInterval(timer)
    }
    window.scroll(newX, newY)
  }, 1000 / 60) // 60 fps
}

$(function () {
  $('.tablesorter').tablesorter({
    // Envia os cabeçalhos
    headers: {
      5: {
        // Desativa a ordenação para essa coluna
        sorter: false
      }
    }
  })
})
