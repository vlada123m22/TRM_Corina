# Space AR — local testing notes

This small note explains how to test the local AR scene (to verify camera quality and FOV) and how to tweak the settings.

## Quick testing (secure context required)

- Web browsers usually require HTTPS (or `localhost`) to give access to the webcam. Use a local server and open `http://localhost:PORT/index.html`.
- Example quick servers:

  - Python 3:

    ```powershell
    # run in the repo folder
    python -m http.server 8000
    # then visit http://localhost:8000
    ```

  - Node (http-server):
    ```powershell
    npx http-server -p 8000
    # then visit http://localhost:8000
    ```

## What I changed and what to verify

- index.html: added `sourceWidth` / `sourceHeight` in the `arjs` attribute so AR.js requests a higher-resolution camera stream from the browser.
- index.html: enabled `antialias` in the A-Frame `renderer` attribute.
- main.js: sets renderer pixel ratio (devicePixelRatio), size, encoding and tonemap settings; sets the camera FOV to a comfortable value (60) to reduce the zoomed-in appearance.

What to check after loading your scene on a device:

1. Camera quality should appear sharper — the video feed should have noticeably clearer detail.
2. The scene should feel less zoomed-in; if it still looks tight, open `main.js` and try smaller `fov` values (e.g. 55) or larger (e.g., 65) depending on the device.
3. If camera feed is still low-res, some webcams or browsers enforce a limit — try alternate `sourceWidth`/`sourceHeight` values (1280x720, 1920x1080) or test on another device.

If something goes wrong let me know what browser and device you're testing on and I can suggest further platform-specific tweaks.
