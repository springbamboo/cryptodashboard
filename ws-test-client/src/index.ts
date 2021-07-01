let socket: WebSocket = null

type OutputStyle = 'raw' | 'json'

document.addEventListener('DOMContentLoaded', () => {
  const urlField = document.getElementById('url') as HTMLInputElement
  const dataField = document.getElementById('data-textbox') as HTMLInputElement
  const styleSelector = document.getElementById('output-style') as HTMLSelectElement
  const outputInfoBox = document.getElementById('output-info') as HTMLDivElement
  const outputBodyBox = document.getElementById('output-body') as HTMLDivElement
  const connectButton = document.getElementById('connect-button') as HTMLButtonElement
  const disconnectButton = document.getElementById('disconnect-button') as HTMLButtonElement
  const sendButton = document.getElementById('send-button') as HTMLButtonElement
  let mode: OutputStyle = 'raw'

  connectButton.addEventListener('click', () => {
    const url = urlField.value
    connect(url)
  })

  disconnectButton.addEventListener('click', () => {
    socket.close()
  })

  sendButton.addEventListener('click', () => {
    const data = dataField.value
    send(data)
  })

  styleSelector.addEventListener('change', () => {
    mode = styleSelector.value as OutputStyle
  })

  function connect(url: string) {
    socket = new WebSocket(url)

    socket.addEventListener('open', (e) => {
      console.log('open')
      output('open')
    })

    socket.addEventListener('message', (e) => {
      console.log(`message: ${new Date().toISOString()}\n${e.data}`)
      output('message', e.data)
    })

    socket.addEventListener('close', (e) => {
      console.log('close')
      console.log(e)
      output('close')
    })

    socket.addEventListener('error', (e) => {
      console.log('error')
      console.log(e)
      output('error')
    })
  }

  function send(data: string) {
    socket.send(data)
  }

  function output(type: string, message: string = '') {
    let info = new Date().toISOString() + ' ' + type
    let body = ''
    if (mode === 'raw') {
      body += message
    } else if (mode === 'json') {
      try {
        body += JSON.stringify(JSON.parse(message), null, 4)
      } catch (e) {
        info += ' (JSON parsing failed)'
        body += message
      }
    }
    outputInfoBox.innerText = info
    outputBodyBox.innerText = body
  }
})
