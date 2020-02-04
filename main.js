async function register ({
  registerSetting
}) {
  registerSetting({
    name: 'airtime_debug',
    label: 'Debug Logs',
    type: 'input-checkbox',
    private: false,
    default: false
  })

  registerSetting({
    name: 'airtime_support_peertube',
    label: 'Donate host airtime to PeerTube Federation',
    type: 'input-checkbox',
    private: false,
    default: true
  })
}

async function unregister () {

}

module.exports = {
  register,
  unregister
}
