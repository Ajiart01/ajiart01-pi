const textnya = document.querySelector('.status'); 
window.onload = function () {
      function updateBatteryStatus(battery) {
        document.querySelector('#charging-battery').textContent = battery.charging ?  'Is Charge⚡': 'No Charge ❌';
        console.log("Battery charging? "+ (battery.charging ? "Yes" : "No"));
        document.querySelector("#level-battery").textContent = `Baterai : ${(battery.level * 100).toFixed(0)}`+"%";
      }
      navigator.getBattery().then(function(battery){
        updateBatteryStatus(battery)
        battery.onchargingchange = function () {
          updateBatteryStatus(battery)
        }
        battery.onlevelchange = function () {
          updateBatteryStatus(battery)
        }
        battery.ondischargingtimechange = function () {
          updateBatteryStatus(battery)
        }
      })
    }