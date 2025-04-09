<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { User, VideoCamera, VideoCameraSlash, XMark, Camera, Printer, Plus, Minus, Eye, EyeSlash } from '@steeze-ui/heroicons';

	let videoStream: MediaStream | null = null;
	let overlayRef: any;
	let videoRef: any;
	let canvasRef: any;
	let avatarRef: any;

	let cards = [
    { id: 1, name: null, imageSrc: null, specialAbility: null},
    // Add more cards dynamically
  ];

	/**
	 * addCard
	 *
	 * add a new card to the list.
	 */
	 async function addCard() {
		// Find the maximum ID in the current cards array
		const maxId = cards.length > 0 ? Math.max(...cards.map(card => card.id)) : 0;
		// Add a new card with an ID greater than the maximum
    const newId = maxId + 1;
    cards = [...cards, { id: newId, name: null, imageSrc: null, specialAbility: null }];
  }

	/**
	 * removeCard
	 *
	 * remove a card from the list.
	 */
	 async function removeCard(id) {
    cards = cards.filter(card => card.id !== id);
  }

	let showCardDetails = true; // State to toggle card details visibility

	/**
	 * toggleCardDetails
	 *
	 * toggle the card details visibility.
	 */
	 function toggleCardDetails() {
    showCardDetails = !showCardDetails;
  }

	// constraints for the video feed
	const constraints = {
		audio: false,
		video: {
			width: { ideal: 1280 },
			height: { ideal: 720 },
			facingMode: 'user'
		}
	};

	let activeCardId: any = null;

	/**
	 * startStream
	 *
	 * start the video stream and assign it to the video-tag.
	 */
	async function startStreamForCard(cardId: any) {
		activeCardId = cardId;
		overlayRef.classList.remove('hidden');
		window.addEventListener('keydown', handleKeydown);
		if (!videoStream) {
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
		} else {
      console.log('Camera stream is already active.');
		}
	}

	/**
	 * stopStream
	 *
	 * stop the video stream.
	 */
	async function stopStream() {
		console.log('Stop Stream');
		if (videoStream) {
			videoStream.getTracks().forEach((track) => track.stop());
			videoStream = null;
		} else {
			console.error('No active stream to stop.');
		}
		videoRef.srcObject = null;
		overlayRef.classList.add('hidden');
		window.removeEventListener('keydown', handleKeydown);
	}

	/**
	 * capturePhoto
	 *
	 * grab a stil image from video stream and write it in the image.
	 */
	async function capturePhoto() {
		console.log('Capture Photo');
		if (!videoStream) {
			console.error('No active video stream to capture from.');
			return;
		}
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
		const card = cards.find((c) => c.id === activeCardId);
    if (card) {
      card.imageSrc = dataUrl;
			cards = [...cards];
    }

		// show the foto
		// avatarRef.classList.remove('hidden');
		// stop webcam
		stopStream();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			stopStream(); // close Overlay wich "Esc"
		} else if (event.key === ' ') {
			capturePhoto(); // Capture photo with "Enter"
		}
  }
</script>

