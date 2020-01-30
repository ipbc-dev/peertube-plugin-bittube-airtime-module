async function register ({
  registerSetting
}) {

  // registerSetting({
  //   name: 'airtime_platform_uuid',
  //   label: "Platform ID",
  //   type: 'input',
  //   private: false,
  //   default: 'bb2ede39-3fa9-e0aa-a3c2-d52056493010' //BitTube default
  // })

  // registerSetting({
  //   name: 'airtime_platform_name',
  //   label: "Platform Name",
  //   type: 'input',
  //   private: false,
  //   default: 'Bittube video' // BitTube default
  // })

}

async function unregister () {

}

module.exports = {
  register,
  unregister
}
