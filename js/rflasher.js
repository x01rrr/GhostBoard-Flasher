$(".sel_firm").hide();
	
	
	function SelectDevice() {
		var device = $( ".sel_device option:selected" ).val();
		
		$(".f_m,.f_g,.f_b").hide();
		if (device != '') {
			$(".sel_firm").show();
			if (device == 1) {		// Xeon
				$(".f_m").show();
			}
			if (device == 2) {		// Phantom
				$(".f_m").show();
				$(".f_g").show();
				$(".f_b").show();
			}
			if (device == 3) {		// GhostBoard
				$(".f_g").show();
			}
			if (device == 4) {		// Minion
				$(".f_m").show();
			}
			if (device == 5) {		// RocketESP
				$(".f_m").show();
			}
			if (device == 6) {		// Yapper
				$(".f_m").show();
			}
			$(".sel_firmware").val('');
		}
		$(".mani").hide();
	}
	
	function SelectFirmware() {
		var fw = $(".sel_firmware option:selected" ).val();
		var device = $( ".sel_device option:selected" ).val();
		
		if (fw == 1 && device == 1) {
		//	$(".mani").attr("manifest","boards/manifest.json");	 	// Xeon - Marauder
			KokoLatestLink('boardS3','S3 Multiboard Marauder');
		}
		if (fw == 1 && device == 2) {
			$(".mani").attr("manifest","boards/manifest_2.json");	// Phantom - Marauder
		}
		if (fw == 2 && device == 2) {
			$(".mani").attr("manifest","boards/manifest.json");		// Phantom - GhostESP
		}
		if (fw == 3 && device == 2) {
			$(".mani").attr("manifest","boards/manifest_4.json");	// Phantom - Bruce
		}
		if (fw == 2 && device == 3) {
			$(".mani").attr("manifest","boards/manifest.json"); 	// GhostBoard - GhostESP
		}
		if (fw == 1 && device == 4) {
		//	$(".mani").attr("manifest","boards/manifest_3.json");	 // Minion Marauder - Marauder
			KokoLatestLink('old_hardware','Minion Marauder');
		}
		if (fw == 1 && device == 5) {
		//	$(".mani").attr("manifest","boards/manifest_5.json");	 // RocketESP - Marauder
			KokoLatestLink('old_hardware','RocketESP Marauder');
		}
		if (fw == 1 && device == 6) {
		//	$(".mani").attr("manifest","boards/manifest_6.json");	 // Yapper - Marauder
			KokoLatestLink('old_hardware','Yapper Marauder');
		}
		$(".mani").show();
	}
	
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.querySelector(".not-supported-i").classList.remove("hidden");
      }
	$(".mani").hide();
	
	



	
function KokoLatestLink(port,device) {

var repo_url = 'https://api.github.com/repos/justcallmekoko/ESP32Marauder/releases';
	
var offset = '4096';
if (port == 'boardS3') {
	offset = '0';
}
	
fetch(repo_url)
  .then(response => response.json())
  .then(json => {
	var sc = 0;
	while(json[0]['assets'].length > sc) {
	var asset = json[0]['assets'][sc];
		if (asset['name'].includes(port)) {
			
			var latest_bin = asset['browser_download_url'];			
			const JSONToFile = (obj, filename) => {
			const blob = new Blob([JSON.stringify(obj, null, 2)], {
			type: 'application/json',
			});
			const url = URL.createObjectURL(blob);
			$(".mani").attr("manifest",url);
			};

			JSONToFile(
			{ 
			name: device+" Firmware", 
			version: "",
			home_assistant_domain: "Rabbit Labs",
			funding_url: "https://rabbit-labs.com",
			builds: [ { "chipFamily": "ESP32", "parts": [ { "path": "../bins/rocket/bootloader.bin", "offset": offset }, { "path": "../bins/rocket/partitions.bin", "offset": 32768 }, { "path": latest_bin, "offset": 65536 } ] } ]

			}, 'manifestss');
		}
		sc++;
	}
});
 
}