<div class="bg-white flex h-dvh min-h-screen flex-col items-center justify-center pb-4">
	<!-- HEADLINE -->
	<section class="mt-6 w-11/12 flex-none px-4 py-4 screen:bg-grau-light print:hidden print:bg-none">
		<div class="flex items-center justify-center">
			<h1 class="text-6xl text-rot font-sk">Ausweisgenerator</h1>
		</div>
	</section>

	<!-- OVERLAY -->
	<section class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" bind:this={overlayRef} >
		<div class="bg-white p-6 rounded-lg shadow-lg">
			<h2 class="text-xl font-bold font-sk">Kamera</h2>
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
					<Icon src={VideoCameraSlash} theme="outline" class="bg-grau-light stroke-grau" />
				</div>
			</div>
			<canvas
				class="mt-4 rounded-sm bg-grau-light screen:hidden print:hidden"
				width="400"
				height="400"
				bind:this={canvasRef}
			></canvas>
			<button class="btn bg-rot hover:bg-rot-dark text-white" on:click={stopStream}
				><Icon src={XMark} theme="mini" class="size-6" /> Schließen</button
			>
			<button class={videoStream? "btn bg-gelb hover:bg-gelb-dark text-grau" : "btn bg-grau-light hover:bg-grau-light text-grau"} on:click={capturePhoto} id="captureButton"
				><Icon src={Camera} theme="mini" class="size-6" />Foto aufnehmen</button
			>
		</div>
	</section>

	<!-- CONTENT -->
	<section class="h-full max-w-full screen:overflow-x-auto min-h-fit w-11/12 grow bg-grau-light p-4 justify-center">
		<div class="screen:flex h-full print:h-auto flex-row items-center justify-start">

			<!-- BUSINESS CARDS -->
			<div class={showCardDetails ? "screen:flex print:grid print:grid-cols-2" : "screen:flex print:grid print:grid-cols-4 print:gap-20"}>
				{#each cards as card (card.id)}
					<section class="m-2 h-full basis-1/2 px-4 py-2">
						<div class="screen:flex h-full min-h-full items-center justify-center">
							<div
								class={showCardDetails ? "relative grid grid-cols-1 bg-gelb p-4 screen:h-96 aspect-[74/105] print:h-[105mm] print:w-[74mm] print:grid": "relative"}
								style={showCardDetails ? "background-image: url('resources/A7-Rallyeausweis.svg'); background-size: cover; background-position: center; -webkit-print-color-adjust: exact; print-color-adjust: exact;" : ""}
							>

								<!-- REMOVE CARD BUTTON -->
								<button
									class={showCardDetails ? "absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 print:hidden" : "absolute top-11 -right-5 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 print:hidden"}
									on:click={() => removeCard(card.id)}
								>
									<Icon src={Minus} theme="mini" class="text-white size-4" />
								</button>

								<div class="col">
									<div class="mt-16 flex items-center justify-center gap-1">
										<div class="avatar">
											<div
												class="touch-auto overflow-auto rounded-xl screen:h-36 screen:w-36 print:h-[40mm] print:w-[40mm] cursor-pointer"
												on:click={() => startStreamForCard(card.id)}
												on:keydown={(e) => e.key === 'Enter' && startStreamForCard(card.id)}
												role="button"
												tabindex="0"
											>
												{#if card.imageSrc}
													<img
														class=""
														bind:this={avatarRef}
														src={card.imageSrc}
														alt="Avatar Bild für den Ausweis"
													/>
												{/if}
												<Icon src={User} theme="solid" class="color-gray-500 bg-white" />
											</div>
										</div>
									</div>
								</div>

								<div class={showCardDetails ? "col" : "col hidden"}>
										<dl class="mt-[27pt] flex flex-col items-center font-medium screen:text-lg print:text-sm print:mt-[10mm]">
											<dd>
												<input
													type="text"
													bind:value={card.name}
													class="block w-[147pt] h-[20pt] print:h-[7.5mm] print:w-[54.10mm] print-hide-placeholder rounded-xl border-gray-300 px-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
													placeholder=""
												/>
											</dd>
											<dd>
												<input
													type="text"
													bind:value={card.specialAbility}
													class="mt-[23.5pt] block w-[147pt] h-[20pt] print:h-[7.5mm] print:w-[54.10mm] print:mt-[8mm] print-hide-placeholder rounded-xl border-gray-300 px-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
													placeholder=""
												/>
											</dd>
										</dl>
								</div>
							</div>
						</div>
					</section>
				{/each}
			</div>
			<section class="m-2 h-full w-3/4 basis-1/2 px-4 py-2">
				<div class="flex h-full min-h-full items-center justify-center">
					<button on:click={addCard}
						class="grid grid-cols-1 bg-gelb p-4 w-24 h-24 print:hidden">
						<Icon src={Plus} theme="solid" class="text-white" />
					</div>
			</section>
		</div>
	</section>

	<!-- BUTTON -->
	<section class="mb-4 w-11/12 flex-none bg-white p-4 print:hidden">
		<div class="flex items-center justify-center gap-2">
			<button class="{showCardDetails ? "btn bg-rot hover:bg-rot-dark text-white" : "btn bg-gruen hover:bg-gruen-dark text-white"}" on:click={toggleCardDetails}
				><Icon src={showCardDetails ? EyeSlash : Eye} theme="mini" class="size-6" />{showCardDetails ? "Details verbergen" : "Details zeigen"}</button
			>
			<button class="btn bg-grau hover:bg-grau-dark text-white" on:click={() => window.print()}
				><Icon src={Printer} theme="mini" class="size-6" />Ausweise drucken</button
			>
		</div>
	</section>
</div>
