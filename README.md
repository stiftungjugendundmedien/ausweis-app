# Ausweis App

Take a photo with your tablet and create a document with your name and photo.
Print it on magic-paper and you have entry to every place.

Example: [`Ausweis App`](https://cabi.github.io/ausweis-app/)

The site is created with github-pages.

## Usage

Open the url of the ausweis-app with your tablet.

Touch the Button `Start Webcam`. Allow the Browser to access your webcam. It should switch to the front-camera - if not, switch to the front-camera.

Place your face in the former grey box and push the `Foto aufnehmen` Button. Your picture is placed in the `Ausweis`.

Enter your `Name` and `besondere Fähigkeit` in the `Ausweis`. The fields are normal input-fields that you can edit in your browser.

Pushing the `Ausweis drucken` Button open the Browser printing-dialog. You see only the `Ausweis` in the preview where you can print the page. Use the option `Print Backgrounds` in your print-dialog when you want the colour background in your print.

### Limitations and Todos
- only supports horizontal views on tablets
- using it vertical can cause some glitches in taking the photo

## Technical Requirements
- Node.js 20.x
- npm 10.x
- Github

## Packages used
- SveltKit 2.x
- TailwindCSS 3.x
- DaisyUI 4.x

## Install

Clone the repository

```bash
git clone <repository>
```

Install the packages.

```bash
npm install
```


Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Reformat code

Apply prettier rules to the code. Sorting the CSS-classes in the code.
Just make it nice.

```bash
npm run fromat

```

## Building

The app is configured with the static-adapter. It will build th files in the build-folder.

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deployment

The app has the deployment workflow configured in the file `.github/workflows/deploy.yml`.

After each push in the main-branch of the repository the deployment will be started.

It uses `github-pages` as a deployment target after building.

After the deployment you can find the builded app under.

```html
https://<repository-owner>.github.io/<repository-name>/
```

## interesting things to read

- https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos
- https://medium.com/@mahesh.ks/capture-html5-container-as-image-and-email-in-ios-android-devices-b1d1b5b93fdc
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
