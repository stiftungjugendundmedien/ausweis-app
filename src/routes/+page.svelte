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
			width: { ideal: 1280 },
			height: { ideal: 720 },
			facingMode: 'user'
		}
	};

	async function startStream() {
		console.log('Start Stream');
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then((mediaStream) => {
				videoStream = mediaStream;
				videoRef.srcObject = mediaStream;
				console.log(videoRef);
				videoStream.onloadedmetadata = () => {
					console.log(videoStream);
					//videoRef.srcObject = mediaStream;
					videoRef.play();
				};
			})
			.catch((err) => {
				console.error(`${err.name}: ${err.message}`);
			});
	}

	async function stopStream() {
		console.log('Stop Stream');
		videoStream.getTracks().forEach((track) => track.stop());
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

		const size = videoRef.videoHeight;
		const sourceX = (videoRef.videoWidth - size) / 2;
		const sourceY = (videoRef.videoHeight - size) / 2;
		context.drawImage(
			videoRef,
			sourceX,
			sourceY,
			size,
			size,
			0,
			0,
			canvasRef.width,
			canvasRef.height
		);

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

<div class="flex h-screen min-h-screen flex-col items-center justify-center gap-2 pb-4 bg-white">
	<!-- HEADLINE -->
	<section class="m-2 min-w-full flex-none px-4 py-2 screen:bg-gray-300 print:hidden print:bg-none">
		<div class="flex items-center justify-center">
			<h1 class="text-6xl text-gray-800">Ausweis Generator</h1>
		</div>
	</section>

	<!-- WEBCAM -->
	<section class="m-2 h-48 w-3/4 grow bg-secondary px-4 py-2 print:hidden">
		<div class="flex h-full min-h-full items-center justify-center">
			<div class="relative mb-6 mt-6 h-[240px] w-[240px] overflow-hidden border-2 border-red-300">
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
					class="absolute left-1/2 h-full min-h-full min-w-full max-w-none -translate-x-1/2 rounded-sm border-2 border-gray-300 object-center"
					autoplay={true}
					bind:this={videoRef}
				></video>
			</div>
		</div>
		<canvas
			class="mt-4 rounded-sm bg-gray-200 screen:hidden print:hidden"
			width="400"
			height="400"
			bind:this={canvasRef}
		></canvas>
	</section>

	<!-- BUSINESS CARD -->
	<section class="m-2 h-36 w-3/4 grow px-4 py-2 screen:bg-primary">
		<div class="flex h-full min-h-full items-center justify-center">
			<div
				class="grid grid-cols-5 border-2 border-solid border-gray-900 p-4 screen:bg-gray-100 print:h-[55mm] print:w-[85mm]"
			>
				<div class="col-span-2">
					<div class="avatar">
						<div class="h-24 w-24 touch-auto overflow-auto rounded">
							<img
								class="hidden"
								bind:this={avatarRef}
								src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
								alt="Avatar Bild für den Ausweis"
							/>
							<Icon src={User} theme="solid" class="color-gray-500 bg-gray-200" />
						</div>
					</div>
				</div>

				<div class="col-span-3">
					<dl class="font-medium screen:text-lg print:text-sm">
						<dt>Name</dt>
						<dd>Max Mustermann</dd>

						<dt>Geburtstag</dt>
						<dd>17.06.2015</dd>
					</dl>
				</div>
			</div>
		</div>
	</section>

	<!-- BUTTON -->
	<section class="m-2 min-w-full flex-none bg-gray-300 px-4 py-2 print:hidden">
		<div class="flex items-center justify-center gap-2">
			<button class="btn bg-green-500" on:click={startStream}>Start Webcam</button>
			<button class="btn bg-red-500" on:click={stopStream}>Stop Webcam</button>
			<button class="btn bg-primary" on:click={capturePhoto} id="captureButton"
				>Capture Photo</button
			>
			<button class="btn bg-gray-400" on:click={() => window.print()}>Print Card</button>
		</div>
	</section>
</div>
