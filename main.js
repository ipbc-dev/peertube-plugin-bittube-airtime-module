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
}

async function unregister () {

}

module.exports = {
  register,
  unregister
}
