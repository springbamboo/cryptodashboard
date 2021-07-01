let socket: WebSocket = null

document.addEventListener('DOMContentLoaded', () => {
  const urlField = document.getElementById('url') as HTMLInputElement
  const dataField = document.getElementById('data-textbox') as HTMLInputElement

  document.getElementById('connect-button').addEventListener('click', () => {
    const url = urlField.value
    connect(url)
  })

  document.getElementById('disconnect-button').addEventListener('click', () => {
    socket.close()
  })

  document.getElementById('send-button').addEventListener('click', () => {
    const data = dataField.value
    send(data)
  })
})



function connect(url: string) {
  socket = new WebSocket(url)

  socket.addEventListener('open', (e) => {
    console.log('open')
    console.log(e)
  })

  socket.addEventListener('message', (e) => {
    console.log('message')
    console.log(e)
  })

  socket.addEventListener('close', (e) => {
    console.log('close')
    console.log(e)
  })

  socket.addEventListener('error', (e) => {
    console.log('error')
    console.log(e)
  })
}

function send(data: string) {
  socket.send(data)
}
