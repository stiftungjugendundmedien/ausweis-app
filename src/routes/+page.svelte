<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { User, VideoCamera, VideoCameraSlash, Camera, Printer } from '@steeze-ui/heroicons';

	let videoStream: MediaStream | null = null;
	let videoRef: any;
	let canvasRef: any;
	let avatarRef: any;

	// constraints for the video feed
	const constraints = {
		audio: false,
		video: {
			width: { ideal: 1280 },
			height: { ideal: 720 },
			facingMode: 'user'
		}
	};

	/**
	 * startStream
	 *
	 * start the video stream and assign it to the video-tag.
	 */
	async function startStream() {
		console.log('Start Stream');
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then((mediaStream) => {
				videoStream = mediaStream;
				videoRef.srcObject = mediaStream;
			})
			.catch((err) => {
				console.error(`${err.name}: ${err.message}`);
			});
	}

	/**
	 * stopStream
	 *
	 * stop the video stream.
	 */
	async function stopStream() {
		console.log('Stop Stream');
		videoStream.getTracks().forEach((track) => track.stop());
		videoRef.srcObject = null;
	}

	/**
	 * capturePhoto
	 *
	 * grab a stil image from video stream and write it in the image.
	 */
	async function capturePhoto() {
		console.log('Capture Photo');
		const context: CanvasRenderingContext2D = canvasRef.getContext('2d');

		// calculate the crop for a square foto
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

		const dataUrl = canvasRef.toDataURL();

		// assign the foto
		avatarRef.src = dataUrl;
		// show the foto
		avatarRef.classList.remove('hidden');
	}
</script>

<div class="bg-w flex h-screen min-h-screen flex-col items-center justify-center pb-4">
	<!-- HEADLINE -->
	<section class="mt-6 w-11/12 flex-none px-4 py-4 screen:bg-white print:hidden print:bg-none">
		<div class="flex items-center justify-center">
			<h1 class="text-6xl font-semibold text-gray-800">Ausweis Generator</h1>
		</div>
	</section>

	<!-- CONTENT -->
	<section class="h-screen min-h-fit w-11/12 grow bg-white p-4">
		<div class="flex h-full flex-row items-center justify-center">
			<!-- WEBCAM -->
			<section class="m-2 h-full w-3/4 basis-1/2 px-4 py-2 print:hidden">
				<div class="flex h-full min-h-full items-center justify-center">
					<div
						class="relative mb-6 mt-6 h-[300px] w-[300px] overflow-hidden border-2 border-gray-300"
					>
						<!-- svelte-ignore a11y_media_has_caption -->
						<video
							class="absolute left-1/2 h-full min-h-full min-w-full max-w-none -translate-x-1/2 rounded-sm border-0 border-gray-300 object-center"
							autoplay={true}
							bind:this={videoRef}
						></video>
						<Icon src={VideoCameraSlash} theme="outline" class="bg-gray-100 stroke-gray-300" />
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
			<section class="m-2 h-full w-3/4 basis-1/2 px-4 py-2">
				<div class="flex h-full min-h-full items-center justify-center">
					<div
						class="grid grid-cols-1 border-2 border-solid border-gray-900 bg-primary p-4 screen:h-96 print:h-[105mm] print:w-[74mm]"
					>
						<div class="col">
							<div class="mt-2 flex items-center justify-center gap-2">
								<h2 class="text-4xl font-semibold text-white">AUSWEIS</h2>
							</div>
						</div>
						<div class="col">
							<div class="flex items-center justify-center gap-1">
								<div class="avatar">
									<div
										class="touch-auto overflow-auto rounded-xl screen:h-24 screen:w-24 print:h-[35mm] print:w-[35mm]"
									>
										<img
											class="hidden"
											bind:this={avatarRef}
											src=""
											alt="Avatar Bild für den Ausweis"
										/>
										<Icon src={User} theme="solid" class="color-gray-500 bg-gray-200" />
									</div>
								</div>
							</div>
						</div>

						<div class="col">
							<dl class="font-medium screen:text-lg print:text-sm">
								<dt class=" pl-2 font-semibold text-white">NAME</dt>
								<dd>
									<input
										type="text"
										class="block w-full rounded-xl border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
										placeholder="Dein Name"
									/>
								</dd>

								<dt class="mt-2 pl-2 font-semibold text-white">BESONDERE FÄHIGKEIT</dt>
								<dd>
									<input
										type="text"
										class="block w-full rounded-xl border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
										placeholder="Schnüffelnase"
									/>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</section>
		</div>
	</section>

	<!-- BUTTON -->
	<section class="mb-4 w-11/12 flex-none bg-white p-4 print:hidden">
		<div class="flex items-center justify-center gap-2">
			<button class="btn bg-green-500" on:click={startStream}
				><Icon src={VideoCamera} theme="mini" class="size-6" /> Start Webcam</button
			>
			<button class="btn bg-red-500" on:click={stopStream}
				><Icon src={VideoCameraSlash} theme="mini" class="size-6" /> Stop Webcam</button
			>
			<button class="btn bg-primary" on:click={capturePhoto} id="captureButton"
				><Icon src={Camera} theme="mini" class="size-6" />Foto aufnehmen</button
			>
			<button class="btn bg-gray-400" on:click={() => window.print()}
				><Icon src={Printer} theme="mini" class="size-6" />Ausweis drucken</button
			>
		</div>
	</section>
</div>
