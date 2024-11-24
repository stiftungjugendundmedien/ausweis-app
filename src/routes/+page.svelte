<script lang="ts">

let stream: MediaStream | null = null;
let videoRef;

const constraints = {
	audio: false,
	video: {
		width: 1280,
		height: 720,
	}
};

async function getStream() {
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then((mediaStream) => {
				videoRef.srcObject = mediaStream;
				videoRef.onloadedmetadata = () => {
					videoRef.play();
				}
			})
			.catch((err) => {
				console.error(`${err.name}: ${err.message}`);
		});
}

async function stopStream() {
	stream.getTracks().forEach(track => track.stop());
	videoRef.srcObject = null;
}

</script>

<h1 class="">Webcam Capture</h1>

<section class="container mx-auto px-4">
	<h1 class="text-4xl text-blue-500 my-4">WebCam</h1>
	<button class="bg-green-500 text-white py-2 px-4 rounded-md" on:click={getStream} >Start Webcam</button>
	<button class="bg-red-500 text-white py-2 px-4 rounded-md" on:click={stopStream} >Stop Webcam</button>
	<button class="bg-gray-400 text-black py-2 px-4 rounded-md" id="captureButton">Capture Photo</button>
 
	<video class="mt-4 rounded-sm " width="640" height="480" autoplay={true} bind:this={videoRef}></video>
</section>
