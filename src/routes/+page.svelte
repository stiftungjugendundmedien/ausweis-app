<script lang="ts">
// <!-- https://www.geeksforgeeks.org/how-to-change-tabs-horizontally-on-hover-with-tailwind-css-and-javascript/?ref=header_outind -->
// <!-- <LeftMouse>https://www.geeksforgeeks.org/how-to-make-div-fill-full-height-of-parent-in-tailwind-css/ -->
// <!-- https://www.material-tailwind.com/docs/html/installation -->
// https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos
// https://medium.com/@mahesh.ks/capture-html5-container-as-image-and-email-in-ios-android-devices-b1d1b5b93fdc

import { Icon } from '@steeze-ui/svelte-icon';
import { User } from '@steeze-ui/heroicons';


let videoStream: MediaStream | null = null;
let videoRef;
let canvasRef;
let avatarRef;

const constraints = {
	audio: false,
	video: {
		width: 1280,
		height: 720,
	}
};

async function startStream() {
	console.log('Start Stream');
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then((mediaStream) => {
				videoStream = mediaStream;
				videoRef.srcObject = mediaStream;
				videoStream.onloadedmetadata = () => {
				console.log(videoStream);
					//videoRef.srcObject = mediaStream;
					videoRef.play();
				}
			})
			.catch((err) => {
				console.error(`${err.name}: ${err.message}`);
		});
}

async function stopStream() {
	console.log('Stop Stream')
	videoStream.getTracks().forEach(track => track.stop());
	videoRef.srcObject = null;
}

async function capturePhoto() {
	console.log('Capture Photo');
	const context = canvasRef.getContext('2d');

	console.log(context);
	console.log(canvasRef.width);
	console.log(videoRef.videoWidth);
	//canvasRef.width = videoRef.videoWidth;
	//canvasRef.height = videoRef.videoHeight;

	//context.drawImage(videoRef, 0, 0, canvasRef.width, canvasRef.height);

	const size = videoRef.height;
	const sourceX = (videoRef.videoWidth - size) / 2;
	const sourceY = (videoRef.videoHeight - size) / 2;
	context.drawImage(videoRef, sourceX, sourceY, size, size);

	//context.drawImage(videoRef, 0, 0, canvasRef.width, canvasRef.height);

	const dataUrl = canvasRef.toDataURL();
	console.log(dataUrl);
	console.log(avatarRef);
	console.log(avatarRef.src);
	avatarRef.src = dataUrl;
	avatarRef.classList.remove('hidden');
}

async function captureScreen() {
/*	const context = canvasRef.getContext('2d');
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
	*/
}

</script>
<section class="container screen:bg-gray-300 mx-auto p-8 print:bg-none">
<h1 class="text-6xl text-gray-800">Ausweis Generator</h1>
</section>
<section class="container screen:bg-gray-200 mx-auto px-4">
	<div class="grid grid-cols-2 gap-4">
		<div class="print:hidden">
			<h1 class="text-4xl text-blue-500 my-4">WebCam</h1>
			<button class="btn bg-green-500" on:click={startStream} >Start Webcam</button>
			<button class="btn bg-red-500" on:click={stopStream} >Stop Webcam</button>
			<button class="btn bg-primary" on:click={capturePhoto} id="captureButton">Capture Photo</button>
			<button class="btn bg-gray-400" on:click={() => window.print() }>Print Card</button>

			<video class="mt-4 rounded-sm " width="320" height="240" autoplay={true} bind:this={videoRef}></video>
			<canvas class="mt-4 rounded-sm bg-gray-200 screen:hidden print:hidden" width="320" height="240" bind:this="{canvasRef}"></canvas>
	
		</div>
		<div>
			<div class="grid grid-cols-5 border-2 border-gray-900 border-solid screen:bg-gray-100 p-4 print:w-[85mm] print:h-[55mm]">
				<div class="col-span-2">
					<div class="avatar">
						<div class="w-24 h-24 overflow-auto touch-auto rounded">
							<img class="hidden" bind:this={avatarRef} src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
							<Icon src="{User}" theme="solid" class="bg-gray-200 color-gray-500"/>
						</div>
					</div>
				</div>

				<div class="col-span-3">
					<dl class="screen:text-lg print:text-sm font-medium">
						<dt>Name</dt>
						<dd>Max Mustermann</dd>

						<dt>Geburtstag</dt>
						<dd>17.06.2015</dd>
					</dl>

				</div>
			</div>
		</div>
	</div>
</section>
