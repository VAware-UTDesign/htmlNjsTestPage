var myDescriptor;
let serviceUuid = "e472cea9-3ae8-4d96-951e-7086fe17d416";
let characteristicUuid = "7abd909a-a9e5-4409-96a9-7aa4fa33426f";

document.querySelector("#read").addEventListener("click", function () {
  if (isWebBluetoothEnabled()) {
    onReadButtonClick();
  }
});

document.querySelector("#send1").addEventListener("click", function () {
  if (isWebBluetoothEnabled()) {
    onWriteButtonClick("1");
  }
});
document.querySelector("#send2").addEventListener("click", function () {
  if (isWebBluetoothEnabled()) {
    onWriteButtonClick("2");
  }
});
document.querySelector("#send3").addEventListener("click", function () {
  if (isWebBluetoothEnabled()) {
    onWriteButtonClick("3");
  }
});
document.querySelector("#send4").addEventListener("click", function () {
  if (isWebBluetoothEnabled()) {
    onWriteButtonClick("4");
  }
});
document.querySelector("#send5").addEventListener("click", function () {
  if (isWebBluetoothEnabled()) {
    onWriteButtonClick("5");
  }
});
document.querySelector("#send6").addEventListener("click", function () {
  if (isWebBluetoothEnabled()) {
    onWriteButtonClick("6");
  }
});

function isWebBluetoothEnabled() {
  if (!navigator.bluetooth) {
    console.log("Web Bluetooth API is not available in this browser!");
    return false;
  }

  return true;
}

function onReadButtonClick() {
  console.log("Requesting any Bluetooth Device...");
  navigator.bluetooth
    .requestDevice({
      filters: [{ name: "VAware" }],
      //acceptAllDevices: true,
      optionalServices: [serviceUuid],
    })
    .then((device) => {
      console.log("Connecting to GATT Server...");
      return device.gatt.connect();
    })
    .then((server) => {
      console.log("Getting Service...");
      return server.getPrimaryService(serviceUuid);
    })
    .then((service) => {
      console.log("Getting Characteristic...");
      return service.getCharacteristic(characteristicUuid);
    })
    .then((descriptor) => {
      myDescriptor = descriptor;
      console.log("Reading Descriptor...");
      return descriptor.readValue();
    })
    .then((value) => {
      let decoder = new TextDecoder("utf-8");
      console.log(
        "> Characteristic User Description: " + decoder.decode(value)
      );
    })
    .catch((error) => {
      console.log("Argh! " + error);
    });
}

function onWriteButtonClick(val) {
  if (!myDescriptor) {
    return;
  }
  let encoder = new TextEncoder("utf-8");
  let value = val;
  console.log("Setting Characteristic User Description...");
  myDescriptor
    .writeValue(encoder.encode(value))
    .then((_) => {
      console.log("> Characteristic User Description changed to: " + value);
    })
    .catch((error) => {
      console.log("Argh! " + error);
    });
}
