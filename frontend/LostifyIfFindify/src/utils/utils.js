function alertBootstrap(mess, type) {
  const alertPlaceholder = document.getElementById('bootstrap-alert')
  const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }
  alert(mess, type)

  setTimeout(() => {
    const alertElement = document.querySelector('#bootstrap-alert .alert')
    if (alertElement) {
      alertElement.remove()
    }
  }, 2000)
}

export default alertBootstrap
