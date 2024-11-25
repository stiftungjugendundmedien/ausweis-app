<script lang="ts">
// <!-- https://www.geeksforgeeks.org/how-to-change-tabs-horizontally-on-hover-with-tailwind-css-and-javascript/?ref=header_outind -->
// <!-- <LeftMouse>https://www.geeksforgeeks.org/how-to-make-div-fill-full-height-of-parent-in-tailwind-css/ -->
// <!-- https://www.material-tailwind.com/docs/html/installation -->
// https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos
// https://medium.com/@mahesh.ks/capture-html5-container-as-image-and-email-in-ios-android-devices-b1d1b5b93fdc


let stream: MediaStream | null = null;
let videoRef;
let canvasRef;

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
				stream = mediaStream;
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
	//videoRef.stop();
}

async function captureScreen() {
	const context = canvasRef.getContext('2d');
	let video;
	  try {
    const captureStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = captureStream;
    context.drawImage(video, 0, 0, window.width, window.height);
    const frame = canvas.toDataURL("image/png");
    captureStream.getTracks().forEach(track => track.stop());
    window.location.href = frame;
  } catch (err) {
    console.error("Error: " + err);
  }
}

</script>

<h1 class="">Webcam Capture</h1>

<section class="container mx-auto px-4">
	<h1 class="text-4xl text-blue-500 my-4">WebCam</h1>
	<button class="bg-green-500 text-white py-2 px-4 rounded-md" on:click={getStream} >Start Webcam</button>
	<button class="bg-red-500 text-white py-2 px-4 rounded-md" on:click={stopStream} >Stop Webcam</button>
	<button class="bg-gray-400 text-black py-2 px-4 rounded-md" on:click={captureScreen} id="captureButton">Capture Photo</button>
 
	<video class="mt-4 rounded-sm " width="640" height="480" autoplay={true} bind:this={videoRef}></video>

	<canvas class="mt-4 rounded-sm bg-gray-200" bind:this="{canvasRef}"></canvas>
</section>
